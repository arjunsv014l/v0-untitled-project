"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DoodleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "outline" | "secondary" | "gradient"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export default function DoodleButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  type = "button",
  disabled = false,
}: DoodleButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  }

  const variantClasses = {
    primary: "bg-black text-white border-black",
    outline: "bg-white text-black border-black",
    secondary: "bg-gray-100 text-black border-gray-300",
    gradient:
      "text-white border-black bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
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
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  )
}
