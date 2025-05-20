"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/context/user-context"

interface CounterProps {
  endValue?: number
  duration?: number
  className?: string
  textClassName?: string
  animateOnView?: boolean
  isUserCounter?: boolean
}

export default function Counter({
  endValue = 100,
  duration = 2000,
  className = "",
  textClassName = "",
  animateOnView = true,
  isUserCounter = false,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const { userCount } = useUser()

  useEffect(() => {
    if (isUserCounter) {
      // Use the userCount from context
      setCount(userCount)

      // Listen for custom events from user registration
      const handleCountUpdate = (event: CustomEvent) => {
        const newCount = event.detail.count
        animateCountChange(newCount)
      }

      // Add event listener for custom count updates
      window.addEventListener("userCountUpdated", handleCountUpdate as EventListener)

      // Return cleanup function
      return () => {
        window.removeEventListener("userCountUpdated", handleCountUpdate as EventListener)
      }
    } else {
      // Regular counter animation
      animateCounter()
    }
  }, [isUserCounter, userCount, endValue])

  const animateCountChange = (newCount: number) => {
    setIsAnimating(true)
    setCount(newCount)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const animateCounter = () => {
    if (hasAnimated.current && !animateOnView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasAnimated.current = true
            observer.disconnect()

            let startTime: number
            const startValue = 0
            const finalValue = endValue

            const step = (timestamp: number) => {
              if (!startTime) startTime = timestamp
              const progress = Math.min((timestamp - startTime) / duration, 1)
              const easedProgress = easeOutQuart(progress)
              const currentValue = Math.floor(startValue + easedProgress * (finalValue - startValue))
              setCount(currentValue)

              if (progress < 1) {
                window.requestAnimationFrame(step)
              }
            }

            window.requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }

  return (
    <div ref={counterRef} className={className}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isAnimating ? [1, 1.2, 1] : 1,
          }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`font-bold ${textClassName}`}
        >
          {count.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
