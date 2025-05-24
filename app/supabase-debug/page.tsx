"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/context/user-context"
import SupabaseSetupGuide from "@/components/supabase-setup-guide"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { Loader2 } from "lucide-react"

export default function SupabaseDebugPage() {
  const { user } = useUser()
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "error">("checking")
  const [userCount, setUserCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<string | null>(null)

  useEffect(() => {
    checkSupabaseConnection()
  }, [])

  const checkSupabaseConnection = async () => {
    try {
      setDbStatus("checking")
      setError(null)

      // Test connection by querying the stats table
      const { data, error } = await supabase.from("stats").select("*").eq("name", "user_counter").single()

      if (error) {
        if (error.code === "PGRST116") {
          setDbStatus("connected")
          setUserCount(0)
          setTestResult("Connected to Supabase, but user_counter not found. Database may need initialization.")
        } else {
          throw error
        }
      } else {
        setDbStatus("connected")
        setUserCount(data.count)
        setTestResult("Successfully connected to Supabase and found user counter.")
      }
    } catch (err) {
      console.error("Supabase connection error:", err)
      setDbStatus("error")
      setError(`Connection error: ${err.message || "Unknown error"}`)
    }
  }

  const incrementCounter = async () => {
    try {
      setTestResult("Incrementing user counter...")
      const { data, error } = await supabase.rpc("increment_user_count")

      if (error) {
        throw error
      }

      setUserCount(data)
      setTestResult(`Successfully incremented user counter to ${data}`)
    } catch (err) {
      console.error("Error incrementing counter:", err)
      setError(`Error: ${err.message || "Unknown error"}`)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Supabase Debug Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoodleCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Connection Status</h2>

          {dbStatus === "checking" ? (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Checking connection...</span>
            </div>
          ) : dbStatus === "connected" ? (
            <div className="text-green-600 font-medium">✅ Connected to Supabase</div>
          ) : (
            <div className="text-red-600 font-medium">❌ Connection error</div>
          )}

          {error && <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

          {testResult && <div className="mt-2 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">{testResult}</div>}

          <div className="mt-4">
            <DoodleButton onClick={checkSupabaseConnection} className="mr-3">
              Test Connection
            </DoodleButton>

            {dbStatus === "connected" && (
              <DoodleButton onClick={incrementCounter} variant="outline">
                Increment Counter
              </DoodleButton>
            )}
          </div>

          {userCount !== null && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <h3 className="font-medium text-green-800">Current User Count</h3>
              <p className="text-2xl font-bold text-green-700">{userCount.toLocaleString()}</p>
            </div>
          )}
        </DoodleCard>

        <SupabaseSetupGuide />
      </div>

      <div className="mt-6">
        <DoodleCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Current User</h2>
          {user ? (
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">{JSON.stringify(user, null, 2)}</pre>
          ) : (
            <p>No user logged in</p>
          )}
        </DoodleCard>
      </div>
    </div>
  )
}
