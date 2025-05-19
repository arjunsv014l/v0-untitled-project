"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

export default function HeroRectangularCounter() {
  const [count, setCount] = useState(500)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check localStorage for existing count
    const savedCount = localStorage.getItem("userCount")
    if (savedCount) {
      const parsedCount = Number.parseInt(savedCount, 10)
      if (parsedCount > 500) {
        setCount(parsedCount)
      }
    }

    // Listen for registration events
    const handleRegistration = () => {
      setCount((prevCount) => {
        const newCount = prevCount + 1
        localStorage.setItem("userCount", newCount.toString())
        return newCount
      })
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }

    window.addEventListener("incrementUserCount", handleRegistration)

    return () => {
      window.removeEventListener("incrementUserCount", handleRegistration)
    }
  }, [])

  // Function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="flex items-center bg-white border-2 border-black rounded-none px-3 py-2 shadow-md">
      <motion.div animate={isAnimating ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.5 }} className="mr-2">
        <Users className="h-4 w-4 text-[#10B84A]" />
      </motion.div>

      <div className="flex items-baseline">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="font-bold mr-1"
          >
            {formatNumber(count)}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-gray-600">users</span>
      </div>
    </div>
  )
}
