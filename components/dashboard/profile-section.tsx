"use client"

import { useState, useEffect } from "react"
import { Edit, MapPin, Calendar, Book, LinkIcon, Heart, MessageCircle } from "lucide-react"
import HolographicCard from "../ui/holographic-card"
import EditProfileModal from "./edit-profile-modal"
import { useUser } from "@/context/user-context"
import ProfileCompletionMonitor from "../profile-completion-monitor"

export default function ProfileSection() {
  const { user, updateUserProfile, checkProfileCompletion } = useUser()
  const [activeTab, setActiveTab] = useState("posts")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [profileComplete, setProfileComplete] = useState(false)

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "media", label: "Media" },
    { id: "likes", label: "Likes" },
  ]

  // Default user profile data
  const defaultProfile = {
    name: "User",
    username: "@user",
    avatar: "/abstract-profile.png",
    coverImage: "/diverse-students-studying.png",
    bio: "No bio available yet.",
    location: "Not specified",
    joined: "Recently",
    education: "Not specified",
    website: "example.com",
    stats: {
      posts: 0,
      followers: 0,
      following: 0,
    },
  }

  // Use user data if available, otherwise use default
  const userProfile = user
    ? {
        name: user.name || defaultProfile.name,
        username: `@${user.name?.toLowerCase().replace(/\s+/g, "") || "user"}`,
        avatar: user.avatar || defaultProfile.avatar,
        coverImage: user.coverImage || defaultProfile.coverImage,
        bio: user.bio || defaultProfile.bio,
        location: user.location || defaultProfile.location,
        joined: user.lastLogin
          ? new Date(user.lastLogin).toLocaleDateString("en-US", { month: "long", year: "numeric" })
          : defaultProfile.joined,
        education: user.university || defaultProfile.education,
        website: user.website || defaultProfile.website,
        stats: defaultProfile.stats,
      }
    : defaultProfile

  const [userProfileData, setUserProfileData] = useState(userProfile)
  const [missingFields, setMissingFields] = useState<string[]>([])

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setUserProfileData({
        name: user.name || defaultProfile.name,
        username: `@${user.name?.toLowerCase().replace(/\s+/g, "") || "user"}`,
        avatar: user.avatar || defaultProfile.avatar,
        coverImage: user.coverImage || defaultProfile.coverImage,
        bio: user.bio || defaultProfile.bio,
        location: user.location || defaultProfile.location,
        joined: user.lastLogin
          ? new Date(user.lastLogin).toLocaleDateString("en-US", { month: "long", year: "numeric" })
          : defaultProfile.joined,
        education: user.university || defaultProfile.education,
        website: user.website || defaultProfile.website,
        stats: defaultProfile.stats,
      })

      // Check if profile is complete
      const { isComplete, missingFields } = checkProfileCompletion(user)
      setProfileComplete(isComplete)
      setMissingFields(missingFields)
    }
  }, [user, checkProfileCompletion])

  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        "Just finished my final project for the AI course! 🎉 The neural network model achieved 94% accuracy on the test dataset. #AI #MachineLearning",
      image: "/ai-project-visualization.png",
      likes: 42,
      comments: 8,
      time: "2h ago",
      liked: false,
    },
    {
      id: 2,
      content:
        "Study group for tomorrow's calculus exam at the library, 6PM. We'll be covering integration techniques and applications. Comment if you're joining! #StudyGroup #Calculus",
      likes: 18,
      comments: 12,
      time: "2d ago",
      liked: false,
    },
  ])

  const media = [
    { id: 1, image: "/ai-project-visualization.png", time: "2h ago" },
    { id: 2, image: "/climate-change-data-visualization.png", time: "1w ago" },
    { id: 3, image: "/diverse-students-studying.png", time: "2w ago" },
    { id: 4, image: "/abstract-profile.png", time: "1m ago" },
  ]

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        }
        return post
      }),
    )
  }

  const [commentText, setCommentText] = useState("")
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null)

  const handleCommentClick = (postId: number) => {
    setActiveCommentPostId(activeCommentPostId === postId ? null : postId)
    setCommentText("")
  }

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: post.comments + 1 }
        }
        return post
      }),
    )

    setCommentText("")
    setActiveCommentPostId(null)
    // In a real app, you would save this to the database
    console.log(`Added comment to post ${postId}: ${commentText}`)
  }

  // Field labels for display
  const fieldLabels: Record<string, string> = {
    name: "Full Name",
    email: "Email Address",
    bio: "Bio",
    university: "University/College",
    major: "Major/Field of Study",
    location: "Location",
    graduationYear: "Graduation Year",
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Completion Monitor */}
      {!profileComplete && <ProfileCompletionMonitor showDetails={true} className="mb-6" />}

      {/* Cover and profile */}
      <HolographicCard className="mb-6 overflow-hidden" accentColor="blue">
        <div className="h-48 overflow-hidden">
          <img
            src={userProfileData.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-16 mb-4">
            <div className="relative">
              <img
                src={userProfileData.avatar || "/placeholder.svg"}
                alt={userProfileData.name}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </button>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{userProfileData.name}</h1>
            <p className="text-gray-500">{userProfileData.username}</p>
          </div>

          <p className="text-gray-700 mb-4">{userProfileData.bio}</p>

          <div className="flex flex-wrap gap-y-2 text-gray-600 mb-6">
            <div className="flex items-center mr-4">
              <MapPin size={16} className="mr-1" />
              <span>{userProfileData.location}</span>
            </div>
            <div className="flex items-center mr-4">
              <Calendar size={16} className="mr-1" />
              <span>Joined {userProfileData.joined}</span>
            </div>
            <div className="flex items-center mr-4">
              <Book size={16} className="mr-1" />
              <span>{userProfileData.education}</span>
            </div>
            {userProfileData.website && (
              <div className="flex items-center">
                <LinkIcon size={16} className="mr-1" />
                <a href={`https://${userProfileData.website}`} className="text-blue-600 hover:underline">
                  {userProfileData.website}
                </a>
              </div>
            )}
          </div>

          <div className="flex space-x-6 border-t border-gray-200 pt-4">
            <div className="text-center">
              <div className="font-bold text-gray-800">{userProfileData.stats.posts}</div>
              <div className="text-gray-500 text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-800">{userProfileData.stats.followers}</div>
              <div className="text-gray-500 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-800">{userProfileData.stats.following}</div>
              <div className="text-gray-500 text-sm">Following</div>
            </div>
          </div>

          {!profileComplete && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium mb-2">
                Complete your profile to unlock all dashboard features
              </p>
              {missingFields.length > 0 && (
                <div>
                  <p className="text-sm text-yellow-700 mb-1">Missing information:</p>
                  <ul className="text-sm text-yellow-700 list-disc pl-5">
                    {missingFields.map((field) => (
                      <li key={field}>{fieldLabels[field] || field}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="mt-2 text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </HolographicCard>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium ${
                activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "posts" && (
        <div className="space-y-6">
          {posts.map((post) => (
            <HolographicCard key={post.id} accentColor="blue">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <img
                    src={userProfileData.avatar || "/placeholder.svg"}
                    alt={userProfileData.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{userProfileData.name}</div>
                    <div className="text-xs text-gray-500">{post.time}</div>
                  </div>
                </div>

                <p className="mb-4 text-gray-700">{post.content}</p>

                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-full" />
                  </div>
                )}

                <div className="flex text-gray-500 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center mr-6 hover:text-pink-500 transition-colors"
                  >
                    <Heart size={18} className={`mr-1 ${post.liked ? "fill-pink-500 text-pink-500" : ""}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => handleCommentClick(post.id)}
                    className="flex items-center hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle size={18} className="mr-1" />
                    <span>{post.comments}</span>
                  </button>
                </div>

                {activeCommentPostId === post.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-start">
                      <img
                        src={userProfileData.avatar || "/placeholder.svg"}
                        alt={userProfileData.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div className="flex-1">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Write a comment..."
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        ></textarea>
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentText.trim()}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </HolographicCard>
          ))}
        </div>
      )}

      {activeTab === "media" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((item) => (
            <div key={item.id} className="aspect-square rounded-lg overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt="Media" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {activeTab === "likes" && (
        <div className="text-center py-10">
          <p className="text-gray-500">No liked posts yet.</p>
        </div>
      )}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userProfile={userProfileData}
        onSave={(updatedProfile) => {
          setUserProfileData(updatedProfile)

          // Update user profile in context
          if (user) {
            updateUserProfile({
              name: updatedProfile.name,
              bio: updatedProfile.bio,
              location: updatedProfile.location,
              university: updatedProfile.education,
              website: updatedProfile.website,
            })

            // Recheck profile completion
            const { isComplete, missingFields } = checkProfileCompletion(user)
            setProfileComplete(isComplete)
            setMissingFields(missingFields)
          }
        }}
        requiredFields={missingFields}
      />
    </div>
  )
}
