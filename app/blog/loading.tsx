export default function BlogLoading() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero section skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-8 animate-pulse"></div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Featured post skeleton */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-[300px] bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="w-full md:w-1/2">
              <div className="flex gap-4 mb-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Posts grid skeleton */}
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md border-2 border-gray-200">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="flex gap-3 mb-3">
                    <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
