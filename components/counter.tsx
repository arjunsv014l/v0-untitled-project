"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface CounterProps {
  endValue?: number
  duration?: number
}

export default function Counter({ endValue = 12458, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      countRef.current = Math.floor(progress * endValue)
      setCount(countRef.current)

      if (progress === 1) {
        clearInterval(interval)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [endValue, duration, isVisible])

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="font-bold text-black"
    >
      {count.toLocaleString()}
    </motion.div>
  )
}
