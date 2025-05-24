"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"
import { supabase } from "@/lib/supabase"

export async function getUserCountFromSupabase() {
  try {
    // Get the actual registration count from the database
    const { count: registrationCount, error: countError } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })

    if (countError) {
      console.error("Error getting registration count:", countError)
      return 0 // Return 0 instead of BASE_COUNT on error
    }

    // Return the actual count without adding BASE_COUNT
    return registrationCount || 0
  } catch (error) {
    console.error("Error in getUserCountFromSupabase:", error)
    return 0
  }
}

export async function incrementUserCount() {
  try {
    // Check if we're online
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      console.warn("⚠️ Offline: Using local storage for counter increment")
      // Store in local storage that we need to increment when back online
      const pendingIncrements = Number.parseInt(localStorage.getItem("pendingCounterIncrements") || "0") + 1
      localStorage.setItem("pendingCounterIncrements", pendingIncrements.toString())

      // Get current local count and increment it
      const currentLocalCount = Number.parseInt(localStorage.getItem("userCount") || "0")
      const newCount = currentLocalCount + 1
      localStorage.setItem("userCount", newCount.toString())

      // Dispatch event to update UI
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
      return newCount
    }

    // Get the current registration count directly from the database
    const { count: registrationCount, error: countError } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })

    if (countError) {
      console.error("Error getting registration count:", countError)
      throw countError
    }

    // Calculate the counter value based on BASE_COUNT + actual registrations
    const actualCount = registrationCount || 0
    const newCount = actualCount

    // Update the counter in Supabase stats table to match the actual registration count
    const { error: updateError } = await supabase.from("stats").update({ count: newCount }).eq("name", "user_counter")

    if (updateError) {
      console.error("Error updating user count:", updateError)
      throw updateError
    }

    // Update local storage for offline fallback
    localStorage.setItem("userCount", newCount.toString())

    // Dispatch a custom event to notify all counter instances
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
    }

    return newCount
  } catch (error) {
    console.error("Error incrementing user count:", error)

    // Fallback to local storage
    const currentLocalCount = Number.parseInt(localStorage.getItem("userCount") || "0")
    const newCount = currentLocalCount + 1
    localStorage.setItem("userCount", newCount.toString())

    // Dispatch event to update UI
    window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))

    return newCount
  }
}

export default function UserCounterWidget() {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathRef = useRef<SVGPathElement>(null)
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const refreshCounter = async () => {
    try {
      // Get the actual registration count from the database
      const { count: registrationCount, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error getting registration count:", countError)
        return
      }

      // Use the actual count without BASE_COUNT
      const dbCount = registrationCount || 0

      // Also update the stats table to ensure consistency
      await supabase.from("stats").upsert({
        name: "user_counter",
        count: dbCount,
        updated_at: new Date().toISOString(),
      })

      // Only update if the count has changed
      if (dbCount !== count) {
        console.log(`Counter refreshed from database: ${dbCount}`)
        setCount(dbCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
        localStorage.setItem("userCount", dbCount.toString())
      }
    } catch (error) {
      console.error("Error refreshing counter:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Set up real-time listener for counter updates
    const setupRealtimeCounter = async () => {
      try {
        setIsLoading(true)

        // First, try to get the initial count
        await refreshCounter()

        // Set up real-time subscription
        const channel = supabase
          .channel("stats_changes")
          .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "stats", filter: "name=eq.user_counter" },
            (payload) => {
              console.log("Real-time counter update received:", payload)
              const newCount = payload.new.count
              // Ensure the count is never less than BASE_COUNT
              const finalCount = newCount < 0 ? 0 : newCount
              setCount(finalCount)
              setIsAnimating(true)
              setTimeout(() => setIsAnimating(false), 1000)
              localStorage.setItem("userCount", finalCount.toString())
            },
          )
          .subscribe((status) => {
            console.log("Supabase channel status:", status)
          })

        // Store unsubscribe function
        unsubscribeRef.current = () => {
          console.log("Unsubscribing from Supabase channel")
          supabase.removeChannel(channel)
        }

        // Set up a periodic refresh as a fallback
        refreshIntervalRef.current = setInterval(refreshCounter, 30000) // Refresh every 30 seconds
      } catch (error) {
        console.error("Error setting up real-time counter:", error)
        fallbackToLocalStorage()
      } finally {
        setIsLoading(false)
      }
    }

    // Fallback to localStorage if Supabase fails
    const fallbackToLocalStorage = () => {
      const storedCount = localStorage.getItem("userCount")
      if (storedCount) {
        setCount(Number.parseInt(storedCount))
      } else {
        setCount(0)
        localStorage.setItem("userCount", "0")
      }
      setIsLoading(false)
    }

    // Listen for custom events from other counter instances
    const handleCountUpdate = (event: CustomEvent) => {
      const newCount = event.detail.count
      // Ensure the count is never less than BASE_COUNT
      const finalCount = newCount < 0 ? 0 : newCount
      setCount(finalCount)
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
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [])

  // Handle online/offline status changes
  useEffect(() => {
    const handleOnline = async () => {
      console.log("🌐 Back online: Syncing counter data")

      // Instead of applying pending increments, get the actual registration count
      const { count: registrationCount, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error getting registration count:", countError)
        return
      }

      // Calculate the counter value based on BASE_COUNT + actual registrations
      const actualCount = registrationCount || 0
      const newCount = actualCount

      // Update the stats table
      await supabase.from("stats").update({ count: newCount }).eq("name", "user_counter")

      // Clear pending increments since we're now in sync with the database
      localStorage.setItem("pendingCounterIncrements", "0")

      // Update local storage and UI
      localStorage.setItem("userCount", newCount.toString())
      setCount(newCount)
    }

    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("online", handleOnline)
    }
  }, [])

  // Force a refresh when the component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Page became visible, refreshing counter")
        refreshCounter()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
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
      <div className="flex items-center px-4 py-2 relative z-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-md border border-blue-200 shadow-sm">
        <motion.div
          animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="relative mr-3"
        >
          <div className="p-2 bg-blue-500 rounded-full border-2 border-blue-600 shadow-lg">
            <Users className="h-4 w-4 text-white" />
          </div>
          {/* Pulsing effect for "active" indication */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400 opacity-50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-lg text-blue-800 leading-tight"
              >
                Loading...
              </motion.span>
            ) : (
              <motion.span
                key={count}
                initial={{ opacity: 0, y: -10, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 10, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="font-bold text-lg text-blue-800 leading-tight"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  textShadow: "0px 1px 1px rgba(255,255,255,0.5)",
                }}
              >
                {count.toLocaleString()}
              </motion.span>
            )}
          </AnimatePresence>
          <span
            className="text-xs text-blue-700 font-medium flex items-center"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full mr-1"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
            active now
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
