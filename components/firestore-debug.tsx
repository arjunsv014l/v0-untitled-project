"use client"

import { useState } from "react"
import { db } from "@/lib/firebase"
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore"
import { useUser } from "@/context/user-context"

export default function FirestoreDebug() {
  const { user } = useUser()
  const [testResult, setTestResult] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [collections, setCollections] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const runFirestoreTest = async () => {
    setIsLoading(true)
    setTestResult("")
    setError("")

    try {
      // Test 1: Write to a test document
      const testDocRef = doc(db, "debug", "test-document")
      await setDoc(testDocRef, {
        timestamp: new Date().toISOString(),
        message: "This is a test document",
      })
      setTestResult((prev) => prev + "✅ Successfully wrote to test document\n")

      // Test 2: Read the test document
      const docSnap = await getDoc(testDocRef)
      if (docSnap.exists()) {
        setTestResult((prev) => prev + "✅ Successfully read test document\n")
      } else {
        setTestResult((prev) => prev + "❌ Test document not found\n")
      }

      // Test 3: List available collections
      const collectionsSnapshot = await getDocs(collection(db, "users"))
      setTestResult((prev) => prev + `✅ Users collection has ${collectionsSnapshot.size} documents\n`)

      // Test 4: If user is logged in, try to access their document
      if (user) {
        const userDocRef = doc(db, "users", user.id)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          setTestResult((prev) => prev + "✅ Successfully read current user document\n")
          setTestResult((prev) => prev + `User document data: ${JSON.stringify(userDocSnap.data(), null, 2)}\n`)
        } else {
          setTestResult((prev) => prev + "❌ Current user document not found in Firestore\n")

          // Try to create the user document
          try {
            await setDoc(userDocRef, {
              name: user.name,
              email: user.email,
              role: user.role,
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
              notes: "Created during debug test",
            })
            setTestResult((prev) => prev + "✅ Created missing user document\n")
          } catch (createError) {
            setTestResult((prev) => prev + `❌ Failed to create user document: ${createError.message}\n`)
          }
        }
      } else {
        setTestResult((prev) => prev + "ℹ️ No user logged in, skipping user document test\n")
      }
    } catch (err) {
      console.error("Firestore test error:", err)
      setError(`Error: ${err.code} - ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Firestore Debug Tool</h2>

      <div className="mb-4">
        <button
          onClick={runFirestoreTest}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Running Tests..." : "Run Firestore Tests"}
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      {testResult && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Test Results:</h3>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        <p>Current User ID: {user ? user.id : "Not logged in"}</p>
        <p>Current User Email: {user ? user.email : "N/A"}</p>
      </div>
    </div>
  )
}
