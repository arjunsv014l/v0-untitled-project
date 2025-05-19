"use client"

import RectangularUserCounter from "@/components/rectangular-user-counter"

export default function CounterDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">User Counter Demo</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4">Standard Implementation</h2>
        <p className="text-gray-600 mb-4">
          A user counter with a rectangular border, starting at 500 users. Click the test button to simulate a new
          registration.
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

      <div className="mt-8 text-center max-w-md">
        <h2 className="text-xl font-semibold mb-2">How to Use in Your Project</h2>
        <ol className="text-left text-gray-700 space-y-2">
          <li>
            1. Copy the <code className="bg-gray-100 px-1">rectangular-user-counter.tsx</code> file to your components
            folder
          </li>
          <li>2. Import and place the component where needed in your layout</li>
          <li>
            3. When a user registers, call <code className="bg-gray-100 px-1">window.incrementUserCounter()</code>
          </li>
          <li>4. The count persists between page refreshes using localStorage</li>
        </ol>
      </div>
    </div>
  )
}
