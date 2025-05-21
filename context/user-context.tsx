"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"

// Simplified User type
export interface User {
  id: string
  email: string
  name: string
}

// Simplified context type
interface UserContextType {
  user: User | null
  register: (email: string, password: string, name: string) => Promise<{ success: boolean }>
  login: (email: string, password: string) => Promise<{ success: boolean }>
  logout: () => void
  isLoading: boolean
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  register: async () => ({ success: false }),
  login: async () => ({ success: false }),
  logout: () => {},
  isLoading: false,
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
                console.log("Auth state changed: User is signed in", firebaseUser.uid)
                // Get additional user data from Firestore
                const userDocRef = doc(db, "users", firebaseUser.uid)
                const userDoc = await getDoc(userDocRef)

                if (userDoc.exists()) {
                  console.log("User document exists in Firestore")
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
                  }

                  setUser(userProfile)
                } else {
                  // User document doesn't exist, create it
                  console.warn("User document doesn't exist in Firestore. Creating it now.")
                  const userProfile: User = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
                  }

                  // Create user document
                  try {
                    await setDoc(userDocRef, {
                      name: userProfile.name,
                      email: userProfile.email,
                      createdAt: serverTimestamp(),
                      lastLogin: serverTimestamp(),
                      notes: "Document created during auth state change for existing auth user",
                    })
                    console.log("✅ User document created in Firestore during auth state change")
                  } catch (firestoreError) {
                    console.error("❌ Error creating user document during auth state change:", firestoreError)
                    // Try to get more details about the error
                    if (firestoreError.code === "permission-denied") {
                      console.error("This appears to be a Firestore permissions issue. Check your security rules.")
                    }
                  }

                  setUser(userProfile)
                }
              } catch (error) {
                console.error("Error processing user data:", error)

                // Create minimal user profile
                const userProfile: User = {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || "",
                  name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
                }

                setUser(userProfile)
              }
            } else {
              // User is signed out
              console.log("Auth state changed: User is signed out")
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

  // Simplified mock functions
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock successful registration
    setUser({
      id: "mock-user-id",
      email,
      name,
    })

    setIsLoading(false)
    return { success: true }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock successful login
    setUser({
      id: "mock-user-id",
      email,
      name: email.split("@")[0],
    })

    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Hook to use the context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
