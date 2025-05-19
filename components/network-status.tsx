"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { checkNetworkConnectivity } from "@/lib/firebase"

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      const timer = setTimeout(() => setShowStatus(false), 3000)
      return () => clearTimeout(timer)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    // Set initial state
    setIsOnline(checkNetworkConnectivity())

    // Add event listeners
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showStatus) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center p-3 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-5 w-5 mr-2" />
          <span>Back online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-5 w-5 mr-2" />
          <span>You're offline</span>
        </>
      )}
    </div>
  )
}
