"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, increment, setDoc, serverTimestamp } from "firebase/firestore"

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

    return newCount
  } catch (error) {
    console.error("Error incrementing user count:", error)

    // Fallback to localStorage if Firebase fails
    const currentCount = Number.parseInt(localStorage.getItem("userCount") || INITIAL_COUNT.toString())
    const newCount = currentCount + 1
    localStorage.setItem("userCount", newCount.toString())
    return newCount
  }
}

export default function UserCounterWidget() {
  const [count, setCount] = useState(INITIAL_COUNT)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Fetch the count from Firebase
    const fetchCount = async () => {
      try {
        const counterRef = doc(db, "stats", "userCounter")
        const counterDoc = await getDoc(counterRef)

        if (counterDoc.exists()) {
          setCount(counterDoc.data().count)
          localStorage.setItem("userCount", counterDoc.data().count.toString())
        } else {
          // If the document doesn't exist, create it with the initial count
          const calculatedCount = calculateInitialCount()
          setCount(calculatedCount)

          // Create the counter document
          await setDoc(counterRef, {
            count: calculatedCount,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
          })

          localStorage.setItem("userCount", calculatedCount.toString())
        }
      } catch (error) {
        console.error("Error fetching user count:", error)

        // Fallback to localStorage or calculate a new count
        const storedCount = localStorage.getItem("userCount")
        if (storedCount) {
          setCount(Number.parseInt(storedCount))
        } else {
          const calculatedCount = calculateInitialCount()
          setCount(calculatedCount)
          localStorage.setItem("userCount", calculatedCount.toString())
        }
      }
    }

    // Helper function to calculate initial count
    const calculateInitialCount = () => {
      const launchDate = new Date("2023-01-01")
      const today = new Date()
      const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24))
      return INITIAL_COUNT + daysSinceLaunch * DAILY_INCREASE_RATE
    }

    fetchCount()

    // Simulate occasional increments
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of increment
        setIsAnimating(true)
        incrementUserCount().then((newCount) => {
          setCount(newCount)
          setTimeout(() => {
            setIsAnimating(false)
          }, 1000)
        })
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
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
      <div className="flex items-center px-4 py-2 relative z-10">
        <motion.div
          animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="mr-2 p-1.5 bg-[#FFECB3] rounded-full border-2 border-black"
          style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
        >
          <Users className="h-4 w-4 text-[#FF6D00]" />
        </motion.div>

        <div className="flex items-baseline">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -10, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 10, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="font-bold mr-1 text-[#333333]"
              style={{
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                textShadow: "1px 1px 0 rgba(0,0,0,0.1)",
              }}
            >
              {count.toLocaleString()}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            users
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
