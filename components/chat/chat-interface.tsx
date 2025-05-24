"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/context/user-context"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { Send, Paperclip, ImageIcon, Smile } from "lucide-react"
import { createOrGetChat, getChatMessages, sendMessage } from "@/lib/supabase-db"

interface Message {
  id: string
  text: string
  sender_id: string
  sender_name: string
  sender_avatar?: string
  created_at: string
  chat_id: string
}

interface ChatInterfaceProps {
  recipientId: string
  recipientName: string
  recipientAvatar?: string
}

export default function ChatInterface({ recipientId, recipientName, recipientAvatar }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chatId, setChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user || !recipientId) return

    const initializeChat = async () => {
      try {
        setIsLoading(true)
        const chat = await createOrGetChat(user.id, recipientId)
        setChatId(chat.id)

        // Load initial messages
        const chatMessages = await getChatMessages(chat.id)
        setMessages(chatMessages)

        // Scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } catch (error) {
        console.error("Error initializing chat:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeChat()
  }, [user, recipientId])

  useEffect(() => {
    if (!chatId) return

    // Set up real-time subscription for new messages
    const channel = supabase
      .channel(`messages:chat_id=eq.${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message
          setMessages((prev) => [...prev, newMessage])

          // Scroll to bottom when new messages arrive
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
          }, 100)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [chatId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !user || !chatId) return

    try {
      await sendMessage(chatId, user.id, user.name, newMessage, user.avatar)
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <DoodleCard className="flex flex-col h-[600px]">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
          {recipientAvatar ? (
            <img
              src={recipientAvatar || "/placeholder.svg"}
              alt={recipientName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-bold">{recipientName.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <h3 className="font-bold">{recipientName}</h3>
          <p className="text-xs text-gray-500">
            {messages.length > 0 ? `${messages.length} messages` : "Start a conversation"}
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender_id === user?.id ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender_id === user?.id ? "text-blue-100" : "text-gray-500"}`}>
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </button>
          <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ImageIcon className="h-5 w-5 text-gray-500" />
          </button>
          <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Smile className="h-5 w-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow mx-2 p-2 border-2 border-black rounded-lg"
          />
          <DoodleButton type="submit" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </DoodleButton>
        </div>
      </form>
    </DoodleCard>
  )
}
