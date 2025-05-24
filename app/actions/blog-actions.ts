"use server"

import { generateDailyBlogPosts, testOpenRouterConnection } from "@/lib/blog-ai-service"
import { createClient } from "@/lib/supabase"

export async function generateBlogPostsAction() {
  // Check if user is authenticated and is admin
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    throw new Error("Unauthorized - Admin access required")
  }

  try {
    const posts = await generateDailyBlogPosts()
    return {
      success: true,
      count: posts.length,
      message: `Successfully generated ${posts.length} blog posts`,
    }
  } catch (error) {
    console.error("Error generating blog posts:", error)
    return {
      success: false,
      count: 0,
      message: error instanceof Error ? error.message : "Failed to generate blog posts",
    }
  }
}

export async function testOpenRouterAction() {
  // Check if user is authenticated and is admin
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    throw new Error("Unauthorized - Admin access required")
  }

  return testOpenRouterConnection()
}

export async function generateBlogPostsWithSecret(secret: string) {
  // Verify the secret
  if (secret !== process.env.BLOG_GENERATION_SECRET) {
    throw new Error("Invalid secret")
  }

  try {
    const posts = await generateDailyBlogPosts()
    return {
      success: true,
      count: posts.length,
      message: `Successfully generated ${posts.length} blog posts`,
    }
  } catch (error) {
    console.error("Error generating blog posts:", error)
    return {
      success: false,
      count: 0,
      message: error instanceof Error ? error.message : "Failed to generate blog posts",
    }
  }
}
