import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/init-database"

export async function GET(request: Request) {
  // Check for admin secret to prevent unauthorized initialization
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.ADMIN_INIT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await initializeDatabase()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Database structure initialized successfully for database ID: (default)",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: "Failed to initialize database structure",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json(
      {
        error: "Failed to initialize database",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
