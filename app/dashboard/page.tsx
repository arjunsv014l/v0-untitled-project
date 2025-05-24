"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Loader2, LogOut } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { user, isLoading, logout } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const getUserInitials = () => {
    if (!user?.name) return "U"
    const names = user.name.split(" ")
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
    }
    return user.name.charAt(0).toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b fixed top-16 left-0 right-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              {/* User Icon with Initials */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                {getUserInitials()}
              </div>
              {/* Logout Button */}
              <DoodleButton onClick={handleLogout} size="sm" variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DoodleButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome to Dreamclerk, {user.name?.split(" ")[0] || "Friend"}!
          </h2>
          <p className="text-gray-600 text-lg">
            Your account has been successfully created. We're excited to have you on board!
          </p>
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DoodleCard className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">🚀 Launching Soon!</h3>
            <p className="text-gray-600 mb-6">
              We're working hard to bring you amazing features. Stay tuned for updates!
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6">
              <p className="text-lg font-medium text-gray-800">
                Thank you for being an early adopter. Great things are coming!
              </p>
            </div>
          </DoodleCard>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <DoodleCard className="p-6">
            <h4 className="font-semibold mb-4">Your Account Information</h4>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Member Since:</span> {new Date().toLocaleDateString()}
              </p>
            </div>
          </DoodleCard>
        </motion.div>
      </div>
    </div>
  )
}
