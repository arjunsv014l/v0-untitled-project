"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import AdminLayout from "@/components/admin/admin-layout"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { Users, FileText, MessageSquare, TrendingUp, Settings } from "lucide-react"

interface DashboardStats {
  totalUsers: number
  newUsersToday: number
  totalContent: number
  totalMessages: number
}

interface RecentUser {
  id: string
  name: string
  email: string
  createdAt: string
  role: string
  avatar?: string
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    newUsersToday: 0,
    totalContent: 0,
    totalMessages: 0,
  })
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch users
        const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"))
        const usersSnapshot = await getDocs(usersQuery)
        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RecentUser[]

        // Calculate today's date at midnight
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // Count new users today
        const newUsersToday = users.filter((user) => {
          const createdAt = new Date(user.createdAt)
          return createdAt >= today
        }).length

        // Fetch content count
        const contentSnapshot = await getDocs(collection(db, "content"))
        const userContentSnapshot = await getDocs(collection(db, "userContent"))

        // Fetch messages count
        const messagesQuery = query(collection(db, "chats"))
        const chatsSnapshot = await getDocs(messagesQuery)
        let totalMessages = 0

        // Count messages in each chat
        for (const chatDoc of chatsSnapshot.docs) {
          const messagesSnapshot = await getDocs(collection(db, `chats/${chatDoc.id}/messages`))
          totalMessages += messagesSnapshot.size
        }

        setStats({
          totalUsers: users.length,
          newUsersToday,
          totalContent: contentSnapshot.size + userContentSnapshot.size,
          totalMessages: totalMessages,
        })

        // Set recent users (limit to 5)
        setRecentUsers(users.slice(0, 5))
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Dreamclerk admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DoodleCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+{stats.newUsersToday} today</span>
          </div>
        </DoodleCard>

        <DoodleCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Content</p>
              <h3 className="text-2xl font-bold">{stats.totalContent}</h3>
            </div>
          </div>
        </DoodleCard>

        <DoodleCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Messages</p>
              <h3 className="text-2xl font-bold">{stats.totalMessages}</h3>
            </div>
          </div>
        </DoodleCard>

        <DoodleCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <h3 className="text-2xl font-bold">--</h3>
              <p className="text-xs text-gray-500">Coming soon</p>
            </div>
          </div>
        </DoodleCard>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Users</h2>
        <DoodleCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {user.avatar ? (
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-600 font-medium">{user.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">ID: {user.id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "editor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DoodleCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoodleCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/admin/users/new" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-gray-700" />
                <span>Add New User</span>
              </div>
            </a>
            <a
              href="/admin/content/new"
              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-gray-700" />
                <span>Create Content</span>
              </div>
            </a>
            <a href="/admin/settings" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-700" />
                <span>System Settings</span>
              </div>
            </a>
          </div>
        </DoodleCard>

        <DoodleCard className="p-6">
          <h2 className="text-xl font-bold mb-4">System Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-gray-500">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Database</span>
                <span className="text-sm text-gray-500">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">API Requests</span>
                <span className="text-sm text-gray-500">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </DoodleCard>
      </div>
    </AdminLayout>
  )
}
