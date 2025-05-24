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
  role?: string | null
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

          // If profile doesn't exist, create one
          if (profileError.code === "PGRST116") {
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert({
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
                role: "student", // Default role
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
              })
              .select()
              .single()

            if (createError) {
              console.error("Error creating profile:", createError)
              setUser(null)
              return
            }

            // Create a complete user profile object from the new profile
            const fullProfile: Profile = {
              id: session.user.id,
              email: session.user.email,
              name: newProfile?.name || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
              avatar_url: newProfile?.avatar_url || null,
              role: newProfile?.role || "student",
            }

            setUser(fullProfile)
            setIsLoading(false)
            return
          }

          setUser(null)
          return
        }

        // Create a complete user profile object
        const fullProfile: Profile = {
          id: session.user.id,
          email: session.user.email,
          name: profileData?.name || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
          avatar_url: profileData?.avatar_url || session.user.user_metadata?.avatar_url || null,
          college: profileData?.college || null,
          major: profileData?.major || null,
          graduation_year: profileData?.graduation_year || null,
          bio: profileData?.bio || null,
          interests: profileData?.interests ? profileData.interests.split(",").map((i) => i.trim()) : null,
          location: profileData?.location || null,
          referral_code: profileData?.referral_code || null,
          marketing_consent: profileData?.marketing_consent || false,
          role: profileData?.role || "student",
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
      // 1. Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            dob,
          },
        },
      })

      if (authError) {
        return {
          success: false,
          error: {
            code: authError.name,
            message: authError.message,
          },
        }
      }

      if (!authData.user) {
        return {
          success: false,
          error: {
            code: "user_creation_failed",
            message: "Failed to create user account",
          },
        }
      }

      // 2. Create user profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        name,
        email,
        role: "student", // Default role
        dob: dob || null,
        avatar_url: avatar || null,
        college: college || null,
        major: major || null,
        graduation_year: graduationYear || null,
        bio: bio || null,
        interests: interests ? interests.join(", ") : null,
        location: location || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Error creating profile:", profileError)
        // Non-critical error, continue
      }

      // 3. Create user settings with defaults
      const { error: settingsError } = await supabase.from("user_settings").insert({
        user_id: authData.user.id,
        theme: "light",
        notifications_enabled: true,
        email_notifications: marketingConsent || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (settingsError) {
        console.error("Error creating user settings:", settingsError)
        // Non-critical error, continue
      }

      return {
        success: true,
        userId: authData.user.id,
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

      // Update last login time
      if (data.user) {
        await supabase
          .from("profiles")
          .update({
            last_login: new Date().toISOString(),
          })
          .eq("id", data.user.id)
          .then(({ error }) => {
            if (error) {
              console.error("Error updating last login:", error)
            }
          })
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
          role: updatedProfile.role || "student",
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
