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
import Cookies from "js-cookie"

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

// Define context type
interface UserContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<boolean>
  updateUserProfile: (data: Partial<User>) => Promise<boolean>
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Local storage keys
const USER_STORAGE_KEY = "dreamclerk_user"

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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

  // Handle user state changes
  useEffect(() => {
    console.log("[UserContext] Setting up auth state listener")

    // First check local storage for cached user
    const cachedUser = getUserFromLocalStorage()
    if (cachedUser) {
      console.log("[UserContext] Using cached user from local storage")
      setUser(cachedUser)
      setIsLoading(false)
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log("[UserContext] User authenticated:", firebaseUser.email)

          // Set authentication cookie
          Cookies.set("user_authenticated", "true", { expires: 7 })

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
          Cookies.remove("user_authenticated")
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
          Cookies.remove("user_authenticated")
        }
      } finally {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  // Login with email/password
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      console.log("[UserContext] Attempting login:", email)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("[UserContext] Login successful:", userCredential.user.email)

      return true
    } catch (error: any) {
      console.error("[UserContext] Login error:", error.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Register new user
  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      console.log("[UserContext] Attempting registration:", email)

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

      return true
    } catch (error: any) {
      console.error("[UserContext] Registration error:", error.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Login with Google
  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      console.log("[UserContext] Attempting Google login")

      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      console.log("[UserContext] Google login successful:", userCredential.user.email)

      return true
    } catch (error: any) {
      console.error("[UserContext] Google login error:", error.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Logout
  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      console.log("[UserContext] Logging out")

      await signOut(auth)
      saveUserToLocalStorage(null)
      Cookies.remove("user_authenticated")

      console.log("[UserContext] Logout successful")
    } catch (error: any) {
      console.error("[UserContext] Logout error:", error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
    [user],
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
