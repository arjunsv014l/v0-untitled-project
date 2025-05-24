"use server"

import { supabase } from "@/lib/supabase"
import { generateDailyBlogPosts } from "@/lib/blog-ai-service"

export async function generateBlogPosts() {
  try {
    // Check if OpenRouter API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      return { success: false, error: "OpenRouter API key is not configured" }
    }

    // Server-side secret check
    if (!process.env.BLOG_GENERATION_SECRET) {
      return { success: false, error: "Blog generation secret is not configured" }
    }

    console.log("Starting blog post generation...")

    // Generate blog posts
    const posts = await generateDailyBlogPosts()

    if (posts.length === 0) {
      return { success: false, error: "No posts were generated" }
    }

    // Save posts to database
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(
        posts.map((post) => ({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          read_time: post.readTime,
          image_url: post.imageUrl,
          featured: post.featured || false,
          published_at: new Date().toISOString(),
        })),
      )
      .select()

    if (error) {
      console.error("Error saving blog posts:", error)
      return { success: false, error: "Failed to save blog posts to database" }
    }

    return {
      success: true,
      postsGenerated: data.length,
      posts: data,
    }
  } catch (error) {
    console.error("Error in blog generation:", error)
    return {
      success: false,
      error: "Failed to generate blog posts",
      details: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function testBlogGeneration() {
  try {
    // Server-side secret check
    if (!process.env.BLOG_GENERATION_SECRET) {
      return { success: false, error: "Blog generation secret is not configured" }
    }

    const testPost = await import("@/lib/blog-ai-service").then((module) => module.testBlogGeneration())

    return {
      success: true,
      ...testPost,
    }
  } catch (error) {
    console.error("Error in test blog generation:", error)
    return {
      success: false,
      error: "Failed to generate test blog post",
      details: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getTodaysPosts() {
  try {
    // Get today's posts count
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count, error } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .gte("published_at", today.toISOString())

    if (error) {
      throw error
    }

    return {
      success: true,
      postsGeneratedToday: count || 0,
      lastGeneration: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error checking blog status:", error)
    return {
      success: false,
      error: "Failed to check status",
      postsGeneratedToday: 0,
    }
  }
}
