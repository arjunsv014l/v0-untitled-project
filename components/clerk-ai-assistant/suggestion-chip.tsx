"use client"

import { motion } from "framer-motion"

interface SuggestionChipProps {
  text: string
  onClick: () => void
  delay?: number
}

export default function SuggestionChip({ text, onClick, delay = 0 }: SuggestionChipProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-4 py-2 bg-white border-2 border-black rounded-full text-sm font-medium"
      style={{
        boxShadow: "2px 2px 0 rgba(0,0,0,0.8)",
      }}
    >
      {text}
    </motion.button>
  )
}
