"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface WelcomeToastProps {
  userName: string
  isVisible: boolean
  onClose: () => void
}

export default function WelcomeToast({ userName, isVisible, onClose }: WelcomeToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Auto-close after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 max-w-md"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-lg flex items-start">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-800">Welcome to Dreamclerk!</h3>
              <p className="text-green-700 mt-1">
                Hi {userName}, your account has been successfully created. You're now signed in!
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-green-500 hover:text-green-700"
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
