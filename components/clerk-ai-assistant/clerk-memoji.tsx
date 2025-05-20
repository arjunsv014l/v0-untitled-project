"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type MemojiState = "idle" | "listening" | "thinking" | "speaking" | "happy" | "confused"

interface ClerkMemojiProps {
  state?: MemojiState
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function ClerkMemoji({ state = "idle", size = "md", className = "" }: ClerkMemojiProps) {
  const [currentState, setCurrentState] = useState<MemojiState>(state)

  // Update state when prop changes
  useEffect(() => {
    setCurrentState(state)
  }, [state])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  const memojiImages = {
    idle: "/clerk-memoji/clerk-idle.png",
    listening: "/clerk-memoji/clerk-listening.png",
    thinking: "/clerk-memoji/clerk-thinking.png",
    speaking: "/clerk-memoji/clerk-speaking.png",
    happy: "/clerk-memoji/clerk-happy.png",
    confused: "/clerk-memoji/clerk-confused.png",
  }

  // Animation variants for different states
  const animations = {
    idle: {
      y: [0, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    listening: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    thinking: {
      rotate: [0, -3, 0, 3, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    speaking: {
      y: [0, -2, 0, -2, 0],
      transition: {
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
    happy: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 1,
        repeat: 1,
        ease: "easeOut",
      },
    },
    confused: {
      rotate: [0, -10, 0],
      transition: {
        duration: 1,
        repeat: 1,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect behind memoji */}
      <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-20 transform scale-75"></div>

      {/* Doodle circle around memoji */}
      <div className="absolute inset-0 rounded-full border-2 border-black border-dashed"></div>

      {/* Memoji image with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            ...animations[currentState],
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`relative ${sizeClasses[size]} overflow-hidden`}
        >
          {/* Placeholder for actual memoji images */}
          <div className="w-full h-full bg-white rounded-full border-2 border-black flex items-center justify-center">
            <Image
              src={`/smart-white-male-memoji.png?height=200&width=200&query=memoji of a smart looking white male with glasses, ${currentState} expression`}
              alt={`Clerk AI in ${currentState} state`}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
