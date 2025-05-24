import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ThumbsUp, Tag } from "lucide-react"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Blog Post | Dreamclerk",
  description: "Read our latest blog post about college life and career development.",
}

async function getBlogPost(id: string) {
  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error || !post) {
    notFound()
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, image_url")
    .eq("category", post.category)
    .neq("id", post.id)
    .limit(3)

  return {
    ...post,
    author: {
      name: post.author || "AI Content Team",
      avatar: post.author_avatar || "/clerk-memoji/clerk-idle.png",
      role: post.author_role || "Education Specialist",
    },
    relatedPosts: relatedPosts || [],
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id)

  return (
    <div className="min-h-screen pb-16">
      {/* Hero section */}
      <section className="relative py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-purple-600 mb-8 hover:text-purple-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full border border-purple-200 flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {post.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.published_at}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.read_time}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

            <div className="flex items-center mb-8">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-black"
              />
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-gray-600">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image_url || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg border-2 border-black"
          />
        </div>
      </div>

      {/* Article content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Social sharing sidebar */}
          <div className="hidden lg:block fixed left-[calc(50%-600px)] top-1/3 bg-white p-3 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col gap-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <ThumbsUp className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bookmark className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Article body */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Mobile sharing options */}
          <div className="flex justify-center gap-4 mt-12 lg:hidden">
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <ThumbsUp className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Bookmark className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Share2 className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Author bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center mb-4">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                className="w-16 h-16 rounded-full mr-4 border-2 border-black"
              />
              <div>
                <p className="font-bold text-lg">{post.author.name}</p>
                <p className="text-gray-600">{post.author.role}</p>
              </div>
            </div>
            <p className="text-gray-700">
              Our AI Content Team specializes in creating educational content that helps students navigate their college
              journey successfully. With expertise in education trends, career development, and student life, our team
              delivers valuable insights daily.
            </p>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md border-2 border-black transition-transform hover:-translate-y-1">
                    <img
                      src={relatedPost.image_url || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold">{relatedPost.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-700 mb-6">
              Subscribe to our newsletter to receive the latest blog posts and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <DoodleButton>Subscribe</DoodleButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
