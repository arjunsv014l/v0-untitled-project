"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBgProps {
  className?: string
  children?: React.ReactNode
}

export default function AnimatedGradientBg({ className, children }: AnimatedGradientBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)

    // Gradient circles
    const circles: Circle[] = []
    const colors = [
      "rgba(16, 184, 74, 0.4)", // green
      "rgba(139, 92, 246, 0.3)", // purple
      "rgba(236, 72, 153, 0.3)", // pink
    ]

    class Circle {
      x: number
      y: number
      radius: number
      color: string
      dx: number
      dy: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.radius = Math.random() * 100 + 50
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.dx = (Math.random() - 0.5) * 0.5
        this.dy = (Math.random() - 0.5) * 0.5
      }

      update() {
        this.x += this.dx
        this.y += this.dy

        // Bounce off edges
        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.dx = -this.dx
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.dy = -this.dy
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create circles
    for (let i = 0; i < 5; i++) {
      circles.push(new Circle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      // Draw and update circles
      circles.forEach((circle) => {
        circle.update()
        circle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      {children}
    </div>
  )
}
