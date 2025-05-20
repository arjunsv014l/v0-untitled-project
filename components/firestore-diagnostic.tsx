"use client"

import { useState } from "react"
import { db, auth } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

export default function FirestoreDiagnostic() {
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [userData, setUserData] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Function to test Firestore connection and data
  const testFirestore = async () => {
    setStatus("testing")
    setMessage("Testing Firestore connection...")

    try {
      // Check if user is authenticated
      const currentUser = auth.currentUser
      if (!currentUser) {
        setStatus("error")
        setMessage("No authenticated user found. Please sign in first.")
        return
      }

      // Try to get the user document
      const userDocRef = doc(db, "users", currentUser.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        // User document exists, show the data
        const data = userDoc.data()
        setUserData(data)
        setStatus("success")
        setMessage("Successfully retrieved user data from Firestore!")
      } else {
        // User document doesn't exist, try to create it
        setMessage("User document not found. Attempting to create it...")

        // Create basic user data
        const userData = {
          name: currentUser.displayName || "Unknown",
          email: currentUser.email || "Unknown",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          role: "student",
          authProvider: "diagnostic-fix",
          notes: "Document created by diagnostic tool",
        }

        await setDoc(userDocRef, userData)
        setUserData(userData)
        setStatus("success")
        setMessage("Created new user document in Firestore!")
      }
    } catch (error) {
      console.error("Firestore diagnostic error:", error)
      setStatus("error")
      setMessage(`Firestore error: ${error.message || "Unknown error"}`)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Firestore Diagnostic
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-4 w-80 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Firestore Diagnostic</h3>
            <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={testFirestore}
              disabled={status === "testing"}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {status === "testing" ? "Testing..." : "Test Firestore Connection"}
            </button>
          </div>

          {message && (
            <div
              className={`p-3 rounded mb-4 ${
                status === "error"
                  ? "bg-red-100 text-red-800"
                  : status === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {message}
            </div>
          )}

          {userData && (
            <div className="border rounded p-3 bg-gray-50 max-h-60 overflow-auto">
              <h4 className="font-semibold mb-2">User Data in Firestore:</h4>
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(
                  userData,
                  (key, value) => {
                    // Format timestamps for readability
                    if (value && typeof value === "object" && value.seconds) {
                      return new Date(value.seconds * 1000).toLocaleString()
                    }
                    return value
                  },
                  2,
                )}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
