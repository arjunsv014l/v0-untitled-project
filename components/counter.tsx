"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, increment, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore"

interface CounterProps {
  endValue?: number
  duration?: number
  className?: string
  textClassName?: string
  animateOnView?: boolean
}

// Initial count value
const INITIAL_COUNT = 500

export async function incrementUserCount() {
  try {
    // Update the counter in Firestore
    const counterRef = doc(db, "stats", "userCounter")

    // Get the document first to check if it exists
    const counterDoc = await getDoc(counterRef)

    if (counterDoc.exists()) {
      // Update existing counter
      await updateDoc(counterRef, {
        count: increment(1),
        lastUpdated: serverTimestamp(),
      })
    } else {
      // Create counter document if it doesn't exist
      await setDoc(counterRef, {
        count: INITIAL_COUNT + 1,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      })
    }

    // Get the updated count
    const updatedDoc = await getDoc(counterRef)
    const newCount = updatedDoc.data()?.count || INITIAL_COUNT + 1

    // Dispatch a custom event to notify all counter instances
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
    }

    return newCount
  } catch (error) {
    console.error("Error incrementing user count:", error)
    return INITIAL_COUNT
  }
}

export default function Counter({
  endValue = 100,
  duration = 2000,
  className = "",
  textClassName = "",
  animateOnView = true,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isUserCounter, setIsUserCounter] = useState(false)
  const unsubscribeRef = useRef<() => void | null>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Check if this is a user counter (endValue is exactly 12458 from the provided code)
    if (endValue === 12458) {
      setIsUserCounter(true)
      setupUserCounter()
    } else {
      // Regular counter animation
      animateCounter()
    }

    return () => {
      // Clean up Firestore listener if it exists
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [endValue])

  const setupUserCounter = async () => {
    try {
      const counterRef = doc(db, "stats", "userCounter")

      // First, try to get the initial count
      const initialSnapshot = await getDoc(counterRef)

      if (initialSnapshot.exists()) {
        const initialCount = initialSnapshot.data().count
        setCount(initialCount)
      } else {
        // If document doesn't exist, create it with initial count
        setCount(INITIAL_COUNT)

        await setDoc(counterRef, {
          count: INITIAL_COUNT,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp(),
        })
      }

      // Set up real-time listener for future updates
      const unsubscribe = onSnapshot(
        counterRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const newCount = snapshot.data().count
            animateCountChange(newCount)
          }
        },
        (error) => {
          console.error("Real-time counter error:", error)
        },
      )

      unsubscribeRef.current = unsubscribe

      // Listen for custom events from other counter instances
      const handleCountUpdate = (event: CustomEvent) => {
        const newCount = event.detail.count
        animateCountChange(newCount)
      }

      // Add event listener for custom count updates
      window.addEventListener("userCountUpdated", handleCountUpdate as EventListener)

      // Return cleanup function
      return () => {
        window.removeEventListener("userCountUpdated", handleCountUpdate as EventListener)
        if (unsubscribeRef.current) {
          unsubscribeRef.current()
        }
      }
    } catch (error) {
      console.error("Error setting up user counter:", error)
      setCount(INITIAL_COUNT)
    }
  }

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
