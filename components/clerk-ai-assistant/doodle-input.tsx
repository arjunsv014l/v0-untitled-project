"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, X } from "lucide-react"

interface DoodleInputProps {
  onSend: (message: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export default function DoodleInput({
  onSend,
  placeholder = "Ask Clerk anything...",
  disabled = false,
  className = "",
}: DoodleInputProps) {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [message])

  return (
    <div className={`relative ${className}`}>
      {/* Doodle border */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: 1,
          scale: isFocused ? 1.02 : 1,
        }}
        className="absolute inset-0 rounded-full border-2 border-black"
        style={{
          boxShadow: isFocused ? "3px 3px 0 rgba(0,0,0,0.8)" : "2px 2px 0 rgba(0,0,0,0.8)",
        }}
      ></motion.div>

      <div className="relative flex items-center bg-white rounded-full pl-4 pr-2 py-2">
        {/* Clear button - only show when there's text */}
        {message && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="p-1 mr-1 text-gray-400 hover:text-gray-600"
            onClick={() => setMessage("")}
          >
            <X size={16} />
          </motion.button>
        )}

        {/* Input field */}
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 py-1 text-sm md:text-base"
          rows={1}
        />

        {/* Action buttons */}
        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-black text-white"
            onClick={handleSend}
            disabled={!message.trim() || disabled}
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
