import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log environment variable status (without exposing actual values)
console.log("Supabase URL available:", !!supabaseUrl)
console.log("Supabase Anon Key available:", !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Check your .env file.")
}

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
    const { data, error } = await supabase.from("profiles").select("id").limit(1)

    if (error) {
      console.error("Supabase connection test failed:", error)
      return { connected: false, error: error.message }
    }

    console.log("Supabase connection successful")
    return { connected: true, error: null }
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    return { connected: false, error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

// Initialize and test connection on load
testSupabaseConnection().then((result) => {
  console.log("Supabase connection test result:", result)
})

// Function to get a user's profile
export async function getUserProfile(userId: string) {
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
    const { data, error } = await supabase.from("profiles").select("id").limit(1)

    if (error) {
      console.error("Supabase connection test failed:", error)
      return { connected: false, error: error.message }
    }

    return { connected: true, error: null }
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    return { connected: false, error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}
