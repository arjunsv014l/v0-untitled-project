"use client"

import { motion } from "framer-motion"
import {
  Award,
  Users,
  Zap,
  Star,
  Briefcase,
  Building,
  MessageSquare,
  Heart,
  Share2,
  Sparkles,
  ImageIcon,
  Smile,
  PlusCircle,
  Bell,
  UserPlus,
  Settings,
  Search,
  User,
  Send,
} from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"
import DoodleCard from "./ui-elements/doodle-card"
import { useState } from "react"
import SignInModal from "./sign-in-modal"
import { useUser } from "@/context/user-context"

const CampusInfluenceProgram = () => {
  const { user: contextUser } = useUser()
  const [activeTab, setActiveTab] = useState("trending")
  const [newPostContent, setNewPostContent] = useState("")
  const [showComments, setShowComments] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const user = contextUser || null

  const opportunities = [
    {
      id: 1,
      company: "TechWizards Inc.",
      logo: "/diverse-student-group.png",
      position: "Software Engineering Internship",
      content:
        "Looking for passionate computer science students for our summer internship program. Work on real projects with our engineering team in our innovation hub!",
      likes: 124,
      comments: [],
      time: "2 days ago",
      tags: ["Tech", "Internship", "SoftwareEngineering"],
      liked: false,
      deadline: "April 15, 2025",
      location: "Innovation District",
    },
    {
      id: 2,
      company: "FinanceGurus Group",
      logo: "/diverse-student-portrait.png",
      position: "Finance Leadership Program",
      content:
        "Our 2-year rotational program gives business and finance graduates hands-on experience across multiple departments. Competitive salary and mentorship included.",
      likes: 98,
      comments: [],
      time: "5 days ago",
      tags: ["Finance", "Leadership", "GraduateProgram"],
      liked: false,
      deadline: "November 30, 2024",
      location: "Business District",
    },
    {
      id: 3,
      company: "HealthTech Innovations",
      logo: "/smiling-student.png",
      position: "Research Assistant - Biotech",
      content:
        "Join our cutting-edge research team working on breakthrough medical technologies. Perfect for biology, chemistry, and bioengineering students.",
      likes: 167,
      comments: [],
      time: "1 week ago",
      tags: ["Healthcare", "Research", "Biotech"],
      liked: false,
      deadline: "Rolling applications",
      location: "Science Park",
    },
  ]

  const [localOpportunities, setLocalOpportunities] = useState(opportunities)

  const featuredMembers = [
    {
      name: "Digital Dynamo",
      avatar: "/diverse-students-studying.png",
      university: "Tech University",
      points: 1250,
      badge: "Top Contributor",
    },
    {
      name: "Quantum Coder",
      avatar: "/diverse-student-portraits.png",
      university: "Innovation College",
      points: 980,
      badge: "Helpful Guide",
    },
    {
      name: "Data Ninja",
      avatar: "/diverse-students-studying.png",
      university: "Future University",
      points: 875,
      badge: "Rising Star",
    },
  ]

  const handleLike = (postId: number) => {
    setLocalOpportunities((prevOpportunities) =>
      prevOpportunities.map((opportunity) => {
        if (opportunity.id === postId) {
          return {
            ...opportunity,
            likes: opportunity.liked ? opportunity.likes - 1 : opportunity.likes + 1,
            liked: !opportunity.liked,
          }
        }
        return opportunity
      }),
    )
  }

  const handleSubmitComment = (postId: number) => {
    if (!commentText.trim() || !user) return

    setLocalOpportunities((prevOpportunities) =>
      prevOpportunities.map((opportunity) => {
        if (opportunity.id === postId) {
          const newComment = {
            id: opportunity.comments.length + 1,
            author: user.name,
            avatar: user.avatar || "/placeholder.svg",
            content: commentText,
            time: "Just now",
          }
          return {
            ...opportunity,
            comments: [...opportunity.comments, newComment],
          }
        }
        return opportunity
      }),
    )
    setCommentText("")
  }

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black relative overflow-hidden bg-gradient-to-b from-white to-pink-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 20C50 10 80 30 80 50C80 70 50 90 20 80C-10 70 -10 30 20 20Z" stroke="black" strokeWidth="0.5" />
          <path
            d="M80 20C110 10 140 30 140 50C140 70 110 90 80 80C50 70 50 30 80 20Z"
            stroke="black"
            strokeWidth="0.5"
          />
          <path
            d="M20 80C50 70 80 90 80 110C80 130 50 150 20 140C-10 130 -10 90 20 80Z"
            stroke="black"
            strokeWidth="0.5"
          />
          <path
            d="M80 80C110 70 140 90 140 110C140 130 110 150 80 140C50 130 50 90 80 80Z"
            stroke="black"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-[10%] opacity-10 hidden md:block"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Star className="h-16 w-16 text-[#EC4899]" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-[5%] opacity-10 hidden md:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Award className="h-14 w-14 text-[#8B5CF6]" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            network. Get direct access to industry opportunities and build your personal brand.
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
                        src={user.avatar || "/placeholder.svg"}
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
                      <SignInModal
                        trigger={
                          <DoodleButton className="px-4 py-2 text-sm" disabled={!newPostContent.trim()}>
                            <Send className="h-4 w-4 mr-1" />
                            Post
                          </DoodleButton>
                        }
                        isRegister={true}
                      />
                    </div>
                  </div>
                </div>
              </DoodleCard>
            ) : (
              <DoodleCard className="p-6 mb-6 text-center">
                <p className="mb-4">Register to share your thoughts with the community</p>
                <SignInModal
                  trigger={
                    <DoodleButton>
                      <User className="h-4 w-4 mr-2" />
                      Register Now
                    </DoodleButton>
                  }
                  isRegister={true}
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
                {localOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start mb-3">
                      <img
                        src={opportunity.logo || "/placeholder.svg"}
                        alt={opportunity.company}
                        className="w-10 h-10 rounded-full border-2 border-black mr-3"
                      />
                      <div>
                        <h4 className="font-bold">{opportunity.company}</h4>
                        <p className="text-sm text-gray-600">
                          {opportunity.position} • {opportunity.time}
                        </p>
                      </div>
                    </div>
                    <p className="mb-3">{opportunity.content}</p>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center mb-1">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">Deadline: {opportunity.deadline}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm">{opportunity.location}</span>
                      </div>
                    </div>
                    {opportunity.tags && opportunity.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.tags.map((tag, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex space-x-4">
                      <SignInModal
                        trigger={
                          <button
                            className={`flex items-center ${
                              opportunity.liked ? "text-red-500" : "text-gray-600"
                            } hover:text-red-500`}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${opportunity.liked ? "fill-current" : ""}`} />
                            <span className="text-sm">{opportunity.likes}</span>
                          </button>
                        }
                        isRegister={true}
                      />
                      <SignInModal
                        trigger={
                          <button className="flex items-center text-gray-600 hover:text-black">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-sm">{opportunity.comments.length}</span>
                          </button>
                        }
                        isRegister={true}
                      />
                      <SignInModal
                        trigger={
                          <button className="flex items-center text-gray-600 hover:text-black">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">Share</span>
                          </button>
                        }
                        isRegister={true}
                      />
                    </div>

                    {/* Comments Section */}
                    {showComments === opportunity.id && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        {opportunity.comments.length > 0 ? (
                          opportunity.comments.map((comment) => (
                            <div key={comment.id} className="mb-3 last:mb-0">
                              <div className="flex items-start">
                                <img
                                  src={comment.avatar || "/placeholder.svg"}
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
                          ))
                        ) : (
                          <p className="text-center text-gray-500 py-3">No comments yet. Be the first to comment!</p>
                        )}

                        {/* Add Comment Form */}
                        {user ? (
                          <div className="flex items-start mt-3">
                            <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden mr-2">
                              {user.avatar ? (
                                <img
                                  src={user.avatar || "/placeholder.svg"}
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
                                    handleSubmitComment(opportunity.id)
                                  }
                                }}
                              />
                              <SignInModal
                                trigger={
                                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black">
                                    <Send className="h-4 w-4" />
                                  </button>
                                }
                                isRegister={true}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 text-center">
                            <SignInModal
                              trigger={
                                <DoodleButton className="text-sm px-4 py-2">
                                  <User className="h-3 w-3 mr-1" />
                                  Register Now
                                </DoodleButton>
                              }
                              isRegister={true}
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
                    <DoodleButton className="w-full mt-6">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Join the Conversation
                    </DoodleButton>
                  }
                  isRegister={true}
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
                        src={user.avatar || "/placeholder.svg"}
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
                    <p className="text-sm text-gray-600">{user.role || "Student"}</p>
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
                  <SignInModal
                    trigger={
                      <DoodleButton className="flex-1 text-sm px-3 py-2">
                        <Bell className="h-4 w-4 mr-1" />
                        Notifications
                      </DoodleButton>
                    }
                    isRegister={true}
                  />
                  <SignInModal
                    trigger={
                      <DoodleButton className="flex-1 text-sm px-3 py-2">
                        <Settings className="h-4 w-4 mr-1" />
                        Settings
                      </DoodleButton>
                    }
                    isRegister={true}
                  />
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
                      src={member.avatar || "/placeholder.svg"}
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
              <SignInModal
                trigger={
                  <DoodleButton className="w-full mt-4 text-sm px-4 py-2">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Find People to Follow
                  </DoodleButton>
                }
                isRegister={true}
              />
            </DoodleCard>

            {/* Measuring Your Career */}
            <DoodleCard className="p-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Measuring Your Carrier</h3>
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
                  Connect with industry opportunities directly and build your personal brand while showcasing your
                  skills and experiences.
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-gray-100 mb-4">
                  <h4 className="font-bold text-sm mb-2">Direct Industry Opportunities:</h4>
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
                      <span>Access exclusive internship opportunities</span>
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
                      <span>Connect with recruiters from top companies</span>
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
                      <span>Showcase your skills to potential employers</span>
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
                      <span>Become your own brand promoter</span>
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
                    <span className="text-xs text-gray-600">Join our growing community today</span>
                  </div>
                  <span className="text-xs font-bold text-green-600">↑ 24%</span>
                </div>

                <SignInModal
                  trigger={
                    <DoodleButton className="w-full text-sm px-4 py-2">
                      <Star className="h-4 w-4 mr-2" />
                      Learn More
                    </DoodleButton>
                  }
                  isRegister={true}
                />
              </motion.div>
            </DoodleCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CampusInfluenceProgram
