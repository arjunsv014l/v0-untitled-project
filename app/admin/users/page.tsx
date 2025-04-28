"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Home, User, Calendar, Mail, Clock } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleCard from "@/components/ui-elements/doodle-card"
import AuthWrapper from "@/components/auth-wrapper"

// Sample user data - in a real app, this would come from a database
const sampleUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    dob: "1995-05-15",
    role: "student",
    created_at: "2023-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily@example.com",
    dob: "1998-08-22",
    role: "student",
    created_at: "2023-02-10T14:45:00Z",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    dob: "1997-03-30",
    role: "student",
    created_at: "2023-01-28T09:15:00Z",
  },
  {
    id: "4",
    name: "Sarah Davis",
    email: "sarah@example.com",
    dob: "1996-11-12",
    role: "student",
    created_at: "2023-03-05T16:20:00Z",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    dob: "1999-07-08",
    role: "student",
    created_at: "2023-02-22T11:10:00Z",
  },
  {
    id: "6",
    name: "Admin User",
    email: "admin@example.com",
    dob: "1990-01-01",
    role: "admin",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "7",
    name: "Editor User",
    email: "editor@example.com",
    dob: "1992-05-15",
    role: "editor",
    created_at: "2023-01-02T00:00:00Z",
  },
  {
    id: "8",
    name: "Student User",
    email: "student@example.com",
    dob: "1998-10-20",
    role: "student",
    created_at: "2023-01-03T00:00:00Z",
  },
]

export default function UsersAdminPage() {
  const [users, setUsers] = useState(sampleUsers)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <AuthWrapper requiredRoles={["admin"]}>
      <main className="min-h-screen bg-white pt-20">
        {/* Header Section */}
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

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Registered Users</h1>

              <p className="text-lg text-gray-700 mb-8">
                View and manage all registered users in the Dreamclerk platform.
              </p>
            </div>
          </div>
        </DoodleBackground>

        {/* Search and Filter Section */}
        <section className="py-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-auto flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Users List */}
        <section className="py-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredUsers.length > 0 ? (
              <div className="space-y-6">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <DoodleCard className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-xl font-bold">{user.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                            <div className="flex items-center text-gray-600">
                              <Mail className="h-4 w-4 mr-1" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{user.dob}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <User className="h-4 w-4 mr-1" />
                              <span className="capitalize">{user.role}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Joined: {formatDate(user.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DoodleCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">No users found</h3>
                <p className="text-gray-600">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthWrapper>
  )
}
