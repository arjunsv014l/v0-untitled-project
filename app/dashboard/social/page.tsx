"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { ArrowLeft, Send, Heart, MessageCircle, Share2 } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Textarea } from "@/components/ui/textarea"

export default function SocialFeedPage() {
  const { user } = useUser()
  const router = useRouter()
  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("social_posts")
      .select(`
        *,
        profiles:user_id (
          name,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false })

    if (data) {
      setPosts(data)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.trim() || !user) return

    setIsPosting(true)
    try {
      const { data, error } = await supabase
        .from("social_posts")
        .insert({
          user_id: user.id,
          content: newPost,
          likes: 0,
          comments_count: 0,
        })
        .select()
        .single()

      if (data) {
        setNewPost("")
        fetchPosts()
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Social Feed</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Post */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <DoodleCard className="p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full resize-none border-0 focus:ring-0 p-0 text-lg"
                  rows={3}
                />
                <div className="mt-4 flex justify-end">
                  <DoodleButton onClick={handleCreatePost} disabled={!newPost.trim() || isPosting} size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </DoodleButton>
                </div>
              </div>
            </div>
          </DoodleCard>
        </motion.div>

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg mb-4">No posts yet. Be the first to share something!</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DoodleCard className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                      {post.profiles?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{post.profiles?.name || "Anonymous"}</h3>
                        <span className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex items-center space-x-6 text-gray-500">
                        <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                          <Heart className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments_count}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
