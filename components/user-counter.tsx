"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"
import { subscribeToUserCount } from "@/lib/user-counter"

interface UserCounterProps {
  className?: string
  iconClassName?: string
  textClassName?: string
  labelText?: string
  showLabel?: boolean
}

export default function UserCounter({
  className = "",
  iconClassName = "",
  textClassName = "",
  labelText = "users",
  showLabel = true,
}: UserCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Subscribe to real-time updates
    unsubscribeRef.current = subscribeToUserCount((newCount) => {
      if (count !== newCount) {
        setCount(newCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
      } else {
        setCount(newCount)
      }
    })

    // Listen for custom events from other counter instances
    const handleCountUpdate = (event: CustomEvent) => {
      const newCount = event.detail.count
      if (count !== newCount) {
        setCount(newCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
      }
    }

    window.addEventListener("userCountUpdated", handleCountUpdate as EventListener)

    // Cleanup function
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
      window.removeEventListener("userCountUpdated", handleCountUpdate as EventListener)
    }
  }, [count])

  // If count is null (initial state), show a loading state
  if (count === null) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className={`animate-pulse bg-gray-200 h-6 w-16 rounded-md`}></div>
      </div>
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className={`mr-2 p-1.5 bg-[#FFECB3] rounded-full border-2 border-black ${iconClassName}`}
        style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
      >
        <Users className="h-4 w-4 text-[#FF6D00]" />
      </motion.div>

      <div className="flex items-baseline">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -10, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 10, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className={`font-bold mr-1 text-[#333333] ${textClassName}`}
            style={{
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              textShadow: "1px 1px 0 rgba(0,0,0,0.1)",
            }}
          >
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        {showLabel && (
          <span className="text-xs text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            {labelText}
          </span>
        )}
      </div>
    </div>
  )
}
