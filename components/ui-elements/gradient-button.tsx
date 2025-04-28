"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "outline"
}

export default function GradientButton({
  children,
  className,
  onClick,
  size = "md",
  variant = "primary",
}: GradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  }

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20",
    secondary:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20",
    outline: "bg-white text-green-600 border border-green-500 hover:bg-green-50",
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center overflow-hidden",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant !== "outline" && (
        <span
          className={cn(
            "absolute inset-0 bg-white/20 transition-opacity duration-300",
            isHovered ? "opacity-20" : "opacity-0",
          )}
        />
      )}
    </button>
  )
}
