"use client"

import { useState } from "react"
import DoodleButton from "./ui-elements/doodle-button"
import DoodleCard from "./ui-elements/doodle-card"
import { Loader2, CheckCircle, AlertCircle, Database, Table, Key } from "lucide-react"
import { setupSupabase, testSupabaseConnection } from "@/app/actions/supabase-setup"

export function SupabaseSetupGuide() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [setupDetails, setSetupDetails] = useState<any>(null)

  const runSetup = async () => {
    setIsLoading(true)
    setStatus("loading")
    setMessage("Setting up Supabase database...")

    try {
      // Use the server action instead of directly accessing the environment variable
      const formData = new FormData()
      const result = await setupSupabase(formData)

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setSetupDetails(result.details)
      } else {
        setStatus("error")
        setMessage(result.error)
        setSetupDetails(result.details)
      }
    } catch (error) {
      console.error("Error setting up Supabase:", error)
      setStatus("error")
      setMessage(`Error: ${error.message || "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testConnection = async () => {
    setIsLoading(true)
    setStatus("loading")
    setMessage("Testing Supabase connection...")

    try {
      // Use the server action for testing connection
      const result = await testSupabaseConnection()

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setSetupDetails(result.details)
      } else {
        setStatus("error")
        setMessage(result.error)
        setSetupDetails(result.details)
      }
    } catch (error) {
      console.error("Error testing Supabase connection:", error)
      setStatus("error")
      setMessage(`Connection error: ${error.message || "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DoodleCard className="p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Database className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-bold">Supabase Setup Guide</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Table className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Database Tables</h3>
              <p className="text-sm text-gray-600">
                Set up required tables for profiles, registrations, and user statistics
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Key className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Database Functions</h3>
              <p className="text-sm text-gray-600">Create helper functions for user counter and other operations</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <DoodleButton onClick={runSetup} disabled={isLoading}>
            {isLoading && status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              "Set Up Database"
            )}
          </DoodleButton>

          <DoodleButton variant="outline" onClick={testConnection} disabled={isLoading}>
            {isLoading && status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              "Test Connection"
            )}
          </DoodleButton>
        </div>

        {status !== "idle" && (
          <div
            className={`p-4 rounded-md ${
              status === "success"
                ? "bg-green-50 text-green-800"
                : status === "error"
                  ? "bg-red-50 text-red-800"
                  : "bg-blue-50 text-blue-800"
            }`}
          >
            <div className="flex items-start">
              {status === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              ) : status === "error" ? (
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              ) : (
                <Loader2 className="h-5 w-5 mr-2 animate-spin flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-medium">{message}</p>
                {setupDetails && (
                  <pre className="mt-2 text-xs overflow-auto max-h-40 p-2 bg-white bg-opacity-50 rounded">
                    {JSON.stringify(setupDetails, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DoodleCard>
  )
}

export default SupabaseSetupGuide
