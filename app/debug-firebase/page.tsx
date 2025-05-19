"use client"

import { useState } from "react"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import DoodleButton from "@/components/ui-elements/doodle-button"

export default function DebugFirebase() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testFirebaseAuth = async () => {
    setLoading(true)
    setError(null)
    setResult("")

    try {
      // Generate a random email to avoid conflicts
      const randomEmail = `test${Math.floor(Math.random() * 1000000)}@example.com`
      const password = "Test123456!"

      // Log the attempt
      console.log("Testing Firebase auth with:", randomEmail)
      setResult((prev) => prev + `\nAttempting to create test user: ${randomEmail}`)

      // Try to create a user
      const userCredential = await createUserWithEmailAndPassword(auth, randomEmail, password)

      // Log success
      setResult((prev) => prev + `\nUser created successfully: ${userCredential.user.uid}`)

      // Try to write to Firestore
      try {
        await setDoc(doc(db, "test-users", userCredential.user.uid), {
          email: randomEmail,
          createdAt: new Date().toISOString(),
          testRun: true,
        })

        setResult((prev) => prev + "\nFirestore document created successfully")
      } catch (firestoreError: any) {
        setResult((prev) => prev + `\nFirestore error: ${firestoreError.message}`)
      }

      setResult((prev) => prev + "\n\nFirebase authentication is working correctly!")
    } catch (error: any) {
      console.error("Firebase test error:", error)
      setError(`Firebase error: ${error.code} - ${error.message}`)
      setResult((prev) => prev + `\nError: ${error.code} - ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Firebase Debug Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Firebase Configuration</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>
            <strong>API Key:</strong> {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>Auth Domain:</strong> {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>Project ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>Storage Bucket:</strong> {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>Messaging Sender ID:</strong>{" "}
            {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>App ID:</strong> {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "✅ Set" : "❌ Missing"}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Firebase Authentication</h2>
        <DoodleButton onClick={testFirebaseAuth} disabled={loading}>
          {loading ? "Testing..." : "Test Firebase Auth"}
        </DoodleButton>

        {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">Troubleshooting Tips</h3>
        <ul className="list-disc pl-5 text-yellow-700 space-y-1">
          <li>Make sure all Firebase environment variables are set correctly</li>
          <li>Check if your Firebase project has domain restrictions</li>
          <li>Verify that your API key doesn't have restrictions</li>
          <li>Ensure your Firebase project has Authentication enabled</li>
          <li>Check if Email/Password authentication is enabled in Firebase console</li>
          <li>Verify that your Firestore rules allow write access</li>
        </ul>
      </div>
    </div>
  )
}
