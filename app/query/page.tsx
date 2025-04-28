"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Search, MessageCircle, ThumbsUp, Filter, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useState } from "react"
import AuthWrapper from "@/components/auth-wrapper"
import AskQuestionModal from "@/components/ask-question-modal"

// Sample query data
const queries = [
  {
    id: 1,
    question: "What are the best dorms for freshmen at Stanford University?",
    askedBy: "Future Cardinal",
    date: "March 18, 2025",
    category: "Campus Life",
    answers: 12,
    upvotes: 24,
    tags: ["Housing", "Freshmen", "Stanford"],
  },
  {
    id: 2,
    question: "How difficult are the computer science classes at MIT?",
    askedBy: "TechEnthusiast",
    date: "March 16, 2025",
    category: "Academics",
    answers: 8,
    upvotes: 15,
    tags: ["Computer Science", "MIT", "Course Difficulty"],
  },
  {
    id: 3,
    question: "What extracurricular activities look best on a med school application?",
    askedBy: "FutureMD",
    date: "March 15, 2025",
    category: "Career Planning",
    answers: 14,
    upvotes: 32,
    tags: ["Medical School", "Extracurriculars", "Applications"],
  },
  {
    id: 4,
    question: "How do I balance a part-time job with a full course load?",
    askedBy: "BusyStudent",
    date: "March 14, 2025",
    category: "Student Life",
    answers: 18,
    upvotes: 41,
    tags: ["Work-Life Balance", "Jobs", "Time Management"],
  },
  {
    id: 5,
    question: "What are the best study spots on NYU's campus?",
    askedBy: "NYUFreshman",
    date: "March 12, 2025",
    category: "Campus Life",
    answers: 9,
    upvotes: 17,
    tags: ["Study Spots", "NYU", "Campus"],
  },
  {
    id: 6,
    question: "How do I approach professors for research opportunities?",
    askedBy: "ResearchHopeful",
    date: "March 10, 2025",
    category: "Academics",
    answers: 11,
    upvotes: 28,
    tags: ["Research", "Professors", "Opportunities"],
  },
  {
    id: 7,
    question: "What meal plan offers the best value at UC Berkeley?",
    askedBy: "HungryBear",
    date: "March 8, 2025",
    category: "Campus Life",
    answers: 7,
    upvotes: 13,
    tags: ["Dining", "Meal Plans", "UC Berkeley"],
  },
  {
    id: 8,
    question: "How do I make friends as a transfer student?",
    askedBy: "TransferringIn",
    date: "March 6, 2025",
    category: "Social Life",
    answers: 15,
    upvotes: 36,
    tags: ["Transfer Students", "Making Friends", "Social"],
  },
]

// Categories for filtering
const categories = ["All", "Academics", "Campus Life", "Social Life", "Career Planning", "Student Life"]

// Sort options
const sortOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Upvotes", value: "upvotes" },
  { label: "Most Answers", value: "answers" },
]

export default function QueryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("recent")

  // Filter and sort queries
  const filteredQueries = queries
    .filter((query) => {
      const matchesSearch = query.question.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || query.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "upvotes") return b.upvotes - a.upvotes
      if (sortBy === "answers") return b.answers - a.answers
      // Default to recent (by id in our mock data)
      return b.id - a.id
    })

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
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
                <span className="font-medium">Community Q&A</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Ask & Answer</h1>

              <p className="text-lg text-gray-700 mb-8">
                Get authentic answers to your college questions from students who've been there.
              </p>

              <AskQuestionModal trigger={<DoodleButton size="lg">Ask a Question</DoodleButton>} />
            </div>
          </div>
        </DoodleBackground>

        {/* Search and Filter Section */}
        <section className="py-8 px-4 md:px-6 lg:px-8 border-b-2 border-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-auto flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="flex items-center mr-4">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Filter:</span>
                </div>

                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-all ${
                      selectedCategory === category ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-black rounded-lg text-sm font-medium bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Questions List */}
        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredQueries.length > 0 ? (
              <div className="space-y-6">
                {filteredQueries.map((query, index) => (
                  <motion.div
                    key={query.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <DoodleCard className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex flex-col items-center space-y-2 md:w-24">
                          <div className="flex flex-col items-center">
                            <ThumbsUp className="h-5 w-5 text-gray-600" />
                            <span className="font-bold text-lg">{query.upvotes}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <MessageCircle className="h-5 w-5 text-gray-600" />
                            <span className="font-bold text-lg">{query.answers}</span>
                          </div>
                        </div>

                        <div className="flex-grow">
                          <Link href={`/query/${query.id}`} className="block">
                            <h3 className="text-xl font-bold mb-2 hover:text-green-600 transition-colors">
                              {query.question}
                            </h3>
                          </Link>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {query.tags.map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-4">Asked by: {query.askedBy}</span>
                            <span className="mr-4">Date: {query.date}</span>
                            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{query.category}</span>
                          </div>
                        </div>

                        <div className="md:w-32 flex md:justify-end">
                          <Link href={`/query/${query.id}`}>
                            <DoodleButton size="sm">Answer</DoodleButton>
                          </Link>
                        </div>
                      </div>
                    </DoodleCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">No questions found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
                <DoodleButton
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                >
                  Reset Filters
                </DoodleButton>
              </div>
            )}
          </div>
        </section>

        {/* Ask Question CTA */}
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Don't See Your Question?</h2>
              <p className="text-gray-600 mb-8">
                Ask our community of students and get authentic answers based on real experiences.
              </p>
              <AskQuestionModal trigger={<DoodleButton size="lg">Ask a New Question</DoodleButton>} />
            </motion.div>
          </div>
        </section>
      </main>
    </AuthWrapper>
  )
}
