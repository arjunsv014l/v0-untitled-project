"use client"

import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Award, Calendar, Clock, FileText, Filter, MessageCircle, Search } from "lucide-react"

interface Activity {
  id: string
  type: "journal" | "resume" | "social" | "achievement"
  title: string
  description: string
  timestamp: string
  icon: any
}

const demoActivities: Activity[] = [
  {
    id: "1",
    type: "journal",
    title: "Journal Entry",
    description: "You completed your daily journal entry",
    timestamp: "2024-05-02T10:30:00.000Z",
    icon: Calendar,
  },
  {
    id: "2",
    type: "resume",
    title: "Resume Update",
    description: "You updated your resume skills section",
    timestamp: "2024-05-01T15:45:00.000Z",
    icon: FileText,
  },
  {
    id: "3",
    type: "social",
    title: "Post Engagement",
    description: "Your post received 15 likes",
    timestamp: "2024-04-30T08:20:00.000Z",
    icon: MessageCircle,
  },
  {
    id: "4",
    type: "achievement",
    title: "Badge Earned",
    description: "You earned the 'Consistent Writer' badge",
    timestamp: "2024-04-29T14:15:00.000Z",
    icon: Award,
  },
  {
    id: "5",
    type: "journal",
    title: "Journal Entry",
    description: "You completed your daily journal entry",
    timestamp: "2024-04-29T09:30:00.000Z",
    icon: Calendar,
  },
  {
    id: "6",
    type: "social",
    title: "New Comment",
    description: "Someone commented on your post",
    timestamp: "2024-04-28T17:10:00.000Z",
    icon: MessageCircle,
  },
  {
    id: "7",
    type: "resume",
    title: "Resume View",
    description: "A recruiter viewed your resume",
    timestamp: "2024-04-27T11:45:00.000Z",
    icon: FileText,
  },
  {
    id: "8",
    type: "achievement",
    title: "Badge Earned",
    description: "You earned the 'Resume Master' badge",
    timestamp: "2024-04-26T13:20:00.000Z",
    icon: Award,
  },
]

export default function ActivityPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

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

  // Format timestamp to relative time
  const getRelativeTime = (timestamp: string) => {
    const now = new Date()
    const date = new Date(timestamp)
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) return `${interval} year${interval === 1 ? "" : "s"} ago`

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) return `${interval} month${interval === 1 ? "" : "s"} ago`

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) return `${interval} day${interval === 1 ? "" : "s"} ago`

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) return `${interval} hour${interval === 1 ? "" : "s"} ago`

    interval = Math.floor(seconds / 60)
    if (interval >= 1) return `${interval} minute${interval === 1 ? "" : "s"} ago`

    return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`
  }

  // Get icon background color based on activity type
  const getIconBgColor = (type: string) => {
    switch (type) {
      case "journal":
        return "bg-blue-100 text-blue-600"
      case "resume":
        return "bg-green-100 text-green-600"
      case "social":
        return "bg-purple-100 text-purple-600"
      case "achievement":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <DashboardLayout activeSection="home">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Activity History</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={18} className="mr-2" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-6 bottom-10 w-0.5 bg-gray-200"></div>

          <div className="space-y-8">
            {demoActivities.map((activity) => (
              <div key={activity.id} className="relative flex items-start">
                {/* Icon */}
                <div
                  className={`relative z-10 mr-4 w-12 h-12 rounded-full flex items-center justify-center ${getIconBgColor(activity.type)}`}
                >
                  <activity.icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-medium">{activity.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 sm:mt-0">
                      <Clock size={14} className="mr-1" />
                      <span>{getRelativeTime(activity.timestamp)}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
