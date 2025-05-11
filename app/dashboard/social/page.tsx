"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import {
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  Search,
  ImageIcon,
  Smile,
  Send,
  Bell,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

export default function SocialFeedPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsClient(true)

    // Check if user is logged in
    if (!isLoading && !user) {
      router.push("/")
      return
    }
  }, [user, isLoading, router])

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Emma Wilson",
        avatar: "/student-avatar.png",
        username: "@emmaw",
        isFollowing: true,
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
        avatar: "/abstract-profile.png",
        username: "@alexj",
        isFollowing: false,
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
        avatar: "/diverse-student-profiles.png",
        username: "@studentcommunity",
        isFollowing: true,
      },
      content:
        "Reminder: The career fair is next Tuesday at the University Center from 10AM to 4PM. Over 50 companies will be recruiting for internships and full-time positions! #CareerFair #Opportunities",
      likes: 89,
      comments: 24,
      time: "3h ago",
      liked: false,
      bookmarked: false,
    },
  ])

  const [newPostText, setNewPostText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPostText.trim()) return

    setIsSubmitting(true)

    // Simulate network delay
    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        user: {
          name: user?.name || "Current User",
          avatar: user?.avatar || "/abstract-profile.png",
          username: "@" + (user?.name || "user").toLowerCase().replace(/\s+/g, ""),
          isFollowing: false,
        },
        content: newPostText,
        likes: 0,
        comments: 0,
        time: "Just now",
        liked: false,
        bookmarked: false,
      }

      setPosts([newPost, ...posts])
      setNewPostText("")
      setIsSubmitting(false)
    }, 1000)
  }

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
    setPosts((prev) =>
      prev.map((post) => {
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
  }

  const handleFollow = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            user: {
              ...post.user,
              isFollowing: !post.user.isFollowing,
            },
          }
        }
        return post
      }),
    )
  }

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
    { id: 1, name: "Jordan Lee", major: "Computer Science", avatar: "/student-avatar.png", isFollowing: false },
    { id: 2, name: "Taylor Kim", major: "Business Analytics", avatar: "/abstract-profile.png", isFollowing: false },
    {
      id: 3,
      name: "Morgan Smith",
      major: "Graphic Design",
      avatar: "/diverse-student-portrait.png",
      isFollowing: false,
    },
  ]

  const [suggestedPeople, setSuggestedPeople] = useState(suggestedStudents)

  const handleFollowSuggested = (id: number) => {
    setSuggestedPeople((prev) =>
      prev.map((person) => {
        if (person.id === id) {
          return {
            ...person,
            isFollowing: !person.isFollowing,
          }
        }
        return person
      }),
    )
  }

  // Notifications
  const notifications = [
    {
      id: 1,
      user: "Emma Wilson",
      action: "liked your post",
      time: "2m ago",
      avatar: "/student-avatar.png",
      read: false,
    },
    {
      id: 2,
      user: "James Rodriguez",
      action: "commented on your post",
      time: "1h ago",
      avatar: "/abstract-profile.png",
      read: false,
    },
    {
      id: 3,
      user: "Taylor Kim",
      action: "started following you",
      time: "3h ago",
      avatar: "/abstract-profile.png",
      read: true,
    },
    {
      id: 4,
      user: "Student Community",
      action: "mentioned you in a post",
      time: "1d ago",
      avatar: "/diverse-student-profiles.png",
      read: true,
    },
  ]

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading social feed...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header with search and notifications */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 truncate">Social Feed</h1>
              </div>
              <div className="flex items-center ml-4 space-x-4">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    placeholder="Search posts, people..."
                    className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 ${notification.read ? "" : "bg-blue-50"}`}
                          >
                            <div className="flex items-start">
                              <img
                                src={notification.avatar || "/placeholder.svg"}
                                alt={notification.user}
                                className="h-10 w-10 rounded-full mr-3"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">
                                  <span className="font-medium">{notification.user}</span> {notification.action}
                                </p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200 text-center">
                        <button className="text-sm text-blue-600 hover:text-blue-800">View all notifications</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center text-sm focus:outline-none"
                  >
                    <img
                      src={user.avatar || "/abstract-profile.png"}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("feed")}
                    className={`flex-1 py-3 text-sm font-medium text-center ${
                      activeTab === "feed"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    For You
                  </button>
                  <button
                    onClick={() => setActiveTab("trending")}
                    className={`flex-1 py-3 text-sm font-medium text-center ${
                      activeTab === "trending"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Trending
                  </button>
                  <button
                    onClick={() => setActiveTab("following")}
                    className={`flex-1 py-3 text-sm font-medium text-center ${
                      activeTab === "following"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Following
                  </button>
                </div>
              </div>

              {/* Create Post */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <form onSubmit={handleCreatePost}>
                  <div className="flex items-start space-x-3">
                    <img
                      src={user.avatar || "/abstract-profile.png"}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <textarea
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder="What's on your mind?"
                        rows={3}
                        className="block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      ></textarea>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <ImageIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Smile className="h-5 w-5" />
                          </button>
                        </div>
                        <button
                          type="submit"
                          disabled={!newPostText.trim() || isSubmitting}
                          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                          {isSubmitting ? "Posting..." : "Post"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.user.avatar || "/placeholder.svg"}
                            alt={post.user.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">{post.user.name}</span>
                              {post.user.username !== `@${user.name?.toLowerCase().replace(/\s+/g, "")}` && (
                                <button
                                  onClick={() => handleFollow(post.id)}
                                  className={`ml-2 text-xs font-medium ${
                                    post.user.isFollowing
                                      ? "text-gray-500 hover:text-gray-700"
                                      : "text-blue-600 hover:text-blue-800"
                                  }`}
                                >
                                  {post.user.isFollowing ? "Following" : "Follow"}
                                </button>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{post.user.username}</span>
                              <span className="mx-1">•</span>
                              <span>{post.time}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-3">
                        <p className="text-gray-900 whitespace-pre-line">{post.content}</p>
                        {post.image && (
                          <div className="mt-3 rounded-lg overflow-hidden">
                            <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-1 ${
                              post.liked ? "text-red-500" : "text-gray-500 hover:text-gray-600"
                            }`}
                          >
                            <Heart className={`h-5 w-5 ${post.liked ? "fill-red-500" : ""}`} />
                            <span>{post.likes}</span>
                          </button>
                          <button
                            onClick={() => handleCommentClick(post.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-gray-600"
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-600">
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={post.bookmarked ? "text-blue-600" : "text-gray-500 hover:text-gray-600"}
                        >
                          <Bookmark className={`h-5 w-5 ${post.bookmarked ? "fill-blue-600" : ""}`} />
                        </button>
                      </div>

                      {activeCommentPostId === post.id && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-start space-x-3">
                            <img
                              src={user.avatar || "/abstract-profile.png"}
                              alt={user.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="relative">
                                <textarea
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  placeholder="Write a comment..."
                                  rows={2}
                                  className="block w-full rounded-lg border border-gray-300 p-3 pr-12 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                ></textarea>
                                <button
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!commentText.trim()}
                                  className="absolute right-2 bottom-2 rounded-full p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-transparent"
                                >
                                  <Send className="h-5 w-5" />
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
              {/* User Profile Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="px-4 pb-4">
                  <div className="flex justify-between -mt-10">
                    <img
                      src={user.avatar || "/abstract-profile.png"}
                      alt={user.name}
                      className="h-20 w-20 rounded-full border-4 border-white"
                    />
                    <Link
                      href="/dashboard/profile"
                      className="mt-10 inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Edit Profile
                    </Link>
                  </div>
                  <div className="mt-2">
                    <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-500">@{user.name?.toLowerCase().replace(/\s+/g, "")}</p>
                  </div>
                  <div className="mt-4 flex space-x-4 text-sm">
                    <div>
                      <span className="font-bold text-gray-900">42</span> <span className="text-gray-500">Posts</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">128</span>{" "}
                      <span className="text-gray-500">Followers</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">97</span>{" "}
                      <span className="text-gray-500">Following</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Now */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Trending Now</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {trendingHashtags.map((hashtag, index) => (
                    <div key={index} className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                          {hashtag.tag}
                        </a>
                        <span className="text-sm text-gray-500">{hashtag.posts} posts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who to Follow */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Who to Follow</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {suggestedPeople.map((person) => (
                    <div key={person.id} className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={person.avatar || "/placeholder.svg"}
                            alt={person.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.major}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFollowSuggested(person.id)}
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            person.isFollowing
                              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {person.isFollowing ? "Following" : "Follow"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-200 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Show more</button>
                </div>
              </div>

              {/* Chat Widget */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Messages</h2>
                </div>
                <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src="/student-avatar.png" alt="Emma Wilson" className="h-10 w-10 rounded-full" />
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">Emma Wilson</p>
                        <p className="text-sm text-gray-500 truncate">
                          Did you get the notes from yesterday's lecture?
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">10:30 AM</div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src="/abstract-profile.png" alt="James Rodriguez" className="h-10 w-10 rounded-full" />
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-gray-300 ring-2 ring-white"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">James Rodriguez</p>
                        <p className="text-sm text-gray-500 truncate">That's awesome! Can you share your project?</p>
                      </div>
                      <div className="text-xs text-gray-500">Yesterday</div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 text-center">
                  <Link href="/dashboard/messages" className="text-sm text-blue-600 hover:text-blue-800">
                    View all messages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
