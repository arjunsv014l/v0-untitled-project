"use client"

import { useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, collection, getDocs, limit, query } from "firebase/firestore"

export default function DatabaseDiagnostic() {
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [dbInfo, setDbInfo] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Function to test database connection
  const testDatabase = async () => {
    setStatus("testing")
    setMessage("Testing database connection...")
    setDbInfo(null)

    try {
      // Test 1: Check if we can access the stats collection
      const statsRef = doc(db, "stats", "userCounter")
      const statsDoc = await getDoc(statsRef)

      if (statsDoc.exists()) {
        setMessage("Successfully connected to database! Found userCounter document.")
        setDbInfo({
          userCounter: statsDoc.data(),
        })
      } else {
        setMessage("Connected to database, but userCounter document not found. Database may need initialization.")
      }

      // Test 2: Check if we can access the registrations collection
      try {
        const registrationsRef = collection(db, "registrations")
        const q = query(registrationsRef, limit(1))
        const querySnapshot = await getDocs(q)

        setDbInfo((prev) => ({
          ...prev,
          registrationsCount: querySnapshot.size,
          registrationsExists: true,
        }))
      } catch (regError) {
        console.error("Error checking registrations collection:", regError)
        setDbInfo((prev) => ({
          ...prev,
          registrationsError: regError.message,
        }))
      }

      // Test 3: Check if we can access the config document
      try {
        const configRef = doc(db, "stats", "config")
        const configDoc = await getDoc(configRef)

        if (configDoc.exists()) {
          setDbInfo((prev) => ({
            ...prev,
            config: configDoc.data(),
          }))
        }
      } catch (configError) {
        console.error("Error checking config document:", configError)
      }

      setStatus("success")
    } catch (error) {
      console.error("Database connection error:", error)
      setStatus("error")
      setMessage(`Database connection error: ${error.message || "Unknown error"}`)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Database Diagnostic
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-4 w-80 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Database Diagnostic</h3>
            <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={testDatabase}
              disabled={status === "testing"}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {status === "testing" ? "Testing..." : "Test Database Connection"}
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

          {dbInfo && (
            <div className="border rounded p-3 bg-gray-50 max-h-60 overflow-auto">
              <h4 className="font-semibold mb-2">Database Info:</h4>
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(
                  dbInfo,
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

              <div className="mt-4 text-xs text-gray-600">
                <p>Database ID: (default)</p>
                <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}</p>
              </div>
            </div>
          )}

          <div className="mt-4 text-xs text-gray-500">
            <p>
              To initialize the database, visit:{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">/api/init-database?secret=YOUR_ADMIN_SECRET</code>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
