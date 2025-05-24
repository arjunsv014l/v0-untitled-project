"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import UserCounterWidget from "@/components/user-counter-widget"
import { incrementUserCount } from "@/components/user-counter-widget"

export default function CounterTestPage() {
  const [isIncrementing, setIsIncrementing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleIncrementCounter = async () => {
    try {
      setIsIncrementing(true)
      setResult(null)

      const newCount = await incrementUserCount()

      setResult(`Counter incremented successfully! New count: ${newCount}`)
    } catch (error) {
      console.error("Error incrementing counter:", error)
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsIncrementing(false)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">User Counter Test</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Current User Count</h2>
        <div className="mb-6">
          <UserCounterWidget />
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleIncrementCounter}
            disabled={isIncrementing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isIncrementing ? "Incrementing..." : "Manually Increment Counter"}
          </Button>

          {result && (
            <div
              className={`p-3 rounded ${result.includes("Error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
            >
              {result}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>The counter starts at 500 as the base value</li>
          <li>When a new user registers, it increments from 500 to 501, etc.</li>
          <li>The counter refreshes automatically from the database</li>
          <li>Real-time updates are enabled via Supabase subscriptions</li>
          <li>Fallback mechanisms are in place for offline usage</li>
          <li>The counter refreshes when the page becomes visible again</li>
        </ul>
      </div>
    </div>
  )
}
