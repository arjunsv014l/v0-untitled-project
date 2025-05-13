"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/context/user-context"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Calendar, Clock, Edit, Plus, Save, Star, Trash, Lock, Globe, Users, Smile, Frown, Meh } from "lucide-react"

interface JournalEntry {
  id: string
  date: string
  title: string
  content: string
  mood: string
  wordCount: number
  privacy: "private" | "friends" | "public"
  starred: boolean
}

const demoEntries: JournalEntry[] = [
  {
    id: "1",
    date: "2025-05-01",
    title: "Productive Day",
    content:
      "Today I finished my research paper and submitted it ahead of schedule. I'm feeling really good about the quality of my work and the professor seemed impressed with my initial draft. I'm hoping to get a good grade on this one!",
    mood: "happy",
    wordCount: 42,
    privacy: "private",
    starred: true,
  },
  {
    id: "2",
    date: "2025-04-30",
    title: "Study Group",
    content:
      "Met with my study group to prepare for finals. We covered a lot of material and I feel much more confident about the upcoming exams. We're planning to meet again on Friday to go over the remaining topics.",
    mood: "focused",
    wordCount: 35,
    privacy: "friends",
    starred: false,
  },
  {
    id: "3",
    date: "2025-04-28",
    title: "Job Application",
    content:
      "Applied for a summer internship at a tech company. Fingers crossed! The application process was quite thorough, but I think my resume and cover letter were strong. I should hear back within two weeks.",
    mood: "anxious",
    wordCount: 31,
    privacy: "public",
    starred: true,
  },
]

