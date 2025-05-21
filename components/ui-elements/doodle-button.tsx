"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DoodleButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  href?: string
}

export default function DoodleButton({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "md",
  disabled = false,
  type = "button",
  href = "/career",
}: DoodleButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    // Call the original onClick if provided
    if (onClick) {
      onClick(e)
    }

    // If not prevented and href is provided, navigate
    if (!e.defaultPrevented && href) {
      try {
        router.push(href)
      } catch (error) {
        console.error("Navigation error:", error)
        // Fallback to window.location if router fails
        window.location.href = href
      }
    }
  }

  // Base styles
  const baseStyles = "relative font-medium rounded-md transition-all duration-200 focus:outline-none"

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  // Variant styles
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50",
  }

  // Disabled styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={buttonStyles}
    >
      {children}
    </button>
  )
}
