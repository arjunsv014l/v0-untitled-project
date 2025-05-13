"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Activity, Heart, MessageCircle, Bookmark, Share2, Send, UserPlus, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Define post type
interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  image?: string
  likes: string[]
  comments: Comment[]
  createdAt: Date
  liked: boolean
  bookmarked: boolean
}

// Define comment type
interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: Date
}

// Define trending topic type
interface TrendingTopic {
  id: string
  tag: string
  posts: number
}

// Define suggested user type
interface SuggestedUser {
  id: string
  name: string
  username: string
  avatar: string
  mutualConnections: number
  followed?: boolean
}

export default function SocialFeedPage() {
  const { user, isLoading: userLoading } = useUser()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostContent, setNewPostContent] = useState("")
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)

    // Check if user is logged in
    if (!userLoading && !user) {
      console.log("[Social] No user, redirecting to home")
      router.push("/")
      return
    }

    // Fetch mock data
    fetchMockData()
  }, [user, userLoading, router])

  const fetchMockData = () => {
    // Mock posts
    const mockPosts: Post[] = [
      {
        id: "1",
        userId: "user1",
        userName: "Alex Johnson",
        userAvatar: "/student-avatar.png",
        content: "Just finished my final project for the semester! 🎉 #StudentLife #Coding",
        image: "/diverse-students-studying.png",
        likes: ["user2", "user3"],
        comments: [
          {
            id: "c1",
            userId: "user2",
            userName: "Sam Taylor",
            userAvatar: "/abstract-profile.png",
            content: "Congrats! What was the project about?",
            createdAt: new Date(Date.now() - 3600000),
          },
        ],
        createdAt: new Date(Date.now() - 7200000),
        liked: false,
        bookmarked: false,
      },
      {
        id: "2",
        userId: "user3",
        userName: "Jordan Lee",
        userAvatar: "/abstract-profile.png",
        content:
          "Anyone else struggling with the new assignment? I could use some study partners! #HelpNeeded #StudyGroup",
        likes: ["user1", "user4"],
        comments: [],
        createdAt: new Date(Date.now() - 14400000),
        liked: true,
        bookmarked: false,
      },
      {
        id: "3",
        userId: "user4",
        userName: "Taylor Smith",
        userAvatar: "/student-avatar.png",
        content: "Just got accepted into the summer internship program! So excited for this opportunity! 🚀",
        image: "/ai-project-visualization.png",
        likes: ["user1", "user2", "user3"],
        comments: [
          {
            id: "c2",
            userId: "user5",
            userName: "Casey Wilson",
            userAvatar: "/abstract-profile.png",
            content: "That's amazing! Congratulations! 🎊",
            createdAt: new Date(Date.now() - 1800000),
          },
          {
            id: "c3",
            userId: "user1",
            userName: "Alex Johnson",
            userAvatar: "/student-avatar.png",
            content: "Which company? Tell us more!",
            createdAt: new Date(Date.now() - 900000),
          },
        ],
        createdAt: new Date(Date.now() - 28800000),
        liked: true,
        bookmarked: true,
      },
    ]

    // Add current user's post if user exists
    if (user) {
      mockPosts.unshift({
        id: "current-user-post",
        userId: user.id,
        userName: user.name || "You",
        userAvatar: user.avatar || "/student-avatar.png",
        content: "Excited to join this community! Looking forward to connecting with everyone. #NewBeginnings",
        likes: ["user2", "user3", "user4", "user5"],
        comments: [],
        createdAt: new Date(Date.now() - 1800000),
        liked: false,
        bookmarked: false,
      })
    }

    // Mock trending topics
    const mockTrendingTopics: TrendingTopic[] = [
      { id: "1", tag: "#Finals", posts: 1243 },
      { id: "2", tag: "#StudyGroup", posts: 856 },
      { id: "3", tag: "#Internship", posts: 721 },
      { id: "4", tag: "#CampusLife", posts: 532 },
      { id: "5", tag: "#CareerFair", posts: 489 },
    ]

    // Mock suggested users
    const mockSuggestedUsers: SuggestedUser[] = [
      { id: "1", name: "Morgan Chen", username: "morganchen", avatar: "/student-avatar.png", mutualConnections: 12 },
      { id: "2", name: "Jamie Wilson", username: "jamiewilson", avatar: "/abstract-profile.png", mutualConnections: 8 },
      {
        id: "3",
        name: "Casey Kim",
        username: "caseykim",
        avatar: "/diverse-student-portrait.png",
        mutualConnections: 5,
      },
    ]

    setPosts(mockPosts)
    setTrendingTopics(mockTrendingTopics)
    setSuggestedUsers(mockSuggestedUsers)
    setIsLoading(false)
  }

  // Update posts when user profile changes
  useEffect(() => {
    if (user) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.userId === user.id) {
            return {
              ...post,
              userName: user.name || post.userName,
              userAvatar: user.avatar || post.userAvatar,
            }
          }
          return post
        }),
      )
    }
  }, [user])

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !user) return

    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: user.id,
      userName: user.name || "You",
      userAvatar: user.avatar || "/student-avatar.png",
      content: newPostContent,
      likes: [],
      comments: [],
      createdAt: new Date(),
      liked: false,
      bookmarked: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.liked
          return {
            ...post,
            likes: isLiked ? post.likes.filter((id) => id !== user?.id) : [...post.likes, user?.id || "current-user"],
            liked: !isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) => {
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

  const handleAddComment = (postId: string) => {
    const commentContent = commentInputs[postId]
    if (!commentContent?.trim() || !user) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      userName: user.name || "You",
      userAvatar: user.avatar || "/student-avatar.png",
      content: commentContent,
      createdAt: new Date(),
    }

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )

    // Clear the comment input
    setCommentInputs({
      ...commentInputs,
      [postId]: "",
    })
  }

  const toggleComments = (postId: string) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId],
    })
  }

  const handleFollowUser = (userId: string) => {
    setSuggestedUsers(
      suggestedUsers.map((suggestedUser) => {
        if (suggestedUser.id === userId) {
          return { ...suggestedUser, followed: !suggestedUser.followed }
        }
        return suggestedUser
      }),
    )
  }

  // Filter posts based on active tab
  const getFilteredPosts = () => {
    if (activeTab === "feed") {
      return posts
    } else if (activeTab === "my-posts") {
      return posts.filter((post) => post.userId === user?.id)
    } else if (activeTab === "liked") {
      return posts.filter((post) => post.liked)
    }
    return posts
  }

  if (!isClient || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="md:w-1/4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={user.avatar || "/abstract-profile.png"}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{user.name || "User"}</h3>
                  <p className="text-gray-500">@{user.name?.toLowerCase().replace(/\s+/g, "") || "user"}</p>

                  <div className="flex justify-between w-full mt-4">
                    <div className="text-center">
                      <p className="font-bold">128</p>
                      <p className="text-sm text-gray-500">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">97</p>
                      <p className="text-sm text-gray-500">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{posts.filter((post) => post.userId === user.id).length}</p>
                      <p className="text-sm text-gray-500">Posts</p>
                    </div>
                  </div>

                  <Button className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics Widget */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="p-4 hover:bg-gray-50">
                      <button onClick={() => setActiveTab("feed")} className="block w-full text-left">
                        <div className="font-medium text-blue-600">{topic.tag}</div>
                        <div className="text-sm text-gray-500">{topic.posts} posts</div>
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:w-2/4">
            <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="my-posts">My Posts</TabsTrigger>
                <TabsTrigger value="liked">Liked</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-0 space-y-6">
                {/* Create Post */}
                {user && (
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/student-avatar.png"} alt={user.name || "User"} />
                        <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name || "You"}</div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Textarea
                        placeholder="What's on your mind?"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="resize-none"
                        rows={3}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                        Post
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {/* Posts */}
                {getFilteredPosts().length > 0 ? (
                  getFilteredPosts().map((post) => (
                    <Card key={post.id}>
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar>
                          <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.userName} />
                          <AvatarFallback>{post.userName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{post.userName}</div>
                          <div className="text-sm text-gray-500">
                            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line">{post.content}</p>
                        {post.image && (
                          <div className="mt-3">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post"
                              className="rounded-lg w-full object-cover max-h-96"
                            />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex flex-col">
                        <div className="flex justify-between w-full">
                          <div className="flex gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center gap-1 ${post.liked ? "text-red-500" : ""}`}
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart size={18} className={post.liked ? "fill-current" : ""} />
                              <span>{post.likes.length}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => toggleComments(post.id)}
                            >
                              <MessageCircle size={18} />
                              <span>{post.comments.length}</span>
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={post.bookmarked ? "text-blue-500" : ""}
                              onClick={() => handleBookmark(post.id)}
                            >
                              <Bookmark size={18} className={post.bookmarked ? "fill-current" : ""} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 size={18} />
                            </Button>
                          </div>
                        </div>

                        {/* Comments Section */}
                        {showComments[post.id] && (
                          <div className="mt-4 w-full">
                            {post.comments.length > 0 && (
                              <div className="space-y-3 mb-3">
                                {post.comments.map((comment) => (
                                  <div key={comment.id} className="flex gap-2">
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage
                                        src={comment.userAvatar || "/placeholder.svg"}
                                        alt={comment.userName}
                                      />
                                      <AvatarFallback>{comment.userName.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                                      <div className="flex justify-between">
                                        <div className="font-medium text-sm">{comment.userName}</div>
                                        <div className="text-xs text-gray-500">
                                          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                                        </div>
                                      </div>
                                      <p className="text-sm">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add Comment */}
                            {user && (
                              <div className="flex gap-2 items-center">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={user.avatar || "/student-avatar.png"} alt={user.name || "User"} />
                                  <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                                </Avatar>
                                <Input
                                  placeholder="Add a comment..."
                                  value={commentInputs[post.id] || ""}
                                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                  className="flex-1"
                                />
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!commentInputs[post.id]?.trim()}
                                >
                                  <Send size={18} />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-gray-500 mb-4">
                        {activeTab === "feed"
                          ? "No posts in your feed yet"
                          : activeTab === "my-posts"
                            ? "You haven't created any posts yet"
                            : "You haven't liked any posts yet"}
                      </p>
                      {activeTab === "feed" || activeTab === "my-posts" ? (
                        <Button onClick={() => setNewPostContent("Hello world!")}>Create your first post</Button>
                      ) : (
                        <Button onClick={() => setActiveTab("feed")}>Browse the feed</Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="my-posts" className="mt-0">
                {/* This content is handled by the getFilteredPosts function */}
              </TabsContent>

              <TabsContent value="liked" className="mt-0">
                {/* This content is handled by the getFilteredPosts function */}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="md:w-1/4">
            {/* Suggested Connections Widget */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  People to Follow
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {suggestedUsers.map((suggestedUser) => (
                    <div key={suggestedUser.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={suggestedUser.avatar || "/placeholder.svg"} alt={suggestedUser.name} />
                          <AvatarFallback>{suggestedUser.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{suggestedUser.name}</div>
                          <div className="text-sm text-gray-500">
                            {suggestedUser.mutualConnections} mutual connections
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={suggestedUser.followed ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleFollowUser(suggestedUser.id)}
                      >
                        {suggestedUser.followed ? "Following" : "Follow"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Discover More
                </Button>
              </CardFooter>
            </Card>

            {/* Activity Feed Widget */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/student-avatar.png" alt="Alex Johnson" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Alex Johnson</span> liked your post
                        </p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/abstract-profile.png" alt="Jordan Lee" />
                        <AvatarFallback>J</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Jordan Lee</span> started following you
                        </p>
                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/diverse-student-portrait.png" alt="Taylor Smith" />
                        <AvatarFallback>T</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Taylor Smith</span> commented on your post
                        </p>
                        <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
