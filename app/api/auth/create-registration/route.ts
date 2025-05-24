import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { userId, registration } = await request.json()

    if (!userId || !registration) {
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

    // Insert the registration using the service role key (bypasses RLS)
    const { data, error } = await supabase.from("registrations").insert(registration).select().single()

    if (error) {
      console.error("Server error creating registration:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Unexpected error in create-registration route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
