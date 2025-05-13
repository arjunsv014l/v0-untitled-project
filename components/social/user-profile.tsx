"use client"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, MapPin, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditProfile } from "@/components/social/edit-profile"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface UserProfileProps {
  username?: string
  isCurrentUser?: boolean
}

export default function UserProfile({ username, isCurrentUser = false }: UserProfileProps) {
  const { user } = useUser()
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(128)
  const [profileData, setProfileData] = useState(
    isCurrentUser
      ? {
          id: user?.id || "current-user",
          name: user?.name || "Current User",
          username: user?.name?.toLowerCase().replace(/\s+/g, "") || "currentuser",
          bio: user?.bio || "No bio yet",
          avatar: user?.avatar || "/student-avatar.png",
          coverImage: "/diverse-students-studying.png",
          location: "New York, NY",
          website: "example.com",
          followingCount: 97,
          postCount: 42,
        }
      : {
          id: "user123",
          name: username || "User Profile",
          username: username || "userprofile",
          bio: "Student at University | Passionate about technology and design | Learning new things every day",
          avatar: "/student-avatar.png",
          coverImage: "/diverse-students-studying.png",
          location: "New York, NY",
          website: "example.com",
          followingCount: 97,
          postCount: 42,
        },
  )

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1)
  }

  const handleProfileUpdate = (updatedProfile: { name: string; bio: string; avatar: string | null }) => {
    setProfileData((prev) => ({
      ...prev,
      name: updatedProfile.name,
      bio: updatedProfile.bio,
      avatar: updatedProfile.avatar || prev.avatar,
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 bg-gray-200 relative">
        {profileData.coverImage && (
          <img src={profileData.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex justify-between -mt-16">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={profileData.avatar || "/placeholder.svg"}
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="text-4xl">{profileData.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-16 space-x-2">
            {isCurrentUser ? (
              <>
                <EditProfile onProfileUpdate={handleProfileUpdate} />
                <Button variant="outline" size="icon" className="rounded-lg">
                  <Settings size={18} />
                </Button>
              </>
            ) : (
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                className="px-4 py-2 rounded-lg"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">{profileData.name}</h1>
          <p className="text-gray-500">@{profileData.username}</p>

          {profileData.bio && <p className="mt-2">{profileData.bio}</p>}

          <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-4">
            {profileData.location && (
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{profileData.location}</span>
              </div>
            )}
            {profileData.website && (
              <div className="flex items-center">
                <LinkIcon size={16} className="mr-1" />
                <a
                  href={`https://${profileData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profileData.website}
                </a>
              </div>
            )}
          </div>

          <div className="flex mt-4 space-x-4">
            <div>
              <span className="font-bold">{followerCount}</span> <span className="text-gray-500">Followers</span>
            </div>
            <div>
              <span className="font-bold">{profileData.followingCount}</span>{" "}
              <span className="text-gray-500">Following</span>
            </div>
            <div>
              <span className="font-bold">{profileData.postCount}</span> <span className="text-gray-500">Posts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No posts yet.</p>
          </div>
        </TabsContent>

        <TabsContent value="media" className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No media yet.</p>
          </div>
        </TabsContent>

        <TabsContent value="likes" className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No likes yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
