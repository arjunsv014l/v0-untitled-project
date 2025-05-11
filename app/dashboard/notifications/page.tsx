"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Bell, Check, Trash, Filter, ExternalLink } from "lucide-react"

interface Notification {
  id: string
  type: "social" | "academic" | "event" | "system"
  message: string
  time: string
  read: boolean
  actionUrl?: string
  sender?: {
    name: string
    avatar: string
  }
}

const demoNotifications: Notification[] = [
  {
    id: "1",
    type: "social",
    message: "Emma Wilson liked your post",
    time: "2 minutes ago",
    read: false,
    actionUrl: "/dashboard/social",
    sender: {
      name: "Emma Wilson",
      avatar: "/student-avatar.png",
    },
  },
  {
    id: "2",
    type: "social",
    message: "James Rodriguez commented on your post: 'Great insights! Would love to discuss this further.'",
    time: "1 hour ago",
    read: false,
    actionUrl: "/dashboard/social",
    sender: {
      name: "James Rodriguez",
      avatar: "/abstract-profile.png",
    },
  },
  {
    id: "3",
    type: "event",
    message: "Reminder: Career Fair is tomorrow at 10:00 AM",
    time: "3 hours ago",
    read: true,
    actionUrl: "/dashboard/events",
  },
  {
    id: "4",
    type: "academic",
    message: "Your professor posted new materials for CS 401",
    time: "Yesterday",
    read: true,
    actionUrl: "/dashboard/journal",
  },
  {
    id: "5",
    type: "system",
    message: "Your resume has been viewed by 3 recruiters this week",
    time: "2 days ago",
    read: true,
    actionUrl: "/dashboard/resume",
  },
]

export default function NotificationsPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications)
  const [filter, setFilter] = useState("all")

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const handleNavigateToAction = (actionUrl: string) => {
    console.log("Navigating to:", actionUrl)
    router.push(actionUrl)
  }

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((notification) => !notification.read)
        : notifications.filter((notification) => notification.type === filter)

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
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-600">Stay updated with your activity</p>
          </div>

          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center"
              disabled={!notifications.some((n) => !n.read)}
            >
              <Check size={18} className="mr-2" /> Mark all as read
            </button>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center"
              disabled={notifications.length === 0}
            >
              <Trash size={18} className="mr-2" /> Clear all
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
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
                  All Notifications
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "unread" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Unread
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
                  onClick={() => setFilter("academic")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "academic" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Academic
                </button>
                <button
                  onClick={() => setFilter("event")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "event" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  Events
                </button>
                <button
                  onClick={() => setFilter("system")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    filter === "system" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  System
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
                      !notification.read ? "border-l-4 border-l-blue-500" : ""
                    } ${notification.actionUrl ? "cursor-pointer" : ""}`}
                    onClick={() => {
                      if (notification.actionUrl) {
                        handleMarkAsRead(notification.id)
                        handleNavigateToAction(notification.actionUrl)
                      }
                    }}
                  >
                    <div className="flex items-start">
                      {notification.sender ? (
                        <img
                          src={notification.sender.avatar || "/placeholder.svg"}
                          alt={notification.sender.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full mr-3 bg-gray-200 flex items-center justify-center">
                          <Bell size={18} className="text-gray-500" />
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                      </div>

                      <div className="flex space-x-2 ml-2">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation() // Prevent triggering the parent div's onClick
                              handleMarkAsRead(notification.id)
                            }}
                            className="p-1 text-gray-400 hover:text-blue-500"
                            title="Mark as read"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation() // Prevent triggering the parent div's onClick
                            handleDelete(notification.id)
                          }}
                          className="p-1 text-gray-400 hover:text-red-500"
                          title="Delete"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    {notification.actionUrl && (
                      <div className="mt-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation() // Prevent triggering the parent div's onClick
                            handleNavigateToAction(notification.actionUrl!)
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-end"
                        >
                          View details <ExternalLink size={14} className="ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-5xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-gray-600">
                  {filter !== "all" ? `You don't have any ${filter} notifications` : "You're all caught up!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
