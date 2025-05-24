"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Loader2 } from "lucide-react"
import ProfileView from "@/components/profile/profile-view"
import ProfileEditor from "@/components/profile/profile-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("view")
  const [refreshKey, setRefreshKey] = useState(0)
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)

  // Check for query parameters on initial load
  useEffect(() => {
    const mode = searchParams.get("mode")
    const isNewUser = searchParams.get("newUser") === "true"

    if (mode === "edit") {
      setActiveTab("edit")

      // Show welcome message for new users
      if (isNewUser) {
        setNotification({
          type: "success",
          message: "Registration successful! Please complete your profile.",
        })

        // Clear the URL parameters after processing
        setTimeout(() => {
          router.replace("/dashboard")
        }, 500)
      }
    }
  }, [searchParams, router])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, isLoading, router])

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleProfileSaved = () => {
    // Switch to view tab after successful save
    setActiveTab("view")
    // Force refresh of components
    setRefreshKey((prev) => prev + 1)
    // Show success notification
    setNotification({
      type: "success",
      message: "Profile updated successfully and saved to database!",
    })
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
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user.name?.split(" ")[0] || "Friend"}!</h1>
        <p className="text-gray-600">This is your personal dashboard where you can view and manage your profile.</p>
      </div>

      {/* Notification */}
      {notification && (
        <Alert
          className={`mb-6 ${
            notification.type === "success"
              ? "bg-green-50 border-green-200"
              : notification.type === "error"
                ? "bg-red-50 border-red-200"
                : "bg-blue-50 border-blue-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : notification.type === "error" ? (
            <AlertCircle className="h-4 w-4 text-red-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-blue-600" />
          )}
          <AlertTitle
            className={
              notification.type === "success"
                ? "text-green-800"
                : notification.type === "error"
                  ? "text-red-800"
                  : "text-blue-800"
            }
          >
            {notification.type === "success" ? "Success" : notification.type === "error" ? "Error" : "Information"}
          </AlertTitle>
          <AlertDescription
            className={
              notification.type === "success"
                ? "text-green-700"
                : notification.type === "error"
                  ? "text-red-700"
                  : "text-blue-700"
            }
          >
            {notification.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Tabs */}
      <Tabs defaultValue="view" value={activeTab} onValueChange={setActiveTab} className="w-full" key={refreshKey}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <ProfileView />
        </TabsContent>

        <TabsContent value="edit">
          <ProfileEditor onSaved={handleProfileSaved} isNewUser={searchParams.get("newUser") === "true"} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
