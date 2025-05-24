"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Database } from "lucide-react"

interface DiagnosticResult {
  name: string
  status: "success" | "error" | "warning"
  message: string
  details?: any
}

export default function DatabaseDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const diagnosticResults: DiagnosticResult[] = []

    // Test 1: Supabase Connection
    try {
      const { data, error } = await supabase.from("profiles").select("count", { count: "exact", head: true })
      if (error) throw error

      diagnosticResults.push({
        name: "Supabase Connection",
        status: "success",
        message: "Successfully connected to Supabase",
        details: { profileCount: data },
      })
    } catch (error) {
      diagnosticResults.push({
        name: "Supabase Connection",
        status: "error",
        message: `Failed to connect: ${error.message}`,
        details: error,
      })
    }

    // Test 2: Authentication
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      diagnosticResults.push({
        name: "Authentication System",
        status: "success",
        message: session ? "User authenticated" : "No active session (normal)",
        details: { hasSession: !!session },
      })
    } catch (error) {
      diagnosticResults.push({
        name: "Authentication System",
        status: "error",
        message: `Auth error: ${error.message}`,
        details: error,
      })
    }

    // Test 3: Profiles Table
    try {
      const { data, error } = await supabase.from("profiles").select("*").limit(1)
      if (error) throw error

      diagnosticResults.push({
        name: "Profiles Table",
        status: "success",
        message: "Profiles table accessible",
        details: { sampleData: data },
      })
    } catch (error) {
      diagnosticResults.push({
        name: "Profiles Table",
        status: "error",
        message: `Profiles table error: ${error.message}`,
        details: error,
      })
    }

    // Test 4: Stats Table
    try {
      const { data, error } = await supabase.from("stats").select("*").eq("name", "user_counter").single()
      if (error && error.code !== "PGRST116") throw error

      diagnosticResults.push({
        name: "Stats Table",
        status: data ? "success" : "warning",
        message: data ? "Stats table working" : "Stats table exists but no user counter found",
        details: { userCounter: data },
      })
    } catch (error) {
      diagnosticResults.push({
        name: "Stats Table",
        status: "error",
        message: `Stats table error: ${error.message}`,
        details: error,
      })
    }

    // Test 5: Real-time Subscriptions
    try {
      const channel = supabase.channel("test-channel")
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Timeout")), 5000)

        channel
          .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {})
          .subscribe((status) => {
            clearTimeout(timeout)
            if (status === "SUBSCRIBED") {
              resolve(true)
            } else {
              reject(new Error(`Subscription failed: ${status}`))
            }
          })
      })

      supabase.removeChannel(channel)

      diagnosticResults.push({
        name: "Real-time Subscriptions",
        status: "success",
        message: "Real-time subscriptions working",
        details: { subscriptionTest: "passed" },
      })
    } catch (error) {
      diagnosticResults.push({
        name: "Real-time Subscriptions",
        status: "warning",
        message: `Real-time test failed: ${error.message}`,
        details: error,
      })
    }

    // Test 6: Storage
    try {
      const { data, error } = await supabase.storage.listBuckets()
      if (error) throw error

      diagnosticResults.push({
        name: "Storage System",
        status: "success",
        message: "Storage system accessible",
        details: { buckets: data },
      })
    } catch (error) {
      diagnosticResults.push({
        name: "Storage System",
        status: "warning",
        message: `Storage warning: ${error.message}`,
        details: error,
      })
    }

    setResults(diagnosticResults)
    setIsRunning(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <DoodleCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Database className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Database Diagnostics</h2>
        </div>
        <DoodleButton onClick={runDiagnostics} disabled={isRunning} className="flex items-center">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
          {isRunning ? "Running..." : "Run Tests"}
        </DoodleButton>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${getStatusColor(result.status)}`}>
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">{getStatusIcon(result.status)}</div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg">{result.name}</h3>
                <p className="text-gray-700 mt-1">{result.message}</p>
                {result.details && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">View Details</summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !isRunning && (
        <div className="text-center py-8 text-gray-500">
          <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Click "Run Tests" to start diagnostics</p>
        </div>
      )}
    </DoodleCard>
  )
}
