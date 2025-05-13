"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import UserProfile from "@/components/social/user-profile"

export default function ProfilePage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if user is logged in
    if (!isLoading && !user) {
      router.push("/")
      return
    }
  }, [user, isLoading, router])

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserProfile isCurrentUser={true} />
    </div>
  )
}
