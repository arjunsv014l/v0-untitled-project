"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import ProfileCompletionForm from "@/components/profile-completion-form"

export default function ProfileCompletePage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    // If user is not logged in and not loading, redirect to login
    if (!isLoading && !user) {
      router.push("/login?redirect=/profile/complete")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Profile</h1>
        <ProfileCompletionForm redirectPath="/dashboard" />
      </div>
    </div>
  )
}
