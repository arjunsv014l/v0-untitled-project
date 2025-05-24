"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import ProfileForm from "@/components/profile/profile-form"
import { Loader2, ArrowLeft } from "lucide-react"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/profile")
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
    <div className="container mx-auto py-8 px-4 mt-20 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <DoodleButton variant="outline" size="sm" onClick={() => router.push("/dashboard")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </DoodleButton>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-600">View and update your personal information</p>
        </div>

        <ProfileForm />
      </motion.div>
    </div>
  )
}
