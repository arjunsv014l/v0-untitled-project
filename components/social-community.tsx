"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  MessageSquare,
  Star,
  Users,
  Heart,
  Share2,
  Sparkles,
  Award,
  Zap,
  Send,
  ImageIcon,
  Smile,
  PlusCircle,
  Bell,
  UserPlus,
  Settings,
  Search,
  User,
} from "lucide-react"
import DoodleCard from "./ui-elements/doodle-card"
import DoodleButton from "./ui-elements/doodle-button"
import SignInModal from "./sign-in-modal"
import { useUser } from "@/context/user-context"

export default function SocialCommunity() {
  const [activeTab, setActiveTab] = useState("trending")
  const [newPostContent, setNewPostContent] = useState("")
  const [showComments, setShowComments] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const { user } = useUser()

  const posts = [
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "/diverse-student-group.png",
      university: "Stanford University",
      content:
        "Just finished my first semester in Computer Science! The AI course was challenging but so worth it. Anyone else taking it next term?",
      likes: 24,
      comments: [
        {
          id: 1,
          author: "Maya Patel",
          avatar: "/diverse-student-portrait.png",
          content: "I'm taking it next semester! Any tips?",
          time: "1 hour ago",
        },
        {
          id: 2,
          author: "Jordan Lee",
          avatar: "/smiling-student.png",
          content: "The final project was intense but really rewarding.",
          time: "30 minutes ago",
        },
      ],
      time: "2 hours ago",
      tags: ["ComputerScience", "AI", "FirstYear"],
      liked: false,
    },
    {
      id: 2,
      author: "Maya Patel",
      avatar: "/diverse-student-portrait.png",
      university: "University of Michigan",
      content:
        "The student club fair was amazing! Joined the robotics team and the debate club. Can't wait to meet everyone!",
      likes: 42,
      comments: [
        {
          id: 1,
          author: "Alex Johnson",
          avatar: "/diverse-student-group.png",
          content: "The robotics team is awesome! I was part of it last year.",
          time: "4 hours ago",
        },
      ],
      time: "5 hours ago",
      tags: ["ClubFair", "Robotics", "Debate"],
      liked: false,
    },
    {
      id: 3,
      author: "Jordan Lee",
      avatar: "/smiling-student.png",
      university: "NYU",
      content:
        "Pro tip for freshers: Professor Williams' Psychology 101 class fills up FAST. Set your alarm for registration day!",
      likes: 67,
      comments: [
        {
          id: 1,
          author: "Taylor R.",
          avatar: "/diverse-students-studying.png",
          content: "So true! I missed out last semester because I waited too long.",
          time: "20 hours ago",
        },
        {
          id: 2,
          author: "Sam W.",
          avatar: "/diverse-students-studying.png",
          content: "Is it really that good?",
          time: "12 hours ago",
        },
        {
          id: 3,
          author: "Jamie K.",
          avatar: "/diverse-students-studying.png",
          content: "Best class I've taken so far!",
          time: "10 hours ago",
        },
      ],
      time: "1 day ago",
      tags: ["Psychology", "Registration", "ProTip"],
      liked: false,
    },
  ]

  const [localPosts, setLocalPosts] = useState(posts)

  const featuredMembers = [
    {
      name: "Taylor R.",
      avatar: "/diverse-students-studying.png",
      university: "UC Berkeley",
      points: 1250,
      badge: "Top Contributor",
    },
    {
      name: "Sam W.",
      avatar: "/diverse-students-studying.png",
      university: "Boston College",
      points: 980,
      badge: "Helpful Guide",
    },
    {
      name: "Jamie K.",
      avatar: "/diverse-students-studying.png",
      university: "University of Texas",
      points: 875,
      badge: "Rising Star",
    },
  ]

  const handleLike = (postId: number) => {
    setLocalPosts((prevPosts) =>
      prevPosts.map((post) => {
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

  const handleSubmitComment = (postId: number) => {
    if (!commentText.trim() || !user) return

    setLocalPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: post.comments.length + 1,
            author: user.name,
            avatar: user.avatar || "/abstract-geometric-shapes.png",
            content: commentText,
            time: "Just now",
          }
          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )
    setCommentText("")
  }

  const handleSubmitPost = () => {
    if (!newPostContent.trim() || !user) return

    const newPost = {
      id: localPosts.length + 1,
      author: user.name,
      avatar: user.avatar || "/abstract-geometric-shapes.png",
      university: "Your University",
      content: newPostContent,
      likes: 0,
      comments: [],
      time: "Just now",
      tags: [],
      liked: false,
    }

    setLocalPosts([newPost, ...localPosts])
    setNewPostContent("")
  }

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-4">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-medium">Student Community</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Join Our Vibrant Student Community</h2>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Connect with students from around the world, share experiences, and earn rewards while building your
            network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* New Post Form */}
            {user ? (
              <DoodleCard className="p-6 mb-6">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden mr-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg?height=100&width=100&query=user"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <textarea
                      className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-black transition-colors resize-none"
                      placeholder="Share something with the community..."
                      rows={3}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors">
                          <ImageIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors">
                          <Smile className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors">
                          <PlusCircle className="h-5 w-5" />
                        </button>
                      </div>
                      <DoodleButton
                        size="sm"
                        variant="primary"
                        onClick={handleSubmitPost}
                        disabled={!newPostContent.trim()}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Post
                      </DoodleButton>
                    </div>
                  </div>
                </div>
              </DoodleCard>
            ) : (
              <DoodleCard className="p-6 mb-6 text-center">
                <p className="mb-4">Sign in to share your thoughts with the community</p>
                <SignInModal
                  trigger={
                    <DoodleButton variant="primary">
                      <User className="h-4 w-4 mr-2" />
                      Sign In to Post
                    </DoodleButton>
                  }
                />
              </DoodleCard>
            )}

            {/* Feed Tabs */}
            <DoodleCard className="p-6 mb-6">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("trending")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "trending" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
                  }`}
                >
                  <Sparkles className="h-4 w-4 inline mr-2" />
                  Trending
                </button>
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "recent" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
                  }`}
                >
                  <Zap className="h-4 w-4 inline mr-2" />
                  Recent
                </button>
                <div className="ml-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="pl-8 pr-4 py-1 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {localPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start mb-3">
                      <img
                        src={post.avatar || "/placeholder.svg?height=100&width=100&query=user"}
                        alt={post.author}
                        className="w-10 h-10 rounded-full border-2 border-black mr-3"
                      />
                      <div>
                        <h4 className="font-bold">{post.author}</h4>
                        <p className="text-sm text-gray-600">
                          {post.university} • {post.time}
                        </p>
                      </div>
                    </div>
                    <p className="mb-3">{post.content}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex space-x-4">
                      <button
                        className={`flex items-center ${post.liked ? "text-red-500" : "text-gray-600"} hover:text-red-500`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${post.liked ? "fill-current" : ""}`} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button
                        className="flex items-center text-gray-600 hover:text-black"
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-sm">{post.comments.length}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-black">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showComments === post.id && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="mb-3 last:mb-0">
                            <div className="flex items-start">
                              <img
                                src={comment.avatar || "/placeholder.svg?height=100&width=100&query=user"}
                                alt={comment.author}
                                className="w-8 h-8 rounded-full border-2 border-black mr-2"
                              />
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex justify-between items-start">
                                    <h5 className="font-bold text-sm">{comment.author}</h5>
                                    <span className="text-xs text-gray-500">{comment.time}</span>
                                  </div>
                                  <p className="text-sm mt-1">{comment.content}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Add Comment Form */}
                        {user ? (
                          <div className="flex items-start mt-3">
                            <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden mr-2">
                              {user.avatar ? (
                                <img
                                  src={user.avatar || "/placeholder.svg?height=100&width=100&query=user"}
                                  alt={user.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xs">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full border-2 border-gray-200 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-black transition-colors"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    handleSubmitComment(post.id)
                                  }
                                }}
                              />
                              <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                                onClick={() => handleSubmitComment(post.id)}
                              >
                                <Send className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 text-center">
                            <SignInModal
                              trigger={
                                <DoodleButton size="sm" variant="outline" className="text-sm">
                                  <User className="h-3 w-3 mr-1" />
                                  Sign in to comment
                                </DoodleButton>
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!user && (
                <SignInModal
                  trigger={
                    <DoodleButton variant="primary" className="w-full mt-6">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Join the Conversation
                    </DoodleButton>
                  }
                />
              )}
            </DoodleCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card (if logged in) */}
            {user && (
              <DoodleCard className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-black overflow-hidden mr-4">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg?height=100&width=100&query=user"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="font-bold">0</p>
                    <p className="text-xs text-gray-600">Posts</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="font-bold">0</p>
                    <p className="text-xs text-gray-600">Followers</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="font-bold">0</p>
                    <p className="text-xs text-gray-600">Following</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <DoodleButton size="sm" variant="outline" className="flex-1">
                    <Bell className="h-4 w-4 mr-1" />
                    Notifications
                  </DoodleButton>
                  <DoodleButton size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </DoodleButton>
                </div>
              </DoodleCard>
            )}

            {/* Community Stats */}
            <DoodleCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-gray-600">Universities</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">25K+</p>
                  <p className="text-sm text-gray-600">Posts</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">$50K+</p>
                  <p className="text-sm text-gray-600">Rewards Given</p>
                </div>
              </div>
            </DoodleCard>

            {/* Featured Members */}
            <DoodleCard className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Featured Members</h3>
                <button className="text-sm text-gray-600 hover:text-black">See All</button>
              </div>
              <div className="space-y-4">
                {featuredMembers.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={member.avatar || "/placeholder.svg?height=100&width=100&query=user"}
                      alt={member.name}
                      className="w-12 h-12 rounded-full border-2 border-black mr-3"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.university}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm font-medium">
                        <Award className="h-4 w-4 mr-1 text-yellow-500" />
                        {member.points}
                      </div>
                      <p className="text-xs text-gray-600">{member.badge}</p>
                    </div>
                  </div>
                ))}
              </div>
              <DoodleButton size="sm" variant="outline" className="w-full mt-4">
                <UserPlus className="h-4 w-4 mr-1" />
                Find People to Follow
              </DoodleButton>
            </DoodleCard>

            {/* Student Influencer Opportunities */}
            <DoodleCard className="p-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Become A Student Influencer</h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FFD700"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="text-gray-700 mb-4">
                  Share your authentic college experiences and grow your influence while earning rewards!
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-gray-100 mb-4">
                  <h4 className="font-bold text-sm mb-2">What you get:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 text-purple-500"
                      >
                        <path
                          d="M5 12L9 16L19 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Grow your social media following</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 text-purple-500"
                      >
                        <path
                          d="M5 12L9 16L19 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Connect with premium brands</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 text-purple-500"
                      >
                        <path
                          d="M5 12L9 16L19 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Earn rewards and exclusive opportunities</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 text-purple-500"
                      >
                        <path
                          d="M5 12L9 16L19 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Build your personal brand</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-3">
                      <img
                        src="/diverse-student-portrait.png"
                        alt="Student"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <img
                        src="/smiling-student.png"
                        alt="Student"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <img
                        src="/diverse-students-studying.png"
                        alt="Student"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    </div>
                    <span className="text-xs text-gray-600">+150 students became influencers this month</span>
                  </div>
                  <span className="text-xs font-bold text-green-600">↑ 24%</span>
                </div>

                <DoodleButton size="sm" variant="primary" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Apply to become an influencer
                </DoodleButton>
              </motion.div>
            </DoodleCard>
          </div>
        </div>
      </div>
    </section>
  )
}
