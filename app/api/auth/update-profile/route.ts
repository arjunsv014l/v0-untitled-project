import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { z } from "zod"

// Define validation schema for profile update data
const profileUpdateSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
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
    const validationResult = profileUpdateSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: "Validation error", details: validationResult.error.format() }, { status: 400 })
    }

    const { userId, college, major, graduationYear, bio, interests, referralSource } = validationResult.data

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

    // Update profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        college: college || null,
        major: major || null,
        graduation_year: graduationYear || null,
        bio: bio || null,
        interests: interests ? interests.join(", ") : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (profileError) {
      return NextResponse.json({ error: "Failed to update profile", details: profileError.message }, { status: 500 })
    }

    // Update registration record if referral source is provided
    if (referralSource) {
      await supabase
        .from("registrations")
        .update({
          source: referralSource,
          completed_profile: true,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .then(({ error }) => {
          if (error) {
            console.warn("Failed to update registration record:", error)
          }
        })
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error: any) {
    console.error("Error in profile update:", error)
    return NextResponse.json({ error: error.message || "Profile update failed" }, { status: 500 })
  }
}
