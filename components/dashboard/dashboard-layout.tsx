"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import Sidebar from "./sidebar"
import MobileNavigation from "./mobile-navigation"
import { usePathname } from "next/navigation"
import { useUser } from "@/context/user-context"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection?: string
}

export default function DashboardLayout({ children, activeSection: propActiveSection }: DashboardLayoutProps) {
  const { user } = useUser()
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const layoutMounted = useRef(false)

  // Determine active section based on pathname
  const getActiveSection = useCallback(() => {
    if (pathname === "/dashboard") return "home"
    if (pathname.includes("/dashboard/journal")) return "journal"
    if (pathname.includes("/dashboard/social")) return "feed"
    if (pathname.includes("/dashboard/resume")) return "resume"
    if (pathname.includes("/dashboard/settings")) return "settings"
    if (pathname.includes("/dashboard/events")) return "events"
    if (pathname.includes("/dashboard/activity")) return "activity"
    return "home"
  }, [pathname])

  const [activeSection, setActiveSection] = useState(propActiveSection || getActiveSection())

  // Update active section when pathname changes
  useEffect(() => {
    setActiveSection(propActiveSection || getActiveSection())
  }, [pathname, getActiveSection, propActiveSection])

  // Mark layout as mounted
  useEffect(() => {
    layoutMounted.current = true

    // After a short delay, mark initial load as complete
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 300)

    return () => {
      layoutMounted.current = false
      clearTimeout(timer)
    }
  }, [])

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()

    // Throttle resize events to prevent excessive re-renders
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkIfMobile, 100)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  // Show a loading state during initial render to prevent flicker
  if (isInitialLoad) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {!isMobile && <Sidebar onSectionChange={handleSectionChange} activeSection={activeSection} />}

      <div className={`${!isMobile ? "ml-64" : ""} p-4 pb-20`}>
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>

      {isMobile && <MobileNavigation onSectionChange={handleSectionChange} activeSection={activeSection} />}
    </div>
  )
}
