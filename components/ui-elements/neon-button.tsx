"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeonButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  color?: "green" | "blue" | "yellow" | "purple" | "orange" | "lime"
  size?: "sm" | "md" | "lg"
}

export default function NeonButton({ children, className, onClick, color = "green", size = "md" }: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorMap = {
    green: {
      bg: "#00FFAA",
      glow: "rgba(0, 255, 170, 0.7)",
      text: "#121212",
    },
    blue: {
      bg: "#00EEFF",
      glow: "rgba(0, 238, 255, 0.7)",
      text: "#121212",
    },
    yellow: {
      bg: "#FFEE00",
      glow: "rgba(255, 238, 0, 0.7)",
      text: "#121212",
    },
    purple: {
      bg: "#7000FF",
      glow: "rgba(112, 0, 255, 0.7)",
      text: "#FFFFFF",
    },
    orange: {
      bg: "#FF7700",
      glow: "rgba(255, 119, 0, 0.7)",
      text: "#121212",
    },
    lime: {
      bg: "#AAFF00",
      glow: "rgba(170, 255, 0, 0.7)",
      text: "#121212",
    },
  }

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  }

  const selectedColor = colorMap[color]

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative rounded-full font-bold transition-all duration-300", sizeClasses[size], className)}
      style={{
        backgroundColor: selectedColor.bg,
        color: selectedColor.text,
        boxShadow: isHovered ? `0 0 20px ${selectedColor.glow}` : `0 0 10px ${selectedColor.glow}`,
      }}
    >
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 rounded-full opacity-30"
        animate={
          isHovered
            ? {
                opacity: 0.5,
                scale: 1.05,
              }
            : {
                opacity: 0.3,
                scale: 1,
              }
        }
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, ${selectedColor.bg}, transparent 70%)`,
        }}
      />
    </motion.button>
  )
}
