"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/context/user-context"
import DoodleButton from "./ui-elements/doodle-button"
import ActionButton from "./ui-elements/action-button"
import { getButtonConfig } from "@/lib/button-config"
import NotificationCenter from "./notifications/notification-center"
import UserWelcomeHighlight from "./user-welcome-highlight"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await logout()
    setIsProfileOpen(false)
  }

  // Custom navigation handler that scrolls to top
  const handleNavigation = (href: string) => {
    router.push(href)
    window.scrollTo(0, 0)
  }

  // Update the navItems array to include the AI Assistant link
  const navItems = [
    { label: "Home", href: "/" },
    { label: "For Freshers", href: "/for-freshers" },
    { label: "For Students", href: "/for-students" },
    { label: "For Companies", href: "/for-companies" },
    { label: "For Universities", href: "/for-universities" },
    { label: "Career", href: "/influence" },
    { label: "AI Assistant", href: "/ai-assistant" },
    { label: "How It Works", href: "/how-it-works" },
  ]

  const loggedInNavItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile", href: "/profile" },
  ]

  // Detect when a user first logs in
  useEffect(() => {
    if (user && !isNewUser) {
      setIsNewUser(true)
      // Reset after some time
      const timer = setTimeout(() => {
        setIsNewUser(false)
      }, 60000) // Consider them "new" for 1 minute
      return () => clearTimeout(timer)
    }
  }, [user])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button onClick={() => handleNavigation("/")} className="text-2xl font-bold">
          Dreamclerk
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3">
          {navItems.map((item) => (
            <button key={item.href} onClick={() => handleNavigation(item.href)} className="focus:outline-none">
              <DoodleButton
                size="sm"
                variant={pathname === item.href ? "primary" : "outline"}
                className={`py-1 px-3 text-sm ${pathname === item.href ? "" : "hover:bg-gray-50"}`}
              >
                {item.label}
              </DoodleButton>
            </button>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoading ? (
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
          ) : user ? (
            <div className="flex items-center">
              <NotificationCenter />

              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 ml-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-black">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-bold">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <UserWelcomeHighlight isNewUser={isNewUser}>
                      <span className="font-medium text-sm">Welcome, {user.name.split(" ")[0]}!</span>
                    </UserWelcomeHighlight>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-black overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-200">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleNavigation("/profile")
                            setIsProfileOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <ActionButton config={getButtonConfig("REGISTER", { size: "sm" })} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="w-full focus:outline-none"
                  >
                    <DoodleButton
                      variant={pathname === item.href ? "primary" : "outline"}
                      className="w-full justify-center"
                      size="sm"
                    >
                      {item.label}
                    </DoodleButton>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                {isLoading ? (
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg"></div>
                ) : user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-black">
                        {user.avatar ? (
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="font-bold">{user.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleNavigation("/profile")}
                        className="block w-full p-2 text-sm text-left rounded-lg hover:bg-gray-100"
                      >
                        <User className="inline-block h-4 w-4 mr-2" />
                        Profile
                      </button>
                      <ActionButton config={getButtonConfig("LOGOUT", { className: "w-full" })} />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <ActionButton config={getButtonConfig("REGISTER", { className: "w-full" })} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
