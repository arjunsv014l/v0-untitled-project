export default function BlogPostLoading() {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero section skeleton */}
      <section className="relative py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="h-6 w-32 bg-gray-200 rounded mb-8 animate-pulse"></div>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            <div className="h-10 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>

            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 animate-pulse"></div>
              <div>
                <div className="h-5 w-32 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image skeleton */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-[400px] bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Article content skeleton */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Article body skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            ))}
            <div className="h-8 bg-gray-200 rounded w-1/2 my-8 animate-pulse"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            ))}
            <div className="h-8 bg-gray-200 rounded w-1/2 my-8 animate-pulse"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            ))}
          </div>

          {/* Author bio skeleton */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 animate-pulse"></div>
              <div>
                <div className="h-6 w-40 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </article>

      {/* Related posts skeleton */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="h-40 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
