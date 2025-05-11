"use client"

import type React from "react"

import { useState } from "react"
import {
  MessageCircle,
  Heart,
  TrendingUp,
  Clock,
  Bookmark,
  Share2,
  MoreHorizontal,
  ImageIcon,
  Smile,
} from "lucide-react"

export default function SocialFeed() {
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

  const handleBookmark = (postId: number) => {
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter((id) => id !== postId))
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId])
    }
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

  // Trending hashtags
  const trendingHashtags = [
    { tag: "#Finals", posts: 1243 },
    { tag: "#StudyGroup", posts: 856 },
    { tag: "#Internship", posts: 721 },
    { tag: "#CampusLife", posts: 532 },
    { tag: "#CareerFair", posts: 489 },
  ]

  // Suggested students
  const suggestedStudents = [
    { name: "Jordan Lee", major: "Computer Science", avatar: "/student-avatar.png" },
    { name: "Taylor Kim", major: "Business Analytics", avatar: "/abstract-profile.png" },
    { name: "Morgan Smith", major: "Graphic Design", avatar: "/diverse-student-portrait.png" },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-bw-black mb-6">Social Feed</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  flex items-center px-4 py-2 rounded-full whitespace-nowrap
                  ${
                    activeFilter === filter.id
                      ? "bg-bw-black text-bw-white"
                      : "bg-bw-white border border-bw-gray-300 text-bw-gray-700 hover:bg-bw-gray-100"
                  }
                `}
              >
                {filter.icon && <filter.icon size={16} className="mr-2" />}
                {filter.label}
              </button>
            ))}
          </div>

          {/* Create Post */}
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4 mb-6">
            <form onSubmit={handleCreatePost}>
              <div className="flex items-start mb-3">
                <img src="/abstract-profile.png" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  className="flex-1 p-3 border border-bw-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-bw-black"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="p-2 text-bw-gray-600 hover:text-bw-black hover:bg-bw-gray-100 rounded-full"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-bw-gray-600 hover:text-bw-black hover:bg-bw-gray-100 rounded-full"
                  >
                    <Smile size={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newPostText.trim() || isSubmitting}
                  className="px-4 py-2 bg-bw-black text-bw-white rounded-lg hover:bg-bw-gray-800 disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-bw-white border border-bw-gray-200 rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-semibold text-bw-black">{post.user.name}</div>
                        <div className="text-xs text-bw-gray-500">
                          {post.user.username} • {post.time}
                        </div>
                      </div>
                    </div>
                    <button className="text-bw-gray-500 hover:text-bw-black">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <p className="mb-4 text-bw-gray-800">{post.content}</p>

                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
                    </div>
                  )}

                  <div className="flex text-bw-gray-500 pt-3 border-t border-bw-gray-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center mr-6 hover:text-bw-black transition-colors"
                    >
                      <Heart size={18} className={`mr-1 ${post.liked ? "fill-bw-black text-bw-black" : ""}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => handleCommentClick(post.id)}
                      className="flex items-center mr-6 hover:text-bw-black transition-colors"
                    >
                      <MessageCircle size={18} className="mr-1" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center mr-6 hover:text-bw-black transition-colors">
                      <Share2 size={18} className="mr-1" />
                    </button>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className="flex items-center ml-auto hover:text-bw-black transition-colors"
                    >
                      <Bookmark
                        size={18}
                        className={bookmarkedPosts.includes(post.id) ? "fill-bw-black text-bw-black" : ""}
                      />
                    </button>
                  </div>

                  {activeCommentPostId === post.id && (
                    <div className="mt-3 pt-3 border-t border-bw-gray-100">
                      <div className="flex items-start">
                        <img src="/abstract-profile.png" alt="Your Avatar" className="w-8 h-8 rounded-full mr-2" />
                        <div className="flex-1">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="w-full p-2 border border-bw-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bw-black"
                            rows={2}
                          ></textarea>
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => handleAddComment(post.id)}
                              disabled={!commentText.trim()}
                              className="px-3 py-1 bg-bw-black text-bw-white text-sm rounded-lg hover:bg-bw-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Now */}
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-bw-black">Trending Now</h2>
            <div className="space-y-3">
              {trendingHashtags.map((hashtag, index) => (
                <div key={index} className="flex justify-between items-center">
                  <a href="#" className="text-bw-black hover:underline">
                    {hashtag.tag}
                  </a>
                  <span className="text-sm text-bw-gray-500">{hashtag.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions For You */}
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-bw-black">Suggestions For You</h2>
            <div className="space-y-4">
              {suggestedStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-bw-black">{student.name}</p>
                      <p className="text-sm text-bw-gray-500">{student.major}</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-bw-black hover:underline">Follow</button>
                </div>
              ))}
            </div>
          </div>

          {/* Poll Widget */}
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-bw-black">Poll: Study Habits</h2>
            <p className="mb-3 text-bw-gray-700">How many hours do you study per day?</p>
            <div className="space-y-2">
              <button className="w-full p-2 text-left border border-bw-gray-300 rounded hover:bg-bw-gray-100 transition-colors">
                Less than 1 hour
              </button>
              <button className="w-full p-2 text-left border border-bw-gray-300 rounded hover:bg-bw-gray-100 transition-colors">
                1-2 hours
              </button>
              <button className="w-full p-2 text-left border border-bw-gray-300 rounded hover:bg-bw-gray-100 transition-colors">
                3-4 hours
              </button>
              <button className="w-full p-2 text-left border border-bw-gray-300 rounded hover:bg-bw-gray-100 transition-colors">
                5+ hours
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
