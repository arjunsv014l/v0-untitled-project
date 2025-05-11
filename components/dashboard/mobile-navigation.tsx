"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Home, BookOpen, Users, FileText, Settings, User } from "lucide-react"

interface MobileNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function MobileNavigation({ activeSection, onSectionChange }: MobileNavigationProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleNavigation = (path: string, section: string) => {
    // Prevent multiple rapid navigations
    if (isNavigating) return

    setIsNavigating(true)
    onSectionChange(section)
    router.push(path)

    // Reset navigation flag after delay
    setTimeout(() => setIsNavigating(false), 500)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50">
      <button
        onClick={() => handleNavigation("/dashboard", "home")}
        className={`flex flex-col items-center ${activeSection === "home" ? "text-blue-600" : "text-gray-500"}`}
        disabled={isNavigating}
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button
        onClick={() => handleNavigation("/profile", "profile")}
        className={`flex flex-col items-center ${activeSection === "profile" ? "text-blue-600" : "text-gray-500"}`}
        disabled={isNavigating}
      >
        <User size={20} />
        <span className="text-xs mt-1">Profile</span>
      </button>

      <button
        onClick={() => handleNavigation("/dashboard/journal", "journal")}
        className={`flex flex-col items-center ${activeSection === "journal" ? "text-blue-600" : "text-gray-500"}`}
        disabled={isNavigating}
      >
        <BookOpen size={20} />
        <span className="text-xs mt-1">Journal</span>
      </button>

      <button
        onClick={() => handleNavigation("/dashboard/social", "feed")}
        className={`flex flex-col items-center ${activeSection === "feed" ? "text-blue-600" : "text-gray-500"}`}
        disabled={isNavigating}
      >
        <Users size={20} />
        <span className="text-xs mt-1">Social</span>
      </button>

      <button
        onClick={() => handleNavigation("/dashboard/resume", "resume")}
        className={`flex flex-col items-center ${activeSection === "resume" ? "text-blue-600" : "text-gray-500"}`}
        disabled={isNavigating}
      >
        <FileText size={20} />
        <span className="text-xs mt-1">Resume</span>
      </button>

      <button
        onClick={() => handleNavigation("/dashboard/settings", "settings")}
        className={`flex flex-col items-center ${activeSection === "settings" ? "text-blue-600" : "text-gray-500"}`}
        disabled={isNavigating}
      >
        <Settings size={20} />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  )
}
