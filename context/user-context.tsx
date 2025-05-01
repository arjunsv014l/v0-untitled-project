"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

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

// Helper function to convert Firebase user to our User type
const mapFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  // Try to get additional user data from Firestore
  let userData: any = {}
  try {
    const userDoc = await getDoc(doc(db, "profiles", firebaseUser.uid))
    if (userDoc.exists()) {
      userData = userDoc.data()
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
  }

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    name: userData?.name || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
    role: userData?.role || "student",
    avatar: userData?.avatar_url || firebaseUser.photoURL || undefined,
    dob: userData?.dob || undefined,
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true)
      try {
        if (firebaseUser) {
          const mappedUser = await mapFirebaseUser(firebaseUser)
          setUser(mappedUser)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error processing auth state change:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    })

    // Clean up subscription
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login for:", email)

      if (!email || !password) {
        console.error("Login error: Email or password is empty")
        return false
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Login successful for:", email)

      const mappedUser = await mapFirebaseUser(userCredential.user)
      setUser(mappedUser)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    dob?: string,
    avatar?: string | null,
  ): Promise<boolean> => {
    try {
      console.log("Starting registration process for:", email, "with name:", name)

      if (!email || !password || !name) {
        console.error("Registration error: Required fields missing")
        return false
      }

      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      console.log("User created successfully:", firebaseUser.uid)

      // Store additional user data in Firestore
      await setDoc(doc(db, "profiles", firebaseUser.uid), {
        name,
        email,
        role: "student",
        dob: dob || null,
        avatar_url: avatar || null,
        created_at: new Date().toISOString(),
      })

      // Set the user in context
      const mappedUser = await mapFirebaseUser(firebaseUser)
      setUser(mappedUser)

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const handleGoogleLogin = async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const firebaseUser = userCredential.user

      // Check if this is a new user
      const userDoc = await getDoc(doc(db, "profiles", firebaseUser.uid))

      if (!userDoc.exists()) {
        // Store additional user data in Firestore for new users
        await setDoc(doc(db, "profiles", firebaseUser.uid), {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          role: "student",
          avatar_url: firebaseUser.photoURL,
          created_at: new Date().toISOString(),
        })
      }

      const mappedUser = await mapFirebaseUser(firebaseUser)
      setUser(mappedUser)
      return true
    } catch (error) {
      console.error("Google login error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
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
