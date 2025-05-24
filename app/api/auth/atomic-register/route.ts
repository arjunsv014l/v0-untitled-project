import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { z } from "zod"

// Define validation schema for registration data
const registrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  dob: z.string().optional(),
  avatar: z.string().nullable().optional(),
  college: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.number().optional(),
  bio: z.string().optional(),
  interests: z.array(z.string()).optional(),
  location: z.string().optional(),
  referralCode: z.string().optional(),
  marketingConsent: z.boolean().optional(),
  source: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Validate input data
    const validationResult = registrationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: "Validation error", details: validationResult.error.format() }, { status: 400 })
    }

    const {
      email,
      password,
      name,
      dob,
      avatar,
      college,
      major,
      graduationYear,
      bio,
      interests,
      location,
      referralCode,
      marketingConsent,
      source = "registration_form",
    } = validationResult.data

    // Create a Supabase client with the service role key to bypass RLS
    let supabase
    try {
      supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
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
    } catch (clientError) {
      console.error("Error creating Supabase client:", clientError)
      return NextResponse.json({ error: "Failed to initialize database connection" }, { status: 500 })
    }

    // 1. Create the user in Supabase Auth
    let authData, authError
    try {
      const authResult = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
      })
      authData = authResult.data
      authError = authResult.error
    } catch (error) {
      console.error("Exception creating user:", error)
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 })
    }

    if (authError) {
      console.error("Error creating user:", authError)
      return NextResponse.json({ error: authError.message || "Failed to create user" }, { status: 500 })
    }

    const userId = authData.user.id

    // Log the university and major data
    console.log("Storing university and major data:", { college, major })

    // 2. Create the user profile with all available information
    let profileError
    try {
      const profileResult = await supabase.from("profiles").insert({
        id: userId,
        name,
        email,
        dob: dob ? new Date(dob).toISOString().split("T")[0] : null,
        avatar_url: avatar,
        college: college || null,
        major: major || null,
        graduation_year: graduationYear || null,
        bio: bio || null,
        interests: interests ? interests.join(", ") : null,
        location: location || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        // Mark the profile as complete if we have enough information
        // This prevents redirecting to profile completion
        role: "student",
      })
      profileError = profileResult.error
    } catch (error) {
      console.error("Exception creating profile:", error)
      // Try to delete the auth user since profile creation failed
      try {
        await supabase.auth.admin.deleteUser(userId)
      } catch (cleanupError) {
        console.error("Failed to clean up auth user after profile creation error:", cleanupError)
      }
      return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
    }

    if (profileError) {
      console.error("Error creating profile:", profileError)
      // Try to delete the auth user since profile creation failed
      try {
        await supabase.auth.admin.deleteUser(userId)
      } catch (deleteError) {
        console.error("Error deleting user after profile creation failed:", deleteError)
      }
      return NextResponse.json({ error: profileError.message || "Failed to create profile" }, { status: 500 })
    }

    // 3. Create registration record
    let registrationError
    try {
      const registrationResult = await supabase.from("registrations").insert({
        user_id: userId,
        email,
        name,
        dob: dob ? new Date(dob).toISOString().split("T")[0] : null,
        registered_at: new Date().toISOString(),
        status: "active",
        // Mark the profile as complete based on provided information
        completed_profile: Boolean(college || major || graduationYear || bio || interests || location),
        source,
        created_at: new Date().toISOString(),
      })
      registrationError = registrationResult.error
    } catch (error) {
      console.error("Exception creating registration record:", error)
      // Non-critical error, continue
    }

    if (registrationError) {
      console.error("Error creating registration record:", registrationError)
      // Non-critical error, continue
    }

    // 4. Create user settings
    let settingsError
    try {
      const settingsResult = await supabase.from("user_settings").insert({
        user_id: userId,
        theme: "light",
        notifications_enabled: true,
        email_notifications: marketingConsent || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      settingsError = settingsResult.error
    } catch (error) {
      console.error("Exception creating user settings:", error)
      // Non-critical error, continue
    }

    if (settingsError) {
      console.error("Error creating user settings:", settingsError)
      // Non-critical error, continue
    }

    // 5. Increment user counter
    try {
      await supabase.rpc("increment_user_count")
    } catch (counterError) {
      console.error("Error incrementing user count:", counterError)
      // Non-critical error, continue
    }

    return NextResponse.json({
      success: true,
      userId,
      message: "User registered successfully",
      profileComplete: Boolean(college || major || graduationYear || bio || interests || location),
    })
  } catch (error: any) {
    console.error("Unexpected error in atomic registration:", error)
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 })
  }
}
