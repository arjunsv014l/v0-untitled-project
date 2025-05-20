import { NextResponse } from "next/server"
import { setupDatabase } from "@/lib/firebase-admin-utils"

export async function GET(request: Request) {
  // Check for admin secret to prevent unauthorized setup
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.ADMIN_INIT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await setupDatabase()
    return NextResponse.json({ success: true, message: "Database structure initialized successfully" })
  } catch (error) {
    console.error("Error setting up database:", error)
    return NextResponse.json({ error: "Failed to setup database" }, { status: 500 })
  }
}
