"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import ProfileEditor from "@/components/profile/profile-editor"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function ProfileEditPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isWelcome = searchParams.get("welcome") === "true"
  const [loadError, setLoadError] = useState(false)
  const [showWelcome, setShowWelcome] = useState(isWelcome)

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !user) {
      // If no user and not loading, redirect to login
      router.push("/login?redirect=/profile/edit")
    } else if (!isLoading && user && !user.name) {
      // If user exists but profile data is incomplete, show error
      setLoadError(true)
    } else if (!isLoading && user) {
      // User is loaded successfully
      setLoadError(false)
    }
  }, [user, isLoading, router])

  // Handle retry loading profile
  const handleRetry = () => {
    setLoadError(false)
    window.location.reload()
  }

  // Handle navigation to dashboard
  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500 mb-4" />
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to Load Profile</AlertTitle>
          <AlertDescription>
            We couldn't load your profile information. This might be a temporary issue. Please try again.
          </AlertDescription>
        </Alert>
        <div className="flex gap-4 mt-4">
          <Button onClick={handleRetry}>
            <Loader2 className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button variant="outline" onClick={handleGoToDashboard}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Welcome message for new registrations */}
      {showWelcome && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Welcome to Dreamclerk!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your account has been created successfully. Complete your profile below to get the most out of your
            experience.
          </AlertDescription>
        </Alert>
      )}

      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {isWelcome ? "Complete Your Profile" : "Edit Your Profile"}
        </h1>
        <p className="text-gray-600">
          {isWelcome
            ? "Tell us more about yourself to personalize your experience"
            : "Update your information to keep your profile current"}
        </p>
      </div>

      {/* Profile Editor with error handling */}
      <div className="mb-8">
        <ProfileEditor
          onSaved={() => {
            setShowWelcome(false)
            // Optionally redirect to dashboard after saving
            setTimeout(() => {
              router.push("/dashboard")
            }, 1500)
          }}
        />
      </div>

      {/* Skip option for new users */}
      {isWelcome && (
        <div className="text-center">
          <Button variant="ghost" onClick={handleGoToDashboard}>
            Skip for now
          </Button>
        </div>
      )}
    </div>
  )
}
