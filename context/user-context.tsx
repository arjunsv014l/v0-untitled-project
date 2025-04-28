"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

// User type for our application
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "student" | "guest"
  avatar?: string
  dob?: string
}

interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string, dob?: string, avatar?: string | null) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Helper function to convert Supabase user to our User type
const mapSupabaseUser = (supabaseUser: SupabaseUser): User => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split("@")[0] || "User",
    role: (supabaseUser.app_metadata?.role as any) || "student",
    avatar: supabaseUser.user_metadata?.avatar_url,
    dob: supabaseUser.user_metadata?.dob,
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        setIsLoading(true)

        // Get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const mappedUser = mapSupabaseUser(session.user)
          setUser(mappedUser)
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserSession()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const mappedUser = mapSupabaseUser(session.user)
        setUser(mappedUser)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    // Clean up subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error:", error.message)
        return false
      }

      if (data.user) {
        const mappedUser = mapSupabaseUser(data.user)
        setUser(mappedUser)
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  // Extremely simplified registration function
  const register = async (
    email: string,
    password: string,
    name: string,
    dob?: string,
    avatar?: string | null,
  ): Promise<boolean> => {
    try {
      console.log("Starting basic registration for:", email)

      // Use the most basic signUp method with minimal options
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            dob,
            avatar_url: avatar,
          },
        },
      })

      if (error) {
        console.error("Registration error details:", error)
        return false
      }

      if (!data.user) {
        console.error("No user returned from signUp")
        return false
      }

      console.log("User created successfully:", data.user.id)

      // Set the user in context
      const mappedUser = mapSupabaseUser(data.user)
      setUser(mappedUser)

      return true
    } catch (error) {
      console.error("Unexpected registration error:", error)
      return false
    }
  }

  const handleGoogleLogin = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Google login error:", error.message)
        return false
      }

      // This will redirect the user to Google, so we won't actually return true here
      // The auth state change listener will handle setting the user when they return
      return !!data
    } catch (error) {
      console.error("Google login error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        loginWithGoogle: handleGoogleLogin,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
