"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { ProfileService } from "@/lib/profile-service"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function ProfileStatusDebugPage() {
  const { user, isLoading, updateUserProfile } = useUser()
  const [localStorageData, setLocalStorageData] = useState<any>(null)
  const [firestoreData, setFirestoreData] = useState<any>(null)
  const [isCheckingFirestore, setIsCheckingFirestore] = useState(false)
  const [isFixingProfile, setIsFixingProfile] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isLoading && user) {
      // Get localStorage data
      const storedUser = localStorage.getItem("dreamclerk_user")
      if (storedUser) {
        try {
          setLocalStorageData(JSON.parse(storedUser))
        } catch (error) {
          console.error("Error parsing localStorage user:", error)
        }
      }

      // Check completion flag
      const completionFlag = localStorage.getItem("dreamclerk_profile_completed")
      if (completionFlag) {
        setMessage(`Profile completion flag in localStorage: ${completionFlag}`)
      }

      // Get Firestore data
      checkFirestore()
    }
  }, [isLoading, user])

  const checkFirestore = async () => {
    if (!user) return

    setIsCheckingFirestore(true)
    try {
      const userRef = doc(db, "users", user.id)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        setFirestoreData(userDoc.data())
      } else {
        setMessage("User document not found in Firestore")
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error)
      setMessage(`Error fetching Firestore data: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsCheckingFirestore(false)
    }
  }

  const fixProfileCompletion = async () => {
    if (!user) return

    setIsFixingProfile(true)
    setMessage("Fixing profile completion status...")

    try {
      // Force profile completion in all storage locations
      await ProfileService.forceProfileCompletion(user.id)

      // Update user context
      await updateUserProfile({ profileCompleted: true })

      setMessage("Profile completion status fixed successfully!")

      // Refresh data
      checkFirestore()

      // Update localStorage display
      const storedUser = localStorage.getItem("dreamclerk_user")
      if (storedUser) {
        try {
          setLocalStorageData(JSON.parse(storedUser))
        } catch (error) {
          console.error("Error parsing localStorage user:", error)
        }
      }
    } catch (error) {
      console.error("Error fixing profile completion:", error)
      setMessage(`Error fixing profile completion: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsFixingProfile(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Not logged in</h1>
        <p>Please log in to view profile status.</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile Status Debug</h1>

      {message && <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-semibold mb-2">User Context</h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
          <div className="mt-4">
            <p className="font-medium">
              Profile Completed:{" "}
              <span className={user.profileCompleted ? "text-green-600" : "text-red-600"}>
                {String(user.profileCompleted)}
              </span>
            </p>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h2 className="text-xl font-semibold mb-2">LocalStorage Data</h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
            <pre>{JSON.stringify(localStorageData, null, 2)}</pre>
          </div>
          <div className="mt-4">
            <p className="font-medium">
              Profile Completed:{" "}
              <span className={localStorageData?.profileCompleted ? "text-green-600" : "text-red-600"}>
                {String(localStorageData?.profileCompleted)}
              </span>
            </p>
          </div>
        </div>

        <div className="border rounded-md p-4 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Firestore Data</h2>
          {isCheckingFirestore ? (
            <p>Loading Firestore data...</p>
          ) : firestoreData ? (
            <>
              <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                <pre>{JSON.stringify(firestoreData, null, 2)}</pre>
              </div>
              <div className="mt-4">
                <p className="font-medium">
                  Profile Completed:{" "}
                  <span className={firestoreData?.profileCompleted ? "text-green-600" : "text-red-600"}>
                    {String(firestoreData?.profileCompleted)}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <p>No Firestore data available</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <Button onClick={checkFirestore} disabled={isCheckingFirestore}>
          {isCheckingFirestore ? "Checking..." : "Refresh Firestore Data"}
        </Button>

        <Button onClick={fixProfileCompletion} disabled={isFixingProfile} variant="destructive">
          {isFixingProfile ? "Fixing..." : "Force Profile Completion"}
        </Button>
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Manual Fix</h2>
        <p className="mb-2">If you're still experiencing issues, run this code in your browser console:</p>
        <div className="bg-gray-100 p-4 rounded-md overflow-auto">
          <pre>{`
// Force profile completion in localStorage
localStorage.setItem('dreamclerk_profile_completed', 'true');

// Update user object in localStorage
const user = JSON.parse(localStorage.getItem('dreamclerk_user') || '{}');
user.profileCompleted = true;
user.profileCompletedAt = new Date().toISOString();
localStorage.setItem('dreamclerk_user', JSON.stringify(user));

// Refresh the page
window.location.reload();
          `}</pre>
        </div>
      </div>
    </div>
  )
}
