"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
  accentColor?: "blue" | "green" | "purple" | "orange"
}

export default function HolographicCard({ children, className = "", accentColor = "blue" }: HolographicCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // Get accent color gradient
  const getGradient = () => {
    switch (accentColor) {
      case "blue":
        return "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)"
      case "green":
        return "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)"
      case "purple":
        return "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(126, 34, 206, 0.1) 100%)"
      case "orange":
        return "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)"
      default:
        return "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)"
    }
  }

  // Get accent color for border
  const getBorderColor = () => {
    switch (accentColor) {
      case "blue":
        return "rgba(59, 130, 246, 0.3)"
      case "green":
        return "rgba(34, 197, 94, 0.3)"
      case "purple":
        return "rgba(168, 85, 247, 0.3)"
      case "orange":
        return "rgba(249, 115, 22, 0.3)"
      default:
        return "rgba(59, 130, 246, 0.3)"
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    // Limit rotation to a small range for subtle effect
    const rotateX = (mouseY / (rect.height / 2)) * -5
    const rotateY = (mouseX / (rect.width / 2)) * 5

    setRotateX(rotateX)
    setRotateY(rotateY)
    setMouseX(mouseX)
    setMouseY(mouseY)
  }

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden bg-white border ${className}`}
      style={{
        backgroundImage: getGradient(),
        borderColor: getBorderColor(),
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic overlay effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjUiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')",
          backgroundSize: "200% 200%",
          backgroundPosition: `${50 + mouseX / 10}% ${50 + mouseY / 10}%`,
          transition: "background-position 0.1s ease-out",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
