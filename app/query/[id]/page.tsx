"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ThumbsUp, MessageCircle, Send, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useUser } from "@/context/user-context"
import AuthWrapper from "@/components/auth-wrapper"

// Sample query data
const queries = [
  {
    id: "1",
    question: "What are the best dorms for freshmen at Stanford University?",
    askedBy: "Future Cardinal",
    date: "March 18, 2025",
    category: "Campus Life",
    answers: [
      {
        id: 1,
        text: "I'd recommend Stern Hall or Wilbur Hall for freshmen. They have a great community vibe and are close to dining halls. Stern has more modern amenities, while Wilbur has a stronger social scene. Both have resident assistants who organize events to help you meet people.",
        answeredBy: "Stanford Senior",
        date: "March 19, 2025",
        upvotes: 15,
      },
      {
        id: 2,
        text: "Florence Moore Hall (FloMo) is also a great option! The rooms are slightly larger than other dorms, and it has its own dining hall with some of the best food on campus. It's a bit further from the main quad but still walkable.",
        answeredBy: "Cardinal Alum",
        date: "March 20, 2025",
        upvotes: 8,
      },
    ],
    upvotes: 24,
    tags: ["Housing", "Freshmen", "Stanford"],
  },
  {
    id: "2",
    question: "How difficult are the computer science classes at MIT?",
    askedBy: "TechEnthusiast",
    date: "March 16, 2025",
    category: "Academics",
    answers: [
      {
        id: 1,
        text: "MIT CS classes are challenging but incredibly rewarding. The intro course (6.0001) is manageable if you put in the work, but courses like 6.006 (Algorithms) and 6.004 (Computer Architecture) require significant time commitment. Expect to spend 15-20 hours per week on assignments for the more advanced courses.",
        answeredBy: "MIT Junior",
        date: "March 17, 2025",
        upvotes: 12,
      },
    ],
    upvotes: 15,
    tags: ["Computer Science", "MIT", "Course Difficulty"],
  },
  {
    id: "3",
    question: "What extracurricular activities look best on a med school application?",
    askedBy: "FutureMD",
    date: "March 15, 2025",
    category: "Career Planning",
    answers: [
      {
        id: 1,
        text: "Medical schools value clinical experience, research, and community service. Try to get hands-on experience through hospital volunteering or shadowing physicians. Research experience shows your analytical abilities, and community service demonstrates your commitment to helping others. Quality matters more than quantity - sustained involvement in fewer activities is better than brief participation in many.",
        answeredBy: "Med School Advisor",
        date: "March 16, 2025",
        upvotes: 22,
      },
      {
        id: 2,
        text: "Don't forget about leadership positions! Being a leader in a pre-med club or other organization shows initiative and management skills. Also, activities that demonstrate your ability to work in teams are highly valued, as medicine is increasingly collaborative.",
        answeredBy: "First-Year Medical Student",
        date: "March 17, 2025",
        upvotes: 18,
      },
    ],
    upvotes: 32,
    tags: ["Medical School", "Extracurriculars", "Applications"],
  },
]

export default function QueryDetailPage({ params }: { params: { id: string } }) {
  const [newAnswer, setNewAnswer] = useState("")
  const [currentQuery, setCurrentQuery] = useState(() => {
    return queries.find((q) => q.id === params.id) || queries[0]
  })
  const { user } = useUser()

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnswer.trim()) return

    const newAnswerObj = {
      id: currentQuery.answers.length + 1,
      text: newAnswer,
      answeredBy: user?.name || "Anonymous User",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      upvotes: 0,
    }

    setCurrentQuery({
      ...currentQuery,
      answers: [...currentQuery.answers, newAnswerObj],
    })
    setNewAnswer("")
  }

  const handleUpvoteAnswer = (answerId: number) => {
    setCurrentQuery({
      ...currentQuery,
      answers: currentQuery.answers.map((answer) =>
        answer.id === answerId ? { ...answer, upvotes: answer.upvotes + 1 } : answer,
      ),
    })
  }

  const handleUpvoteQuestion = () => {
    setCurrentQuery({
      ...currentQuery,
      upvotes: currentQuery.upvotes + 1,
    })
  }

  return (
    <AuthWrapper>
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <DoodleBackground className="pt-24 pb-16" density="low">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
                <Home className="h-5 w-5" />
              </Link>
              <Link href="/query" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Questions
              </Link>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
                <span className="font-medium">{currentQuery.category}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{currentQuery.question}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {currentQuery.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="mr-4">Asked by: {currentQuery.askedBy}</span>
                <span>Date: {currentQuery.date}</span>
              </div>

              <div className="flex items-center">
                <button
                  onClick={handleUpvoteQuestion}
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span className="font-medium">{currentQuery.upvotes}</span>
                </button>
                <div className="ml-4 flex items-center space-x-1 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">{currentQuery.answers.length}</span>
                </div>
              </div>
            </div>
          </div>
        </DoodleBackground>

        {/* Answers Section */}
        <section className="py-12 px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              {currentQuery.answers.length} {currentQuery.answers.length === 1 ? "Answer" : "Answers"}
            </h2>

            <div className="space-y-6 mb-12">
              {currentQuery.answers.map((answer, index) => (
                <motion.div
                  key={answer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DoodleCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">
                          {answer.answeredBy.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{answer.answeredBy}</p>
                          <p className="text-sm text-gray-500">{answer.date}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUpvoteAnswer(answer.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{answer.upvotes}</span>
                      </button>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{answer.text}</p>
                  </DoodleCard>
                </motion.div>
              ))}
            </div>

            {/* Answer Form */}
            <div className="border-t-2 border-gray-100 pt-8">
              <h3 className="text-xl font-bold mb-6">Your Answer</h3>

              <form onSubmit={handleSubmitAnswer}>
                <div className="mb-4">
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[150px]"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <DoodleButton type="submit" className="inline-flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Post Your Answer
                  </DoodleButton>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Related Questions */}
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Questions</h2>

            <div className="space-y-4">
              {queries
                .filter((q) => q.id !== params.id)
                .slice(0, 3)
                .map((query, index) => (
                  <motion.div
                    key={query.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/query/${query.id}`}>
                      <div className="bg-white border-2 border-black rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-medium hover:text-green-600 transition-colors">{query.question}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <div className="flex items-center mr-4">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{query.upvotes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span>{query.answers.length}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </AuthWrapper>
  )
}
