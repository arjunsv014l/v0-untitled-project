import { NextResponse } from "next/server"
import { testBlogGeneration } from "@/app/actions/blog-actions"

export async function POST() {
  try {
    const result = await testBlogGeneration()

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in test blog generation:", error)
    return NextResponse.json(
      {
        error: "Failed to generate test blog post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
