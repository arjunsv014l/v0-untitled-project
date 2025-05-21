export default function CareerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Career Opportunities</h1>
      <p className="text-lg mb-8">
        Join our team and help shape the future of student networking and career development.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Example job posting */}
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Frontend Developer</h2>
          <p className="text-gray-600 mb-4">Full-time • Remote</p>
          <p className="mb-4">
            We're looking for a talented frontend developer to help build engaging user experiences.
          </p>
          <button className="bg-black text-white px-4 py-2 rounded">Apply Now</button>
        </div>
      </div>
    </div>
  )
}
