"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Calendar, BookOpen, Users, FileText, Bell, Zap, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function DashboardHome() {
  const { user } = useUser()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const quickLinks = [
    {
      name: "Journal",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/dashboard/journal",
      color: "bg-purple-100 text-purple-600",
      description: "Record your thoughts and track your progress",
    },
    {
      name: "Social Feed",
      icon: <Users className="w-5 h-5" />,
      href: "/dashboard/social",
      color: "bg-blue-100 text-blue-600",
      description: "Connect with other students and share updates",
    },
    {
      name: "Resume",
      icon: <FileText className="w-5 h-5" />,
      href: "/dashboard/resume",
      color: "bg-green-100 text-green-600",
      description: "Build and manage your professional resume",
    },
    {
      name: "Events",
      icon: <Calendar className="w-5 h-5" />,
      href: "/dashboard/events",
      color: "bg-yellow-100 text-yellow-600",
      description: "Discover and join campus events",
    },
  ]

  const upcomingEvents = [
    { id: 1, title: "Career Fair", date: "May 15, 2025", time: "10:00 AM - 4:00 PM", location: "University Center" },
    {
      id: 2,
      title: "Study Group: Machine Learning",
      date: "May 12, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Library Room 204",
    },
    { id: 3, title: "Resume Workshop", date: "May 20, 2025", time: "2:00 PM - 3:30 PM", location: "Career Center" },
  ]

  const notifications = [
    { id: 1, text: "Your resume has been viewed by 3 recruiters", time: "2 hours ago", read: false },
    { id: 2, text: "New career opportunity matching your profile", time: "Yesterday", read: false },
    { id: 3, text: "Emma Wilson commented on your post", time: "2 days ago", read: true },
  ]

  const recentActivity = [
    { id: 1, text: "You updated your resume", time: "2 days ago", type: "resume" },
    { id: 2, text: "You joined the Machine Learning study group", time: "1 week ago", type: "social" },
    { id: 3, text: "You completed your daily journal entry", time: "2 days ago", type: "journal" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">
          {greeting}, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600 mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link href={link.href} key={link.name} className="block">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow h-full">
                <div className={`rounded-full w-10 h-10 flex items-center justify-center mb-3 ${link.color}`}>
                  {link.icon}
                </div>
                <h3 className="font-medium text-lg">{link.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <Link href="/dashboard/events" className="text-blue-600 text-sm hover:underline flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 hover:bg-gray-50">
                <h3 className="font-medium">{event.title}</h3>
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {event.date} • {event.time}
                </div>
                <div className="text-sm text-gray-600 mt-1">{event.location}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <Link href="/dashboard/notifications" className="text-blue-600 text-sm hover:underline flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 hover:bg-gray-50 ${notification.read ? "" : "bg-blue-50"}`}>
                <div className="flex">
                  <div className={`mt-1 mr-3 ${notification.read ? "text-gray-400" : "text-blue-500"}`}>
                    {notification.read ? <Bell className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className={`${notification.read ? "text-gray-600" : "text-gray-800 font-medium"}`}>
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Link href="/dashboard/activity" className="text-blue-600 text-sm hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50">
              <div className="flex">
                <div className="mr-3">
                  {activity.type === "resume" && <FileText className="w-5 h-5 text-green-500" />}
                  {activity.type === "social" && <Users className="w-5 h-5 text-blue-500" />}
                  {activity.type === "journal" && <BookOpen className="w-5 h-5 text-purple-500" />}
                </div>
                <div>
                  <p className="text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
