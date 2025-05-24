import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    // Get the actual count from registrations table
    const { count: registrationCount, error: countError } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })

    if (countError) {
      console.error("Error getting registration count:", countError)
      return NextResponse.json({ error: "Failed to get registration count" }, { status: 500 })
    }

    // Get the current counter value
    const { data: statsData, error: statsError } = await supabase
      .from("stats")
      .select("*")
      .eq("name", "user_counter")
      .single()

    if (statsError && statsError.code !== "PGRST116") {
      console.error("Error getting counter stats:", statsError)
      return NextResponse.json({ error: "Failed to get counter stats" }, { status: 500 })
    }

    const currentCount = statsData?.count || 0
    const actualCount = registrationCount || 0

    // Update the counter if it's out of sync
    if (currentCount !== actualCount) {
      const { error: updateError } = await supabase.from("stats").upsert({
        name: "user_counter",
        count: actualCount,
        updated_at: new Date().toISOString(),
      })

      if (updateError) {
        console.error("Error updating counter:", updateError)
        return NextResponse.json({ error: "Failed to update counter" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: "Counter reconciled successfully",
        previousCount: currentCount,
        newCount: actualCount,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Counter is already in sync",
      count: actualCount,
    })
  } catch (error) {
    console.error("Error reconciling counter:", error)
    return NextResponse.json({ error: "Failed to reconcile counter" }, { status: 500 })
  }
}
