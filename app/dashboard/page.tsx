"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Loader2 } from "lucide-react"
import ProfileView from "@/components/profile/profile-view"
import ProfileEditor from "@/components/profile/profile-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "view"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, isLoading, router])

  const handleProfileSaved = () => {
    // Switch to view tab after successful save
    setActiveTab("view")
    // Force refresh of components
    setRefreshKey((prev) => prev + 1)
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

      {/* Profile Tabs */}
      <Tabs
        defaultValue={defaultTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        key={refreshKey}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <ProfileView />
        </TabsContent>

        <TabsContent value="edit">
          <ProfileEditor onSaved={handleProfileSaved} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
