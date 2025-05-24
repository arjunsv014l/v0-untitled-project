"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Loader2, Calendar, Bell, Users, BookOpen } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import LaunchingSoon from "@/components/launching-soon"

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, isLoading, router])

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
    <div className="container mx-auto py-8 px-4 max-w-4xl mt-20">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user.name?.split(" ")[0] || "Friend"}!</h1>
        <p className="text-gray-600">
          Thank you for joining Dreamclerk. We're excited to have you on board as we prepare to launch.
        </p>
      </div>

      {/* Success Notification */}
      <Alert className="mb-6 bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Registration Successful</AlertTitle>
        <AlertDescription className="text-green-700">
          Your account has been created successfully. We'll notify you when new features become available.
        </AlertDescription>
      </Alert>

      {/* Launching Soon Widget */}
      <LaunchingSoon />

      {/* Dashboard Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <DoodleCard className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 mr-3 text-purple-600" />
            <h3 className="text-xl font-bold">Upcoming Events</h3>
          </div>
          <p className="text-gray-600 mb-4">Stay tuned for campus events and networking opportunities.</p>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <p className="text-purple-800 text-sm">Feature launching soon</p>
          </div>
        </DoodleCard>

        <DoodleCard className="p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 mr-3 text-blue-600" />
            <h3 className="text-xl font-bold">Notifications</h3>
          </div>
          <p className="text-gray-600 mb-4">Get personalized alerts about opportunities relevant to your interests.</p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-blue-800 text-sm">Feature launching soon</p>
          </div>
        </DoodleCard>

        <DoodleCard className="p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 mr-3 text-green-600" />
            <h3 className="text-xl font-bold">Community</h3>
          </div>
          <p className="text-gray-600 mb-4">Connect with fellow students and build your campus network.</p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-green-800 text-sm">Feature launching soon</p>
          </div>
        </DoodleCard>

        <DoodleCard className="p-6">
          <div className="flex items-center mb-4">
            <BookOpen className="h-6 w-6 mr-3 text-amber-600" />
            <h3 className="text-xl font-bold">Resources</h3>
          </div>
          <p className="text-gray-600 mb-4">Access guides, templates, and tools to enhance your college experience.</p>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p className="text-amber-800 text-sm">Feature launching soon</p>
          </div>
        </DoodleCard>
      </div>
    </div>
  )
}
