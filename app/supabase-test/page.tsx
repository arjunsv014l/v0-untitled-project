"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { createNotification } from "@/lib/supabase-db"
import { useUser } from "@/context/user-context"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DatabaseDiagnostic from "@/components/database-diagnostic"
import NotificationCenter from "@/components/notification-center"

export default function SupabaseTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const testUserCounter = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc("increment_user_count")

      if (error) throw error

      setResult({
        success: true,
        message: "User counter incremented successfully",
        data: { newCount: data },
      })
    } catch (error) {
      console.error("Error testing user counter:", error)
      setResult({
        success: false,
        message: "Error incrementing user counter",
        error,
      })
    } finally {
      setLoading(false)
    }
  }

  const testCreateNotification = async () => {
    if (!user) {
      setResult({
        success: false,
        message: "You must be logged in to create notifications",
      })
      return
    }

    setLoading(true)
    try {
      await createNotification(
        user.id,
        "Test Notification",
        "This is a test notification created from the Supabase test page.",
        "info",
      )

      setResult({
        success: true,
        message: "Notification created successfully",
      })
    } catch (error) {
      console.error("Error creating notification:", error)
      setResult({
        success: false,
        message: "Error creating notification",
        error,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pt-20 px-4 md:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Supabase Integration Test</h1>
            <p className="text-gray-600">Test your Supabase integration and database functionality</p>
          </div>
          <NotificationCenter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <DoodleCard className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Test Functions</h2>
              <div className="space-y-4">
                <div>
                  <DoodleButton onClick={testUserCounter} disabled={loading} className="w-full">
                    {loading ? "Testing..." : "Test User Counter Increment"}
                  </DoodleButton>
                </div>

                <div>
                  <DoodleButton onClick={testCreateNotification} disabled={loading || !user} className="w-full">
                    {loading ? "Creating..." : "Create Test Notification"}
                  </DoodleButton>
                  {!user && <p className="text-sm text-red-500 mt-1">You must be logged in to create notifications</p>}
                </div>
              </div>

              {result && (
                <div className={`mt-6 p-4 rounded-lg ${result.success ? "bg-green-50" : "bg-red-50"}`}>
                  <h3 className={`font-bold ${result.success ? "text-green-700" : "text-red-700"}`}>
                    {result.success ? "Success" : "Error"}
                  </h3>
                  <p className="mt-1">{result.message}</p>
                  {result.data && (
                    <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </DoodleCard>

            <DoodleCard className="p-6">
              <h2 className="text-xl font-bold mb-4">User Information</h2>
              {user ? (
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-medium">{user.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium mb-2">User Details</h4>
                    <pre className="p-2 bg-gray-50 rounded text-xs overflow-auto">{JSON.stringify(user, null, 2)}</pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Please log in to view your user information</p>
                </div>
              )}
            </DoodleCard>
          </div>

          <div>
            <DatabaseDiagnostic />
          </div>
        </div>
      </div>
    </main>
  )
}
