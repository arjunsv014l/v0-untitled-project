"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  LogOut,
  Edit,
  User,
  GraduationCap,
  BookOpen,
  Building,
  Brain,
  Info,
  HelpCircle,
  Sparkles,
  Home,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import DoodleButton from "./ui-elements/doodle-button"
import { useUser } from "@/context/user-context"
import SignInModal from "./sign-in-modal"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const { user, logout } = useUser()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMobile, isMenuOpen])

  // User group buttons
  const userGroups = [
    { name: "Freshers", href: "/for-freshers", icon: GraduationCap },
    { name: "Students", href: "/for-students", icon: BookOpen },
    { name: "Universities", href: "/for-universities", icon: Building },
    { name: "Companies", href: "/for-companies", icon: Brain },
  ]

  // Main navigation items
  const mainNavItems = [
    { name: "How It Works", href: "/how-it-works", icon: Sparkles },
    { name: "About", href: "/about", icon: Info },
    { name: "Q&A", href: "/query", icon: HelpCircle },
  ]

  // Mobile menu items (flat structure)
  const mobileNavItems = [...userGroups, ...mainNavItems]

  return (
    <>
      {/* Fixed header container that spans full width */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center"
              onClick={(e) => {
                // If already on home page, just scroll to top
                if (pathname === "/") {
                  e.preventDefault()
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                } else {
                  // If navigating from another page, clear any saved scroll position
                  localStorage.removeItem("landingPageScrollPosition")
                }
              }}
            >
              <span className="text-2xl font-bold text-black">dreamclerk</span>
            </Link>
          </div>

          {/* Desktop Navigation - Evenly distributed */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <div className="flex items-center justify-evenly w-full max-w-4xl mx-auto px-4">
              {/* User Group Buttons */}
              {userGroups.map((group, index) => (
                <Link key={index} href={group.href} className="px-1">
                  <DoodleButton
                    size="sm"
                    variant={pathname === group.href ? "primary" : "outline"}
                    className={pathname === group.href ? "ring-2 ring-offset-2 ring-black" : ""}
                  >
                    <group.icon className="h-4 w-4 mr-1" />
                    {group.name}
                  </DoodleButton>
                </Link>
              ))}

              {/* Main Nav Items */}
              {mainNavItems.map((item, index) => (
                <Link key={index} href={item.href} className="px-1">
                  <DoodleButton
                    size="sm"
                    variant={pathname === item.href ? "primary" : "outline"}
                    className={pathname === item.href ? "ring-2 ring-offset-2 ring-black" : ""}
                  >
                    <item.icon className="h-4 w-4 mr-1" />
                    {item.name}
                  </DoodleButton>
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Fixed alignment and consistent doodle style */}
          <div className="hidden md:flex md:items-center md:space-x-3 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <DoodleButton size="sm" variant="primary" className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    Dashboard
                  </DoodleButton>
                </Link>

                {user.role === "admin" && (
                  <Link href="/updates">
                    <DoodleButton size="sm" variant="primary">
                      <Edit className="h-4 w-4 mr-1" />
                      Updates
                    </DoodleButton>
                  </Link>
                )}

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2 border-2 border-gray-300">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <button
                      onClick={logout}
                      className="text-xs text-gray-500 hover:text-black text-left flex items-center"
                    >
                      <LogOut className="h-3 w-3 mr-1" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <SignInModal
                  trigger={
                    <DoodleButton size="sm" variant="outline" className="w-28 font-semibold">
                      <User className="h-4 w-4 mr-1" />
                      Sign In
                    </DoodleButton>
                  }
                />
                <SignInModal
                  trigger={
                    <DoodleButton size="sm" variant="primary" className="w-36 whitespace-nowrap">
                      Register Now
                    </DoodleButton>
                  }
                  isRegister={true}
                />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black bg-white border-2 border-black p-2 rounded-lg"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu - positioned relative to the viewport */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 w-full bg-white"
          >
            <div className="mx-auto px-4 border-b-2 border-black">
              <div className="py-4 space-y-4">
                {/* User Group Buttons */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 px-2">User Groups</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {userGroups.map((item, index) => (
                      <Link key={index} href={item.href} onClick={() => setIsMenuOpen(false)}>
                        <DoodleButton
                          variant={pathname === item.href ? "primary" : "outline"}
                          className="w-full justify-center"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-1" />
                          {item.name}
                        </DoodleButton>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Main Navigation Items */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 px-2">Navigation</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {mainNavItems.map((item, index) => (
                      <Link key={index} href={item.href} onClick={() => setIsMenuOpen(false)}>
                        <DoodleButton
                          variant={pathname === item.href ? "primary" : "outline"}
                          className="w-full justify-start"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </DoodleButton>
                      </Link>
                    ))}
                  </div>
                </div>

                {user && (
                  <div>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <DoodleButton variant="primary" className="w-full">
                        <Home className="h-4 w-4 mr-2" />
                        Dashboard
                      </DoodleButton>
                    </Link>
                  </div>
                )}

                {user && user.role === "admin" && (
                  <div>
                    <Link href="/updates" onClick={() => setIsMenuOpen(false)}>
                      <DoodleButton variant="primary" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Updates
                      </DoodleButton>
                    </Link>
                  </div>
                )}

                {user ? (
                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <div className="flex items-center px-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2 border-2 border-gray-300">
                        {user.avatar ? (
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-gray-500">{user.role}</span>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <SignInModal
                      trigger={
                        <DoodleButton variant="outline" className="w-full flex items-center justify-center" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </DoodleButton>
                      }
                    />
                    <SignInModal
                      trigger={
                        <DoodleButton variant="primary" className="w-full whitespace-nowrap" size="sm">
                          Register Now
                        </DoodleButton>
                      }
                      isRegister={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
