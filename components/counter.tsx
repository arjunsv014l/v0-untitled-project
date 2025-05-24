"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface CounterProps {
  endValue?: number
  duration?: number
  className?: string
  textClassName?: string
  animateOnView?: boolean
  prefix?: string
  suffix?: string
  separator?: string
  decimalPlaces?: number
}

// Initial count value
const BASE_COUNT = 500
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
        localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY) || BASE_COUNT.toString(),
      )
      const newCount = currentLocalCount + 1
      localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, newCount.toString())

      // Dispatch event to update UI
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
      return newCount
    }

    // Get the current registration count directly from the database
    // This ensures we're using the registration table as the source of truth
    const { count: registrationCount, error: countError } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })

    if (countError) {
      console.error("Error getting registration count:", countError)
      throw countError
    }

    // Calculate the new count based on BASE_COUNT + actual registrations
    // This ensures we're always showing the correct sequential number
    const actualCount = registrationCount || 0
    const newCount = BASE_COUNT + actualCount

    // Update the counter in Supabase stats table to match the actual registration count
    const { error: updateError } = await supabase.from("stats").update({ count: newCount }).eq("name", "user_counter")

    if (updateError) {
      console.error("Error updating user count:", updateError)
      throw updateError
    }

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
    const currentLocalCount = Number.parseInt(localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY) || BASE_COUNT.toString())
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
  prefix = "",
  suffix = "",
  separator = ",",
  decimalPlaces = 0,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isUserCounter, setIsUserCounter] = useState(false)
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    duration,
    bounce: 0,
  })
  const [displayValue, setDisplayValue] = useState("0")
  const [isInView, setIsInView] = useState(false)

  // Function to refresh the counter from the database
  const refreshUserCounter = async () => {
    try {
      // Get the current registration count directly from the database
      const { count: registrationCount, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error getting registration count:", countError)
        return
      }

      // Calculate the counter value based on BASE_COUNT + actual registrations
      const actualCount = registrationCount || 0
      const finalCount = BASE_COUNT + actualCount

      // Only update if the count has changed
      if (finalCount !== count) {
        console.log(`User counter refreshed from database: ${finalCount}`)
        setCount(finalCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
        localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, finalCount.toString())

        // Also update the stats table to ensure consistency
        await supabase.from("stats").update({ count: finalCount }).eq("name", "user_counter")
      }
    } catch (error) {
      console.error("Error in refreshUserCounter:", error)
    }
  }

  const setupUserCounter = async () => {
    try {
      // First try to get the count from local storage as a fallback
      const localCount = localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY)
      if (localCount) {
        setCount(Number.parseInt(localCount))
      } else {
        setCount(BASE_COUNT)
      }

      // Check if we're online before trying to access Supabase
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        console.warn("⚠️ Offline: Using local storage for counter")
        return
      }

      // Get the current count from Supabase
      await refreshUserCounter()

      // Set up real-time subscription
      try {
        const channel = supabase
          .channel("stats_changes")
          .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "stats", filter: "name=eq.user_counter" },
            (payload) => {
              console.log("Real-time counter update received:", payload)
              const newCount = payload.new.count
              // Ensure the count is never less than BASE_COUNT
              const finalCount = newCount < BASE_COUNT ? BASE_COUNT : newCount
              animateCountChange(finalCount)
              localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, finalCount.toString())
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
        refreshIntervalRef.current = setInterval(refreshUserCounter, 30000) // Refresh every 30 seconds
      } catch (error) {
        console.error("Error setting up real-time listener:", error)
      }

      // Listen for custom events from other counter instances
      const handleCountUpdate = (event: CustomEvent) => {
        const newCount = event.detail.count
        // Ensure the count is never less than BASE_COUNT
        const finalCount = newCount < BASE_COUNT ? BASE_COUNT : newCount
        animateCountChange(finalCount)
      }

      // Add event listener for custom count updates
      window.addEventListener("userCountUpdated", handleCountUpdate as EventListener)

      // Return cleanup function
      return () => {
        window.removeEventListener("userCountUpdated", handleCountUpdate as EventListener)
        if (unsubscribeRef.current) {
          unsubscribeRef.current()
        }
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current)
        }
      }
    } catch (error) {
      console.error("Error setting up user counter:", error)

      // If we get an error, try to use local storage
      const localCount = localStorage.getItem(LOCAL_STORAGE_COUNTER_KEY)
      if (localCount) {
        setCount(Number.parseInt(localCount))
      } else {
        setCount(BASE_COUNT)
        localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, BASE_COUNT.toString())
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

  // Sync local counter with Supabase when we come back online
  const syncCounterWithSupabase = async () => {
    try {
      // Instead of applying pending increments, we'll get the actual registration count
      // and update the counter to match it
      const { count: registrationCount, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      if (countError) {
        console.error("Error getting registration count:", countError)
        return
      }

      // Calculate the counter value based on BASE_COUNT + actual registrations
      const actualCount = registrationCount || 0
      const newCount = BASE_COUNT + actualCount

      // Update the stats table
      await supabase.from("stats").update({ count: newCount }).eq("name", "user_counter")

      // Clear pending increments since we're now in sync with the database
      localStorage.setItem("pendingCounterIncrements", "0")

      // Update local storage and UI
      localStorage.setItem(LOCAL_STORAGE_COUNTER_KEY, newCount.toString())
      setCount(newCount)
    } catch (error) {
      console.error("Error syncing counter with Supabase:", error)
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
      // Clean up Supabase listener if it exists
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }

      // Clear any retry timeouts
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }

      // Clear refresh interval
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [endValue])

  // Handle online/offline status changes
  useEffect(() => {
    const handleOnline = async () => {
      console.log("🌐 Back online: Syncing counter data")
      if (isUserCounter) {
        syncCounterWithSupabase()
      }
    }

    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("online", handleOnline)
    }
  }, [isUserCounter])

  // Force a refresh when the component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isUserCounter) {
        console.log("Page became visible, refreshing counter")
        refreshUserCounter()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isUserCounter])

  useEffect(() => {
    const checkIfInView = () => {
      if (counterRef.current) {
        const rect = counterRef.current.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0
        if (isVisible && !isInView) {
          setIsInView(true)
        }
      }
    }

    checkIfInView()
    window.addEventListener("scroll", checkIfInView)

    return () => {
      window.removeEventListener("scroll", checkIfInView)
    }
  }, [isInView])

  useEffect(() => {
    if (isInView) {
      motionValue.set(endValue)
    }
  }, [isInView, motionValue, endValue])

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      const formatted = formatNumber(latest, decimalPlaces, separator)
      setDisplayValue(formatted)
    })

    return unsubscribe
  }, [springValue, decimalPlaces, separator])

  const formatNumber = (num: number, decimalPlaces: number, separator: string): string => {
    const fixed = num.toFixed(decimalPlaces)
    const parts = fixed.split(".")
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return decimalPlaces > 0 && parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart
  }

  return (
    <motion.div
      ref={counterRef}
      className={`font-bold tabular-nums ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.div>
  )
}
