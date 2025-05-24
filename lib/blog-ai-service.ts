import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { createClient } from "@/lib/supabase"

// OpenRouter configuration using OpenAI provider
const openrouter = openai({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  headers: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://dreamclerk.com",
    "X-Title": "Dreamclerk Blog",
  },
})

const blogCategories = [
  "Freshman Tips",
  "Career Development",
  "Student Life",
  "Networking",
  "Campus Life",
  "Financial Aid",
]

const categoryImages = {
  "Freshman Tips": "/excited-freshmen.png",
  "Career Development": "/professional-networking.png",
  "Student Life": "/diverse-students-studying.png",
  Networking: "/professional-networking-interface.png",
  "Campus Life": "/university-campus-students.png",
  "Financial Aid": "/data-analytics-dashboard.png",
}

export async function generateBlogPost(category: string) {
  const prompt = `Write a comprehensive blog post for college students about "${category}". 
  The post should be:
  - 800-1200 words long
  - Engaging and informative
  - Written in a friendly, conversational tone
  - Include practical tips and advice
  - Have a catchy title
  - Include an excerpt (2-3 sentences)
  
  Format the response as JSON with the following structure:
  {
    "title": "Blog post title",
    "excerpt": "Brief excerpt",
    "content": "Full HTML content with <p>, <h2>, <h3>, <ul>, <li> tags"
  }`

  try {
    const { text } = await generateText({
      model: openrouter("openai/gpt-3.5-turbo"),
      prompt,
      temperature: 0.8,
      maxTokens: 2000,
    })

    const blogData = JSON.parse(text)

    return {
      ...blogData,
      category,
      image_url: categoryImages[category as keyof typeof categoryImages] || "/abstract-geometric-shapes.png",
      read_time: `${Math.ceil(blogData.content.split(" ").length / 200)} min read`,
      slug: blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }
  } catch (error) {
    console.error("Error generating blog post:", error)
    throw error
  }
}

export async function generateDailyBlogPosts() {
  const supabase = createClient()
  const posts = []

  // Generate 10 posts across different categories
  for (let i = 0; i < 10; i++) {
    const category = blogCategories[i % blogCategories.length]

    try {
      const post = await generateBlogPost(category)

      // Save to database
      const { data, error } = await supabase
        .from("blog_posts")
        .insert({
          ...post,
          featured: i === 0, // Make the first post featured
        })
        .select()
        .single()

      if (error) throw error
      posts.push(data)

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Error generating post for ${category}:`, error)
    }
  }

  return posts
}

export async function testOpenRouterConnection() {
  try {
    const { text } = await generateText({
      model: openrouter("openai/gpt-3.5-turbo"),
      prompt: 'Say "OpenRouter is connected!" in a cheerful way.',
      maxTokens: 50,
    })

    return {
      success: true,
      message: text,
    }
  } catch (error) {
    console.error("OpenRouter test failed:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Connection failed",
    }
  }
}
