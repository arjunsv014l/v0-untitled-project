// Simple in-memory authentication system to replace Supabase auth

import { v4 as uuidv4 } from "uuid"

// In-memory user storage
const users: Record<string, User> = {}
const sessions: Record<string, string> = {} // sessionId -> userId

// User type
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

// Check if running in browser
const isBrowser = typeof window !== "undefined"

// Session management
export const getCurrentSession = (): string | null => {
  if (!isBrowser) return null
  return localStorage.getItem("session_id")
}

export const setCurrentSession = (sessionId: string): void => {
  if (!isBrowser) return
  localStorage.setItem("session_id", sessionId)
}

export const clearCurrentSession = (): void => {
  if (!isBrowser) return
  localStorage.removeItem("session_id")
}

// Get current user
export const getCurrentUser = (): User | null => {
  const sessionId = getCurrentSession()
  if (!sessionId) return null

  const userId = sessions[sessionId]
  if (!userId) return null

  return users[userId] || null
}

// Authentication functions
export const login = async (email: string, password: string): Promise<AuthResult> => {
  // Simple validation
  if (!email || !password) {
    return {
      success: false,
      error: {
        code: "invalid_input",
        message: "Email and password are required",
      },
    }
  }

  // Find user by email (case insensitive)
  const userId = Object.keys(users).find((id) => users[id].email.toLowerCase() === email.toLowerCase())

  // In a real app, you would check password hash
  // For this mock, we'll accept any password for existing users
  if (userId) {
    const user = users[userId]

    // Create session
    const sessionId = uuidv4()
    sessions[sessionId] = userId
    setCurrentSession(sessionId)

    // Update last login
    users[userId] = {
      ...user,
      lastLogin: new Date().toISOString(),
    }

    return {
      success: true,
      userId,
    }
  }

  return {
    success: false,
    error: {
      code: "invalid_credentials",
      message: "Invalid email or password",
    },
  }
}

export const register = async (email: string, password: string, name: string, dob?: string): Promise<AuthResult> => {
  // Simple validation
  if (!email || !password) {
    return {
      success: false,
      error: {
        code: "invalid_input",
        message: "Email and password are required",
      },
    }
  }

  // Check if email already exists
  const emailExists = Object.values(users).some((user) => user.email.toLowerCase() === email.toLowerCase())

  if (emailExists) {
    return {
      success: false,
      error: {
        code: "email_exists",
        message: "An account with this email already exists",
      },
    }
  }

  // Create new user
  const userId = uuidv4()
  const timestamp = new Date().toISOString()

  users[userId] = {
    id: userId,
    email,
    name: name || email.split("@")[0],
    role: "student",
    dob,
    createdAt: timestamp,
    lastLogin: timestamp,
  }

  // Create session
  const sessionId = uuidv4()
  sessions[sessionId] = userId
  setCurrentSession(sessionId)

  return {
    success: true,
    userId,
  }
}

export const logout = async (): Promise<void> => {
  const sessionId = getCurrentSession()
  if (sessionId) {
    delete sessions[sessionId]
    clearCurrentSession()
  }
}

// Add some mock users for testing
if (Object.keys(users).length === 0) {
  const adminId = uuidv4()
  users[adminId] = {
    id: adminId,
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  }

  const studentId = uuidv4()
  users[studentId] = {
    id: studentId,
    email: "student@example.com",
    name: "Student User",
    role: "student",
    createdAt: new Date().toISOString(),
  }
}
