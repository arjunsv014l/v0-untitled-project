"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedDoodleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "white" | "secondary" | "gradient"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  doodleStyle?: "stars" | "circles" | "zigzag" | "hearts" | "none"
}

export default function EnhancedDoodleButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  type = "button",
  disabled = false,
  doodleStyle = "none",
}: EnhancedDoodleButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Start animation when component mounts
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  }

  const variantClasses = {
    primary: "bg-black text-white border-black",
    white: "bg-white text-black border-black",
    secondary: "bg-gray-100 text-black border-gray-300",
    gradient:
      "text-white border-black bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
  }

  // Doodle elements based on style
  const renderDoodleElements = () => {
    switch (doodleStyle) {
      case "stars":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-1 -right-1 text-black"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: isHovered ? 30 : 0, scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              ★
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1 text-black"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: isHovered ? -30 : 0, scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              ★
            </motion.div>
          </div>
        )
      case "circles":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 rounded-full border-2 border-black"
              initial={{ scale: 0.5 }}
              animate={{ scale: isHovered ? 1.2 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full border-2 border-black"
              initial={{ scale: 0.5 }}
              animate={{ scale: isHovered ? 1.2 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )
      case "zigzag":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute -top-3 left-0 right-0 w-full"
              height="6"
              viewBox="0 0 100 6"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0,3 L 10,1 L 20,5 L 30,1 L 40,5 L 50,1 L 60,5 L 70,1 L 80,5 L 90,1 L 100,3"
                fill="none"
                stroke="black"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isAnimating || isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <svg
              className="absolute -bottom-3 left-0 right-0 w-full"
              height="6"
              viewBox="0 0 100 6"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0,3 L 10,1 L 20,5 L 30,1 L 40,5 L 50,1 L 60,5 L 70,1 L 80,5 L 90,1 L 100,3"
                fill="none"
                stroke="black"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isAnimating || isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
          </div>
        )
      case "hearts":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-2 -right-2 text-black text-lg"
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{
                scale: isHovered ? [0.5, 1.2, 0.8, 1] : 0.5,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.5, times: [0, 0.3, 0.6, 1] }}
            >
              ♥
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 text-black text-lg"
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{
                scale: isHovered ? [0.5, 1.2, 0.8, 1] : 0.5,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.5, times: [0, 0.3, 0.6, 1] }}
            >
              ♥
            </motion.div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      className={cn(
        "relative rounded-lg font-medium border-2 transition-all duration-200 flex items-center justify-center",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      style={{
        boxShadow: isHovered ? "3px 3px 0 rgba(0,0,0,0.8)" : "2px 2px 0 rgba(0,0,0,0.8)",
        transform: isHovered ? "translate(-1px, -1px)" : "translate(0, 0)",
      }}
    >
      {renderDoodleElements()}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  )
}
