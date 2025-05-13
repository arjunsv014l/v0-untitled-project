"use client"

import type React from "react"

import { useState } from "react"

export default function MessagesSection() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      avatar: "/student-avatar.png",
      lastMessage: "Did you get the notes from yesterday's lecture?",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      name: "James Rodriguez",
      avatar: "/abstract-profile.png",
      lastMessage: "That's awesome! Can you share your project when it's done?",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Sophia Chen",
      avatar: "/diverse-student-portrait.png",
      lastMessage: "The study group is confirmed for Saturday at 2PM in the library.",
      time: "Monday",
      unread: false,
    },
  ])

  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<
    Record<number, Array<{ id: number; text: string; sent: boolean; time: string }>>
  >({
    1: [{ id: 1, text: "Hey Alex! Did you get the notes from yesterday's lecture?", sent: false, time: "10:30 AM" }],
    2: [
      { id: 1, text: "I just finished my ML project, it turned out great!", sent: true, time: "Yesterday" },
      { id: 2, text: "That's awesome! Can you share your project when it's done?", sent: false, time: "Yesterday" },
    ],
    3: [
      { id: 1, text: "Hi everyone, I'm organizing a study group for the upcoming exam.", sent: false, time: "Monday" },
      { id: 2, text: "I'll be there!", sent: true, time: "Monday" },
      { id: 3, text: "The study group is confirmed for Saturday at 2PM in the library.", sent: false, time: "Monday" },
    ],
  })

  const handleConversationClick = (id: number) => {
    setActiveConversation(id)

    // Mark conversation as read
    setConversations((prev) => prev.map((conv) => (conv.id === id ? { ...conv, unread: false } : conv)))
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!messageText.trim() || !activeConversation) return

    const newMessage = {
      id: messages[activeConversation].length + 1,
      text: messageText,
      sent: true,
      time: "Just now",
    }

    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...prev[activeConversation], newMessage],
    }))

    setMessageText("")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conversations List */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    activeConversation === conversation.id ? "bg-blue-50" : ""
                  } ${conversation.unread ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-center">
                    <img
                      src={conversation.avatar || "/placeholder.svg"}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className={`text-sm truncate ${conversation.unread ? "font-semibold" : "text-gray-500"}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && <div className="ml-2 w-3 h-3 bg-blue-600 rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="col-span-2 flex flex-col h-[500px]">
            {activeConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <img
                    src={conversations.find((c) => c.id === activeConversation)?.avatar || "/placeholder.svg"}
                    alt={conversations.find((c) => c.id === activeConversation)?.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {conversations.find((c) => c.id === activeConversation)?.name}
                    </h3>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages[activeConversation]?.map((message) => (
                    <div key={message.id} className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sent
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sent ? "text-blue-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
