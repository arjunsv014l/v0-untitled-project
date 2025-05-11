"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

interface NavigationGuardProps {
  children: React.ReactNode
}

export default function NavigationGuard({ children }: NavigationGuardProps) {
  const { user, loading, isProfileComplete } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Function to check if user is authorized
    const checkAuthorization = () => {
      // Public routes that don't require authentication
      const publicRoutes = ["/", "/login", "/register", "/about"]

      // If route is public, allow access
      if (publicRoutes.some((route) => pathname === route)) {
        setAuthorized(true)
        return
      }

      // If user is not logged in, redirect to login
      if (!user && !loading) {
        console.log("[NavigationGuard] Not authenticated, redirecting to login")
        router.push("/login")
        setAuthorized(false)
        return
      }

      // If profile is not complete and not on profile page, redirect to profile
      if (user && !isProfileComplete(user) && pathname !== "/profile") {
        console.log("[NavigationGuard] Profile incomplete, redirecting to profile")
        router.push("/profile")
        setAuthorized(false)
        return
      }

      // If profile is complete and on profile page, redirect to dashboard
      if (user && isProfileComplete(user) && pathname === "/profile") {
        console.log("[NavigationGuard] Profile complete, redirecting to dashboard")
        router.push("/dashboard")
        setAuthorized(false)
        return
      }

      // Otherwise, user is authorized
      setAuthorized(true)
    }

    // Check authorization when route changes or auth state changes
    if (!loading) {
      checkAuthorization()
    }
  }, [user, loading, pathname, router, isProfileComplete])

  // Show loading state while checking authorization
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Render children only if authorized
  return authorized ? <>{children}</> : null
}
