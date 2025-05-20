import { NextResponse } from "next/server"
import { getRegistrationStats } from "@/lib/firestore-db"

export async function GET(request: Request) {
  try {
    const result = await getRegistrationStats()

    if (!result.success) {
      return NextResponse.json({ error: "Failed to fetch registration stats" }, { status: 500 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error fetching registration stats:", error)
    return NextResponse.json({ error: "Failed to fetch registration stats" }, { status: 500 })
  }
}
