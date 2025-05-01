"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Sidebar from "./sidebar"
import MobileNavigation from "./mobile-navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  onSectionChange: (section: string) => void
  activeSection: string
}

export default function DashboardLayout({ children, onSectionChange, activeSection }: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {!isMobile && <Sidebar onSectionChange={onSectionChange} activeSection={activeSection} />}

      <div className={`${!isMobile ? "ml-64" : ""} p-4 pb-20`}>
        <main className="max-w-5xl mx-auto">{children}</main>
      </div>

      {isMobile && <MobileNavigation onSectionChange={onSectionChange} activeSection={activeSection} />}
    </div>
  )
}
