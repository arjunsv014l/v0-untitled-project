"use client"

import { useState } from "react"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { testBlogGeneration } from "@/app/actions/blog-actions"

export default function TestBlogAIPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTestGeneration = async () => {
    setIsGenerating(true)
    setError(null)
    setTestResult(null)

    try {
      const result = await testBlogGeneration()

      if (result.success) {
        setTestResult(result)
      } else {
        setError(result.error || "Failed to generate test post")
      }
    } catch (err) {
      setError("Network error: " + (err instanceof Error ? err.message : "Unknown error"))
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Test Blog AI Generation</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>OpenRouter AI Integration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Click the button below to test if the OpenRouter AI integration is working correctly. This will generate a
            single test blog post.
          </p>

          <DoodleButton onClick={handleTestGeneration} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Test Post...
              </>
            ) : (
              "Generate Test Post"
            )}
          </DoodleButton>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {testResult && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-green-700 font-medium">Test post generated successfully!</p>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{testResult.title}</h3>
                <p className="text-gray-600 mb-4">{testResult.excerpt}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Category: {testResult.category}</span>
                  <span>Read time: {testResult.readTime}</span>
                </div>
              </div>

              <details className="border-2 border-gray-200 rounded-lg p-4">
                <summary className="cursor-pointer font-medium">View Full Content</summary>
                <div
                  className="mt-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: testResult.content }}
                />
              </details>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>OpenRouter API Key</span>
              <span
                className={process.env.NEXT_PUBLIC_OPENROUTER_CONFIGURED === "true" ? "text-green-600" : "text-red-600"}
              >
                {process.env.NEXT_PUBLIC_OPENROUTER_CONFIGURED === "true" ? "Configured" : "Not Configured"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
