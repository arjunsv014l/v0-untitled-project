"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, BookOpen, Users, FileText, Settings, Calendar, LogOut, Menu, X, Activity, User } from "lucide-react"
import { useUser } from "@/context/user-context"

interface SidebarProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

export default function Sidebar({ onSectionChange, activeSection }: SidebarProps) {
  const { user, logout } = useUser()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const navItems = [
    {
      id: "home",
      label: "Dashboard",
      icon: <Home size={20} />,
      href: "/dashboard",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
      href: "/profile",
    },
    {
      id: "journal",
      label: "Journal",
      icon: <BookOpen size={20} />,
      href: "/dashboard/journal",
    },
    {
      id: "feed",
      label: "Social Feed",
      icon: <Users size={20} />,
      href: "/dashboard/social",
    },
    {
      id: "resume",
      label: "Resume",
      icon: <FileText size={20} />,
      href: "/dashboard/resume",
    },
    {
      id: "events",
      label: "Events",
      icon: <Calendar size={20} />,
      href: "/dashboard/events",
    },
    {
      id: "activity",
      label: "Activity",
      icon: <Activity size={20} />,
      href: "/dashboard/activity",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      href: "/dashboard/settings",
    },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className={`font-bold text-xl ${isCollapsed ? "hidden" : "block"}`}>Dreamclerk</h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <div className="p-4">
        <div className={`flex items-center mb-6 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
            {user?.avatar ? (
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-medium">{user?.name || "User"}</div>
              <div className="text-xs text-gray-500">{user?.email || ""}</div>
            </div>
          )}
        </div>

        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center p-2 rounded-md ${
                    activeSection === item.id
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <span className={isCollapsed ? "" : "mr-3"}>{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className={`flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 w-full ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <span className={isCollapsed ? "" : "mr-3"}>
                  <LogOut size={20} />
                </span>
                {!isCollapsed && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
