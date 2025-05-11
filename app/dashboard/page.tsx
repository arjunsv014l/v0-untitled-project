"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DashboardHome from "@/components/dashboard/dashboard-home"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if user is logged in
    if (!isLoading && !user) {
      console.log("[Dashboard] No user, redirecting to home")
      router.push("/")
      return
    }
  }, [user, isLoading, router])

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-black animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  )
}
