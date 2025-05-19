"use client"

import RectangularUserCounter from "@/components/rectangular-user-counter"
import Link from "next/link"

export default function RectangularCounterDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Rectangular User Counter Demo</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4">Rectangular Counter Implementation</h2>
        <p className="text-gray-600 mb-4">
          A user counter with a distinctly rectangular border, starting at 500 users. Click the test button to simulate
          a new registration.
        </p>

        <div className="flex justify-center my-6">
          <RectangularUserCounter initialCount={500} label="users registered" />
        </div>

        <div className="mt-8">
          <h3 className="font-medium mb-2">Implementation Code:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {`import RectangularUserCounter from "@/components/rectangular-user-counter"

// In your component:
<RectangularUserCounter initialCount={500} label="users registered" />

// To increment from anywhere in your code:
window.incrementUserCounter(1) // Increment by 1`}
          </pre>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
