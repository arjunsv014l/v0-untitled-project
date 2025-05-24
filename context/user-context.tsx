"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "../utils/supabaseClient"

interface UserContextType {
  session: Session | null
  user: any | null // Replace 'any' with a more specific type if possible
  loading: boolean
  signIn: (email: string) => Promise<void>
  signOut: () => Promise<void>
  updateUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<any | null>(null) // Replace 'any' with a more specific type if possible
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialSession = async () => {
      setLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)
      setUser(session?.user || null)
      setLoading(false)
    }

    getInitialSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user || null)
    })
  }, [])

  const signIn = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert("Check your email for the login link!")
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setSession(session)
    setUser(session?.user || null)
  }

  const value: UserContextType = {
    session,
    user,
    loading,
    signIn,
    signOut,
    updateUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
