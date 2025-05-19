"use client"

import { useUser } from "@/context/user-context"
import AuthWrapper from "@/components/auth-wrapper"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import ProfileForm from "@/components/profile/profile-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Home, User, Bell, Lock } from "lucide-react"
import Link from "next/link"
import DoodleCard from "@/components/ui-elements/doodle-card" // Import DoodleCard

export default function ProfilePage() {
  const { user } = useUser()

  return (
    <AuthWrapper>
      <main className="min-h-screen bg-white pt-20">
        <DoodleBackground className="pt-24 pb-16" density="low">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
                <Home className="h-5 w-5" />
              </Link>
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
                <span className="font-medium">My Profile</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome, {user?.name || "Dreamclerk User"}!</h1>

              <p className="text-lg text-gray-700 mb-8">Manage your profile information and account settings.</p>
            </div>
          </div>
        </DoodleBackground>

        <section className="py-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <ProfileForm />
              </TabsContent>

              <TabsContent value="notifications">
                <DoodleCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
                  <p className="text-gray-600 mb-4">Manage your notification settings and preferences.</p>
                  <div className="text-center py-8">
                    <p className="text-gray-500">Notification settings coming soon!</p>
                  </div>
                </DoodleCard>
              </TabsContent>

              <TabsContent value="security">
                <DoodleCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                  <p className="text-gray-600 mb-4">Manage your account security and password.</p>
                  <div className="text-center py-8">
                    <p className="text-gray-500">Security settings coming soon!</p>
                  </div>
                </DoodleCard>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </AuthWrapper>
  )
}
