"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Send, Tag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"

interface AskQuestionModalProps {
  trigger: React.ReactNode
}

export default function AskQuestionModal({ trigger }: AskQuestionModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("Academics")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [error, setError] = useState("")
  const { user } = useUser()
  const router = useRouter()

  const closeModal = useCallback(() => {
    setIsOpen(false)
    // Reset form
    setQuestion("")
    setCategory("Academics")
    setTags([])
    setCurrentTag("")
    setError("")
  }, [])

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!question.trim()) {
      setError("Please enter your question")
      return
    }

    if (tags.length === 0) {
      setError("Please add at least one tag")
      return
    }

    // In a real app, this would send the question to the server
    // For now, we'll just simulate success and redirect

    // Close the modal
    closeModal()

    // Redirect to the questions page
    router.push("/query")

    // Show success message
    alert("Your question has been submitted successfully!")
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open === false) {
          closeModal()
        } else {
          setIsOpen(open)
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 border-none bg-transparent shadow-2xl">
        <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
          {/* Larger, more touch-friendly close button */}
          <div
            className="absolute top-3 right-3 z-20 cursor-pointer touch-manipulation"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              closeModal()
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 shadow-sm">
              <X className="h-6 w-6" />
            </div>
          </div>

          {/* Colorful background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-300 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 rounded-full transform -translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key="ask-question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-5 relative z-10"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-black">Ask a Question</h2>
                <p className="text-gray-600 mt-2">Get answers from students who've been there</p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

              <form onSubmit={handleSubmitQuestion} className="space-y-3">
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-0.5">
                    Your Question *
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-h-[80px]"
                    placeholder="What would you like to know about college life?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-0.5">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    required
                  >
                    <option value="Academics">Academics</option>
                    <option value="Campus Life">Campus Life</option>
                    <option value="Social Life">Social Life</option>
                    <option value="Career Planning">Career Planning</option>
                    <option value="Student Life">Student Life</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-0.5">
                    Tags *
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="tags"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-grow px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Add tags (e.g., Housing, MIT, Freshmen)"
                    />
                    <Button type="button" onClick={handleAddTag} className="ml-2 bg-black hover:bg-gray-800 text-white">
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-sm text-gray-700">{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Press Enter to add a tag</p>
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Question</span>
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
