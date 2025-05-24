"use server"

import { supabase } from "@/lib/supabase"

export async function setupSupabase(formData: FormData) {
  try {
    // Use the admin secret from server environment variables
    const adminSecret = process.env.ADMIN_INIT_SECRET

    if (!adminSecret) {
      return {
        success: false,
        error: "Admin secret not configured on server",
      }
    }

    // Call the setup API with the server-side secret
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/setup-supabase?secret=${adminSecret}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: data.message || "Supabase database set up successfully",
        details: data,
      }
    } else {
      return {
        success: false,
        error: data.error || "Failed to set up Supabase database",
        details: data,
      }
    }
  } catch (error) {
    console.error("Error setting up Supabase:", error)
    return {
      success: false,
      error: error.message || "Unknown error",
    }
  }
}

export async function testSupabaseConnection() {
  try {
    // Test connection by querying the stats table
    const { data, error } = await supabase.from("stats").select("*").limit(1)

    if (error) {
      throw error
    }

    return {
      success: true,
      message: "Successfully connected to Supabase",
      details: data,
    }
  } catch (error) {
    console.error("Error testing Supabase connection:", error)
    return {
      success: false,
      error: error.message || "Connection error",
    }
  }
}
