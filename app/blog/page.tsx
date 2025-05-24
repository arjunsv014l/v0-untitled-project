import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { supabase } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Blog | Dreamclerk",
  description: "Daily insights and stories about college life, career development, and more.",
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPage() {
  // Fetch blog posts from database
  const { data: blogPosts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error fetching blog posts:", error)
  }

  const posts = blogPosts || []

  // Get the featured post
  const featuredPost = posts.find((post) => post.featured)
  // Get the rest of the posts
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <DoodleBackground className="absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dreamclerk Blog</h1>
            <p className="text-xl text-gray-700 mb-8">
              Daily insights and stories about college life, career development, and more.
              <span className="block mt-2 text-sm font-medium text-purple-600">
                Powered by AI - 10 new articles every day!
              </span>
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <DoodleButton variant="outline" size="sm">
                All Posts
              </DoodleButton>
              <DoodleButton variant="outline" size="sm">
                Freshman Tips
              </DoodleButton>
              <DoodleButton variant="outline" size="sm">
                Career Development
              </DoodleButton>
              <DoodleButton variant="outline" size="sm">
                Campus Life
              </DoodleButton>
              <DoodleButton variant="outline" size="sm">
                Student Success
              </DoodleButton>
            </div>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <img
                    src={featuredPost.image_url || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="rounded-xl shadow-lg w-full h-[300px] object-cover border-2 border-black"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full border border-purple-200">
                      Featured
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(featuredPost.published_at)}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.read_time}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
                  <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center">
                    <DoodleButton>
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </DoodleButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular posts grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-md border-2 border-black transition-transform hover:-translate-y-1"
              >
                <img src={post.image_url || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200 flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(post.published_at)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-purple-600 font-medium inline-flex items-center text-sm hover:text-purple-800"
                  >
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <DoodleButton variant="outline" size="lg">
              Load More Articles
            </DoodleButton>
          </div>
        </div>
      </section>

      {/* AI-powered blog info */}
      <section className="py-12 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">AI-Powered Daily Content</h2>
            <p className="text-gray-700 mb-6">
              Our blog is powered by advanced AI technology that creates 10 fresh, insightful articles every day. Get
              the latest tips, trends, and stories about college life, career development, and more, all tailored to
              help you make the most of your educational journey.
            </p>
            <p className="text-sm text-gray-500">
              Articles are reviewed for accuracy and relevance before publication.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
