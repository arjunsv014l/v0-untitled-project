"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/context/user-context"
import DoodleButton from "./ui-elements/doodle-button"
import SignInModal from "./sign-in-modal"
import NotificationCenter from "./notifications/notification-center"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "For Freshers", href: "/for-freshers" },
    { label: "For Students", href: "/for-students" },
    { label: "For Companies", href: "/for-companies" },
    { label: "For Universities", href: "/for-universities" },
    { label: "How It Works", href: "/how-it-works" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Dreamclerk
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <a>
                <DoodleButton
                  size="sm"
                  variant={pathname === item.href ? "primary" : "outline"}
                  className={`py-1 px-3 text-sm ${pathname === item.href ? "" : "hover:bg-gray-50"}`}
                >
                  {item.label}
                </DoodleButton>
              </a>
            </Link>
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
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Profile
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            href="/admin/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
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
            <SignInModal trigger={<DoodleButton size="sm">Register Now</DoodleButton>} isRegister={true} />
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
                  <Link key={item.href} href={item.href} passHref legacyBehavior key={item.href}>
                    <a className="w-full">
                      <DoodleButton
                        variant={pathname === item.href ? "primary" : "outline"}
                        className="w-full justify-center"
                        size="sm"
                      >
                        {item.label}
                      </DoodleButton>
                    </a>
                  </Link>
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
                      <Link href="/profile" className="block w-full p-2 text-sm text-left rounded-lg hover:bg-gray-100">
                        <User className="inline-block h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin/dashboard"
                          className="block w-full p-2 text-sm text-left rounded-lg hover:bg-gray-100"
                        >
                          <User className="inline-block h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <DoodleButton onClick={handleLogout} className="w-full">
                        Logout
                      </DoodleButton>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <SignInModal trigger={<DoodleButton>Register Now</DoodleButton>} isRegister={true} />
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