export default function JournalPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [entries, setEntries] = useState<JournalEntry[]>(demoEntries)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("neutral")
  const [privacy, setPrivacy] = useState<"private" | "friends" | "public">("private")
  const [isCreating, setIsCreating] = useState(false)
  const [filter, setFilter] = useState("all")
  const [wordCount, setWordCount] = useState(0)
  const [streakCount, setStreakCount] = useState(7)

  // Check if we should open the new entry form
  useEffect(() => {
    if (searchParams?.get("new") === "true") {
      setIsCreating(true)
    }
  }, [searchParams])

  // Calculate word count when content changes
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length
    setWordCount(words)
  }, [content])

  const handleStarEntry = (id: string) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, starred: !entry.starred } : entry)))
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const handleCreateEntry = () => {
    if (!title.trim() || !content.trim()) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      title,
      content,
      mood,
      wordCount,
      privacy,
      starred: false,
    }

    setEntries([newEntry, ...entries])
    setTitle("")
    setContent("")
    setMood("neutral")
    setPrivacy("private")
    setIsCreating(false)
  }

  const handleUpdateEntry = () => {
    if (!editingEntry || !title.trim() || !content.trim()) return

    setEntries(
      entries.map((entry) =>
        entry.id === editingEntry.id ? { ...entry, title, content, mood, privacy, wordCount } : entry,
      ),
    )

    setEditingEntry(null)
    setTitle("")
    setContent("")
    setMood("neutral")
    setPrivacy("private")
  }

  const startEditing = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setTitle(entry.title)
    setContent(entry.content)
    setMood(entry.mood)
    setPrivacy(entry.privacy)
  }

  const cancelEditing = () => {
    setEditingEntry(null)
    setTitle("")
    setContent("")
    setMood("neutral")
    setPrivacy("private")
    setIsCreating(false)
  }

  const moodEmojis: Record<string, string> = {
    happy: "😊",
    sad: "😔",
    anxious: "😰",
    focused: "🧐",
    tired: "😴",
    excited: "😃",
    neutral: "😐",
  }

  const privacyIcons = {
    private: <Lock size={16} />,
    friends: <Users size={16} />,
    public: <Globe size={16} />,
  }

  const filteredEntries =
    filter === "all"
      ? entries
      : filter === "starred"
        ? entries.filter((entry) => entry.starred)
        : entries.filter((entry) => entry.mood === filter)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-black border-r-gray-300 border-b-gray-300 border-l-gray-300 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    router.push("/")
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Journal</h1>
            <p className="text-gray-600">Track your thoughts and progress</p>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <div className="mr-4 flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <Calendar size={16} className="mr-1" />
              <span className="font-medium">{streakCount} day streak</span>
            </div>

            {!isCreating && !editingEntry && (
              <button
                onClick={() => setIsCreating(true)}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus size={18} className="mr-2" /> New Entry
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            All Entries
          </button>
          <button
            onClick={() => setFilter("starred")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              filter === "starred" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <Star size={14} className="mr-1" /> Starred
          </button>
          <button
            onClick={() => setFilter("happy")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              filter === "happy" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <Smile size={14} className="mr-1" /> Happy
          </button>
          <button
            onClick={() => setFilter("sad")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              filter === "sad" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <Frown size={14} className="mr-1" /> Sad
          </button>
          <button
            onClick={() => setFilter("anxious")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              filter === "anxious" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <Meh size={14} className="mr-1" /> Anxious
          </button>
        </div>

        {/* Entry Form */}
        {(isCreating || editingEntry) && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">{editingEntry ? "Edit Entry" : "New Entry"}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="What's on your mind?"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Write your thoughts..."
                ></textarea>
                <div className="text-sm text-gray-500 mt-1">Word count: {wordCount}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(moodEmojis).map(([key, emoji]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMood(key)}
                        className={`w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 ${
                          mood === key ? "border-black" : "border-transparent bg-gray-100"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Privacy</label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setPrivacy("private")}
                      className={`px-3 py-2 rounded-md flex items-center ${
                        privacy === "private" ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Lock size={16} className="mr-2" /> Private
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrivacy("friends")}
                      className={`px-3 py-2 rounded-md flex items-center ${
                        privacy === "friends" ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Users size={16} className="mr-2" /> Friends
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrivacy("public")}
                      className={`px-3 py-2 rounded-md flex items-center ${
                        privacy === "public" ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Globe size={16} className="mr-2" /> Public
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editingEntry ? handleUpdateEntry : handleCreateEntry}
                  className="px-4 py-2 bg-black text-white rounded-md flex items-center"
                  disabled={!title || !content}
                >
                  <Save size={18} className="mr-2" />
                  {editingEntry ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Journal Entries List */}
        <div className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span>
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <Clock size={14} className="ml-4 mr-1" />
                    <span>
                      {new Date(entry.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="ml-4 flex items-center">
                      {privacyIcons[entry.privacy]}
                      <span className="ml-1 capitalize">{entry.privacy}</span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStarEntry(entry.id)}
                      className={`p-1 rounded-full ${entry.starred ? "text-yellow-500" : "text-gray-400"}`}
                    >
                      <Star size={16} fill={entry.starred ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => startEditing(entry)}
                      className="p-1 rounded-full text-gray-400 hover:text-black"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-red-500"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-2 flex items-center">
                  <span className="text-2xl mr-3">{moodEmojis[entry.mood] || moodEmojis.neutral}</span>
                  <h3 className="text-xl font-semibold">{entry.title}</h3>
                </div>

                <p className="mt-3 text-gray-700 whitespace-pre-wrap">{entry.content}</p>

                <div className="mt-3 text-sm text-gray-500">{entry.wordCount} words</div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No journal entries found</h3>
              <p className="text-gray-600 mb-6">
                {filter === "all"
                  ? "Start journaling to track your thoughts and progress"
                  : filter === "starred"
                    ? "Star your favorite entries to find them here"
                    : `No entries with ${filter} mood`}
              </p>
              {filter !== "all" ? (
                <button
                  onClick={() => setFilter("all")}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Show all entries
                </button>
              ) : (
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-black text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                >
                  <Plus size={18} className="mr-2" /> Create First Entry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
