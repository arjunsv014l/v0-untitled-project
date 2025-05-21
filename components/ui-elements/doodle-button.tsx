"use client"

import type React from "react"

import { useState } from "react"

interface DoodleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  href?: string
}

export default function DoodleButton({
  children,
  onClick,
  className = "",
  disabled = false,
  href = "/career",
}: DoodleButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (disabled) return

    // Call the original onClick if provided
    if (onClick) onClick()

    // Navigate to href if provided
    if (href) {
      window.location.href = href
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={`relative rounded-lg font-medium py-2 px-4 bg-black text-white transition-all ${
        isHovered ? "scale-105" : "scale-100"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      style={{
        transform: isHovered ? "translate(-1px, -1px)" : "translate(0, 0)",
        boxShadow: isHovered ? "3px 3px 0 rgba(0,0,0,0.8)" : "2px 2px 0 rgba(0,0,0,0.8)",
      }}
    >
      {children}
    </button>
  )
}
