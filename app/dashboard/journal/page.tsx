"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { ArrowLeft, PenTool, Calendar, Search, Plus } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

export default function JournalPage() {
  const { user } = useUser()
  const router = useRouter()
  const [entries, setEntries] = useState<any[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [newEntry, setNewEntry] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (user) {
      fetchEntries()
    }
  }, [user])

  const fetchEntries = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setEntries(data)
    }
  }

  const handleSaveEntry = async () => {
    if (!newEntry.trim() || !user) return

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: user.id,
        content: newEntry,
        mood: "neutral",
      })
      .select()
      .single()

    if (data) {
      setNewEntry("")
      setIsWriting(false)
      fetchEntries()
    }
  }

  const filteredEntries = entries.filter((entry) => entry.content.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Journal</h1>
            </div>
            <DoodleButton onClick={() => setIsWriting(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </DoodleButton>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isWriting ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DoodleCard className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">New Journal Entry</h2>
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Textarea
                placeholder="Write your thoughts..."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="w-full min-h-[300px] text-lg"
                autoFocus
              />
              <div className="flex space-x-4 mt-6">
                <DoodleButton onClick={handleSaveEntry} disabled={!newEntry.trim()}>
                  Save Entry
                </DoodleButton>
                <DoodleButton
                  variant="outline"
                  onClick={() => {
                    setIsWriting(false)
                    setNewEntry("")
                  }}
                >
                  Cancel
                </DoodleButton>
              </div>
            </DoodleCard>
          </motion.div>
        ) : (
          <>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Entries */}
            {filteredEntries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <PenTool className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  {searchQuery ? "No entries found" : "No journal entries yet"}
                </p>
                <p className="text-gray-400 mb-8">
                  {searchQuery ? "Try a different search term" : "Start writing to capture your thoughts"}
                </p>
                {!searchQuery && (
                  <DoodleButton onClick={() => setIsWriting(true)}>
                    <PenTool className="h-4 w-4 mr-2" />
                    Write First Entry
                  </DoodleButton>
                )}
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DoodleCard className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(entry.created_at).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">{entry.content}</p>
                    </DoodleCard>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
