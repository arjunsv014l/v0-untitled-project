"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useRouter, useParams } from "next/navigation"
import UserProfile from "@/components/social/user-profile"
import SocialFeed from "@/components/social/social-feed"

export default function UserProfilePage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const params = useParams()
  const username = params?.username as string
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  const isCurrentUser = user?.name?.toLowerCase().replace(/\s+/g, "") === username

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserProfile username={username} isCurrentUser={isCurrentUser} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <SocialFeed />
      </div>
    </div>
  )
}
