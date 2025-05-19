"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

interface RectangularUserCounterProps {
  initialCount?: number
  label?: string
  className?: string
}

export default function RectangularUserCounter({
  initialCount = 500,
  label = "users registered",
  className = "",
}: RectangularUserCounterProps) {
  // Store the count in state and localStorage
  const [count, setCount] = useState(initialCount)
  const [isAnimating, setIsAnimating] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check localStorage for existing count on component mount
    const savedCount = localStorage.getItem("userCount")
    if (savedCount) {
      const parsedCount = Number.parseInt(savedCount, 10)
      // Only use the saved count if it's greater than our initial count
      if (parsedCount > initialCount) {
        setCount(parsedCount)
      }
    } else {
      // If no saved count, initialize localStorage with our initial count
      localStorage.setItem("userCount", initialCount.toString())
    }

    // Create a custom event for incrementing the counter from anywhere
    const incrementCounter = (e: Event) => {
      const customEvent = e as CustomEvent
      const amount = customEvent.detail?.amount || 1

      setCount((prevCount) => {
        const newCount = prevCount + amount
        localStorage.setItem("userCount", newCount.toString())
        return newCount
      })

      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
      }, 600)
    }

    // Add event listener for the custom event
    window.addEventListener("incrementUserCount", incrementCounter)

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("incrementUserCount", incrementCounter)
    }
  }, [initialCount])

  // Function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Global function to increment the counter
  if (typeof window !== "undefined") {
    window.incrementUserCounter = (amount = 1) => {
      window.dispatchEvent(new CustomEvent("incrementUserCount", { detail: { amount } }))
    }
  }

  return (
    <div className={`inline-block ${className}`}>
      {/* Doodle style counter with hand-drawn look */}
      <div className="relative">
        {/* Random squiggly border using SVG for doodle effect */}
        <svg
          className="absolute -inset-1 z-0 text-black"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}
        >
          <path
            d="M8,20 Q12,18 15,20 Q20,23 25,20 Q30,17 35,20 Q40,23 45,20 Q50,17 55,20 Q60,23 65,20 Q70,17 75,20 Q80,23 85,20 Q90,18 92,20 L92,80 Q90,82 85,80 Q80,77 75,80 Q70,83 65,80 Q60,77 55,80 Q50,83 45,80 Q40,77 35,80 Q30,83 25,80 Q20,77 15,80 Q12,82 8,80 Z"
            fill="white"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform="scale(1.05, 1.1) translate(-2, -5)"
          />
        </svg>

        {/* Counter content */}
        <div className="flex items-center bg-transparent px-5 py-4 relative z-10">
          <motion.div
            animate={isAnimating ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.6 }}
            className="mr-3 p-2 bg-indigo-100 rounded-full border-2 border-black"
          >
            <Users className="h-5 w-5 text-indigo-600" />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-baseline">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={count}
                  ref={countRef}
                  initial={{ opacity: 0, y: -10, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: 10, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold text-gray-800 mr-1"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  {formatNumber(count)}
                </motion.div>
              </AnimatePresence>
              <div className="text-sm text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                {label}
              </div>
            </div>
          </div>
        </div>

        {/* Scribble decoration */}
        <svg
          className="absolute bottom-0 right-0 h-8 w-8 text-indigo-400 opacity-50 transform translate-x-2 translate-y-2"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M10,50 Q30,40 50,50 Q70,60 90,50"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="1 8"
          />
        </svg>
      </div>

      {/* Test button with doodle style */}
      <button
        onClick={() => window.incrementUserCounter?.(1)}
        className="relative mt-2 px-4 py-2 text-xs font-medium text-indigo-600 bg-white transition-all"
      >
        {/* Doodle button border */}
        <svg className="absolute -inset-1 z-0" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path
            d="M10,20 Q15,15 20,20 Q25,25 30,20 Q35,15 40,20 Q45,25 50,20 Q55,15 60,20 Q65,25 70,20 Q75,15 80,20 Q85,25 90,20 L90,80 Q85,85 80,80 Q75,75 70,80 Q65,85 60,80 Q55,75 50,80 Q45,85 40,80 Q35,75 30,80 Q25,85 20,80 Q15,75 10,80 Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <span className="relative z-10">Test Increment</span>
      </button>
    </div>
  )
}
