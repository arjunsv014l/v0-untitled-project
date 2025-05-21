"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DoodleButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  href?: string
}

export default function DoodleButton({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  href = "/career",
}: DoodleButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border-2 border-black hover:bg-gray-100",
    outline: "bg-transparent text-black border-2 border-black hover:bg-gray-100",
  }

  const sizeStyles = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6",
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    // Call the original onClick if provided
    if (onClick) onClick(e)

    // Navigate to href if provided and default not prevented
    if (href && !e.defaultPrevented) {
      try {
        window.location.href = href
      } catch (error) {
        console.error("Navigation error:", error)
      }
    }
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={cn(
        "relative rounded-lg font-medium transition-all",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
