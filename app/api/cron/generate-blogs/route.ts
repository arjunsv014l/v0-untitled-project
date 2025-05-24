import { NextResponse } from "next/server"
import { generateBlogPosts } from "@/app/actions/blog-actions"

export async function GET(request: Request) {
  try {
    // Verify cron secret
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Starting scheduled blog post generation...")

    const result = await generateBlogPosts()

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      postsGenerated: result.postsGenerated,
      message: "Scheduled blog generation completed successfully",
    })
  } catch (error) {
    console.error("Error in scheduled blog generation:", error)
    return NextResponse.json(
      {
        error: "Failed to generate scheduled blog posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
