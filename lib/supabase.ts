import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log environment variable status (without exposing actual values)
console.log("Supabase URL available:", !!supabaseUrl)
console.log("Supabase Anon Key available:", !!supabaseAnonKey)

// Flag to track if Supabase is available
let isSupabaseAvailable = false

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Test the Supabase connection and log the result
export async function testSupabaseConnection() {
  try {
    // Add a timeout to the fetch request
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Connection timed out")), 5000)
    })

    const fetchPromise = supabase.from("profiles").select("id").limit(1)

    // Race between the fetch and the timeout
    const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any

    if (error) {
      console.error("Supabase connection test failed:", error)
      isSupabaseAvailable = false
      return { connected: false, error: error.message }
    }

    console.log("Supabase connection successful")
    isSupabaseAvailable = true
    return { connected: true, error: null }
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    isSupabaseAvailable = false
    return { connected: false, error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

// Initialize connection test in the background without blocking
setTimeout(() => {
  testSupabaseConnection()
    .then((result) => {
      console.log("Supabase connection test result:", result)
    })
    .catch((err) => {
      console.error("Failed to test Supabase connection:", err)
    })
}, 1000)

// Function to get a user's profile
export async function getUserProfile(userId: string) {
  if (!isSupabaseAvailable) {
    console.warn("Supabase is not available, returning null for user profile")
    return null
  }

  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching user profile:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    return null
  }
}

export async function checkSupabaseConnection() {
  try {
    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const { data, error } = await supabase.from("profiles").select("id").limit(1)
    clearTimeout(timeoutId)

    if (error) {
      console.error("Supabase connection test failed:", error)
      isSupabaseAvailable = false
      return { connected: false, error: error.message }
    }

    isSupabaseAvailable = true
    return { connected: true, error: null }
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    isSupabaseAvailable = false
    return { connected: false, error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

// Helper function to check if Supabase is available
export function getSupabaseStatus() {
  return isSupabaseAvailable
}
