"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Calendar, MapPin, Clock, Plus, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  organizer: string
  attending: boolean
}

const demoEvents: Event[] = [
  {
    id: "1",
    title: "Career Fair",
    description: "Connect with over 50 companies recruiting for internships and full-time positions.",
    date: "2025-05-15",
    time: "10:00 AM - 4:00 PM",
    location: "University Center",
    category: "career",
    organizer: "Career Services",
    attending: true,
  },
  {
    id: "2",
    title: "Study Group: Advanced Algorithms",
    description: "Weekly study group to review advanced algorithms and data structures.",
    date: "2025-05-05",
    time: "6:00 PM - 8:00 PM",
    location: "Library Room 204",
    category: "academic",
    organizer: "Computer Science Club",
    attending: false,
  },
  {
    id: "3",
    title: "Campus Concert: Local Bands",
    description: "Enjoy live music from local bands on campus.",
    date: "2025-05-20",
    time: "7:00 PM - 10:00 PM",
    location: "Student Union Amphitheater",
    category: "social",
    organizer: "Student Activities Board",
    attending: true,
  },
  {
    id: "4",
    title: "Resume Workshop",
    description: "Learn how to create a standout resume for job applications.",
    date: "2025-05-10",
    time: "2:00 PM - 4:00 PM",
    location: "Career Center, Room 102",
    category: "career",
    organizer: "Career Services",
    attending: false,
  },
  {
    id: "5",
    title: "Intramural Soccer Tournament",
    description: "Join or watch the annual intramural soccer tournament.",
    date: "2025-05-22",
    time: "1:00 PM - 5:00 PM",
    location: "Campus Recreation Fields",
    category: "sports",
    organizer: "Campus Recreation",
    attending: false,
  },
]

export default function EventsPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>(demoEvents)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isCreating, setIsCreating] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "academic",
  })

  const handleAttendance = (id: string) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, attending: !event.attending } : event)))
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) return

    const createdEvent: Event = {
      id: Date.now().toString(),
      title: newEvent.title || "",
      description: newEvent.description || "",
      date: newEvent.date || "",
      time: newEvent.time || "",
      location: newEvent.location || "",
      category: newEvent.category || "academic",
      organizer: user?.name || "Anonymous",
      attending: true,
    }

    setEvents([createdEvent, ...events])
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "academic",
    })
    setIsCreating(false)
  }

  const filteredEvents = events
    .filter((event) => {
      if (filter === "all") return true
      if (filter === "attending") return event.attending
      return event.category === filter
    })
    .filter((event) => {
      if (!searchQuery) return true
      return (
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 border border-gray-100"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const eventsOnDay = events.filter((event) => event.date === date)

      days.push(
        <div
          key={day}
          className={`h-10 border border-gray-100 p-1 relative ${eventsOnDay.length > 0 ? "bg-blue-50" : ""}`}
        >
          <span className="text-sm">{day}</span>
          {eventsOnDay.length > 0 && <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>}
        </div>,
      )
    }

    return days
  }

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
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-gray-600">Discover and join campus events</p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus size={18} className="mr-2" /> {isCreating ? "Cancel" : "Create Event"}
            </button>
          </div>
        </div>

        {/* Create Event Form */}
        {isCreating && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title*
                </label>
                <input
                  type="text"
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Describe your event"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time*
                  </label>
                  <input
                    type="text"
                    id="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., 3:00 PM - 5:00 PM"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter event location"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="academic">Academic</option>
                  <option value="career">Career</option>
                  <option value="social">Social</option>
                  <option value="sports">Sports</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateEvent}
                  className="px-4 py-2 bg-black text-white rounded-md flex items-center"
                  disabled={!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-lg font-medium">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h2>
                <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mt-6">
              <div className="flex items-center mb-4">
                <Filter size={18} className="mr-2 text-gray-500" />
                <h3 className="text-lg font-medium">Filters</h3>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "all" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilter("attending")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "attending" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Attending
                </button>
                <button
                  onClick={() => setFilter("academic")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "academic" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Academic
                </button>
                <button
                  onClick={() => setFilter("career")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "career" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Career
                </button>
                <button
                  onClick={() => setFilter("social")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "social" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Social
                </button>
                <button
                  onClick={() => setFilter("sports")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "sports" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Sports
                </button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full capitalize ${
                          event.category === "academic"
                            ? "bg-blue-100 text-blue-800"
                            : event.category === "career"
                              ? "bg-purple-100 text-purple-800"
                              : event.category === "social"
                                ? "bg-green-100 text-green-800"
                                : event.category === "sports"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>

                    <p className="text-gray-600 mt-2">{event.description}</p>

                    <div className="mt-3 space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Organized by: {event.organizer}</span>
                      <button
                        onClick={() => handleAttendance(event.id)}
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          event.attending
                            ? "bg-black text-white"
                            : "bg-white text-black border border-black hover:bg-gray-100"
                        }`}
                      >
                        {event.attending ? "Attending" : "Attend"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="text-5xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-gray-600 mb-6">
                    {filter !== "all"
                      ? `No ${filter} events found. Try changing your filter.`
                      : searchQuery
                        ? `No events matching "${searchQuery}". Try a different search term.`
                        : "There are no events scheduled. Create one to get started!"}
                  </p>
                  <button
                    onClick={() => {
                      setFilter("all")
                      setSearchQuery("")
                      setIsCreating(true)
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                  >
                    <Plus size={18} className="mr-2" /> Create Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
