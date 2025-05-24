"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { ReactNode } from "react"
import DoodleBackground from "./ui-elements/doodle-background"
import DoodleButton from "./ui-elements/doodle-button"
import { Lock } from "lucide-react"
import { useUser } from "@/context/user-context"
import Link from "next/link"

interface AuthWrapperProps {
  children: ReactNode
  requiredRoles?: string[]
}

export default function AuthWrapper({ children, requiredRoles = [] }: AuthWrapperProps) {
  // Replace the simulated authentication state
  const { user, isLoading } = useUser()
  const isAuthenticated = !!user
  const userRole = user?.role || null
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Simulate checking authentication status
  }, [])

  // Check if user has required role
  const hasRequiredRole = () => {
    if (!requiredRoles.length) return true
    if (!isAuthenticated || !userRole) return false

    // Check if the user has any of the required roles
    return requiredRoles.includes(userRole)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <DoodleBackground className="min-h-screen pt-32 pb-16" density="low">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full border-2 border-black flex items-center justify-center">
            <Lock className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Registration Required</h1>
          <p className="text-gray-600 mb-8">
            You need to register to access this page. Join our community to unlock all features.
          </p>
          <div className="flex justify-center">
            <Link href="/register">
              <DoodleButton size="lg">Register Now</DoodleButton>
            </Link>
          </div>
          <button onClick={() => router.push("/")} className="mt-8 text-gray-600 hover:text-black underline">
            Return to Home
          </button>
        </div>
      </DoodleBackground>
    )
  }

  if (!hasRequiredRole()) {
    return (
      <DoodleBackground className="min-h-screen pt-32 pb-16" density="low">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full border-2 border-black flex items-center justify-center">
            <Lock className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">
            You don't have permission to access this page. This area is restricted to {requiredRoles.join(" or ")}{" "}
            users.
          </p>
          <DoodleButton onClick={() => router.push("/")} size="lg">
            Return to Home
          </DoodleButton>
        </div>
      </DoodleBackground>
    )
  }

  return <>{children}</>
}
