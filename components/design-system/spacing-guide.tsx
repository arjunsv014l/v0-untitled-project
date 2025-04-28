"use client"

export default function SpacingGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Spacing Scale</h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Dreamclerk uses a consistent spacing scale based on 4px increments to maintain visual harmony throughout the
            interface.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "0", value: "0px", class: "p-0" },
              { name: "1", value: "4px", class: "p-1" },
              { name: "2", value: "8px", class: "p-2" },
              { name: "3", value: "12px", class: "p-3" },
              { name: "4", value: "16px", class: "p-4" },
              { name: "5", value: "20px", class: "p-5" },
              { name: "6", value: "24px", class: "p-6" },
              { name: "8", value: "32px", class: "p-8" },
              { name: "10", value: "40px", class: "p-10" },
              { name: "12", value: "48px", class: "p-12" },
              { name: "16", value: "64px", class: "p-16" },
              { name: "20", value: "80px", class: "p-20" },
              { name: "24", value: "96px", class: "p-24" },
            ].map((item) => (
              <div key={item.name} className="flex items-center border-2 border-black rounded-lg overflow-hidden">
                <div
                  className="h-16 bg-[#E5CEFC] flex items-center justify-center font-medium border-r-2 border-black"
                  style={{ width: "80px" }}
                >
                  {item.name}
                </div>
                <div className="px-4 py-2">
                  <div className="font-medium">{item.value}</div>
                  <div className="text-xs text-gray-500">
                    p-{item.name}, m-{item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Spacing Examples</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Vertical Spacing (Stack)</h4>
            <div className="border-2 border-black rounded-lg p-4">
              <div className="space-y-4">
                <div className="p-4 bg-[#C5F0C0] border-2 border-black rounded-lg text-center font-medium">
                  Element 1
                </div>
                <div className="p-4 bg-[#FFCFA3] border-2 border-black rounded-lg text-center font-medium">
                  Element 2
                </div>
                <div className="p-4 bg-[#BFE5FB] border-2 border-black rounded-lg text-center font-medium">
                  Element 3
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <code>space-y-4</code> adds a 16px margin between stacked elements.
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Horizontal Spacing (Row)</h4>
            <div className="border-2 border-black rounded-lg p-4">
              <div className="flex space-x-4">
                <div className="p-4 bg-[#C5F0C0] border-2 border-black rounded-lg text-center font-medium">Item 1</div>
                <div className="p-4 bg-[#FFCFA3] border-2 border-black rounded-lg text-center font-medium">Item 2</div>
                <div className="p-4 bg-[#BFE5FB] border-2 border-black rounded-lg text-center font-medium">Item 3</div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <code>space-x-4</code> adds a 16px margin between horizontal elements.
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Padding Examples</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-black rounded-lg">
                <div className="p-4 bg-[#E5CEFC] rounded-lg">
                  <div className="border-2 border-dashed border-black rounded-lg p-4 bg-white">
                    Content with p-4 (16px) padding
                  </div>
                </div>
                <div className="p-2 text-sm text-gray-600">
                  <code>p-4</code>: 16px padding on all sides
                </div>
              </div>

              <div className="border-2 border-black rounded-lg">
                <div className="px-4 py-8 bg-[#FFCFA3] rounded-lg">
                  <div className="border-2 border-dashed border-black rounded-lg p-4 bg-white">
                    Content with py-8 (32px) vertical and px-4 (16px) horizontal padding
                  </div>
                </div>
                <div className="p-2 text-sm text-gray-600">
                  <code>px-4 py-8</code>: Different vertical and horizontal padding
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Spacing Guidelines</h3>
        <div className="space-y-3">
          <div className="p-4 border-2 border-black rounded-lg">
            <h4 className="font-medium mb-2">Between Related Elements</h4>
            <p className="text-sm text-gray-600">
              Use 8px-16px (p-2 to p-4) between closely related elements like labels and inputs.
            </p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h4 className="font-medium mb-2">Between Components</h4>
            <p className="text-sm text-gray-600">
              Use 24px-32px (p-6 to p-8) between distinct components or card elements.
            </p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h4 className="font-medium mb-2">Section Spacing</h4>
            <p className="text-sm text-gray-600">Use 48px-80px (p-12 to p-20) to separate major page sections.</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h4 className="font-medium mb-2">Consistent Spacing</h4>
            <p className="text-sm text-gray-600">
              Maintain consistent spacing within similar components for visual harmony.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
