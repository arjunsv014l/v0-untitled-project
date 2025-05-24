import { supabase } from "./supabase"

// User profile queries
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, profileData: any) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()

  if (error) throw error
  return data
}

// Registration queries
export async function getUserRegistration(userId: string) {
  const { data, error } = await supabase.from("registrations").select("*").eq("user_id", userId).single()

  if (error) throw error
  return data
}

// User settings queries
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId).single()

  if (error) throw error
  return data
}

export async function updateUserSettings(userId: string, settingsData: any) {
  const { data, error } = await supabase
    .from("user_settings")
    .update({
      ...settingsData,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select()

  if (error) throw error
  return data
}

// Admin queries
export async function getAllUsers(limit = 100, offset = 0) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function searchUsers(query: string, limit = 20) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
    .limit(limit)

  if (error) throw error
  return data
}

export async function getRecentRegistrations(limit = 20) {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("registered_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Registration statistics
export async function getRegistrationStats() {
  const { data: totalCount, error: countError } = await supabase.from("registrations").select("id", { count: "exact" })

  if (countError) throw countError

  const { data: sourceStats, error: sourceError } = await supabase.rpc("get_registration_sources")

  if (sourceError) throw sourceError

  return {
    totalCount: totalCount?.length || 0,
    sourceStats: sourceStats || [],
  }
}
