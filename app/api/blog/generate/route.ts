import { NextResponse } from "next/server"
import { generateBlogPosts, getTodaysPosts } from "@/app/actions/blog-actions"

export async function POST(request: Request) {
  try {
    // Optional: Add authentication check here
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Simple secret check for manual triggering
    if (secret !== process.env.BLOG_GENERATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await generateBlogPosts()

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      postsGenerated: result.postsGenerated,
      posts: result.posts,
    })
  } catch (error) {
    console.error("Error in blog generation:", error)
    return NextResponse.json(
      {
        error: "Failed to generate blog posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET endpoint to check generation status
export async function GET() {
  return getTodaysPosts().then((result) => {
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      postsGeneratedToday: result.postsGeneratedToday,
      lastGeneration: result.lastGeneration,
    })
  })
}
