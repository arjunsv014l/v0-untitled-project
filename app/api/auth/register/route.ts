import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { z } from "zod"

// Define validation schema for registration data
const registrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  dob: z.string().optional(),
  avatar: z.string().optional().nullable(),
  college: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.number().optional(),
  bio: z.string().optional(),
  interests: z.array(z.string()).optional(),
  referralSource: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input data
    const validationResult = registrationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: "Validation error", details: validationResult.error.format() }, { status: 400 })
    }

    const { email, password, name, dob, avatar, college, major, graduationYear, bio, interests, referralSource } =
      validationResult.data

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
      // 1. Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email for now (can be changed for production)
        user_metadata: {
          name,
          dob,
        },
      })

      if (authError) {
        throw authError
      }

      if (!authData.user) {
        throw new Error("User creation failed")
      }

      const userId = authData.user.id

      // 2. Create user profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        name,
        email,
        role: "student",
        dob: dob || null,
        avatar_url: avatar || null,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        bio: bio || null,
        college: college || null,
        major: major || null,
        graduation_year: graduationYear || null,
        interests: interests ? interests.join(", ") : null,
      })

      if (profileError) {
        throw profileError
      }

      // 3. Create registration record
      const { error: registrationError } = await supabase.from("registrations").insert({
        user_id: userId,
        email,
        name,
        dob: dob || null,
        registered_at: new Date().toISOString(),
        status: "active",
        completed_profile: Boolean(bio || college || major),
        source: referralSource || "website",
      })

      if (registrationError) {
        throw registrationError
      }

      // 4. Create user settings with defaults
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

      // 5. Update user counter to match actual registration count
      const { count: registrationCount } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })

      await supabase
        .from("stats")
        .upsert({
          name: "user_counter",
          count: registrationCount || 0,
          updated_at: new Date().toISOString(),
        })
        .catch((counterError) => {
          console.warn("Warning: Failed to update user count:", counterError)
          // Continue despite counter error
        })

      // Commit transaction
      const { error: commitError } = await supabase.rpc("commit_transaction")
      if (commitError) {
        throw commitError
      }

      // Return success with user ID
      return NextResponse.json({
        success: true,
        userId,
        message: "User registered successfully",
      })
    } catch (error: any) {
      // Rollback transaction on error
      await supabase.rpc("rollback_transaction").catch((rollbackError) => {
        console.error("Error rolling back transaction:", rollbackError)
      })

      console.error("Error in registration process:", error)

      // Return appropriate error message
      if (error.message?.includes("already exists")) {
        return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
      }

      return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Unexpected error in registration route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
