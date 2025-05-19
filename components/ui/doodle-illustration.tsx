"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface DoodleIllustrationProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export default function DoodleIllustration({ children, className = "", animate = true }: DoodleIllustrationProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      ) : (
        <div className="w-full h-full">{children}</div>
      )}
    </div>
  )
}
