"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, MessageCircle, Users, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleCard from "@/components/ui-elements/doodle-card"
import ChatInterface from "@/components/chat/chat-interface"
import { useUser } from "@/context/user-context"
import AuthWrapper from "@/components/auth-wrapper"
import { getUserChats } from "@/lib/supabase-db"
import { supabase } from "@/lib/supabase"

interface Chat {
  id: string
  participants: string[]
  last_message?: string
  last_message_time?: string
  created_at: string
  other_user?: {
    id: string
    name: string
    avatar_url?: string
  }
}

interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
}

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    const fetchChatsAndUsers = async () => {
      try {
        setLoading(true)

        // Fetch user's chats with other user details
        const userChats = await getUserChats(user.id)
        setChats(userChats)

        // Fetch all users for the user list
        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select("id, name, email, avatar_url")
          .neq("id", user.id)

        if (usersError) {
          console.error("Error fetching users:", usersError)
        } else {
          setUsers(usersData || [])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChatsAndUsers()

    // Set up real-time subscription for chat updates
    const channel = supabase
      .channel("public:chats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
          filter: `participants=cs.{${user.id}}`,
        },
        async () => {
          // Refresh chats when there's an update
          const updatedChats = await getUserChats(user.id)
          setChats(updatedChats)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const startNewChat = (selectedUser: User) => {
    // Create a temporary chat object for the interface
    const newChat: Chat = {
      id: `temp-${selectedUser.id}`,
      participants: [user!.id, selectedUser.id],
      created_at: new Date().toISOString(),
      other_user: {
        id: selectedUser.id,
        name: selectedUser.name,
        avatar_url: selectedUser.avatar_url,
      },
    }
    setSelectedChat(newChat)
  }

  if (loading) {
    return (
      <AuthWrapper>
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper>
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <DoodleBackground className="pt-24 pb-16" density="low">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
                <Home className="h-5 w-5" />
              </Link>
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
                <span className="font-medium">Messages</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect & Chat</h1>

              <p className="text-lg text-gray-700 mb-8">
                Start conversations with fellow students and build your network.
              </p>
            </div>
          </div>
        </DoodleBackground>

        {/* Messages Interface */}
        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar - Chats and Users */}
              <div className="lg:col-span-1">
                <DoodleCard className="p-6 h-[600px] flex flex-col">
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    {/* Recent Chats */}
                    {chats.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-bold mb-3 flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Recent Chats
                        </h3>
                        <div className="space-y-2">
                          {chats.map((chat) => (
                            <button
                              key={chat.id}
                              onClick={() => setSelectedChat(chat)}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                selectedChat?.id === chat.id
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                                  {chat.other_user?.avatar_url ? (
                                    <img
                                      src={chat.other_user.avatar_url || "/placeholder.svg"}
                                      alt={chat.other_user.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="font-bold">{chat.other_user?.name.charAt(0).toUpperCase()}</span>
                                  )}
                                </div>
                                <div className="flex-grow min-w-0">
                                  <p className="font-medium truncate">{chat.other_user?.name}</p>
                                  {chat.last_message && (
                                    <p className="text-sm text-gray-500 truncate">{chat.last_message}</p>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* All Users */}
                    <div>
                      <h3 className="font-bold mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        All Users
                      </h3>
                      <div className="space-y-2">
                        {filteredUsers.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => startNewChat(u)}
                            className="w-full text-left p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                                {u.avatar_url ? (
                                  <img
                                    src={u.avatar_url || "/placeholder.svg"}
                                    alt={u.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <span className="font-bold">{u.name.charAt(0).toUpperCase()}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{u.name}</p>
                                <p className="text-sm text-gray-500">{u.email}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </DoodleCard>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                {selectedChat ? (
                  <ChatInterface
                    recipientId={selectedChat.other_user!.id}
                    recipientName={selectedChat.other_user!.name}
                    recipientAvatar={selectedChat.other_user!.avatar_url}
                  />
                ) : (
                  <DoodleCard className="p-6 h-[600px] flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-bold mb-2">Select a conversation</h3>
                      <p>Choose a user from the sidebar to start chatting</p>
                    </div>
                  </DoodleCard>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthWrapper>
  )
}
