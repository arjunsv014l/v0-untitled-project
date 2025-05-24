import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    // Get total registrations count
    const { count: totalRegistrations, error: totalError } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })

    if (totalError) {
      console.error("Error fetching total registrations:", totalError)
      return NextResponse.json({ error: "Failed to fetch registration stats" }, { status: 500 })
    }

    // Get registrations from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: recentRegistrations, error: recentError } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .gte("registered_at", thirtyDaysAgo.toISOString())

    if (recentError) {
      console.error("Error fetching recent registrations:", recentError)
      return NextResponse.json({ error: "Failed to fetch registration stats" }, { status: 500 })
    }

    // Get registrations by status
    const { data: statusData, error: statusError } = await supabase.from("registrations").select("status")

    if (statusError) {
      console.error("Error fetching status data:", statusError)
      return NextResponse.json({ error: "Failed to fetch registration stats" }, { status: 500 })
    }

    // Count by status
    const statusCounts = statusData.reduce((acc: Record<string, number>, reg) => {
      acc[reg.status] = (acc[reg.status] || 0) + 1
      return acc
    }, {})

    // Update the user counter in the stats table to match the actual registration count
    const userCount = totalRegistrations || 0

    // Update the stats table to ensure it matches the actual registration count
    const { error: updateError } = await supabase.from("stats").upsert({
      name: "user_counter",
      count: userCount,
      updated_at: new Date().toISOString(),
    })

    if (updateError) {
      console.error("Error updating user counter:", updateError)
      // Continue with the response even if the update fails
    }

    const stats = {
      totalRegistrations: totalRegistrations || 0,
      recentRegistrations: recentRegistrations || 0,
      statusBreakdown: statusCounts,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching registration stats:", error)
    return NextResponse.json({ error: "Failed to fetch registration stats" }, { status: 500 })
  }
}
