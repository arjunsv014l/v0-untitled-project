"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, Heart, TrendingUp, Clock, Bookmark } from "lucide-react"
import HolographicCard from "../ui/holographic-card"

export default function FeedSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([])

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Emma Wilson",
        avatar: "/student-avatar.png",
        username: "@emmaw",
      },
      content:
        "Just submitted my research paper on climate change and its effects on agricultural practices! 📝 #ClimateChange #Research",
      image: "/climate-change-data-visualization.png",
      likes: 47,
      comments: 13,
      time: "1h ago",
      liked: false,
    },
    {
      id: 2,
      user: {
        name: "Alex Johnson",
        avatar: "/abstract-profile.png",
        username: "@alexj",
      },
      content:
        "Just finished my final project for the AI course! 🎉 The neural network model achieved 94% accuracy on the test dataset. #AI #MachineLearning",
      image: "/ai-project-visualization.png",
      likes: 42,
      comments: 8,
      time: "2h ago",
      liked: false,
    },
    {
      id: 3,
      user: {
        name: "Student Community",
        avatar: "/diverse-student-profiles.png",
        username: "@studentcommunity",
      },
      content:
        "Reminder: The career fair is next Tuesday at the University Center from 10AM to 4PM. Over 50 companies will be recruiting for internships and full-time positions! #CareerFair #Opportunities",
      likes: 89,
      comments: 24,
      time: "3h ago",
      liked: false,
    },
  ])

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

  const [newPostText, setNewPostText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPostText.trim()) return

    setIsSubmitting(true)

    // Simulate network delay
    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        user: {
          name: "Alex Johnson",
          avatar: "/abstract-profile.png",
          username: "@alexj",
        },
        content: newPostText,
        likes: 0,
        comments: 0,
        time: "Just now",
        liked: false,
      }

      setPosts([newPost, ...posts])
      setNewPostText("")
      setIsSubmitting(false)
    }, 1000)
  }

  const filters = [
    { id: "all", label: "All" },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "latest", label: "Latest", icon: Clock },
    { id: "saved", label: "Saved", icon: Bookmark },
  ]

  // Filter posts based on active filter
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "saved") {
      return bookmarkedPosts.includes(post.id)
    }
    return true
  })

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Feed</h1>

      {/* Create Post */}
      <HolographicCard className="mb-6" accentColor="blue">
        <div className="p-4">
          <form onSubmit={handleCreatePost}>
            <div className="flex items-start mb-3">
              <img src="/abstract-profile.png" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <div>{/* Future feature: Add buttons for uploading images, etc. */}</div>
              <button
                type="submit"
                disabled={!newPostText.trim() || isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </HolographicCard>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <HolographicCard key={post.id} accentColor="blue">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <img
                  src={post.user.avatar || "/placeholder.svg"}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-800">{post.user.name}</div>
                  <div className="text-xs text-gray-500">
                    {post.user.username} • {post.time}
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
                    <img src="/abstract-profile.png" alt="Your Avatar" className="w-8 h-8 rounded-full mr-2" />
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
    </div>
  )
}
