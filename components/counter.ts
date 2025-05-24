import { supabase } from "@/lib/supabase"

// Get the current user count directly from registrations table
export async function getUserCount(): Promise<number> {
  try {
    // Get the actual count of users from the registrations table
    const { count, error } = await supabase.from("registrations").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error getting registration count:", error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error("Exception getting user count:", error)
    return 0
  }
}

// Increment the user count and return the new value
export async function incrementUserCount(): Promise<number> {
  try {
    // First, get the current count directly from registrations
    const currentCount = await getUserCount()
    const newCount = currentCount + 1

    // Update the count in the stats table to match registrations
    const { error } = await supabase.from("stats").upsert({
      id: "user_counter",
      name: "user_counter",
      count: newCount,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error updating user count in stats table:", error)
      return currentCount // Return the old count on error
    }

    return newCount
  } catch (error) {
    console.error("Exception incrementing user count:", error)
    return await getUserCount() // Try to get the current count
  }
}
