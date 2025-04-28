"use client"

export default function TypographyGuide() {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Headers</h3>
        <div className="space-y-4">
          <div className="p-4 border-2 border-black rounded-lg">
            <h1 className="text-5xl font-bold">H1: Main Heading</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">48px</span>, Weight:{" "}
              <span className="font-medium">Bold (700)</span>, Line-height: <span className="font-medium">1.2</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Main page headers, hero section titles</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h2 className="text-4xl font-bold">H2: Section Heading</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">36px</span>, Weight:{" "}
              <span className="font-medium">Bold (700)</span>, Line-height: <span className="font-medium">1.2</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Section headers, major content divisions</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h3 className="text-2xl font-bold">H3: Subsection Heading</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">24px</span>, Weight:{" "}
              <span className="font-medium">Bold (700)</span>, Line-height: <span className="font-medium">1.3</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Card titles, subsection headers</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h4 className="text-xl font-bold">H4: Component Heading</h4>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">20px</span>, Weight:{" "}
              <span className="font-medium">Bold (700)</span>, Line-height: <span className="font-medium">1.4</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Component titles, form section headers</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h5 className="text-lg font-bold">H5: Small Heading</h5>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">18px</span>, Weight:{" "}
              <span className="font-medium">Bold (700)</span>, Line-height: <span className="font-medium">1.4</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Small section headers, sidebar titles</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Body Text</h3>
        <div className="space-y-4">
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-lg">Body Large</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">18px</span>, Weight:{" "}
              <span className="font-medium">Regular (400)</span>, Line-height: <span className="font-medium">1.6</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Lead paragraphs, important information</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-base">Body Medium</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">16px</span>, Weight:{" "}
              <span className="font-medium">Regular (400)</span>, Line-height: <span className="font-medium">1.6</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Main body text, paragraphs</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm">Body Small</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">14px</span>, Weight:{" "}
              <span className="font-medium">Regular (400)</span>, Line-height: <span className="font-medium">1.5</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Secondary information, metadata</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-xs">Caption Text</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Size: <span className="font-medium">12px</span>, Weight:{" "}
              <span className="font-medium">Regular (400)</span>, Line-height: <span className="font-medium">1.5</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Captions, footnotes, very small text</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Special Text Styles</h3>
        <div className="space-y-4">
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="font-medium">Medium Text</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Weight:{" "}
              <span className="font-medium">Medium (500)</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Emphasis, subheadings, labels</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <p className="font-bold">Bold Text</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Weight: <span className="font-medium">Bold (700)</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Strong emphasis, important information</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <p className="italic">Italic Text</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Style: <span className="font-medium">Italic</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Quotes, emphasis</p>
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <p className="underline">Underlined Text</p>
            <p className="text-gray-500 mt-2 text-sm">
              Font: <span className="font-medium">Inter</span>, Decoration:{" "}
              <span className="font-medium">Underline</span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">Used for: Links</p>
          </div>
        </div>
      </div>
    </div>
  )
}
