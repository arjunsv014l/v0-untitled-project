"use client"

import { Home, type LucideIcon, Settings, Sparkles, User2, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Pre-Customers",
    href: "/admin/pre-customers",
    icon: User2,
  },
]

const settingsItems: NavItem[] = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full py-4">
      <div className="space-y-2">
        <h4 className="px-3 font-medium text-sm">Admin</h4>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            href="/admin/test-blog-ai"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === "/admin/test-blog-ai" ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Sparkles className="h-5 w-5" />
            <span>Test Blog AI</span>
          </Link>
        </div>
      </div>
      <div className="mt-auto space-y-2">
        <h4 className="px-3 font-medium text-sm">Settings</h4>
        <div className="space-y-1">
          {settingsItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
