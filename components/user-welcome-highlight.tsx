"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface UserWelcomeHighlightProps {
  children: React.ReactNode
  isNewUser?: boolean
}

export default function UserWelcomeHighlight({ children, isNewUser = false }: UserWelcomeHighlightProps) {
  const [highlight, setHighlight] = useState(isNewUser)

  useEffect(() => {
    if (isNewUser) {
      setHighlight(true)
      const timer = setTimeout(() => {
        setHighlight(false)
      }, 10000) // Highlight for 10 seconds

      return () => clearTimeout(timer)
    }
  }, [isNewUser])

  if (!highlight) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
      animate={{
        backgroundColor: ["rgba(59, 130, 246, 0.2)", "rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.2)"],
      }}
      transition={{ duration: 2, repeat: 5, repeatType: "reverse" }}
      className="px-2 py-1 rounded"
    >
      {children}
    </motion.div>
  )
}
