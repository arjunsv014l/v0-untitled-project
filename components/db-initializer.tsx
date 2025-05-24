"use client"

import { useEffect, useState } from "react"

export function DbInitializer() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeDb = async () => {
      try {
        // Only run this once
        if (initialized) return

        // Call the setup endpoint
        const response = await fetch("/api/auth/setup-db-functions")
        if (!response.ok) {
          console.error("Failed to initialize database functions")
        } else {
          console.log("Database functions initialized successfully")
          setInitialized(true)
        }
      } catch (error) {
        console.error("Error initializing database:", error)
      }
    }

    initializeDb()
  }, [initialized])

  // This component doesn't render anything
  return null
}
