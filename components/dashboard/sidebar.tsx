"use client"
import { motion } from "framer-motion"
import { Home, MessageCircle, User, BookOpen, Settings, LogOut, Search, PlusCircle } from "lucide-react"

interface SidebarProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

export default function Sidebar({ onSectionChange, activeSection }: SidebarProps) {
  const menuItems = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "messages", label: "Messages", icon: MessageCircle, badge: 3 },
    { id: "profile", label: "Profile", icon: User },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center mb-8 px-2">
        <div className="text-blue-600 font-bold text-2xl">DreamClerk</div>
      </div>

      <div className="relative mb-6 px-2">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => onSectionChange(item.id)} className="relative block w-full text-left">
            <div
              className={`
              flex items-center px-4 py-3 rounded-lg transition-colors
              ${activeSection === item.id ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}
            `}
            >
              <item.icon size={20} className="mr-3" />
              <span>{item.label}</span>

              {item.badge && (
                <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}

              {activeSection === item.id && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          </button>
        ))}
      </nav>

      <div className="mt-6 mb-6">
        <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircle size={18} className="mr-2" />
          <span>Create Post</span>
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
