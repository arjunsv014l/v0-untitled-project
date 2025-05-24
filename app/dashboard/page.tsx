"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Loader2, LogOut, Rocket, Star, Calendar, Bell, Users, BookOpen } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { user, isLoading, logout } = useUser()
  const router = useRouter()
  const [days, setDays] = useState(30)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)

      if (difference <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

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
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dreamclerk Dashboard</h1>
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Welcome, {user.name?.split(" ")[0] || "Friend"}!</h2>
          <p className="text-gray-600 text-lg">
            Thank you for joining Dreamclerk. Get ready for an amazing journey ahead!
          </p>
        </motion.div>

        {/* Launching Soon Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DoodleCard className="p-6 mb-10 relative overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
            {/* Animated stars */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.5 + 0.3,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    opacity: [null, 1, 0.3],
                    scale: [null, 1.2, 0.8],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-full shadow-lg"
                >
                  <Rocket className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">Launching Soon!</h3>

              <p className="text-center text-gray-600 mb-8">
                We're building something incredible. Stay tuned for exciting features!
              </p>

              <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6 max-w-md mx-auto">
                <div className="bg-white rounded-lg p-3 text-center border-2 border-purple-200 shadow-sm">
                  <div className="text-xl md:text-3xl font-bold text-purple-700">{days}</div>
                  <div className="text-xs md:text-sm text-purple-600">Days</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border-2 border-indigo-200 shadow-sm">
                  <div className="text-xl md:text-3xl font-bold text-indigo-700">{hours}</div>
                  <div className="text-xs md:text-sm text-indigo-600">Hours</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border-2 border-blue-200 shadow-sm">
                  <div className="text-xl md:text-3xl font-bold text-blue-700">{minutes}</div>
                  <div className="text-xs md:text-sm text-blue-600">Minutes</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border-2 border-cyan-200 shadow-sm">
                  <div className="text-xl md:text-3xl font-bold text-cyan-700">{seconds}</div>
                  <div className="text-xs md:text-sm text-cyan-600">Seconds</div>
                </div>
              </div>
            </div>
          </DoodleCard>
        </motion.div>

        {/* Coming Soon Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-6 text-center">What's Coming</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DoodleCard className="p-4 text-center hover:shadow-lg transition-shadow">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h4 className="font-semibold mb-2">Events</h4>
              <p className="text-sm text-gray-600">Campus events and networking</p>
            </DoodleCard>

            <DoodleCard className="p-4 text-center hover:shadow-lg transition-shadow">
              <Bell className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h4 className="font-semibold mb-2">Notifications</h4>
              <p className="text-sm text-gray-600">Personalized alerts</p>
            </DoodleCard>

            <DoodleCard className="p-4 text-center hover:shadow-lg transition-shadow">
              <Users className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <h4 className="font-semibold mb-2">Community</h4>
              <p className="text-sm text-gray-600">Connect with peers</p>
            </DoodleCard>

            <DoodleCard className="p-4 text-center hover:shadow-lg transition-shadow">
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-amber-600" />
              <h4 className="font-semibold mb-2">Resources</h4>
              <p className="text-sm text-gray-600">Guides and tools</p>
            </DoodleCard>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
