"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

// Define a Profile interface that extends the User with additional profile data
interface Profile {
  id: string
  email: string | null
  name: string | null
  avatar_url: string | null
}

// Define the return type for auth operations
interface AuthResult {
  success: boolean
  userId?: string
  error?: {
    code: string
    message: string
    isNetworkError?: boolean
  }
}

// Define the context props
interface UserContextProps {
  user: Profile | null
  isLoading: boolean
  register: (email: string, password: string, name: string) => Promise<AuthResult>
  login: (email: string, password: string) => Promise<AuthResult>
  logout: () => Promise<void>
}

// Create the context
const UserContext = createContext<UserContextProps | null>(null)

// Custom hook to use the auth context
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  // Load user on initial render
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true)

        // Get current authenticated user
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setUser(null)
          return
        }

        if (!session) {
          setUser(null)
          setIsLoading(false)
          return
        }

        // Get user profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          console.error("Error fetching profile:", profileError)
          setUser(null)
          return
        }

        // Create a complete user profile object
        const fullProfile: Profile = {
          id: session.user.id,
          email: session.user.email,
          name: profileData?.name || session.user.user_metadata?.name || null,
          avatar_url: profileData?.avatar_url || session.user.user_metadata?.avatar_url || null,
        }

        setUser(fullProfile)
      } catch (error) {
        console.error("Error in auth state change:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial call
    getUser()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getUser() // Reload user data when auth state changes
      } else {
        setUser(null)
      }
    })

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Register function
  const register = async (email: string, password: string, name: string): Promise<AuthResult> => {
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        return {
          success: false,
          error: {
            code: error.name,
            message: error.message,
          },
        }
      }

      // Create a profile record
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user?.id,
        email: email,
        name: name,
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Error creating profile:", profileError)
        // Continue despite profile creation error
      }

      return {
        success: true,
        userId: data.user?.id,
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      return {
        success: false,
        error: {
          code: "unexpected_error",
          message: error.message || "An unexpected error occurred during registration",
          isNetworkError: error.name === "TypeError" && error.message.includes("fetch"),
        },
      }
    }
  }

  // Login function
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return {
          success: false,
          error: {
            code: error.name,
            message: error.message,
          },
        }
      }

      return {
        success: true,
        userId: data.user.id,
      }
    } catch (error: any) {
      console.error("Login error:", error)
      return {
        success: false,
        error: {
          code: "unexpected_error",
          message: error.message || "An unexpected error occurred during login",
          isNetworkError: error.name === "TypeError" && error.message.includes("fetch"),
        },
      }
    }
  }

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Create the context value
  const value: UserContextProps = {
    user,
    isLoading,
    register,
    login,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
