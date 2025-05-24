import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { z } from "zod"

// Define validation schema for registration data
const registrationSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  dob: z.string().nullable(),
  college: z.string().nullable(),
  major: z.string().nullable(),
  graduationYear: z.number().nullable(),
  referralCode: z.string().nullable(),
  marketingConsent: z.boolean().default(false),
  source: z.string().default("registration_popup"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input data
    const validationResult = registrationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: "Validation error", details: validationResult.error.format() }, { status: 400 })
    }

    const { userId, email, name, dob, college, major, graduationYear, referralCode, marketingConsent, source } =
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

    // Update profile with additional information
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        college,
        major,
        graduation_year: graduationYear,
      })
      .eq("id", userId)

    if (profileError) {
      console.error("Error updating profile:", profileError)
      // Continue despite profile update error
    }

    // Create registration record
    const { error: registrationError } = await supabase.from("registrations").insert({
      user_id: userId,
      email,
      name,
      dob: dob ? new Date(dob).toISOString() : null,
      registered_at: new Date().toISOString(),
      status: "active",
      completed_profile: Boolean(college || major || graduationYear),
      source,
      referral_code: referralCode,
      marketing_consent: marketingConsent,
    })

    if (registrationError) {
      console.error("Error creating registration record:", registrationError)
      return NextResponse.json({ error: "Failed to create registration record" }, { status: 500 })
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: "Registration data stored successfully",
    })
  } catch (error: any) {
    console.error("Unexpected error in store-registration route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
