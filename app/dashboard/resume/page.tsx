"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Plus } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ResumeBuilderPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"resume" | "cover-letter">("resume")
  const [resumes, setResumes] = useState<any[]>([])
  const [coverLetters, setCoverLetters] = useState<any[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateNew = () => {
    setIsCreating(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Resume & Cover Letter Builder</h1>
            </div>
            <DoodleButton onClick={handleCreateNew} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </DoodleButton>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "resume" ? "bg-white text-black shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Resumes
          </button>
          <button
            onClick={() => setActiveTab("cover-letter")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "cover-letter" ? "bg-white text-black shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Cover Letters
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCreating ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DoodleCard className="p-8">
              <h2 className="text-xl font-bold mb-6">
                Create New {activeTab === "resume" ? "Resume" : "Cover Letter"}
              </h2>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder={`My ${activeTab === "resume" ? "Resume" : "Cover Letter"}`} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Add a description..." rows={3} />
                </div>
                <div className="flex space-x-4">
                  <DoodleButton type="submit">Create {activeTab === "resume" ? "Resume" : "Cover Letter"}</DoodleButton>
                  <DoodleButton type="button" variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </DoodleButton>
                </div>
              </form>
            </DoodleCard>
          </motion.div>
        ) : (
          <>
            {activeTab === "resume" && resumes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No resumes yet</p>
                <p className="text-gray-400 mb-8">Create your first resume to get started</p>
                <DoodleButton onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Resume
                </DoodleButton>
              </motion.div>
            )}

            {activeTab === "cover-letter" && coverLetters.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No cover letters yet</p>
                <p className="text-gray-400 mb-8">Create your first cover letter to get started</p>
                <DoodleButton onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Cover Letter
                </DoodleButton>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
