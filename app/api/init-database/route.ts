import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { adminSecret } = await request.json()

    // Verify admin secret
    if (adminSecret !== process.env.ADMIN_INIT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Initialize stats table with user counter
    const { error: statsError } = await supabase.from("stats").upsert({
      id: "user_counter",
      name: "user_counter",
      count: 500, // Starting count
      updated_at: new Date().toISOString(),
    })

    if (statsError) {
      console.error("Error initializing stats:", statsError)
      return NextResponse.json({ error: "Failed to initialize stats table" }, { status: 500 })
    }

    // Create sample content if it doesn't exist
    const { data: existingContent } = await supabase.from("content").select("id").limit(1)

    if (!existingContent || existingContent.length === 0) {
      const sampleContent = [
        {
          title: "Welcome to Dreamclerk",
          content: "This is a sample content item to get you started.",
          type: "announcement",
          created_at: new Date().toISOString(),
        },
        {
          title: "Getting Started Guide",
          content: "Learn how to make the most of your Dreamclerk experience.",
          type: "guide",
          created_at: new Date().toISOString(),
        },
      ]

      const { error: contentError } = await supabase.from("content").insert(sampleContent)

      if (contentError) {
        console.error("Error creating sample content:", contentError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}
