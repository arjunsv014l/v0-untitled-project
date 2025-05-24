"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

// Chat Message Component
const ChatMessage = ({
  message,
  isUser,
  isLoading = false,
}: {
  message: string
  isUser: boolean
  isLoading?: boolean
}) => {
  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl p-3 ${
          isUser
            ? "bg-purple-600 text-white border-2 border-dashed border-purple-300"
            : "bg-gray-100 text-gray-800 border-2 border-dashed border-gray-200"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message}</p>
        )}
      </div>
    </div>
  )
}

// Main Chatbot Component
export function LandingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! 👋 I'm your DreamClerk assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      const assistantMessage = data.choices[0]?.message || { content: "Sorry, I couldn't process that request." }

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage.content }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error processing your request. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all duration-300 border-2 border-dashed border-purple-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-xl border-2 border-dashed border-purple-300 flex flex-col transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Chat header */}
        <div className="p-4 border-b-2 border-dashed border-purple-200 bg-purple-50 rounded-t-2xl flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
          <h3 className="font-bold text-purple-900">DreamClerk Assistant</h3>
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.content} isUser={msg.role === "user"} />
          ))}
          {isLoading && <ChatMessage message="" isUser={false} isLoading={true} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t-2 border-dashed border-purple-200 bg-purple-50 rounded-b-2xl"
        >
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-l-lg border-2 border-dashed border-purple-200 focus:outline-none focus:border-purple-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-purple-600 text-white p-2 rounded-r-lg border-2 border-dashed border-purple-300 hover:bg-purple-700 transition-colors disabled:bg-purple-300"
              disabled={isLoading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
