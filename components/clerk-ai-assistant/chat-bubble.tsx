"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  message: string
  isUser?: boolean
  timestamp?: string
  status?: "sending" | "sent" | "seen" | "error"
  className?: string
}

export default function ChatBubble({
  message,
  isUser = false,
  timestamp,
  status = "sent",
  className,
}: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col max-w-[80%] md:max-w-[70%]",
        isUser ? "ml-auto items-end" : "mr-auto items-start",
        className,
      )}
    >
      <div
        className={cn(
          "relative px-4 py-3 rounded-2xl border-2 border-black",
          isUser ? "bg-green-500 text-white rounded-br-sm" : "bg-white text-black rounded-bl-sm",
        )}
        style={{
          boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)",
        }}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap">{message}</p>

        {/* Doodle elements */}
        {!isUser && (
          <div className="absolute -top-2 -left-2 w-4 h-4 border-2 border-black rounded-full bg-green-500"></div>
        )}
        {isUser && <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-black rounded-full bg-white"></div>}
      </div>

      {/* Timestamp and status */}
      {timestamp && (
        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-1">
          <span>{timestamp}</span>
          {isUser && status === "seen" && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 12L7 17L22 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isUser && status === "sending" && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-2 h-2 rounded-full bg-gray-400"
            />
          )}
        </div>
      )}
    </motion.div>
  )
}
