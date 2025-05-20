"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Sparkles, MessageSquare, RefreshCw } from "lucide-react"
import ClerkMemoji from "./clerk-memoji"
import ChatBubble from "./chat-bubble"
import DoodleInput from "./doodle-input"
import ThinkingIndicator from "./thinking-indicator"
import SuggestionChip from "./suggestion-chip"

type Message = {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

type MemojiState = "idle" | "listening" | "thinking" | "speaking" | "happy" | "confused"

export default function ClerkAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Clerk, your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [isThinking, setIsThinking] = useState(false)
  const [memojiState, setMemojiState] = useState<MemojiState>("idle")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = ["What can you help me with?", "Tell me about your features", "How do I get started?"]

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setMemojiState("listening")

    // Simulate AI thinking
    setTimeout(() => {
      setIsThinking(true)
      setMemojiState("thinking")

      // Simulate AI response after thinking
      setTimeout(() => {
        setIsThinking(false)
        setMemojiState("speaking")

        // Add AI response
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `I'm responding to your message: "${text}"\n\nThis is a simulated response from Clerk AI.`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, aiResponse])

        // Return to idle state after speaking
        setTimeout(() => {
          setMemojiState("idle")
        }, 1000)
      }, 2000) // Thinking time
    }, 500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        text: "Hi there! I'm Clerk, your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setMemojiState("idle")
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden bg-gray-50 min-h-screen">
      {/* Background doodle elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 L100 0 L100 100 L0 100 Z" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <circle cx="20" cy="20" r="5" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <circle cx="80" cy="80" r="10" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
        </svg>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-[10%] opacity-10 hidden md:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Brain className="h-14 w-14 text-green-500" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-[5%] opacity-10 hidden md:block"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Sparkles className="h-12 w-12 text-green-500" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Brain className="h-5 w-5 mr-2 text-green-500" />
            <span className="font-medium">AI Assistant</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Clerk, Your Personal AI Assistant</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Clerk helps you find information, complete tasks, and get things done with natural conversation.
          </p>
        </motion.div>

        {/* Chat interface */}
        <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Memoji header */}
          <div className="flex justify-center mb-6">
            <ClerkMemoji state={memojiState} size="lg" />
          </div>

          {/* Messages container */}
          <div className="mb-4 space-y-4 max-h-[400px] overflow-y-auto p-2">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}

            {isThinking && (
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-black mr-3 flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                </div>
                <ThinkingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="mb-6 flex flex-wrap gap-2 justify-center">
              {suggestions.map((suggestion, index) => (
                <SuggestionChip
                  key={suggestion}
                  text={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="flex items-center">
            <DoodleInput onSend={handleSendMessage} disabled={isThinking} className="flex-1" />

            {messages.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleReset}
                className="ml-2 p-2 rounded-full border-2 border-black bg-white"
                style={{
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.8)",
                }}
              >
                <RefreshCw size={16} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Features section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
              <Brain className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Responses</h3>
            <p className="text-gray-700">
              Clerk understands context and provides intelligent, helpful answers to your questions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
              <MessageSquare className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Natural Conversation</h3>
            <p className="text-gray-700">
              Talk to Clerk like you would with a person. No need for special commands or syntax.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
              <Sparkles className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Helpful Suggestions</h3>
            <p className="text-gray-700">
              Clerk offers relevant suggestions to help you discover what it can do for you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
