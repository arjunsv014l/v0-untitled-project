import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { userId, email, name, dob, avatar, source } = await request.json()

    if (!userId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a Supabase client with the service role key to bypass RLS
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookies().set(name, value, options)
        },
        remove(name: string, options: any) {
          cookies().set(name, "", options)
        },
      },
    })

    // Start a transaction
    const { error: transactionError } = await supabase.rpc("begin_transaction")
    if (transactionError) {
      console.error("Error starting transaction:", transactionError)
      return NextResponse.json({ error: "Failed to start transaction" }, { status: 500 })
    }

    try {
      // 1. Create user profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        name: name || email.split("@")[0],
        email,
        role: "student",
        dob: dob || null,
        avatar_url: avatar || null,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      })

      if (profileError) {
        throw profileError
      }

      // 2. Create registration record
      const { error: registrationError } = await supabase.from("registrations").insert({
        user_id: userId,
        email,
        name: name || email.split("@")[0],
        dob: dob || null,
        registered_at: new Date().toISOString(),
        status: "active",
        completed_profile: true,
        source: source || "email",
      })

      if (registrationError) {
        throw registrationError
      }

      // 3. Create user settings with defaults
      const { error: settingsError } = await supabase.from("user_settings").insert({
        user_id: userId,
        theme: "light",
        notifications_enabled: true,
        email_notifications: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (settingsError) {
        throw settingsError
      }

      // 4. Increment user counter
      const { error: counterError } = await supabase.rpc("increment_user_count")

      if (counterError) {
        console.warn("Warning: Failed to increment user count:", counterError)
        // Continue despite counter error
      }

      // Commit transaction
      const { error: commitError } = await supabase.rpc("commit_transaction")
      if (commitError) {
        throw commitError
      }

      // Fetch the created profile to return
      const { data: profile, error: fetchError } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (fetchError) {
        console.warn("Warning: Failed to fetch created profile:", fetchError)
        return NextResponse.json({ success: true, message: "Profile created successfully" })
      }

      return NextResponse.json({ success: true, profile })
    } catch (error: any) {
      // Rollback transaction on error
      await supabase.rpc("rollback_transaction").catch((rollbackError) => {
        console.error("Error rolling back transaction:", rollbackError)
      })

      console.error("Error in profile creation transaction:", error)
      return NextResponse.json({ error: error.message || "Profile creation failed" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Unexpected error in create-user-profile route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
