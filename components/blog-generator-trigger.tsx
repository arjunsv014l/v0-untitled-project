"use client"

import { useState, useEffect } from "react"
import { Loader2, Sparkles, CheckCircle, XCircle } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateBlogPosts, getTodaysPosts } from "@/app/actions/blog-actions"

export default function BlogGeneratorTrigger() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [generatedPosts, setGeneratedPosts] = useState<any[]>([])

  const handleGenerateBlogs = async () => {
    setIsGenerating(true)
    setStatus("idle")
    setMessage("")
    setGeneratedPosts([])

    try {
      const result = await generateBlogPosts()

      if (result.success) {
        setStatus("success")
        setMessage(`Successfully generated ${result.postsGenerated} blog posts!`)
        setGeneratedPosts(result.posts || [])
      } else {
        setStatus("error")
        setMessage(result.error || "Failed to generate blog posts")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error: " + (error instanceof Error ? error.message : "Unknown error"))
    } finally {
      setIsGenerating(false)
    }
  }

  const checkTodaysPosts = async () => {
    try {
      const result = await getTodaysPosts()

      if (result.success && result.postsGeneratedToday > 0) {
        setMessage(`${result.postsGeneratedToday} posts have already been generated today.`)
      }
    } catch (error) {
      console.error("Error checking today's posts:", error)
    }
  }

  // Check on component mount
  useEffect(() => {
    checkTodaysPosts()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Blog Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Generate 10 AI-powered blog posts about college life, career development, and student success.
        </p>

        <DoodleButton onClick={handleGenerateBlogs} disabled={isGenerating} className="mb-4">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Blog Posts...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Daily Blog Posts
            </>
          )}
        </DoodleButton>

        {status === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700">{message}</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{message}</p>
            </div>
          </div>
        )}

        {message && status === "idle" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <p className="text-blue-700">{message}</p>
          </div>
        )}

        {generatedPosts.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Generated Posts:</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {generatedPosts.map((post, index) => (
                <div key={post.id || index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h5 className="font-medium text-sm">{post.title}</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    {post.category} • {post.read_time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
