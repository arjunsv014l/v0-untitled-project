"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Bookmark, Share2, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Define post type
interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  image?: string
  likes: number
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

export default function SocialFeed() {
  const { user } = useUser()
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostContent, setNewPostContent] = useState("")
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Generate mock posts on component mount
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: "1",
        userId: "user1",
        userName: "Alex Johnson",
        userAvatar: "/student-avatar.png",
        content: "Just finished my final project for the semester! 🎉 #StudentLife #Coding",
        image: "/diverse-students-studying.png",
        likes: 24,
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
        likes: 15,
        comments: [],
        createdAt: new Date(Date.now() - 14400000),
        liked: false,
        bookmarked: false,
      },
      {
        id: "3",
        userId: "user4",
        userName: "Taylor Smith",
        userAvatar: "/student-avatar.png",
        content: "Just got accepted into the summer internship program! So excited for this opportunity! 🚀",
        image: "/ai-project-visualization.png",
        likes: 42,
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
        likes: 5,
        comments: [],
        createdAt: new Date(Date.now() - 1800000),
        liked: false,
        bookmarked: false,
      })
    }

    setPosts(mockPosts)
    setIsLoading(false)
  }, [user])

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
      likes: 0,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
              <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.userName} />
              <AvatarFallback>{post.userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.userName}</div>
              <div className="text-sm text-gray-500">{formatDistanceToNow(post.createdAt, { addSuffix: true })}</div>
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
                  <span>{post.likes}</span>
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
                          <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
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
      ))}

      {posts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No posts yet</p>
            <Button onClick={() => setNewPostContent("Hello world!")}>Create your first post</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
