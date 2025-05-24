import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { z } from "zod"

// Define validation schema for admin creation
const adminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  secret: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input data
    const validationResult = adminSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: "Validation error", details: validationResult.error.format() }, { status: 400 })
    }

    const { email, password, name, secret } = validationResult.data

    // Verify the secret
    const adminSecret = process.env.ADMIN_INIT_SECRET
    if (!adminSecret || secret !== adminSecret) {
      return NextResponse.json({ error: "Invalid secret key" }, { status: 403 })
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

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // 2. Create user profile with admin role
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      name,
      email,
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    })

    if (profileError) {
      console.error("Error creating admin profile:", profileError)
      // Try to delete the auth user since profile creation failed
      await supabase.auth.admin.deleteUser(authData.user.id).catch((deleteError) => {
        console.error("Error deleting user after profile creation failed:", deleteError)
      })
      return NextResponse.json({ error: "Failed to create admin profile" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      userId: authData.user.id,
    })
  } catch (error: any) {
    console.error("Error creating admin user:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
