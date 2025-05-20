"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface SuccessAnimationProps {
  message?: string
  onComplete?: () => void
  duration?: number
}

export default function SuccessAnimation({
  message = "Registration Successful!",
  onComplete,
  duration = 2000,
}: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 300) // Allow time for fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative flex items-center justify-center w-24 h-24 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="absolute w-full h-full rounded-full bg-green-100"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Check className="text-white w-10 h-10" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-green-600 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {message}
      </motion.h2>

      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Welcome to Dreamclerk!
      </motion.p>
    </motion.div>
  )
}
