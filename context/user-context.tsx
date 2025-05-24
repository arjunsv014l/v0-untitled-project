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
  college?: string | null
  major?: string | null
  graduation_year?: number | null
  bio?: string | null
  interests?: string[] | null
  location?: string | null
  referral_code?: string | null
  marketing_consent?: boolean | null
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
  register: (
    email: string,
    password: string,
    name: string,
    dob?: string,
    avatar?: string | null,
    college?: string,
    major?: string,
    graduationYear?: number,
    bio?: string,
    interests?: string[],
    location?: string,
    referralCode?: string,
    marketingConsent?: boolean,
  ) => Promise<AuthResult>
  login: (email: string, password: string) => Promise<AuthResult>
  logout: () => Promise<void>
  updateProfile: (profileData: Partial<Profile>) => Promise<boolean>
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
          college: profileData?.college || null,
          major: profileData?.major || null,
          graduation_year: profileData?.graduation_year || null,
          bio: profileData?.bio || null,
          interests: profileData?.interests ? profileData.interests.split(",").map((i) => i.trim()) : null,
          location: profileData?.location || null,
          referral_code: profileData?.referral_code || null,
          marketing_consent: profileData?.marketing_consent || false,
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
  const register = async (
    email: string,
    password: string,
    name: string,
    dob?: string,
    avatar?: string | null,
    college?: string,
    major?: string,
    graduationYear?: number,
    bio?: string,
    interests?: string[],
    location?: string,
    referralCode?: string,
    marketingConsent?: boolean,
  ): Promise<AuthResult> => {
    try {
      // Use the atomic registration API endpoint for a complete registration flow
      const response = await fetch("/api/auth/atomic-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          dob,
          avatar,
          college,
          major,
          graduationYear,
          bio,
          interests,
          location,
          referralCode,
          marketingConsent,
        }),
      })

      // Check if the response is ok before trying to parse JSON
      if (!response.ok) {
        // Try to parse the error response as JSON
        let errorMessage = "Registration failed"
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (parseError) {
          // If JSON parsing fails, use the status text
          errorMessage = `Registration failed: ${response.status} ${response.statusText}`
          console.error("Error parsing response:", parseError)
          // Try to get the text content as fallback
          try {
            const textContent = await response.text()
            console.error("Response text content:", textContent)
            if (textContent) {
              errorMessage = `Registration failed: ${textContent.substring(0, 100)}...`
            }
          } catch (textError) {
            console.error("Error getting response text:", textError)
          }
        }

        return {
          success: false,
          error: {
            code: "registration_failed",
            message: errorMessage,
          },
        }
      }

      // Parse the successful response
      const data = await response.json()

      // Sign in the user after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error("Error signing in after registration:", signInError)
        return {
          success: true, // Registration was successful even if sign-in failed
          userId: data.userId,
          error: {
            code: "signin_failed",
            message: "Registration successful but automatic sign-in failed. Please sign in manually.",
          },
        }
      }

      // Wait a moment for the auth state to propagate
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Trigger a refresh of user data
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        // Get fresh profile data
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (profileData) {
          const fullProfile: Profile = {
            id: session.user.id,
            email: session.user.email,
            name: profileData.name || data.name,
            avatar_url: profileData.avatar_url || null,
            college: profileData.college || data.college || null,
            major: profileData.major || data.major || null,
            graduation_year: profileData.graduation_year || null,
            bio: profileData.bio || null,
            interests: profileData.interests ? profileData.interests.split(",").map((i) => i.trim()) : null,
            location: profileData.location || null,
            referral_code: profileData.referral_code || null,
            marketing_consent: profileData.marketing_consent || false,
          }
          setUser(fullProfile)
        }
      }

      return {
        success: true,
        userId: data.userId,
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

  // Update profile function
  const updateProfile = async (profileData: Partial<Profile>): Promise<boolean> => {
    try {
      if (!user) {
        console.error("Cannot update profile: No user is logged in")
        return false
      }

      // Prepare data for the profiles table
      const supabaseProfileData: any = {}

      if (profileData.name) supabaseProfileData.name = profileData.name
      if (profileData.avatar_url) supabaseProfileData.avatar_url = profileData.avatar_url
      if (profileData.college) supabaseProfileData.college = profileData.college
      if (profileData.major) supabaseProfileData.major = profileData.major
      if (profileData.graduation_year) supabaseProfileData.graduation_year = profileData.graduation_year
      if (profileData.bio) supabaseProfileData.bio = profileData.bio
      if (profileData.interests) supabaseProfileData.interests = profileData.interests.join(", ")
      if (profileData.location) supabaseProfileData.location = profileData.location
      if (profileData.marketing_consent !== undefined)
        supabaseProfileData.marketing_consent = profileData.marketing_consent

      supabaseProfileData.updated_at = new Date().toISOString()

      // Update the profile
      const { error } = await supabase.from("profiles").update(supabaseProfileData).eq("id", user.id)

      if (error) {
        console.error("Error updating profile:", error)
        return false
      }

      // Update user metadata if name or avatar has changed
      if (profileData.name || profileData.avatar_url) {
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            name: profileData.name || user.name,
            avatar_url: profileData.avatar_url || user.avatar_url,
          },
        })

        if (metadataError) {
          console.error("Error updating user metadata:", metadataError)
          // Non-critical error, continue
        }
      }

      // Update local user state
      setUser((prev) => (prev ? { ...prev, ...profileData } : null))

      // Refetch profile data to ensure complete sync
      const { data: updatedProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (!fetchError && updatedProfile) {
        const fullProfile: Profile = {
          id: user.id,
          email: user.email,
          name: updatedProfile.name || null,
          avatar_url: updatedProfile.avatar_url || null,
          college: updatedProfile.college || null,
          major: updatedProfile.major || null,
          graduation_year: updatedProfile.graduation_year || null,
          bio: updatedProfile.bio || null,
          interests: updatedProfile.interests ? updatedProfile.interests.split(",").map((i) => i.trim()) : null,
          location: updatedProfile.location || null,
          referral_code: updatedProfile.referral_code || null,
          marketing_consent: updatedProfile.marketing_consent || false,
        }
        setUser(fullProfile)
      }

      return true
    } catch (error) {
      console.error("Update profile error:", error)
      return false
    }
  }

  // Create the context value
  const value: UserContextProps = {
    user,
    isLoading,
    register,
    login,
    logout,
    updateProfile,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
