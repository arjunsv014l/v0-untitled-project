"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, increment, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore"

// Simulated counter data
const INITIAL_COUNT = 2547
const DAILY_INCREASE_RATE = 15 // New users per day on average

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

    // Save to localStorage as a fallback
    localStorage.setItem("userCount", newCount.toString())

    // Dispatch a custom event to notify all counter instances
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
    }

    return newCount
  } catch (error) {
    console.error("Error incrementing user count:", error)

    // Fallback to localStorage if Firebase fails
    const currentCount = Number.parseInt(localStorage.getItem("userCount") || INITIAL_COUNT.toString())
    const newCount = currentCount + 1
    localStorage.setItem("userCount", newCount.toString())

    // Still dispatch the event with the fallback count
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
    }

    return newCount
  }
}

export default function UserCounterWidget() {
  const [count, setCount] = useState(INITIAL_COUNT)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathRef = useRef<SVGPathElement>(null)
  const unsubscribeRef = useRef<() => void | null>(null)

  useEffect(() => {
    // Set up real-time listener for counter updates
    const setupRealtimeCounter = async () => {
      try {
        const counterRef = doc(db, "stats", "userCounter")

        // First, try to get the initial count
        const initialSnapshot = await getDoc(counterRef)

        if (initialSnapshot.exists()) {
          const initialCount = initialSnapshot.data().count
          setCount(initialCount)
          localStorage.setItem("userCount", initialCount.toString())
        } else {
          // If document doesn't exist, create it with calculated count
          const calculatedCount = calculateInitialCount()
          setCount(calculatedCount)

          await setDoc(counterRef, {
            count: calculatedCount,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
          })

          localStorage.setItem("userCount", calculatedCount.toString())
        }

        // Set up real-time listener for future updates
        const unsubscribe = onSnapshot(
          counterRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const newCount = snapshot.data().count
              setCount(newCount)
              setIsAnimating(true)
              setTimeout(() => setIsAnimating(false), 1000)
              localStorage.setItem("userCount", newCount.toString())
            }
          },
          (error) => {
            console.error("Real-time counter error:", error)
          },
        )

        unsubscribeRef.current = unsubscribe
      } catch (error) {
        console.error("Error setting up real-time counter:", error)
        fallbackToLocalStorage()
      }
    }

    // Helper function to calculate initial count
    const calculateInitialCount = () => {
      const launchDate = new Date("2023-01-01")
      const today = new Date()
      const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24))
      return INITIAL_COUNT + daysSinceLaunch * DAILY_INCREASE_RATE
    }

    // Fallback to localStorage if Firebase fails
    const fallbackToLocalStorage = () => {
      const storedCount = localStorage.getItem("userCount")
      if (storedCount) {
        setCount(Number.parseInt(storedCount))
      } else {
        const calculatedCount = calculateInitialCount()
        setCount(calculatedCount)
        localStorage.setItem("userCount", calculatedCount.toString())
      }
    }

    // Listen for custom events from other counter instances
    const handleCountUpdate = (event: CustomEvent) => {
      const newCount = event.detail.count
      setCount(newCount)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }

    // Add event listener for custom count updates
    window.addEventListener("userCountUpdated", handleCountUpdate as EventListener)

    // Initialize the counter
    setupRealtimeCounter()

    // Cleanup function
    return () => {
      window.removeEventListener("userCountUpdated", handleCountUpdate as EventListener)
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [])

  return (
    <div className="relative inline-block mr-2">
      {/* Doodle-style SVG border */}
      <svg
        className="absolute -top-1 -left-1 w-[calc(100%+10px)] h-[calc(100%+10px)] z-0"
        viewBox="0 0 120 50"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M10,10 Q15,5 20,10 Q25,15 30,10 Q35,5 40,10 Q45,15 50,10 Q55,5 60,10 Q65,15 70,10 Q75,5 80,10 Q85,15 90,10 Q95,5 100,10 Q105,15 110,10 L110,40 Q105,45 100,40 Q95,35 90,40 Q85,45 80,40 Q75,35 70,40 Q65,45 60,40 Q55,35 50,40 Q45,45 40,40 Q35,35 30,40 Q25,45 20,40 Q15,35 10,40 Z"
          fill="white"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Decorative squiggles */}
        <path d="M15,45 Q20,48 25,45" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M85,5 Q90,2 95,5" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>

      {/* Content */}
      <div className="flex items-center px-4 py-2 relative z-10 bg-gradient-to-r from-green-100 to-green-50 rounded-md">
        <motion.div
          animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="mr-3 p-2 bg-green-500 rounded-full border-2 border-green-600 shadow-lg"
        >
          <Users className="h-4 w-4 text-white" />
        </motion.div>

        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -10, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 10, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="font-bold text-lg text-green-800 leading-tight"
              style={{
                fontFamily: "system-ui, sans-serif",
                textShadow: "0px 1px 1px rgba(255,255,255,0.5)",
              }}
            >
              {count.toLocaleString()}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-green-700 font-medium" style={{ fontFamily: "system-ui, sans-serif" }}>
            students joined
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-2 -right-1 text-[#FF6D00] text-xs"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
      >
        ★
      </motion.div>
      <motion.div
        className="absolute -bottom-1 -left-2 text-[#FF6D00] text-xs"
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      >
        ★
      </motion.div>
    </div>
  )
}
