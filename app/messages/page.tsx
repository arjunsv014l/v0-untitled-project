"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore"
import { useUser } from "@/context/user-context"
import AuthWrapper from "@/components/auth-wrapper"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleCard from "@/components/ui-elements/doodle-card"
import ChatInterface from "@/components/chat/chat-interface"
import { Search, MessageSquare } from "lucide-react"
import Link from "next/link"
import DoodleButton from "@/components/ui-elements/doodle-button" // Declare DoodleButton

interface ChatPreview {
  id: string
  participants: Record<string, boolean>
  lastMessage: string | null
  lastMessageTime: any
  otherUser: {
    id: string
    name: string
    avatar?: string
  } | null
}

export default function MessagesPage() {
  const [chats, setChats] = useState<ChatPreview[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    setLoading(true)

    // Subscribe to user's chats
    const chatsRef = collection(db, "chats")
    const q = query(chatsRef, where(`participants.${user.id}`, "==", true), orderBy("lastMessageTime", "desc"))

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data()
          const participants = data.participants as Record<string, boolean>

          // Find the other participant
          const otherUserId = Object.keys(participants).find((id) => id !== user.id)
          let otherUser = null

          if (otherUserId) {
            // Fetch other user's data
            try {
              const userDoc = await db.collection("users").doc(otherUserId).get()
              if (userDoc.exists) {
                const userData = userDoc.data()
                otherUser = {
                  id: otherUserId,
                  name: userData?.name || "Unknown User",
                  avatar: userData?.avatar,
                }
              }
            } catch (error) {
              console.error("Error fetching other user:", error)
            }
          }

          return {
            id: doc.id,
            participants,
            lastMessage: data.lastMessage,
            lastMessageTime: data.lastMessageTime,
            otherUser,
          }
        }),
      )

      setChats(chatData)
      setLoading(false)

      // Select the first chat by default if none is selected
      if (chatData.length > 0 && !selectedChat) {
        setSelectedChat(chatData[0])
      }
    })

    return () => unsubscribe()
  }, [user, selectedChat])

  const filteredChats = chats.filter((chat) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return chat.otherUser?.name.toLowerCase().includes(term)
  })

  return (
    <AuthWrapper>
      <main className="min-h-screen bg-white pt-20">
        <DoodleBackground className="pt-24 pb-16" density="low">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
                <span className="font-medium">Messages</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Conversations</h1>

              <p className="text-lg text-gray-700 mb-8">Connect with other students, mentors, and companies.</p>
            </div>
          </div>
        </DoodleBackground>

        <section className="py-8 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Chat list */}
              <div className="md:col-span-1">
                <DoodleCard className="p-4 h-[600px] flex flex-col">
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 p-2 border-2 border-black rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    {loading ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                      </div>
                    ) : filteredChats.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="font-medium text-gray-700 mb-2">No conversations yet</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Start chatting with other users to see your conversations here.
                        </p>
                        <Link href="/community">
                          <DoodleButton>Find People</DoodleButton>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredChats.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                              selectedChat?.id === chat.id
                                ? "bg-blue-50 border-2 border-blue-500"
                                : "hover:bg-gray-50 border-2 border-transparent"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                                {chat.otherUser?.avatar ? (
                                  <img
                                    src={chat.otherUser.avatar || "/placeholder.svg"}
                                    alt={chat.otherUser.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <span className="font-bold">
                                    {chat.otherUser?.name.charAt(0).toUpperCase() || "?"}
                                  </span>
                                )}
                              </div>
                              <div className="flex-grow">
                                <h3 className="font-medium">{chat.otherUser?.name || "Unknown User"}</h3>
                                <p className="text-sm text-gray-500 truncate">
                                  {chat.lastMessage || "No messages yet"}
                                </p>
                              </div>
                              {chat.lastMessageTime && (
                                <div className="text-xs text-gray-500">
                                  {chat.lastMessageTime.toDate
                                    ? chat.lastMessageTime.toDate().toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : ""}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </DoodleCard>
              </div>

              {/* Chat interface */}
              <div className="md:col-span-2">
                {selectedChat && selectedChat.otherUser ? (
                  <ChatInterface
                    recipientId={selectedChat.otherUser.id}
                    recipientName={selectedChat.otherUser.name}
                    recipientAvatar={selectedChat.otherUser.avatar}
                  />
                ) : (
                  <DoodleCard className="h-[600px] flex items-center justify-center">
                    <div className="text-center p-6">
                      <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h2 className="text-xl font-bold mb-2">No conversation selected</h2>
                      <p className="text-gray-600 mb-6">Select a conversation from the list or start a new one.</p>
                      <Link href="/community">
                        <DoodleButton>Find People to Chat With</DoodleButton>
                      </Link>
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
