"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

// Create a global variable to track the count
let globalUserCount = 500 // Starting count

// Create a custom event for registration
export const incrementUserCount = () => {
  globalUserCount++
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("userRegistered"))
  }

  // Save to localStorage to persist between refreshes
  if (typeof window !== "undefined") {
    localStorage.setItem("userCount", globalUserCount.toString())
  }
}

export interface BaseCounterProps {
  className?: string
  iconClassName?: string
  numberClassName?: string
  labelClassName?: string
  label?: string
  showIcon?: boolean
  doodleStyle?: boolean
}

export default function BaseCounter({
  className = "",
  iconClassName = "",
  numberClassName = "",
  labelClassName = "",
  label = "users registered",
  showIcon = true,
  doodleStyle = false,
}: BaseCounterProps) {
  const [count, setCount] = useState(globalUserCount)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Check if there's a saved count in localStorage
    const savedCount = localStorage.getItem("userCount")
    if (savedCount) {
      const parsedCount = Number.parseInt(savedCount, 10)
      // Only use saved count if it's greater than our starting value
      if (parsedCount > globalUserCount) {
        globalUserCount = parsedCount
        setCount(parsedCount)
      }
    }

    // Listen for registration events
    const handleRegistration = () => {
      setCount(globalUserCount)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }

    window.addEventListener("userRegistered", handleRegistration)

    return () => {
      window.removeEventListener("userRegistered", handleRegistration)
    }
  }, [])

  if (doodleStyle) {
    return (
      <div className={`relative inline-block ${className}`}>
        {/* Doodle-style SVG border */}
        <svg
          className="absolute -top-1 -left-1 w-[calc(100%+10px)] h-[calc(100%+10px)] z-0"
          viewBox="0 0 120 50"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M10,10 Q15,5 20,10 Q25,15 30,10 Q35,5 40,10 Q45,15 50,10 Q55,5 60,10 Q65,15 70,10 Q75,5 80,10 Q85,15 90,10 Q95,5 100,10 Q105,15 110,10 L110,40 Q105,45 100,40 Q95,35 90,40 Q85,45 80,40 Q75,35 70,40 Q65,45 60,40 Q55,35 50,40 Q45,45 40,40 Q35,35 30,40 Q25,45 20,40 Q15,35 10,40 Z"
            fill="white"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Decorative squiggles */}
          <path
            d="M15,45 Q20,48 25,45"
            fill="none"
            stroke="black"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path d="M85,5 Q90,2 95,5" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </svg>

        {/* Content */}
        <div className="flex items-center px-4 py-2 relative z-10">
          {showIcon && (
            <motion.div
              animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
              className={`mr-2 p-1.5 bg-[#FFECB3] rounded-full border-2 border-black ${iconClassName}`}
              style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
            >
              <Users className="h-4 w-4 text-[#FF6D00]" />
            </motion.div>
          )}

          <div className="flex items-baseline">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ opacity: 0, y: -10, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 10, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`font-bold mr-1 text-[#333333] ${numberClassName}`}
                style={{
                  fontFamily: "'Comic Sans MS', cursive, sans-serif",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.1)",
                }}
              >
                {count.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            <span
              className={`text-xs text-gray-600 ${labelClassName}`}
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-2 -right-1 text-[#FF6D00] text-xs"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          ★
        </motion.div>
        <motion.div
          className="absolute -bottom-1 -left-2 text-[#FF6D00] text-xs"
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        >
          ★
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      {showIcon && (
        <motion.div
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
          className={`mr-2 ${iconClassName}`}
        >
          <Users className="h-4 w-4" />
        </motion.div>
      )}

      <div className="flex items-baseline">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`font-bold mr-1 ${numberClassName}`}
          >
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        <span className={`text-xs ${labelClassName}`}>{label}</span>
      </div>
    </div>
  )
}
