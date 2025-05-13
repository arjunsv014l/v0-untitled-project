"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { ProfileService } from "@/lib/profile-service"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function ProfileDebugPage() {
  const { user, isLoading } = useUser()
  const [firestoreData, setFirestoreData] = useState<any>(null)
  const [localStorageData, setLocalStorageData] = useState<any>(null)
  const [isFixing, setIsFixing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (!user) return

      try {
        // Load Firestore data
        if (!user.id.startsWith("fallback-") && !user.id.startsWith("google-fallback-")) {
          const userDoc = await getDoc(doc(db, "users", user.id))
          if (userDoc.exists()) {
            setFirestoreData(userDoc.data())
          }
        }

        // Load localStorage data
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("dreamclerk_user")
          if (storedUser) {
            setLocalStorageData(JSON.parse(storedUser))
          }
        }
      } catch (error) {
        console.error("Error loading debug data:", error)
      }
    }

    if (!isLoading && user) {
      loadData()
    }
  }, [user, isLoading])

  const handleFixProfileStatus = async (forceCompleted: boolean) => {
    if (!user) return

    setIsFixing(true)
    setResult(null)

    try {
      if (forceCompleted) {
        const success = await ProfileService.markProfileAsCompleted(user.id)
        setResult(success ? "✅ Successfully marked profile as completed" : "❌ Failed to mark profile as completed")
      } else {
        // Update profile to not completed
        const firestoreData: Record<string, any> = { profileCompleted: false }
        const success = await ProfileService.updateProfile(user.id, firestoreData)
        setResult(success ? "✅ Successfully reset profile completion status" : "❌ Failed to reset profile status")
      }

      // Reload data
      if (!user.id.startsWith("fallback-") && !user.id.startsWith("google-fallback-")) {
        const userDoc = await getDoc(doc(db, "users", user.id))
        if (userDoc.exists()) {
          setFirestoreData(userDoc.data())
        }
      }

      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("dreamclerk_user")
        if (storedUser) {
          setLocalStorageData(JSON.parse(storedUser))
        }
      }
    } catch (error) {
      console.error("Error fixing profile status:", error)
      setResult(`❌ Error: ${error}`)
    } finally {
      setIsFixing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Profile Debug</h1>
        <p className="text-red-600">You must be logged in to use this page</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Debug</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User Object</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60">
          <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>

      {firestoreData && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Firestore Data</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60">
            <pre className="text-sm">{JSON.stringify(firestoreData, null, 2)}</pre>
          </div>
        </div>
      )}

      {localStorageData && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">LocalStorage Data</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60">
            <pre className="text-sm">{JSON.stringify(localStorageData, null, 2)}</pre>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Completion Status</h2>
        <div className="flex items-center space-x-2 mb-4">
          <div className={`w-4 h-4 rounded-full ${user.profileCompleted ? "bg-green-500" : "bg-red-500"}`}></div>
          <span>User Object: {user.profileCompleted ? "Completed" : "Not Completed"}</span>
        </div>

        {firestoreData && (
          <div className="flex items-center space-x-2 mb-4">
            <div
              className={`w-4 h-4 rounded-full ${firestoreData.profileCompleted === true ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span>Firestore: {firestoreData.profileCompleted === true ? "Completed" : "Not Completed"}</span>
          </div>
        )}

        {localStorageData && (
          <div className="flex items-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full ${localStorageData.profileCompleted === true ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span>LocalStorage: {localStorageData.profileCompleted === true ? "Completed" : "Not Completed"}</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Fix Profile Status</h2>
        <div className="flex space-x-4">
          <Button
            onClick={() => handleFixProfileStatus(true)}
            disabled={isFixing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isFixing ? "Processing..." : "Mark as Completed"}
          </Button>
          <Button
            onClick={() => handleFixProfileStatus(false)}
            disabled={isFixing}
            className="bg-red-600 hover:bg-red-700"
          >
            {isFixing ? "Processing..." : "Mark as Not Completed"}
          </Button>
        </div>

        {result && (
          <div
            className={`mt-4 p-3 rounded-lg ${result.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {result}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Check if profile completion status is consistent across all storage locations</li>
          <li>If inconsistent, use the buttons above to fix the status</li>
          <li>After fixing, log out and log back in to verify the fix worked</li>
          <li>If issues persist, clear browser storage and try again</li>
          <li>
            For persistent issues, contact support with the user ID:{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">{user.id}</code>
          </li>
        </ol>
      </div>
    </div>
  )
}
