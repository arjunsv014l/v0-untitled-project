"use client"

import { useState, useEffect } from "react"
import { db, auth } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import FirestoreDiagnostic from "@/components/firestore-diagnostic"

export default function CheckFirestorePage() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userCount, setUserCount] = useState<number | null>(null)

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check if user is authenticated
        const currentUser = auth.currentUser
        if (!currentUser) {
          setError("No authenticated user found. Please sign in first.")
          setLoading(false)
          return
        }

        // Get user document
        const userDocRef = doc(db, "users", currentUser.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          setUserData(userDoc.data())
        } else {
          setError("User document not found in Firestore.")
        }

        // Get user count
        try {
          const statsDocRef = doc(db, "stats", "userCounter")
          const statsDoc = await getDoc(statsDocRef)

          if (statsDoc.exists()) {
            setUserCount(statsDoc.data().count || 0)
          }
        } catch (countError) {
          console.error("Error getting user count:", countError)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error checking Firestore:", err)
        setError(`Error: ${err.message || "Unknown error"}`)
        setLoading(false)
      }
    }

    checkCurrentUser()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Firestore Data Check</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      ) : (
        <div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Successfully retrieved user data from Firestore!
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Your User Data:</h2>
            <div className="bg-gray-100 p-4 rounded overflow-auto max-h-80">
              <pre className="text-sm">
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
          </div>

          {userCount !== null && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Current User Count:</h2>
              <div className="bg-blue-100 p-4 rounded">
                <p className="text-blue-800 font-bold text-xl">{userCount}</p>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-600 mt-4">
            This page shows the data stored in Firestore for your user account. If you can see your data above, it means
            Firestore is working correctly.
          </p>
        </div>
      )}

      <FirestoreDiagnostic />
    </div>
  )
}
