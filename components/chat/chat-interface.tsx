"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore"
import { useUser } from "@/context/user-context"
import DoodleCard from "@/components/ui-elements/doodle-card"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { Send, Paperclip, ImageIcon, Smile } from "lucide-react"

interface Message {
  id: string
  text: string
  senderId: string
  senderName: string
  senderAvatar?: string
  timestamp: any
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
  const { user } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user || !recipientId) return

    const fetchOrCreateChat = async () => {
      try {
        // Check if a chat already exists between these users
        const chatsRef = collection(db, "chats")
        const q = query(
          chatsRef,
          where(`participants.${user.id}`, "==", true),
          where(`participants.${recipientId}`, "==", true),
        )

        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          // Chat exists, use the first one
          setChatId(querySnapshot.docs[0].id)
        } else {
          // Create a new chat
          const newChatRef = await addDoc(chatsRef, {
            participants: {
              [user.id]: true,
              [recipientId]: true,
            },
            createdAt: serverTimestamp(),
            lastMessage: null,
            lastMessageTime: null,
          })

          setChatId(newChatRef.id)
        }
      } catch (error) {
        console.error("Error fetching or creating chat:", error)
      }
    }

    fetchOrCreateChat()
  }, [user, recipientId])

  useEffect(() => {
    if (!chatId) return

    // Subscribe to messages
    const messagesRef = collection(db, "chats", chatId, "messages")
    const q = query(messagesRef, orderBy("timestamp", "asc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[]

      setMessages(messageData)

      // Scroll to bottom when new messages arrive
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    })

    return () => unsubscribe()
  }, [chatId])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !user || !chatId) return

    try {
      // Add message to the chat
      const messagesRef = collection(db, "chats", chatId, "messages")
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: user.id,
        senderName: user.name,
        senderAvatar: user.avatar,
        timestamp: serverTimestamp(),
      })

      // Update the chat with the last message
      const chatRef = doc(db, "chats", chatId)
      await setDoc(
        chatRef,
        {
          lastMessage: newMessage,
          lastMessageTime: serverTimestamp(),
        },
        { merge: true },
      )

      // Clear the input
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
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === user?.id ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.senderId === user?.id ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp?.toDate
                      ? message.timestamp.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Sending..."}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
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
