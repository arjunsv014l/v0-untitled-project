"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Loader2, FileText, PenTool, Newspaper, StickyNote } from "lucide-react"
import { motion } from "framer-motion"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [checkingProfile, setCheckingProfile] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!user) return

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_profile_complete")
          .eq("id", user.id)
          .single()

        setIsProfileComplete(profile?.is_profile_complete || false)
      } catch (error) {
        console.error("Error checking profile completion:", error)
      } finally {
        setCheckingProfile(false)
      }
    }

    if (user) {
      checkProfileCompletion()
    }
  }, [user])

  if (isLoading || checkingProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <DoodleCard className="max-w-md w-full p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">
              Please complete your profile to access all dashboard features, including the social feed.
            </p>
            <DoodleButton onClick={() => router.push("/profile/complete")} size="lg">
              Complete Profile
            </DoodleButton>
          </DoodleCard>
        </motion.div>
      </div>
    )
  }

  const dashboardFeatures = [
    {
      id: "social-feed",
      title: "Social Feed",
      description: "Connect with your community, share updates, and discover opportunities",
      icon: <Newspaper className="h-8 w-8" />,
      color: "from-blue-400 to-blue-600",
      href: "/dashboard/social",
    },
    {
      id: "resume-builder",
      title: "Resume & Cover Letter",
      description: "Build professional resumes and cover letters with AI assistance",
      icon: <FileText className="h-8 w-8" />,
      color: "from-green-400 to-green-600",
      href: "/dashboard/resume",
    },
    {
      id: "journal",
      title: "Journal",
      description: "Write and reflect on your personal and professional journey",
      icon: <PenTool className="h-8 w-8" />,
      color: "from-purple-400 to-purple-600",
      href: "/dashboard/journal",
    },
    {
      id: "notion",
      title: "Workspace",
      description: "Organize your notes, tasks, and projects in one place",
      icon: <StickyNote className="h-8 w-8" />,
      color: "from-orange-400 to-orange-600",
      href: "/dashboard/workspace",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name?.split(" ")[0] || "there"}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dashboardFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DoodleCard
                className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => router.push(feature.href)}
              >
                <div className="p-8">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Open {feature.title}</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </DoodleCard>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <DoodleCard className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-gray-600 mt-2">Social Posts</div>
          </DoodleCard>
          <DoodleCard className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-gray-600 mt-2">Resumes Created</div>
          </DoodleCard>
          <DoodleCard className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-gray-600 mt-2">Journal Entries</div>
          </DoodleCard>
          <DoodleCard className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">0</div>
            <div className="text-gray-600 mt-2">Workspace Pages</div>
          </DoodleCard>
        </motion.div>
      </div>
    </div>
  )
}
