"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Plus, X, Edit, Save, Trash2, Home } from "lucide-react"
import Link from "next/link"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import GlassCard from "@/components/ui-elements/glass-card"
import { useUser } from "@/context/user-context"
import AuthWrapper from "@/components/auth-wrapper"

// Sample updates data
const initialUpdates = [
  {
    id: 1,
    title: "Dreamclerk Beta Launch",
    content:
      "We're excited to announce that Dreamclerk is now in beta! Join us as we revolutionize how students monetize their college experiences.",
    date: "April 1, 2025",
    author: "Admin User",
    important: true,
  },
  {
    id: 2,
    title: "New Features Coming Soon",
    content:
      "We're working on exciting new features including enhanced analytics, more reward options, and improved user profiles. Stay tuned!",
    date: "March 25, 2025",
    author: "Admin User",
    important: false,
  },
  {
    id: 3,
    title: "University Partnerships",
    content:
      "Dreamclerk has partnered with 5 major universities to pilot our platform. Students at these institutions will get early access and bonus rewards.",
    date: "March 15, 2025",
    author: "Admin User",
    important: true,
  },
]

export default function UpdatesPage() {
  const [updates, setUpdates] = useState(initialUpdates)
  const [isWritingMode, setIsWritingMode] = useState(false)
  const [editingUpdate, setEditingUpdate] = useState<null | number>(null)
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    content: "",
    important: false,
  })
  const { user } = useUser()

  const handleSubmitUpdate = () => {
    if (!newUpdate.title || !newUpdate.content) {
      alert("Please fill in all required fields")
      return
    }

    if (editingUpdate !== null) {
      // Edit existing update
      setUpdates(
        updates.map((update) =>
          update.id === editingUpdate
            ? {
                ...update,
                title: newUpdate.title,
                content: newUpdate.content,
                important: newUpdate.important,
              }
            : update,
        ),
      )
    } else {
      // Add new update
      const newUpdateObj = {
        id: updates.length + 1,
        title: newUpdate.title,
        content: newUpdate.content,
        important: newUpdate.important,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        author: user?.name || "Admin User",
      }

      setUpdates([newUpdateObj, ...updates])
    }

    // Reset form
    setNewUpdate({
      title: "",
      content: "",
      important: false,
    })

    setIsWritingMode(false)
    setEditingUpdate(null)
  }

  const handleEditUpdate = (update: (typeof updates)[0]) => {
    setNewUpdate({
      title: update.title,
      content: update.content,
      important: update.important,
    })
    setEditingUpdate(update.id)
    setIsWritingMode(true)
  }

  const handleDeleteUpdate = (id: number) => {
    if (confirm("Are you sure you want to delete this update?")) {
      setUpdates(updates.filter((update) => update.id !== id))
    }
  }

  return (
    <AuthWrapper requiredRoles={["admin"]}>
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
                <span className="font-medium">Admin Area</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Platform Updates</h1>

              <p className="text-lg text-gray-700 mb-8">Manage announcements and updates for Dreamclerk users.</p>

              <div className="mt-4">
                <DoodleButton
                  onClick={() => {
                    setIsWritingMode(!isWritingMode)
                    if (!isWritingMode) {
                      setEditingUpdate(null)
                      setNewUpdate({
                        title: "",
                        content: "",
                        important: false,
                      })
                    }
                  }}
                  className="inline-flex items-center"
                >
                  {isWritingMode ? (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      New Update
                    </>
                  )}
                </DoodleButton>
              </div>
            </div>
          </div>
        </DoodleBackground>

        {/* Writing Section (visible only when in writing mode) */}
        {isWritingMode && (
          <section className="py-8 px-4 md:px-6 lg:px-8 border-b-2 border-black bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Edit className="mr-2 h-5 w-5" />
                  {editingUpdate !== null ? "Edit Update" : "Create New Update"}
                </h2>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Enter update title"
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={newUpdate.title}
                      onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Content *
                    </label>
                    <textarea
                      id="content"
                      placeholder="Write your update content here"
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[150px]"
                      value={newUpdate.content}
                      onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                    />
                  </div>

                  {/* Important Flag */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="important"
                      checked={newUpdate.important}
                      onChange={(e) => setNewUpdate({ ...newUpdate, important: e.target.checked })}
                      className="h-4 w-4 border-2 border-black rounded accent-green-500"
                    />
                    <label htmlFor="important" className="ml-2 text-sm text-gray-700">
                      Mark as important update
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <DoodleButton onClick={handleSubmitUpdate} className="inline-flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      {editingUpdate !== null ? "Save Changes" : "Publish Update"}
                    </DoodleButton>
                  </div>
                </div>
              </GlassCard>
            </div>
          </section>
        )}

        {/* Updates List */}
        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {updates.length > 0 ? (
              <div className="space-y-6">
                {updates.map((update, index) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DoodleCard className={`p-6 ${update.important ? "border-green-500 border-2" : ""}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{update.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <div className="flex items-center mr-4">
                              <User className="h-3 w-3 mr-1" />
                              {update.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {update.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUpdate(update)}
                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUpdate(update.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{update.content}</p>
                      {update.important && (
                        <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Important Update
                        </div>
                      )}
                    </DoodleCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">No updates yet</h3>
                <p className="text-gray-600 mb-6">Create your first platform update to keep users informed.</p>
                <DoodleButton onClick={() => setIsWritingMode(true)} className="inline-flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  New Update
                </DoodleButton>
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthWrapper>
  )
}
