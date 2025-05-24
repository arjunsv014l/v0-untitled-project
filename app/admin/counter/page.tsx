"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function CounterAdminPage() {
  const [registrationCount, setRegistrationCount] = useState<number | null>(null)
  const [counterValue, setCounterValue] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isReconciling, setIsReconciling] = useState(false)
  const [message, setMessage] = useState("")

  // Fetch the current counts
  const fetchCounts = async () => {
    setIsLoading(true)
    try {
      // Get registration count
      const { count, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error fetching registration count:", countError)
        setMessage("Error fetching registration count")
        return
      }

      setRegistrationCount(count)

      // Get counter value
      const { data, error: statsError } = await supabase
        .from("stats")
        .select("count")
        .eq("name", "user_counter")
        .single()

      if (statsError && statsError.code !== "PGRST116") {
        console.error("Error fetching counter value:", statsError)
        setMessage("Error fetching counter value")
        return
      }

      setCounterValue(data?.count || 0)
      setMessage("")
    } catch (error) {
      console.error("Error fetching counts:", error)
      setMessage("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Reconcile the counter
  const reconcileCounter = async () => {
    setIsReconciling(true)
    try {
      const response = await fetch("/api/counter/reconcile")
      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
        await fetchCounts() // Refresh counts
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error reconciling counter:", error)
      setMessage("Failed to reconcile counter")
    } finally {
      setIsReconciling(false)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Counter Admin</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Counter Status</h2>

        {isLoading ? (
          <p>Loading counts...</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-500">Actual Registrations</h3>
                <p className="text-2xl font-bold">{registrationCount}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-500">Counter Value</h3>
                <p className="text-2xl font-bold">{counterValue}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium">Status</h3>
              {registrationCount === counterValue ? (
                <p className="text-green-600">✓ Counter is in sync with registrations</p>
              ) : (
                <p className="text-red-600">
                  ✗ Counter is out of sync (Difference: {Math.abs((counterValue || 0) - (registrationCount || 0))})
                </p>
              )}
            </div>
          </div>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded ${message.includes("Error") ? "bg-red-100" : "bg-green-100"}`}>
            {message}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={fetchCounts}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Refresh Counts
          </button>
          <button
            onClick={reconcileCounter}
            disabled={isLoading || isReconciling || registrationCount === counterValue}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isReconciling ? "Reconciling..." : "Reconcile Counter"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <p className="mb-2">
          The user counter should always match the actual number of registrations in the database. This page helps you
          verify and fix any discrepancies.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            The counter is stored in the <code>stats</code> table with <code>name="user_counter"</code>
          </li>
          <li>
            The actual user count is determined by counting rows in the <code>registrations</code> table
          </li>
          <li>
            When you click "Reconcile Counter", the system updates the counter to match the actual registration count
          </li>
        </ul>
      </div>
    </div>
  )
}
