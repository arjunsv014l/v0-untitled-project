"use client"
import { motion } from "framer-motion"
import { Home, MessageCircle, User, BookOpen, PlusCircle } from "lucide-react"

interface MobileNavigationProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

export default function MobileNavigation({ onSectionChange, activeSection }: MobileNavigationProps) {
  const navItems = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "messages", label: "Messages", icon: MessageCircle, badge: 3 },
    { id: "create", label: "Create", icon: PlusCircle, isSpecial: true },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "profile", label: "Profile", icon: User },
  ]

  const handleNavClick = (id: string) => {
    if (id !== "create") {
      onSectionChange(id)
    } else {
      // Handle create post action
      console.log("Create post clicked")
      // You could open a modal here
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`
              flex flex-col items-center justify-center relative
              ${item.isSpecial ? "px-3" : "px-5"}
              ${activeSection === item.id ? "text-blue-600" : "text-gray-500"}
            `}
          >
            {item.isSpecial ? (
              <div className="relative -mt-8">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-sm opacity-30"></div>
                <div className="relative bg-blue-600 text-white p-3 rounded-full">
                  <item.icon size={24} />
                </div>
              </div>
            ) : (
              <>
                <item.icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>

                {item.badge && (
                  <span className="absolute top-0 right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}

                {activeSection === item.id && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -bottom-1 w-8 h-1 bg-blue-600 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
