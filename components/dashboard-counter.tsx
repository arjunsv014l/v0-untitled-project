"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"
import { supabase } from "@/lib/supabase"

// Base count value - we start at 500
const BASE_COUNT = 500

export default function DashboardCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  // Function to get the actual registration count from the database
  const getRegistrationCount = async () => {
    try {
      // Get the count of registrations from the registrations table
      const { count: registrationCount, error } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      if (error) {
        console.error("Error fetching registration count:", error)
        return null
      }

      // Return the base count plus the actual number of registrations
      return BASE_COUNT + registrationCount
    } catch (error) {
      console.error("Error in getRegistrationCount:", error)
      return null
    }
  }

  // Function to get the current counter value from the stats table
  const getCounterValue = async () => {
    try {
      const { data, error } = await supabase.from("stats").select("count").eq("name", "user_counter").single()

      if (error) {
        console.error("Error fetching counter value:", error)
        return null
      }

      return data.count
    } catch (error) {
      console.error("Error in getCounterValue:", error)
      return null
    }
  }

  // Function to update the counter in the stats table
  const updateCounter = async (newCount: number) => {
    try {
      const { error } = await supabase
        .from("stats")
        .update({ count: newCount, updated_at: new Date().toISOString() })
        .eq("name", "user_counter")

      if (error) {
        console.error("Error updating counter:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error in updateCounter:", error)
      return false
    }
  }

  // Function to reconcile the counter with the actual registration count
  const reconcileCounter = async () => {
    try {
      setIsLoading(true)

      // Get the actual registration count
      const actualCount = await getRegistrationCount()

      // Get the current counter value
      const counterValue = await getCounterValue()

      // If either value is null, we can't reconcile
      if (actualCount === null || counterValue === null) {
        console.error("Could not reconcile counter: missing data")
        setIsLoading(false)
        return
      }

      // If the counter is out of sync, update it
      if (actualCount !== counterValue) {
        console.log(`Counter out of sync. Actual: ${actualCount}, Counter: ${counterValue}. Reconciling...`)
        await updateCounter(actualCount)
        setCount(actualCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
      } else {
        // Counter is in sync, just set the count
        setCount(counterValue)
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error reconciling counter:", error)
      setIsLoading(false)
    }
  }

  // Set up real-time listener for registration changes
  useEffect(() => {
    // First reconcile the counter
    reconcileCounter()

    // Set up real-time subscription to the registrations table
    const channel = supabase
      .channel("registration_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "registrations" }, async (payload) => {
        console.log("Registration change detected:", payload)
        // When a registration is added or removed, reconcile the counter
        await reconcileCounter()
      })
      .subscribe((status) => {
        console.log("Supabase channel status:", status)
      })

    // Also listen for changes to the stats table
    const statsChannel = supabase
      .channel("stats_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "stats", filter: "name=eq.user_counter" },
        (payload) => {
          console.log("Counter update received:", payload)
          const newCount = payload.new.count
          setCount(newCount)
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 1000)
        },
      )
      .subscribe()

    // Set up a periodic reconciliation as a fallback
    const intervalId = setInterval(reconcileCounter, 60000) // Reconcile every minute

    // Cleanup function
    return () => {
      supabase.removeChannel(channel)
      supabase.removeChannel(statsChannel)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-black rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">Student Community</h3>

      <div className="flex items-center mb-1">
        <div className="p-2 bg-purple-500 rounded-full mr-3">
          <Users className="h-5 w-5 text-white" />
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl font-bold"
            >
              Loading...
            </motion.div>
          ) : (
            <motion.div
              key={count}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isAnimating ? [1, 1.2, 1] : 1,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold"
            >
              {count?.toLocaleString()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-sm text-gray-600 text-center">students registered on our platform</p>
    </div>
  )
}
