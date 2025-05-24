import { NextResponse } from "next/server"
import { setupSupabaseDatabase } from "@/lib/supabase-setup"

export async function GET(request: Request) {
  // Check for admin secret to prevent unauthorized setup
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.ADMIN_INIT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await setupSupabaseDatabase()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: "Failed to set up Supabase database",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error setting up Supabase database:", error)
    return NextResponse.json(
      {
        error: "Failed to set up Supabase database",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
