"use client"

import { useUser } from "@/context/user-context"
import { Loader2, Mail, Briefcase, GraduationCap, MapPin, User } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"

export default function ProfileView() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <DoodleCard className="overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black bg-gray-100 mb-4">
            {user.avatar_url ? (
              <img
                src={user.avatar_url || "/placeholder.svg"}
                alt={user.name || "Profile"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <Mail className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p>{user.email}</p>
            </div>
          </div>

          {user.college && (
            <div className="flex items-start">
              <GraduationCap className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">College/University</p>
                <p>{user.college}</p>
              </div>
            </div>
          )}

          {user.major && (
            <div className="flex items-start">
              <Briefcase className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Major/Field of Study</p>
                <p>{user.major}</p>
              </div>
            </div>
          )}

          {user.location && (
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p>{user.location}</p>
              </div>
            </div>
          )}

          {user.bio && (
            <div className="flex items-start">
              <User className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Bio</p>
                <p>{user.bio}</p>
              </div>
            </div>
          )}

          {!user.college && !user.major && !user.location && !user.bio && (
            <div className="text-center py-4 text-gray-500">
              <p>Your profile is quite empty. Switch to Edit Profile to add more information.</p>
            </div>
          )}
        </div>
      </div>
    </DoodleCard>
  )
}
