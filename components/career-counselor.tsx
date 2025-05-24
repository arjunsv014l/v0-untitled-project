"use client"

import type React from "react"

import { useState } from "react"
import { Briefcase, Send, Sparkles } from "lucide-react"

interface StudentProfile {
  major: string
  year: string
  interests: string[]
  skills: string[]
  careerGoals: string
}

export function CareerCounselor() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // In a real app, this would come from user profile
  const studentProfile: StudentProfile = {
    major: "Computer Science",
    year: "Junior",
    interests: ["AI", "Web Development", "Startups"],
    skills: ["JavaScript", "Python", "React"],
    careerGoals: "Become a full-stack developer at a tech startup",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const res = await fetch("/api/career-counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentProfile, query }),
      })

      const data = await res.json()
      setResponse(data.choices[0]?.message?.content || "Unable to generate response")
    } catch (error) {
      console.error("Error:", error)
      setResponse("Sorry, there was an error processing your request.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-dashed border-purple-300">
        <div className="flex items-center mb-6">
          <Briefcase className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">AI Career Counselor</h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about career paths, skills to learn, job market trends..."
              className="flex-1 p-3 rounded-lg border-2 border-dashed border-purple-200 focus:outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <Send size={20} />
                  Ask
                </>
              )}
            </button>
          </div>
        </form>

        {response && (
          <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">Career Advice</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setQuery("What careers match my skills?")}
            className="p-3 bg-purple-100 rounded-lg text-purple-700 hover:bg-purple-200 transition-colors text-sm"
          >
            Career Matches
          </button>
          <button
            onClick={() => setQuery("What skills should I learn next?")}
            className="p-3 bg-pink-100 rounded-lg text-pink-700 hover:bg-pink-200 transition-colors text-sm"
          >
            Skill Recommendations
          </button>
          <button
            onClick={() => setQuery("How's the job market for my field?")}
            className="p-3 bg-indigo-100 rounded-lg text-indigo-700 hover:bg-indigo-200 transition-colors text-sm"
          >
            Market Insights
          </button>
        </div>
      </div>
    </div>
  )
}
