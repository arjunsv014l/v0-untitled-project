"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { auth, db } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthErrorCodes,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { incrementUserCount } from "@/components/user-counter-widget"

// User type for our application
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "student" | "guest"
  avatar?: string
  dob?: string
  createdAt?: string
  lastLogin?: string
}

interface AuthResult {
  success: boolean
  userId?: string
  error?: {
    code: string
    message: string
    isNetworkError?: boolean
  }
}

interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<AuthResult>
  register: (email: string, password: string, name: string, dob?: string, avatar?: string | null) => Promise<AuthResult>
  logout: () => Promise<void>
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true)

        // Set up Firebase auth state listener
        const unsubscribe = onAuthStateChanged(
          auth,
          async (firebaseUser) => {
            if (firebaseUser) {
              // User is signed in
              try {
                // Get additional user data from Firestore
                const userDocRef = doc(db, "users", firebaseUser.uid)
                const userDoc = await getDoc(userDocRef)

                if (userDoc.exists()) {
                  const userData = userDoc.data()

                  // Update last login
                  await updateDoc(userDocRef, {
                    lastLogin: serverTimestamp(),
                  }).catch((err) => console.warn("Failed to update last login:", err))

                  // Create user profile
                  const userProfile: User = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    name: userData?.name || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
                    role: userData?.role || "student",
                    avatar: userData?.avatar,
                    dob: userData?.dob,
                    createdAt: userData?.createdAt ? new Date(userData.createdAt.toDate()).toISOString() : undefined,
                    lastLogin: userData?.lastLogin ? new Date(userData.lastLogin.toDate()).toISOString() : undefined,
                  }

                  setUser(userProfile)
                } else {
                  // User document doesn't exist, create it
                  const userProfile: User = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
                    role: "student",
                  }

                  // Create user document
                  await setDoc(userDocRef, {
                    name: userProfile.name,
                    email: userProfile.email,
                    role: "student",
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                  })

                  setUser(userProfile)
                }
              } catch (error) {
                console.error("Error processing user data:", error)

                // Create minimal user profile
                const userProfile: User = {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || "",
                  name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
                  role: "student",
                }

                setUser(userProfile)
              }
            } else {
              // User is signed out
              setUser(null)
            }
            setIsLoading(false)
          },
          (error) => {
            console.error("Auth state observer error:", error)
            setIsLoading(false)
          },
        )

        // Clean up subscription on unmount
        return () => unsubscribe()
      } catch (error) {
        console.error("Error checking user:", error)
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  // Helper function to handle auth errors
  const handleAuthError = (error: any): AuthResult["error"] => {
    console.error("Auth error:", error)

    // Check if it's a network error
    const isNetworkError = error.code === AuthErrorCodes.NETWORK_REQUEST_FAILED

    // Format user-friendly error messages
    let message = "An unknown error occurred"

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already registered. Please login instead."
        break
      case "auth/invalid-email":
        message = "Please enter a valid email address."
        break
      case "auth/weak-password":
        message = "Password is too weak. Please use at least 6 characters."
        break
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "Invalid email or password."
        break
      case "auth/network-request-failed":
        message = "Network error. Please check your internet connection."
        break
      default:
        message = error.message || "An error occurred during authentication."
    }

    return {
      code: error.code || "unknown",
      message,
      isNetworkError,
    }
  }

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setIsLoading(true)

      // Log authentication attempt for debugging
      console.log("Attempting to sign in with email:", email)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Sign in successful for user:", userCredential.user.uid)

      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
      const userData = userDoc.data()

      // Update last login timestamp
      await updateDoc(doc(db, "users", userCredential.user.uid), {
        lastLogin: serverTimestamp(),
      })

      const userProfile: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || email,
        name: userData?.name || userCredential.user.displayName || email.split("@")[0],
        role: userData?.role || "student",
        avatar: userData?.avatar,
        dob: userData?.dob,
        createdAt: userData?.createdAt ? new Date(userData.createdAt.toDate()).toISOString() : undefined,
        lastLogin: new Date().toISOString(),
      }

      // Store user in state
      setUser(userProfile)

      return { success: true, userId: userProfile.id }
    } catch (error: any) {
      console.error("Login error details:", error)
      return {
        success: false,
        error: handleAuthError(error),
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    dob?: string,
    avatar?: string | null,
  ): Promise<AuthResult> => {
    try {
      setIsLoading(true)

      // Log registration attempt for debugging
      console.log("Attempting to create user with email:", email)

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("User creation successful for user:", userCredential.user.uid)

      // Create user profile
      const userProfile: User = {
        id: userCredential.user.uid,
        email,
        name,
        role: "student",
        dob,
        avatar: avatar || undefined,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      // Create user profile in Firestore
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name,
          email,
          role: "student",
          dob,
          avatar,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        })
        console.log("User document created in Firestore")

        // Increment user count
        await incrementUserCount()
      } catch (firestoreError) {
        console.error("Failed to create Firestore profile:", firestoreError)
      }

      // Store user in state
      setUser(userProfile)

      return { success: true, userId: userProfile.id }
    } catch (error: any) {
      console.error("Registration error details:", error)
      return {
        success: false,
        error: handleAuthError(error),
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      // Clear user from state
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
