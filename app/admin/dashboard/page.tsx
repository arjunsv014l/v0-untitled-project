"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AuthWrapper from "@/components/auth-wrapper"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleCard from "@/components/ui-elements/doodle-card"

interface UserData {
  id: string
  email: string
  name: string
  role: string
  created_at: string
  avatar_url?: string
  dob?: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)

        // Fetch users from auth.users
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

        if (authError) {
          throw authError
        }

        // Fetch profiles
        const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*")

        if (profilesError) {
          throw profilesError
        }

        // Combine the data
        const combinedData = authUsers.users.map((user) => {
          const profile = profiles?.find((p) => p.id === user.id)
          return {
            id: user.id,
            email: user.email || "No email",
            name: profile?.name || user.user_metadata?.name || "Unknown",
            role: profile?.role || "student",
            created_at: user.created_at,
            avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
            dob: profile?.dob || user.user_metadata?.dob,
          }
        })

        setUsers(combinedData)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Failed to load users. You may not have admin privileges.")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <AuthWrapper requiredRoles={["admin"]}>
      <main className="min-h-screen bg-white pt-20">
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
                <span className="font-medium">Admin Dashboard</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Registered Users</h1>

              <p className="text-lg text-gray-700 mb-8">View all registered users in the Dreamclerk platform.</p>
            </div>
          </div>
        </DoodleBackground>

        <section className="py-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : error ? (
              <DoodleCard className="p-6 text-center">
                <p className="text-red-600">{error}</p>
              </DoodleCard>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-700">Total users: {users.length}</p>

                {users.map((user) => (
                  <DoodleCard key={user.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold overflow-hidden">
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url || "/placeholder.svg"}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          user.name.charAt(0).toUpperCase()
                        )}
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                          <div className="text-gray-600">
                            <span className="font-medium">Email:</span> {user.email}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Role:</span> {user.role}
                          </div>
                          {user.dob && (
                            <div className="text-gray-600">
                              <span className="font-medium">DOB:</span> {user.dob}
                            </div>
                          )}
                          <div className="text-gray-600">
                            <span className="font-medium">Joined:</span>{" "}
                            {new Date(user.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">ID:</span> {user.id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DoodleCard>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthWrapper>
  )
}
