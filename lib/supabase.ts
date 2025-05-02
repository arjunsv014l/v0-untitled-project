import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

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
