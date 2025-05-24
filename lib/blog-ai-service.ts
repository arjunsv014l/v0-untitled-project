import { createOpenRouter } from "@ai-sdk/openrouter"
import { generateText } from "ai"

// Initialize OpenRouter client
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

// Blog post categories with their focus areas
const BLOG_CATEGORIES = [
  {
    name: "Freshman Tips",
    topics: [
      "adjusting to college life",
      "time management for freshmen",
      "making friends in college",
      "choosing the right classes",
      "dorm life tips",
      "homesickness solutions",
      "study habits for success",
      "campus navigation",
      "freshman year mistakes to avoid",
      "building independence",
    ],
  },
  {
    name: "Career Development",
    topics: [
      "building a professional network",
      "internship strategies",
      "resume writing for students",
      "interview preparation",
      "personal branding",
      "LinkedIn optimization",
      "career fair success",
      "finding mentors",
      "skill development",
      "industry research",
    ],
  },
  {
    name: "Student Life",
    topics: [
      "work-life balance",
      "healthy habits for students",
      "managing stress",
      "social activities",
      "budget management",
      "meal planning",
      "exercise routines",
      "sleep optimization",
      "productivity tips",
      "self-care strategies",
    ],
  },
  {
    name: "Networking",
    topics: [
      "professional networking events",
      "alumni connections",
      "social media networking",
      "elevator pitch development",
      "follow-up strategies",
      "virtual networking",
      "industry meetups",
      "networking etiquette",
      "building relationships",
      "leveraging connections",
    ],
  },
  {
    name: "Campus Life",
    topics: [
      "student organizations",
      "campus resources",
      "extracurricular activities",
      "leadership opportunities",
      "campus events",
      "community involvement",
      "Greek life",
      "student government",
      "campus traditions",
      "making an impact",
    ],
  },
  {
    name: "Financial Aid",
    topics: [
      "scholarship applications",
      "grant opportunities",
      "student loans",
      "work-study programs",
      "financial planning",
      "budgeting tips",
      "saving strategies",
      "part-time jobs",
      "financial literacy",
      "avoiding debt",
    ],
  },
]

// Helper function to generate a slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Helper function to calculate read time
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readTime} min read`
}

// Generate a single blog post
export async function generateBlogPost(category: string, topic: string) {
  try {
    const prompt = `You are an AI content writer for Dreamclerk, a platform that helps college students with career development and campus life. 

Write a comprehensive, engaging blog post about "${topic}" in the "${category}" category.

The blog post should:
1. Be between 800-1200 words
2. Have a catchy, SEO-friendly title
3. Include practical, actionable advice
4. Be written in a friendly, conversational tone that appeals to college students
5. Include specific examples and scenarios
6. Have clear sections with subheadings (use <h2> tags)
7. Use proper HTML formatting with <p>, <h2>, <ul>, <li> tags
8. End with a strong conclusion and call-to-action

Format the response as valid JSON with the following structure:
{
  "title": "The blog post title",
  "excerpt": "A 2-3 sentence summary of the post that captures the main value proposition",
  "content": "The full HTML-formatted blog content"
}

Make sure the content is informative, engaging, and provides real value to college students.`

    console.log(`Generating blog post for topic: ${topic} in category: ${category}`)

    const { text } = await generateText({
      model: openrouter("anthropic/claude-3.5-sonnet"),
      prompt,
      temperature: 0.8,
      maxTokens: 2000,
    })

    // Parse the JSON response
    let blogData
    try {
      blogData = JSON.parse(text)
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)
      console.log("Raw response:", text)
      throw new Error("Failed to parse AI response")
    }

    return {
      ...blogData,
      category,
      slug: generateSlug(blogData.title),
      readTime: calculateReadTime(blogData.content),
      imageUrl: getImageForCategory(category),
    }
  } catch (error) {
    console.error("Error generating blog post:", error)
    throw error
  }
}

// Get appropriate image for category
function getImageForCategory(category: string): string {
  const categoryImages: Record<string, string> = {
    "Freshman Tips": "/diverse-student-portraits.png",
    "Career Development": "/professional-networking.png",
    "Student Life": "/study-group.png",
    Networking: "/virtual-career-fair.png",
    "Campus Life": "/community-collaboration.png",
    "Financial Aid": "/diverse-students-studying.png",
  }

  return categoryImages[category] || "/students-collaborating.png"
}

// Generate multiple blog posts (10 per day)
export async function generateDailyBlogPosts() {
  const posts = []
  const postsPerCategory = Math.ceil(10 / BLOG_CATEGORIES.length)

  for (const category of BLOG_CATEGORIES) {
    // Randomly select topics from each category
    const shuffledTopics = [...category.topics].sort(() => Math.random() - 0.5)
    const selectedTopics = shuffledTopics.slice(0, postsPerCategory)

    for (const topic of selectedTopics) {
      if (posts.length < 10) {
        try {
          const post = await generateBlogPost(category.name, topic)
          posts.push(post)

          // Add a small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 2000))
        } catch (error) {
          console.error(`Failed to generate post for topic: ${topic}`, error)
          // Continue with other posts even if one fails
        }
      }
    }
  }

  // Mark one random post as featured
  if (posts.length > 0) {
    const randomIndex = Math.floor(Math.random() * posts.length)
    posts[randomIndex].featured = true
  }

  console.log(`Successfully generated ${posts.length} blog posts`)
  return posts
}

// Test function to generate a single post
export async function testBlogGeneration() {
  try {
    const testPost = await generateBlogPost("Freshman Tips", "adjusting to college life")
    console.log("Test post generated successfully:", testPost.title)
    return testPost
  } catch (error) {
    console.error("Test generation failed:", error)
    throw error
  }
}
