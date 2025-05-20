"use client"

import { motion } from "framer-motion"

export default function ThinkingIndicator() {
  return (
    <div className="flex items-center space-x-1 p-2">
      <motion.div
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0,
        }}
        className="w-2 h-2 bg-green-500 rounded-full"
      />
      <motion.div
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.2,
        }}
        className="w-2 h-2 bg-green-500 rounded-full"
      />
      <motion.div
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.4,
        }}
        className="w-2 h-2 bg-green-500 rounded-full"
      />
    </div>
  )
}
