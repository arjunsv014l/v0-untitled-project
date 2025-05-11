"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"

// Define user type
export interface User {
  id: string
  email: string
  name?: string
  bio?: string
  avatar?: string
  profileCompleted: boolean
  // Add other user fields as needed
}

// Define context type
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<boolean>
  isProfileComplete: (user: User) => boolean
  checkingProfileStatus: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Required profile fields - centralize this definition
const REQUIRED_PROFILE_FIELDS = ["name", "email", "bio"]

// Navigation lock to prevent redirect loops
const REDIRECT_LOCK_KEY = "redirect_lock"
const REDIRECT_LOCK_DURATION = 2000 // 2 seconds

// Mock user for development
const MOCK_USER: User = {
  id: "mock-user-id",
  email: "user@example.com",
  name: "Demo User",
  bio: "This is a mock user for development",
  profileCompleted: true,
}

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_VERCEL_ENV === "development"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkingProfileStatus, setCheckingProfileStatus] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const redirectInProgress = useRef(false)
  const initialLoadComplete = useRef(false)
  const apiCheckFailed = useRef(false)

  // Check if redirect is locked
  const isRedirectLocked = useCallback(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(REDIRECT_LOCK_KEY) === "true"
  }, [])

  // Set redirect lock
  const setRedirectLock = useCallback(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(REDIRECT_LOCK_KEY, "true")
    setTimeout(() => {
      localStorage.removeItem(REDIRECT_LOCK_KEY)
    }, REDIRECT_LOCK_DURATION)
  }, [])

  // Centralized profile completion check
  const isProfileComplete = useCallback((user: User | null): boolean => {
    if (!user) return false

    // Check if profileCompleted flag is explicitly set
    if (user.profileCompleted === true) return true

    // Otherwise check required fields
    for (const field of REQUIRED_PROFILE_FIELDS) {
      if (!user[field as keyof User]) {
        return false
      }
    }

    return true
  }, [])

  // Handle login
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)

      // For development, use mock data
      if (isDevelopment || apiCheckFailed.current) {
        console.log("[Auth] Using mock login in development mode")
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Set mock user
        const userData = { ...MOCK_USER, email }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))

        return true
      }

      // Your actual login logic here
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error("Login failed")
        }

        const userData = await response.json()

        // Set user in state and localStorage for persistence
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))

        console.log("[Auth] Login successful:", userData.email)
        return true
      } catch (error) {
        console.error("[Auth] Login API error:", error)

        // Fallback to mock user in case of API error
        if (isDevelopment) {
          console.log("[Auth] Falling back to mock user due to API error")
          const userData = { ...MOCK_USER, email }
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
          return true
        }

        return false
      }
    } catch (error) {
      console.error("[Auth] Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Handle logout
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)

      // For development, just clear local state
      if (isDevelopment || apiCheckFailed.current) {
        console.log("[Auth] Using mock logout in development mode")
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Clear user
        setUser(null)
        localStorage.removeItem("user")

        // Redirect to home page
        router.push("/")
        return
      }

      // Your actual logout logic here
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
        })
      } catch (error) {
        console.error("[Auth] Logout API error:", error)
      }

      // Clear user from state and localStorage
      setUser(null)
      localStorage.removeItem("user")

      console.log("[Auth] Logout successful")

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("[Auth] Logout error:", error)
    } finally {
      setLoading(false)
    }
  }, [router])

  // Update user profile
  const updateProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      try {
        if (!user) return false

        setLoading(true)

        // For development, just update local state
        if (isDevelopment || apiCheckFailed.current) {
          console.log("[Auth] Using mock profile update in development mode")
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 500))

          // Update user
          const newUserData = { ...user, ...data, profileCompleted: true }
          setUser(newUserData)
          localStorage.setItem("user", JSON.stringify(newUserData))

          return true
        }

        // Your actual profile update logic here
        try {
          const response = await fetch("/api/user/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            throw new Error("Profile update failed")
          }

          const updatedUserData = await response.json()

          // Update user in state and localStorage
          const newUserData = { ...user, ...updatedUserData }
          setUser(newUserData)
          localStorage.setItem("user", JSON.stringify(newUserData))

          console.log("[Auth] Profile updated successfully")
          return true
        } catch (error) {
          console.error("[Auth] Profile update API error:", error)

          // Fallback to local update in case of API error
          if (isDevelopment) {
            console.log("[Auth] Falling back to local update due to API error")
            const newUserData = { ...user, ...data, profileCompleted: true }
            setUser(newUserData)
            localStorage.setItem("user", JSON.stringify(newUserData))
            return true
          }

          return false
        }
      } catch (error) {
        console.error("[Auth] Profile update error:", error)
        return false
      } finally {
        setLoading(false)
      }
    },
    [user],
  )

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)

        // First check localStorage for cached user
        const cachedUser = localStorage.getItem("user")
        if (cachedUser) {
          try {
            const userData = JSON.parse(cachedUser)
            setUser(userData)
            console.log("[Auth] User loaded from cache:", userData.email)
          } catch (error) {
            console.error("[Auth] Error parsing cached user:", error)
            localStorage.removeItem("user")
          }
        }

        // For development, use mock data if no cached user
        if (isDevelopment && !user) {
          try {
            // Then verify with the server
            const response = await fetch("/api/auth/me")

            if (response.ok) {
              // Check if response is JSON
              const contentType = response.headers.get("content-type")
              if (contentType && contentType.includes("application/json")) {
                const userData = await response.json()
                setUser(userData)
                localStorage.setItem("user", JSON.stringify(userData))
                console.log("[Auth] User verified with server:", userData.email)
              } else {
                throw new Error("Response is not JSON")
              }
            } else if (response.status === 401) {
              // Not authenticated
              setUser(null)
              localStorage.removeItem("user")
              console.log("[Auth] Not authenticated")
            } else {
              throw new Error(`Server returned ${response.status}`)
            }
          } catch (error) {
            console.error("[Auth] Auth check error:", error)
            apiCheckFailed.current = true

            // Use mock user in development if API check fails
            if (!user && isDevelopment) {
              console.log("[Auth] Using mock user in development mode")
              setUser(MOCK_USER)
              localStorage.setItem("user", JSON.stringify(MOCK_USER))
            }
          }
        }
      } catch (error) {
        console.error("[Auth] Auth check error:", error)
        // Keep using cached user if available, otherwise set to null
        if (!localStorage.getItem("user")) {
          setUser(null)
        }
      } finally {
        setLoading(false)
        initialLoadComplete.current = true
      }
    }

    checkAuth()
  }, [])

  // Handle navigation based on auth and profile status
  useEffect(() => {
    // Skip during initial load or if already redirecting
    if (!initialLoadComplete.current || loading || redirectInProgress.current || isRedirectLocked()) {
      return
    }

    const handleNavigation = async () => {
      try {
        // Skip if no user (not logged in)
        if (!user) {
          // If on a protected route, redirect to login
          if (pathname?.startsWith("/dashboard") || pathname === "/profile") {
            console.log("[Auth] Not authenticated, redirecting to login")
            redirectInProgress.current = true
            setRedirectLock()
            router.push("/login")
            setTimeout(() => {
              redirectInProgress.current = false
            }, 500)
          }
          return
        }

        // Check profile completion status
        setCheckingProfileStatus(true)
        const profileComplete = isProfileComplete(user)

        // Handle navigation based on profile completion
        if (!profileComplete) {
          // If not on profile completion page and not already redirecting
          if (pathname !== "/profile" && !redirectInProgress.current) {
            console.log("[Auth] Profile incomplete, redirecting to profile completion")
            redirectInProgress.current = true
            setRedirectLock()
            router.push("/profile")
            setTimeout(() => {
              redirectInProgress.current = false
            }, 500)
          }
        } else if (pathname === "/profile" && !redirectInProgress.current) {
          // If on profile completion page but profile is complete
          console.log("[Auth] Profile complete, redirecting to dashboard")
          redirectInProgress.current = true
          setRedirectLock()
          router.push("/dashboard")
          setTimeout(() => {
            redirectInProgress.current = false
          }, 500)
        }
      } catch (error) {
        console.error("[Auth] Navigation error:", error)
      } finally {
        setCheckingProfileStatus(false)
      }
    }

    handleNavigation()
  }, [user, loading, pathname, router, isProfileComplete, isRedirectLocked, setRedirectLock])

  // Provide the auth context
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateProfile,
        isProfileComplete,
        checkingProfileStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
