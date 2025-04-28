"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface DoodleBackgroundProps {
  className?: string
  children?: React.ReactNode
  density?: "low" | "medium" | "high"
  animated?: boolean
}

export default function DoodleBackground({
  className,
  children,
  density = "medium",
  animated = false,
}: DoodleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set drawing style
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 1
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw doodles based on density
      const doodleCount = {
        low: 0.3,
        medium: 1,
        high: 3, // Increased from 2 to 3
      }

      const multiplier = doodleCount[density]

      // Draw random doodles
      drawDoodles(ctx, canvas.width, canvas.height, multiplier)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Animation
    let animationId: number

    if (animated) {
      let time = 0
      const animate = () => {
        time += 0.01

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw animated doodles
        drawAnimatedDoodles(ctx, canvas.width, canvas.height, time)

        animationId = requestAnimationFrame(animate)
      }

      animate()
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animated && animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [density, animated])

  // Function to draw doodles
  const drawDoodles = (ctx: CanvasRenderingContext2D, width: number, height: number, multiplier: number) => {
    // Draw stars
    for (let i = 0; i < 15 * multiplier; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = 5 + Math.random() * 15

      drawStar(ctx, x, y, size)
    }

    // Draw squiggles
    for (let i = 0; i < 10 * multiplier; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const length = 20 + Math.random() * 80

      drawSquiggle(ctx, x, y, length)
    }

    // Draw circles
    for (let i = 0; i < 8 * multiplier; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = 5 + Math.random() * 20

      drawCircle(ctx, x, y, radius)
    }

    // Draw arrows
    for (let i = 0; i < 6 * multiplier; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const length = 20 + Math.random() * 40
      const angle = Math.random() * Math.PI * 2

      drawArrow(ctx, x, y, length, angle)
    }
  }

  // Function to draw animated doodles
  const drawAnimatedDoodles = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    // Draw floating stars
    for (let i = 0; i < 15; i++) {
      const x = Math.sin(time * 0.5 + i) * width * 0.1 + width * 0.1 + i * width * 0.05
      const y = Math.cos(time * 0.3 + i) * height * 0.1 + height * 0.1 + i * height * 0.05
      const size = 5 + Math.sin(time + i) * 3

      drawStar(ctx, x, y, size)
    }

    // Draw floating circles
    for (let i = 0; i < 8; i++) {
      const x = Math.cos(time * 0.4 + i) * width * 0.1 + width * 0.7 - i * width * 0.05
      const y = Math.sin(time * 0.6 + i) * height * 0.1 + height * 0.7 - i * height * 0.05
      const radius = 8 + Math.cos(time + i) * 4

      drawCircle(ctx, x, y, radius)
    }

    // Draw floating squiggles
    for (let i = 0; i < 5; i++) {
      const x = Math.sin(time * 0.3 + i) * width * 0.1 + width * 0.5
      const y = Math.cos(time * 0.5 + i) * height * 0.1 + height * 0.3 + i * height * 0.1
      const length = 30 + Math.sin(time + i) * 10

      drawSquiggle(ctx, x, y, length)
    }
  }

  // Draw a star
  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
      const innerAngle = angle + Math.PI / 5

      if (i === 0) {
        ctx.moveTo(x + size * Math.cos(angle), y + size * Math.sin(angle))
      } else {
        ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle))
      }

      ctx.lineTo(x + (size / 2) * Math.cos(innerAngle), y + (size / 2) * Math.sin(innerAngle))
    }
    ctx.closePath()
    ctx.stroke()
  }

  // Draw a squiggle
  const drawSquiggle = (ctx: CanvasRenderingContext2D, x: number, y: number, length: number) => {
    ctx.beginPath()
    ctx.moveTo(x, y)

    let currentX = x
    let currentY = y
    const segments = 5 + Math.floor(Math.random() * 5)

    for (let i = 0; i < segments; i++) {
      const nextX = currentX + length / segments
      const nextY = currentY + (Math.random() * 20 - 10)

      const controlX = currentX + (length / segments) * 0.5
      const controlY = currentY + (Math.random() * 30 - 15)

      ctx.quadraticCurveTo(controlX, controlY, nextX, nextY)

      currentX = nextX
      currentY = nextY
    }

    ctx.stroke()
  }

  // Draw a circle
  const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    ctx.beginPath()

    // Draw a slightly wobbly circle
    const segments = 10
    let startAngle = 0

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const wobble = 0.8 + Math.random() * 0.4 // 0.8 to 1.2

      const px = x + Math.cos(angle) * radius * wobble
      const py = y + Math.sin(angle) * radius * wobble

      if (i === 0) {
        ctx.moveTo(px, py)
        startAngle = angle
      } else {
        const prevAngle = ((i - 1) / segments) * Math.PI * 2
        const cpx = x + Math.cos((prevAngle + angle) / 2) * radius * 1.2
        const cpy = y + Math.sin((prevAngle + angle) / 2) * radius * 1.2

        ctx.quadraticCurveTo(cpx, cpy, px, py)
      }
    }

    ctx.closePath()
    ctx.stroke()
  }

  // Draw an arrow
  const drawArrow = (ctx: CanvasRenderingContext2D, x: number, y: number, length: number, angle: number) => {
    const endX = x + Math.cos(angle) * length
    const endY = y + Math.sin(angle) * length

    // Draw slightly curved line
    ctx.beginPath()
    ctx.moveTo(x, y)

    const controlX = x + Math.cos(angle) * length * 0.5 + Math.cos(angle + Math.PI / 2) * 10
    const controlY = y + Math.sin(angle) * length * 0.5 + Math.sin(angle + Math.PI / 2) * 10

    ctx.quadraticCurveTo(controlX, controlY, endX, endY)
    ctx.stroke()

    // Draw arrowhead
    const headLength = length * 0.2
    const headAngle1 = angle + Math.PI * 0.8
    const headAngle2 = angle - Math.PI * 0.8

    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(endX + Math.cos(headAngle1) * headLength, endY + Math.sin(headAngle1) * headLength)
    ctx.moveTo(endX, endY)
    ctx.lineTo(endX + Math.cos(headAngle2) * headLength, endY + Math.sin(headAngle2) * headLength)
    ctx.stroke()
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.03] pointer-events-none" />
      {children}
    </div>
  )
}
