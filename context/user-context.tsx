"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as updateFirebaseProfile,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"

// Define user type
export interface User {
  id: string
  email: string
  name?: string
  bio?: string
  avatar?: string
  profileCompleted?: boolean
  createdAt?: any
  lastLogin?: any
  firstLogin?: boolean
}

// Define auth result type
export interface AuthResult {
  success: boolean
  error?: string
  user?: User
}

// Define context type
interface UserContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  register: (email: string, password: string, name: string) => Promise<AuthResult>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<AuthResult>
  updateUserProfile: (data: Partial<User>) => Promise<boolean>
  isDevelopmentMode: boolean
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Local storage keys
const USER_STORAGE_KEY = "dreamclerk_user"

// Check if we're in development mode
const isDevelopmentMode = () => {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
    process.env.NEXT_PUBLIC_FORCE_OFFLINE_AUTH === "true"
  )
}

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const isDevMode = isDevelopmentMode()

  // Save user to local storage
  const saveUserToLocalStorage = (userData: User | null) => {
    if (userData) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
    } else {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }

  // Get user from local storage
  const getUserFromLocalStorage = (): User | null => {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem(USER_STORAGE_KEY)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("[UserContext] Error getting user from local storage:", error)
      return null
    }
  }

  // Create a mock user for development mode
  const createMockUser = (email: string, name: string): User => {
    return {
      id: `dev-${Date.now()}`,
      email: email,
      name: name || email.split("@")[0],
      avatar: "/student-avatar.png",
      firstLogin: false,
      profileCompleted: true,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }
  }

  // Handle user state changes
  useEffect(() => {
    console.log("[UserContext] Setting up auth state listener, dev mode:", isDevMode)

    // First check local storage for cached user
    const cachedUser = getUserFromLocalStorage()
    if (cachedUser) {
      console.log("[UserContext] Using cached user from local storage")
      setUser(cachedUser)
      setIsLoading(false)
    }

    // If we're in development mode, we can skip the Firebase auth
    if (isDevMode) {
      console.log("[UserContext] Development mode active, skipping Firebase auth")
      setIsLoading(false)
      return () => {}
    }

    // Otherwise, set up the Firebase auth listener
    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (firebaseUser) {
            console.log("[UserContext] User authenticated:", firebaseUser.email)

            // Create basic user object from Firebase Auth
            let userData: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: firebaseUser.displayName || "",
              avatar: firebaseUser.photoURL || "",
              lastLogin: new Date().toISOString(), // Use local timestamp as fallback
            }

            // Try to get additional user data from Firestore
            try {
              const userRef = doc(db, "users", firebaseUser.uid)
              const userSnap = await getDoc(userRef)

              // Check if this is first login
              const isFirstLogin = !userSnap.exists()

              if (userSnap.exists()) {
                // Merge Firestore data with Firebase auth data
                const firestoreData = userSnap.data()
                userData = {
                  ...userData,
                  ...firestoreData,
                  id: firebaseUser.uid, // Ensure ID is always from auth
                  email: firebaseUser.email || firestoreData.email || "", // Prefer auth email
                  firstLogin: false,
                }

                // Try to update last login
                try {
                  await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true })
                } catch (updateError) {
                  console.warn("[UserContext] Could not update last login:", updateError)
                  // Continue without updating last login
                }
              } else {
                // Create new user document
                userData.createdAt = new Date().toISOString() // Use local timestamp as fallback
                userData.firstLogin = true
                userData.profileCompleted = false

                try {
                  await setDoc(userRef, {
                    ...userData,
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                  })
                  console.log("[UserContext] Created new user document")
                } catch (createError) {
                  console.warn("[UserContext] Could not create user document:", createError)
                  // Continue with basic user data
                }
              }
            } catch (firestoreError) {
              console.warn("[UserContext] Firestore access error:", firestoreError)
              // Continue with basic user data from Firebase Auth
            }

            // Save user to local storage for offline access
            saveUserToLocalStorage(userData)
            setUser(userData)
          } else {
            console.log("[UserContext] No user authenticated")
            setUser(null)
            saveUserToLocalStorage(null)
          }
        } catch (error) {
          console.error("[UserContext] Error processing auth state change:", error)

          // Fallback to cached user if available
          const fallbackUser = getUserFromLocalStorage()
          if (fallbackUser) {
            console.log("[UserContext] Using fallback user from local storage")
            setUser(fallbackUser)
          } else {
            setUser(null)
          }
        } finally {
          setIsLoading(false)
        }
      })

      return () => unsubscribe()
    } catch (error) {
      console.error("[UserContext] Error setting up auth listener:", error)
      setIsLoading(false)
      return () => {}
    }
  }, [isDevMode])

  // Login with email/password
  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      try {
        setIsLoading(true)
        console.log("[UserContext] Attempting login:", email)

        // For development mode, use mock user
        if (isDevMode) {
          console.log("[UserContext] Using development mode login")

          // Create a mock user
          const mockUser = createMockUser(email, email.split("@")[0])

          // Save to local storage and state
          saveUserToLocalStorage(mockUser)
          setUser(mockUser)

          return { success: true, user: mockUser }
        }

        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          console.log("[UserContext] Login successful:", userCredential.user.email)
          return { success: true }
        } catch (firebaseError: any) {
          console.error("[UserContext] Login error:", firebaseError.code, firebaseError.message)
          return { success: false, error: firebaseError.code }
        }
      } catch (error: any) {
        console.error("[UserContext] Login error:", error.message)
        return { success: false, error: error.message }
      } finally {
        setIsLoading(false)
      }
    },
    [isDevMode],
  )

  // Register new user
  const register = useCallback(
    async (email: string, password: string, name: string): Promise<AuthResult> => {
      try {
        setIsLoading(true)
        console.log("[UserContext] Attempting registration:", email)

        // For development mode, use mock user
        if (isDevMode) {
          console.log("[UserContext] Using development mode registration")

          // Create a mock user
          const mockUser = createMockUser(email, name)

          // Save to local storage and state
          saveUserToLocalStorage(mockUser)
          setUser(mockUser)

          return { success: true, user: mockUser }
        }

        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)

          // Update profile with name
          await updateFirebaseProfile(userCredential.user, {
            displayName: name,
          })

          console.log("[UserContext] Registration successful:", userCredential.user.email)

          // Create a basic user object in case Firestore access fails
          const basicUser: User = {
            id: userCredential.user.uid,
            email: userCredential.user.email || email,
            name: name,
            firstLogin: true,
            profileCompleted: false,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          }

          // Try to create user document in Firestore
          try {
            const userRef = doc(db, "users", userCredential.user.uid)
            await setDoc(userRef, {
              ...basicUser,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            })
            console.log("[UserContext] Created new user document")
          } catch (firestoreError) {
            console.warn("[UserContext] Could not create user document:", firestoreError)
            // Continue with basic user data

            // Save basic user to local storage
            saveUserToLocalStorage(basicUser)
            setUser(basicUser)
          }

          return { success: true }
        } catch (firebaseError: any) {
          console.error("[UserContext] Registration error:", firebaseError.code, firebaseError.message)
          return { success: false, error: firebaseError.code }
        }
      } catch (error: any) {
        console.error("[UserContext] Registration error:", error.message)
        return { success: false, error: error.message }
      } finally {
        setIsLoading(false)
      }
    },
    [isDevMode],
  )

  // Login with Google
  const loginWithGoogle = useCallback(async (): Promise<AuthResult> => {
    try {
      setIsLoading(true)
      console.log("[UserContext] Attempting Google login")

      // For development mode, use mock user
      if (isDevMode) {
        console.log("[UserContext] Using development mode Google login")

        // Create a mock user
        const mockUser = createMockUser("google-user@example.com", "Google User")

        // Save to local storage and state
        saveUserToLocalStorage(mockUser)
        setUser(mockUser)

        return { success: true, user: mockUser }
      }

      try {
        const provider = new GoogleAuthProvider()
        const userCredential = await signInWithPopup(auth, provider)
        console.log("[UserContext] Google login successful:", userCredential.user.email)
        return { success: true }
      } catch (firebaseError: any) {
        console.error("[UserContext] Google login error:", firebaseError.code, firebaseError.message)
        return { success: false, error: firebaseError.code }
      }
    } catch (error: any) {
      console.error("[UserContext] Google login error:", error.message)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }, [isDevMode])

  // Logout
  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      console.log("[UserContext] Logging out")

      // For development mode, just clear local storage
      if (isDevMode) {
        saveUserToLocalStorage(null)
        setUser(null)
        return
      }

      await signOut(auth)
      saveUserToLocalStorage(null)
      setUser(null)

      console.log("[UserContext] Logout successful")
    } catch (error: any) {
      console.error("[UserContext] Logout error:", error.message)
    } finally {
      setIsLoading(false)
    }
  }, [isDevMode])

  // Update user profile
  const updateUserProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      try {
        if (!user) return false

        setIsLoading(true)
        console.log("[UserContext] Updating user profile:", data)

        // Update local state first
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)

        // Save to local storage
        saveUserToLocalStorage(updatedUser)

        // For development mode, we're done
        if (isDevMode) {
          console.log("[UserContext] Development mode: profile updated locally")
          return true
        }

        // Try to update Firestore document
        try {
          const userRef = doc(db, "users", user.id)
          await setDoc(
            userRef,
            {
              ...data,
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          )
          console.log("[UserContext] Profile update saved to Firestore")
        } catch (firestoreError) {
          console.warn("[UserContext] Could not update Firestore profile:", firestoreError)
          // Continue with local update only
        }

        console.log("[UserContext] Profile update successful")
        return true
      } catch (error: any) {
        console.error("[UserContext] Profile update error:", error.message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [user, isDevMode],
  )

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        loginWithGoogle,
        updateUserProfile,
        isDevelopmentMode: isDevMode,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
