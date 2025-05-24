"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  FileText,
  BarChart2,
  Settings,
  Bell,
  MessageSquare,
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useUser } from "@/context/user-context"

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { logout } = useUser()

  const navItems = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
    },
    {
      label: "Content",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/content",
    },
    {
      label: "Analytics",
      icon: <BarChart2 className="h-5 w-5" />,
      href: "/admin/analytics",
    },
    {
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/messages",
    },
    {
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      href: "/admin/notifications",
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ]

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  return (
    <div
      className={`h-screen fixed top-0 left-0 bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
