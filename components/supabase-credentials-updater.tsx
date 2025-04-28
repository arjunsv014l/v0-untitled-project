"use client"

import { useState } from "react"
import DoodleCard from "./ui-elements/doodle-card"
import DoodleButton from "./ui-elements/doodle-button"
import { Copy, Check, ExternalLink, RefreshCw } from "lucide-react"
import { checkSupabaseConnection } from "@/lib/supabase"

export function SupabaseCredentialsUpdater() {
  const [projectUrl, setProjectUrl] = useState(process.env.NEXT_PUBLIC_SUPABASE_URL || "")
  const [anonKey, setAnonKey] = useState(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")
  const [copied, setCopied] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{
    tested: boolean
    success: boolean
    message: string
  }>({
    tested: false,
    success: false,
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const testConnection = async () => {
    if (!projectUrl || !anonKey) {
      setTestResult({
        tested: true,
        success: false,
        message: "Please enter both the project URL and anon key",
      })
      return
    }

    setIsLoading(true)

    try {
      // Store the values temporarily in localStorage for the test
      localStorage.setItem("temp_supabase_url", projectUrl)
      localStorage.setItem("temp_supabase_anon_key", anonKey)

      // Reload the page to use the new values
      window.location.href = `${window.location.origin}/debug?test=true`
    } catch (error) {
      setIsLoading(false)
      setTestResult({
        tested: true,
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  // Check if we're returning from a test
  useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const isTest = urlParams.get("test")

      if (isTest === "true") {
        const testUrl = localStorage.getItem("temp_supabase_url")
        const testKey = localStorage.getItem("temp_supabase_anon_key")

        if (testUrl && testKey) {
          setProjectUrl(testUrl)
          setAnonKey(testKey)

          // Test the connection
          const doTest = async () => {
            setIsLoading(true)
            try {
              const result = await checkSupabaseConnection()

              setTestResult({
                tested: true,
                success: result.connected,
                message: result.connected
                  ? "Connection successful! Your credentials are working."
                  : `Connection failed: ${result.error}`,
              })
            } catch (error) {
              setTestResult({
                tested: true,
                success: false,
                message: error instanceof Error ? error.message : "Unknown error occurred",
              })
            } finally {
              setIsLoading(false)

              // Clean up
              localStorage.removeItem("temp_supabase_url")
              localStorage.removeItem("temp_supabase_anon_key")

              // Remove the test param from URL
              window.history.replaceState({}, document.title, "/debug")
            }
          }

          doTest()
        }
      }
    }
  }, [])

  const getFormattedEnvVars = () => {
    return `NEXT_PUBLIC_SUPABASE_URL=${projectUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`
  }

  return (
    <DoodleCard className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Your Supabase Credentials</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Enter Your Supabase Credentials</h3>
          <p className="mb-4 text-gray-600">
            You can find these in your Supabase project dashboard under Project Settings → API.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Project URL
              </label>
              <input
                id="projectUrl"
                type="text"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://your-project-id.supabase.co"
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="anonKey" className="block text-sm font-medium text-gray-700 mb-1">
                Anon Key
              </label>
              <input
                id="anonKey"
                type="text"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="your-anon-key"
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <DoodleButton
            onClick={testConnection}
            disabled={isLoading || !projectUrl || !anonKey}
            className="flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>Test Connection</>
            )}
          </DoodleButton>

          <DoodleButton
            variant="outline"
            onClick={() => copyToClipboard(getFormattedEnvVars(), "env")}
            className="flex items-center justify-center gap-2"
            disabled={!projectUrl || !anonKey}
          >
            {copied === "env" ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Environment Variables
              </>
            )}
          </DoodleButton>
        </div>

        {testResult.tested && (
          <div
            className={`p-4 rounded-lg ${testResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            {testResult.message}
          </div>
        )}

        {projectUrl && anonKey && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Your Environment Variables</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Environment Variables</span>
                <button
                  onClick={() => copyToClipboard(getFormattedEnvVars(), "env")}
                  className="text-gray-500 hover:text-black"
                >
                  {copied === "env" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <code className="text-xs bg-white p-2 rounded border block overflow-x-auto whitespace-pre">
                {getFormattedEnvVars()}
              </code>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
          <p className="mb-2">After testing your connection:</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700">
            <li>Copy the environment variables</li>
            <li>Add them to your project's .env.local file or deployment environment</li>
            <li>Restart your development server</li>
          </ol>

          <div className="mt-4">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 hover:underline"
            >
              Go to Supabase Dashboard <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </DoodleCard>
  )
}
