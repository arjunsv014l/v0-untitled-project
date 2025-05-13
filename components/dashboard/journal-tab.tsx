"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Lock, Globe, Users, Save } from "lucide-react"

export default function JournalTab() {
  const [journalEntry, setJournalEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [privacy, setPrivacy] = useState("private")
  const [isSaving, setIsSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [journalStreak, setJournalStreak] = useState(7) // Mock data

  // Mock journal entries for the calendar visualization
  const journalDates = [
    new Date(2023, 10, 1),
    new Date(2023, 10, 2),
    new Date(2023, 10, 3),
    new Date(2023, 10, 5),
    new Date(2023, 10, 6),
    new Date(2023, 10, 7),
    new Date(2023, 10, 8),
  ]

  const moods = [
    { id: "happy", emoji: "😊", label: "Happy" },
    { id: "calm", emoji: "😌", label: "Calm" },
    { id: "sad", emoji: "😔", label: "Sad" },
    { id: "stressed", emoji: "😫", label: "Stressed" },
    { id: "excited", emoji: "🤩", label: "Excited" },
    { id: "tired", emoji: "😴", label: "Tired" },
  ]

  const privacyOptions = [
    { id: "private", icon: Lock, label: "Private" },
    { id: "public", icon: Globe, label: "Public" },
    { id: "friends", icon: Users, label: "Friends Only" },
  ]

  const handleJournalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setJournalEntry(text)
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length)
  }

  const handleSave = () => {
    if (!journalEntry.trim()) return

    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      console.log("Journal entry saved:", {
        entry: journalEntry,
        mood: selectedMood,
        privacy,
        date: new Date(),
      })
      setIsSaving(false)
      // In a real app, you would save this to the database
      // and then maybe clear the form or show a success message
    }, 1000)
  }

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const hasJournal = journalDates.some((journalDate) => journalDate.toDateString() === date.toDateString())
      const isToday = date.toDateString() === today.toDateString()

      days.push(
        <div
          key={day}
          className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
            ${hasJournal ? "bg-bw-black text-bw-white" : ""}
            ${isToday && !hasJournal ? "border border-bw-black" : ""}
          `}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-bw-black">Journal</h1>
          <p className="text-bw-gray-600">Express your thoughts and track your mood</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center">
          <Calendar size={18} className="mr-2 text-bw-gray-700" />
          <span className="font-medium">
            {journalStreak} day{journalStreak !== 1 ? "s" : ""} streak
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Journal Entry Form */}
        <div className="md:col-span-2">
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <label htmlFor="journal-entry" className="block text-sm font-medium text-bw-gray-700 mb-1">
                Today's Entry
              </label>
              <textarea
                id="journal-entry"
                value={journalEntry}
                onChange={handleJournalChange}
                placeholder="What's on your mind today?"
                rows={12}
                className="w-full p-3 border border-bw-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-bw-black"
              ></textarea>
              <div className="flex justify-between text-sm text-bw-gray-500 mt-1">
                <span>{wordCount} words</span>
                <span>Tone: {wordCount > 20 ? "Reflective" : "Neutral"}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-bw-gray-700 mb-2">How are you feeling?</label>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`flex items-center px-3 py-2 rounded-full border ${
                      selectedMood === mood.id
                        ? "border-bw-black bg-bw-black text-bw-white"
                        : "border-bw-gray-300 hover:border-bw-gray-400"
                    }`}
                  >
                    <span className="mr-1">{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-bw-gray-700 mb-2">Privacy</label>
              <div className="flex flex-wrap gap-2">
                {privacyOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPrivacy(option.id)}
                    className={`flex items-center px-3 py-2 rounded-full border ${
                      privacy === option.id
                        ? "border-bw-black bg-bw-black text-bw-white"
                        : "border-bw-gray-300 hover:border-bw-gray-400"
                    }`}
                  >
                    <option.icon size={16} className="mr-1" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={!journalEntry.trim() || isSaving}
              className="w-full flex justify-center items-center px-4 py-2 bg-bw-black text-bw-white rounded-lg hover:bg-bw-gray-800 disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {isSaving ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </div>

        {/* Journal Streak and Stats */}
        <div>
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold mb-3 text-bw-black">Journal Streak</h2>
            <div className="mb-4">
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <div className="text-xs text-bw-gray-500">S</div>
                <div className="text-xs text-bw-gray-500">M</div>
                <div className="text-xs text-bw-gray-500">T</div>
                <div className="text-xs text-bw-gray-500">W</div>
                <div className="text-xs text-bw-gray-500">T</div>
                <div className="text-xs text-bw-gray-500">F</div>
                <div className="text-xs text-bw-gray-500">S</div>
              </div>
              <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-bw-black rounded-full mr-1"></div>
                <span className="text-bw-gray-600">Entry completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 border border-bw-black rounded-full mr-1"></div>
                <span className="text-bw-gray-600">Today</span>
              </div>
            </div>
          </div>

          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3 text-bw-black">Journal Stats</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-bw-gray-600">Total Entries</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="w-full bg-bw-gray-200 rounded-full h-2">
                  <div className="bg-bw-black h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-bw-gray-600">Avg. Words</span>
                  <span className="font-medium">187</span>
                </div>
                <div className="w-full bg-bw-gray-200 rounded-full h-2">
                  <div className="bg-bw-black h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-bw-gray-600">Most Common Mood</span>
                  <span className="font-medium">Calm 😌</span>
                </div>
                <div className="w-full bg-bw-gray-200 rounded-full h-2">
                  <div className="bg-bw-black h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
