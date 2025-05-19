"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"

export default function FirebaseTest() {
  const { user } = useUser()
  const [testResult, setTestResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [testData, setTestData] = useState<any[]>([])

  // Test writing to Firestore
  const testWrite = async () => {
    if (!user) {
      setTestResult("Please sign in first")
      return
    }

    setIsLoading(true)
    setTestResult("")

    try {
      // Try to write to a test collection
      const testCollection = collection(db, "test_collection")
      const docRef = await addDoc(testCollection, {
        message: "Test message",
        userId: user.id,
        timestamp: new Date().toISOString(),
      })

      setTestResult(`Successfully wrote to Firestore! Document ID: ${docRef.id}`)

      // Fetch the test data
      await fetchTestData()
    } catch (error) {
      console.error("Error writing to Firestore:", error)
      setTestResult(`Error writing to Firestore: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Test writing to user document
  const testUserWrite = async () => {
    if (!user) {
      setTestResult("Please sign in first")
      return
    }

    setIsLoading(true)
    setTestResult("")

    try {
      // Try to write to the user's document
      const userDocRef = doc(db, "users", user.id)

      // First check if the document exists
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        // Update existing document
        await setDoc(
          userDocRef,
          {
            testField: "This is a test update",
            lastUpdated: new Date().toISOString(),
          },
          { merge: true },
        )
      } else {
        // Create new document
        await setDoc(userDocRef, {
          name: user.name,
          email: user.email,
          testField: "This is a test creation",
          createdAt: new Date().toISOString(),
        })
      }

      setTestResult(`Successfully wrote to user document!`)

      // Fetch the user document to verify
      const updatedDoc = await getDoc(userDocRef)
      if (updatedDoc.exists()) {
        setTestResult((prev) => `${prev}\nUser document data: ${JSON.stringify(updatedDoc.data(), null, 2)}`)
      }
    } catch (error) {
      console.error("Error writing to user document:", error)
      setTestResult(`Error writing to user document: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch test data
  const fetchTestData = async () => {
    try {
      const testCollection = collection(db, "test_collection")
      const querySnapshot = await getDocs(testCollection)

      const data: any[] = []
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      })

      setTestData(data)
    } catch (error) {
      console.error("Error fetching test data:", error)
    }
  }

  // Fetch test data on component mount
  useEffect(() => {
    fetchTestData()
  }, [])

  return (
    <DoodleCard className="p-6">
      <h2 className="text-2xl font-bold mb-4">Firebase Firestore Test</h2>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <DoodleButton onClick={testWrite} disabled={isLoading}>
            {isLoading ? "Testing..." : "Test Write to Collection"}
          </DoodleButton>

          <DoodleButton onClick={testUserWrite} disabled={isLoading}>
            {isLoading ? "Testing..." : "Test Write to User Document"}
          </DoodleButton>

          <DoodleButton onClick={fetchTestData} disabled={isLoading}>
            Refresh Test Data
          </DoodleButton>
        </div>

        {testResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg border-2 border-black">
            <pre className="whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}

        {testData.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Test Collection Data:</h3>
            <div className="bg-gray-100 p-4 rounded-lg border-2 border-black max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{JSON.stringify(testData, null, 2)}</pre>
            </div>
          </div>
        )}

        {!user && (
          <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg border-2 border-yellow-400">
            Please sign in to test Firestore functionality.
          </div>
        )}
      </div>
    </DoodleCard>
  )
}
