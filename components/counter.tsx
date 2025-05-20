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
const LOCAL_STORAGE_COUNTER_KEY = "dreamclerk_user_counter"

export async function incrementUserCount() {
  try {
    // First check if we're online
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      console.warn("⚠️ Offline: Using local storage for counter increment")
      // Store in local storage that we need to increment when back online
      const pendingIncrements = Number.parseInt(localStorage.getItem("pendingCounterIncrements") || "0") + 1
      localStorage.setItem("pendingCounterIncrements", pendingIncrements.toString())

      // Get current local count and increment it
      const currentLocalCount = Number.parseInt(
        localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY) || INITIAL_COUNT.toString(),
      )
      const newCount = currentLocalCount + 1
      localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, newCount.toString())

      // Dispatch event to update UI
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
      return newCount
    }

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

    // Update local storage for offline fallback
    localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, newCount.toString())

    // Dispatch a custom event to notify all counter instances
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
    }

    return newCount
  } catch (error) {
    console.error("Error incrementing user count:", error)

    // Fallback to local storage
    const currentLocalCount = Number.parseInt(
      localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY) || INITIAL_COUNT.toString(),
    )
    const newCount = currentLocalCount + 1
    localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, newCount.toString())

    // Dispatch event to update UI
    window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))

    return newCount
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
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

      // Clear any retry timeouts
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [endValue])

  // Handle online/offline status changes
  useEffect(() => {
    const handleOnline = () => {
      console.log("🌐 Back online: Syncing counter data")
      syncCounterWithFirestore()
    }

    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("online", handleOnline)
    }
  }, [])

  // Sync local counter with Firestore when we come back online
  const syncCounterWithFirestore = async () => {
    try {
      // Check if we have pending increments
      const pendingIncrements = Number.parseInt(localStorage.getItem("pendingCounterIncrements") || "0")

      if (pendingIncrements > 0) {
        console.log(`🔄 Syncing ${pendingIncrements} pending counter increments`)

        const counterRef = doc(db, "stats", "userCounter")
        const counterDoc = await getDoc(counterRef)

        if (counterDoc.exists()) {
          await updateDoc(counterRef, {
            count: increment(pendingIncrements),
            lastUpdated: serverTimestamp(),
          })
        } else {
          await setDoc(counterRef, {
            count: INITIAL_COUNT + pendingIncrements,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
          })
        }

        // Clear pending increments
        localStorage.setItem("pendingCounterIncrements", "0")

        // Get the updated count
        const updatedDoc = await getDoc(counterRef)
        const newCount = updatedDoc.data()?.count || INITIAL_COUNT + pendingIncrements

        // Update local storage
        localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, newCount.toString())

        // Update UI
        setCount(newCount)
      }
    } catch (error) {
      console.error("Error syncing counter with Firestore:", error)
    }
  }

  const setupUserCounter = async () => {
    try {
      // First try to get the count from local storage as a fallback
      const localCount = localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY)
      if (localCount) {
        setCount(Number.parseInt(localCount))
      } else {
        setCount(INITIAL_COUNT)
      }

      // Check if we're online before trying to access Firestore
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        console.warn("⚠️ Offline: Using local storage for counter")
        return
      }

      const counterRef = doc(db, "stats", "userCounter")

      // First, try to get the initial count
      const initialSnapshot = await getDoc(counterRef)

      if (initialSnapshot.exists()) {
        const initialCount = initialSnapshot.data().count
        setCount(initialCount)
        localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, initialCount.toString())
      } else {
        // If document doesn't exist, create it with initial count
        setCount(INITIAL_COUNT)

        await setDoc(counterRef, {
          count: INITIAL_COUNT,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp(),
        })

        localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, INITIAL_COUNT.toString())
      }

      // Set up real-time listener for future updates
      try {
        const unsubscribe = onSnapshot(
          counterRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const newCount = snapshot.data().count
              animateCountChange(newCount)
              localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, newCount.toString())
            }
          },
          (error) => {
            console.error("Real-time counter error:", error)
            // If we get an error with the real-time listener, fall back to local storage
            const localCount = localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY)
            if (localCount) {
              setCount(Number.parseInt(localCount))
            }
          },
        )

        unsubscribeRef.current = unsubscribe
      } catch (error) {
        console.error("Error setting up real-time listener:", error)
      }

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

      // If we get an error, try to use local storage
      const localCount = localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY)
      if (localCount) {
        setCount(Number.parseInt(localCount))
      } else {
        setCount(INITIAL_COUNT)
        localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, INITIAL_COUNT.toString())
      }

      // Set up a retry mechanism
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }

      retryTimeoutRef.current = setTimeout(() => {
        if (typeof navigator !== "undefined" && navigator.onLine) {
          console.log("🔄 Retrying counter setup...")
          setupUserCounter()
        }
      }, 10000) // Retry after 10 seconds
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
