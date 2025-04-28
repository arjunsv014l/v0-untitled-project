"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, GraduationCap, BookOpen, Building, Brain, Info, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import DoodleButton from "./ui-elements/doodle-button"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
