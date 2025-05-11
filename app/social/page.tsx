"use client"

import { useState, useRef, useCallback } from "react"
import { Heart, MessageCircle, Bookmark, Share2, Edit3, UserPlus, UserMinus, Grid, BookmarkIcon } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/context/user-context"
import HolographicCard from "@/components/ui/holographic-card"

// Mock data for posts
const INITIAL_POSTS = [
  {
    id: 1,
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/student-avatar.png",
    },
    content:
      "Just submitted my research paper on climate change and its effects on agricultural practices! 📝 #ClimateChange #Research",
    image: "/climate-change-data-visualization.png",
    likes: 47,
    comments: 13,
    time: "1h ago",
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/abstract-profile.png",
    },
    content:
      "Just finished my final project for the AI course! 🎉 The neural network model achieved 94% accuracy on the test dataset. #AI #MachineLearning",
    image: "/ai-project-visualization.png",
    likes: 42,
    comments: 8,
    time: "2h ago",
    liked: false,
    bookmarked: false,
  },
  {
    id: 3,
    user: {
      name: "Student Community",
      username: "studentcommunity",
      avatar: "/diverse-student-profiles.png",
    },
    content:
      "Reminder: The career fair is next Tuesday at the University Center from 10AM to 4PM. Over 50 companies will be recruiting for internships and full-time positions! #CareerFair #Opportunities",
    likes: 89,
    comments: 24,
    time: "3h ago",
    liked: false,
    bookmarked: false,
  },
  {
    id: 4,
    user: {
      name: "Jordan Lee",
      username: "jordanl",
      avatar: "/student-avatar.png",
    },
    content:
      "Study group for tomorrow's calculus exam at the library, 6PM. We'll be covering integration techniques and applications. Comment if you're joining! #StudyGroup #Calculus",
    likes: 18,
    comments: 12,
    time: "5h ago",
    liked: false,
    bookmarked: false,
  },
  {
    id: 5,
    user: {
      name: "Taylor Kim",
      username: "taylork",
      avatar: "/abstract-profile.png",
    },
    content:
      "Just got my internship offer from Google for the summer! So excited to join the team and work on real-world projects. #Internship #Google #ComputerScience",
    image: "/diverse-students-studying.png",
    likes: 156,
    comments: 42,
    time: "1d ago",
    liked: false,
    bookmarked: false,
  },
]

// Mock profile data
const MOCK_PROFILE = {
  name: "Alex Johnson",
  username: "alexj",
  avatar: "/abstract-profile.png",
  coverImage: "/diverse-students-studying.png",
  bio: "Computer Science student at Stanford University. Passionate about AI, machine learning, and web development.",
  followers: 128,
  following: 97,
  posts: 42,
  isFollowing: false,
  isCurrentUser: true,
}

