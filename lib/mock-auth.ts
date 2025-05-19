// Mock authentication system for preview environments
import { v4 as uuidv4 } from "uuid"

export interface MockUser {
  uid: string
  email: string
  displayName?: string
}

export interface MockAuthResult {
  user: MockUser
  success: boolean
}

// Store mock users in memory (or localStorage in a real implementation)
const mockUsers: Record<string, MockUser> = {}

export const mockCreateUser = async (email: string, password: string): Promise<MockAuthResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user already exists
  if (mockUsers[email]) {
    throw new Error("User already exists")
  }

  // Create new user
  const newUser: MockUser = {
    uid: uuidv4(),
    email,
    displayName: email.split("@")[0],
  }

  // Store user
  mockUsers[email] = newUser

  // Store in localStorage for persistence
  try {
    const storedUsers = JSON.parse(localStorage.getItem("mockUsers") || "{}")
    storedUsers[email] = newUser
    localStorage.setItem("mockUsers", JSON.stringify(storedUsers))
  } catch (e) {
    console.warn("Could not store mock user in localStorage", e)
  }

  return { user: newUser, success: true }
}

export const mockSignIn = async (email: string, password: string): Promise<MockAuthResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Try to get users from localStorage first
  try {
    const storedUsers = JSON.parse(localStorage.getItem("mockUsers") || "{}")
    Object.assign(mockUsers, storedUsers)
  } catch (e) {
    console.warn("Could not retrieve mock users from localStorage", e)
  }

  // Check if user exists
  if (!mockUsers[email]) {
    throw new Error("User not found")
  }

  return { user: mockUsers[email], success: true }
}

export const mockSignOut = async (): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  // Nothing to do for sign out in mock system
}

export const isMockAuthEnabled = (): boolean => {
  // Enable mock auth in preview environments or when Firebase fails
  return (
    process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true" ||
    (typeof window !== "undefined" && localStorage.getItem("useMockAuth") === "true")
  )
}

export const enableMockAuth = (): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("useMockAuth", "true")
  }
}
