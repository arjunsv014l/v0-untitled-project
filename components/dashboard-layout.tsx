"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import LoadingState from "@/components/loading-state"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, isProfileComplete } = useAuth()
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and profile is complete
    if (!loading) {
      if (!user) {
        // Not logged in, redirect to login
        router.push("/login")
        return
      }

      if (!isProfileComplete(user)) {
        // Profile not complete, redirect to profile completion
        router.push("/profile")
        return
      }

      // User is logged in and profile is complete
      setIsReady(true)
    }
  }, [user, loading, router, isProfileComplete])

  if (loading || !isReady) {
    return <LoadingState message="Loading dashboard..." fullScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard header, sidebar, etc. */}
      <div className="p-4">{children}</div>
    </div>
  )
}