export default function SocialFeedPage() {
  const { user } = useUser()
  const [profile, setProfile] = useState(MOCK_PROFILE)
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [activeTab, setActiveTab] = useState("posts")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [commentText, setCommentText] = useState("")
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  // Load more posts (simulated)
  const loadMorePosts = () => {
    if (!hasMore || loading) return

    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate new posts based on existing ones with new IDs
      const newPosts = INITIAL_POSTS.map((post) => ({
        ...post,
        id: post.id + page * INITIAL_POSTS.length,
        content: `${post.content} (Page ${page + 1})`,
        time: `${page + 1}d ago`,
      }))

      setPosts((prevPosts) => [...prevPosts, ...newPosts])
      setPage((prevPage) => prevPage + 1)
      setLoading(false)

      // Stop infinite scroll after 3 pages
      if (page >= 2) {
        setHasMore(false)
      }
    }, 1000)
  }

  // Handle like action
  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const liked = !post.liked
          return {
            ...post,
            liked,
            likes: liked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }

  // Handle bookmark action
  const handleBookmark = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            bookmarked: !post.bookmarked,
          }
        }
        return post
      }),
    )
  }

  // Handle comment action
  const handleCommentClick = (postId: number) => {
    setActiveCommentPostId(activeCommentPostId === postId ? null : postId)
    setCommentText("")
  }

  // Add comment
  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
          }
        }
        return post
      }),
    )

    setCommentText("")
    setActiveCommentPostId(null)
  }

  // Toggle follow status
  const handleFollowToggle = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      isFollowing: !prevProfile.isFollowing,
      followers: prevProfile.isFollowing ? prevProfile.followers - 1 : prevProfile.followers + 1,
    }))
  }

  // Handle profile edit
  const handleProfileEdit = () => {
    setIsEditingProfile(true)
    setEditedProfile(profile)
  }

  // Save profile changes
  const handleProfileSave = () => {
    setProfile(editedProfile)
    setIsEditingProfile(false)
  }

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "posts") {
      return post.user.username === profile.username
    } else if (activeTab === "liked") {
      return post.liked
    }
    return true
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <HolographicCard className="mb-6 overflow-hidden" accentColor="purple">
        {isEditingProfile ? (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={editedProfile.username}
                  onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="h-48 overflow-hidden">
              <img src={profile.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
            </div>
            <div className="px-6 pb-6">
              <div className="flex justify-between items-end -mt-16 mb-4">
                <div className="relative">
                  <img
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full border-4 border-white"
                  />
                </div>
                {profile.isCurrentUser ? (
                  <button
                    onClick={handleProfileEdit}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                  >
                    <Edit3 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleFollowToggle}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      profile.isFollowing
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {profile.isFollowing ? (
                      <>
                        <UserMinus size={16} className="mr-2" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} className="mr-2" />
                        Follow
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-gray-500">@{profile.username}</p>
              </div>

              <p className="text-gray-700 mb-4">{profile.bio}</p>

              <div className="flex space-x-6 border-t border-gray-200 pt-4">
                <div className="text-center">
                  <div className="font-bold text-gray-800">{profile.posts}</div>
                  <div className="text-gray-500 text-sm">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">{profile.followers}</div>
                  <div className="text-gray-500 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">{profile.following}</div>
                  <div className="text-gray-500 text-sm">Following</div>
                </div>
              </div>
            </div>
          </>
        )}
      </HolographicCard>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-4 px-2 font-medium flex items-center ${
              activeTab === "posts"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Grid size={18} className="mr-2" />
            Posts
          </button>
          <button
            onClick={() => setActiveTab("liked")}
            className={`pb-4 px-2 font-medium flex items-center ${
              activeTab === "liked"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <BookmarkIcon size={18} className="mr-2" />
            Liked
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => {
            if (filteredPosts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post.id}>
                  <PostCard
                    post={post}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    onCommentClick={handleCommentClick}
                    activeCommentPostId={activeCommentPostId}
                    commentText={commentText}
                    setCommentText={setCommentText}
                    onAddComment={handleAddComment}
                  />
                </div>
              )
            } else {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                  onCommentClick={handleCommentClick}
                  activeCommentPostId={activeCommentPostId}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  onAddComment={handleAddComment}
                />
              )
            }
          })
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">{activeTab === "posts" ? "No posts yet." : "No liked posts yet."}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Loading more posts...</p>
          </div>
        )}

        {!hasMore && filteredPosts.length > 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No more posts to load</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Post Card Component
interface PostCardProps {
  post: {
    id: number
    user: {
      name: string
      username: string
      avatar: string
    }
    content: string
    image?: string
    likes: number
    comments: number
    time: string
    liked: boolean
    bookmarked: boolean
  }
  onLike: (postId: number) => void
  onBookmark: (postId: number) => void
  onCommentClick: (postId: number) => void
  activeCommentPostId: number | null
  commentText: string
  setCommentText: (text: string) => void
  onAddComment: (postId: number) => void
}

function PostCard({
  post,
  onLike,
  onBookmark,
  onCommentClick,
  activeCommentPostId,
  commentText,
  setCommentText,
  onAddComment,
}: PostCardProps) {
  return (
    <HolographicCard accentColor="purple">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Link href={`/social/${post.user.username}`}>
            <img
              src={post.user.avatar || "/placeholder.svg"}
              alt={post.user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
          </Link>
          <div>
            <Link href={`/social/${post.user.username}`} className="font-semibold text-gray-800 hover:underline">
              {post.user.name}
            </Link>
            <div className="text-xs text-gray-500">
              @{post.user.username} • {post.time}
            </div>
          </div>
        </div>

        <p className="mb-4 text-gray-700">{post.content}</p>

        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
          </div>
        )}

        <div className="flex text-gray-500 pt-3 border-t border-gray-100">
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center mr-6 hover:text-pink-500 transition-colors"
          >
            <Heart size={18} className={`mr-1 ${post.liked ? "fill-pink-500 text-pink-500" : ""}`} />
            <span>{post.likes}</span>
          </button>
          <button
            onClick={() => onCommentClick(post.id)}
            className="flex items-center mr-6 hover:text-blue-500 transition-colors"
          >
            <MessageCircle size={18} className="mr-1" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center mr-6 hover:text-green-500 transition-colors">
            <Share2 size={18} className="mr-1" />
          </button>
          <button
            onClick={() => onBookmark(post.id)}
            className="flex items-center ml-auto hover:text-purple-500 transition-colors"
          >
            <Bookmark size={18} className={`${post.bookmarked ? "fill-purple-500 text-purple-500" : ""}`} />
          </button>
        </div>

        {activeCommentPostId === post.id && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-start">
              <img src="/abstract-profile.png" alt="Your Avatar" className="w-8 h-8 rounded-full mr-2" />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={2}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => onAddComment(post.id)}
                    disabled={!commentText.trim()}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
  )
}
