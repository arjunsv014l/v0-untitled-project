import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ColorPalette from "@/components/design-system/color-palette"
import TypographyGuide from "@/components/design-system/typography-guide"
import SpacingGuide from "@/components/design-system/spacing-guide"
import ComponentLibrary from "@/components/design-system/component-library"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <DoodleBackground className="pt-24 pb-16" density="low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
              <span className="font-medium">Design System</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dreamclerk Design System</h1>

            <p className="text-lg text-gray-700 mb-8">
              A comprehensive guide to the visual language and components of the Dreamclerk platform.
            </p>
          </div>
        </div>
      </DoodleBackground>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#C5F0C0]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="colors" className="data-[state=active]:bg-[#E5CEFC]">
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="data-[state=active]:bg-[#BFE5FB]">
              Typography
            </TabsTrigger>
            <TabsTrigger value="spacing" className="data-[state=active]:bg-[#FFCFA3]">
              Spacing
            </TabsTrigger>
            <TabsTrigger value="components" className="data-[state=active]:bg-[#FDFD96]">
              Components
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Dreamclerk Design Principles</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="border-2 border-black rounded-lg p-6 bg-[#C5F0C0]">
                  <h3 className="text-xl font-bold mb-2">Playful & Approachable</h3>
                  <p className="text-gray-800">
                    The Dreamclerk design language emphasizes a playful, hand-drawn aesthetic that feels approachable
                    and friendly to users.
                  </p>
                </div>

                <div className="border-2 border-black rounded-lg p-6 bg-[#E5CEFC]">
                  <h3 className="text-xl font-bold mb-2">Clarity & Simplicity</h3>
                  <p className="text-gray-800">
                    Despite the playful visual style, the interface maintains clarity and simplicity to ensure ease of
                    use.
                  </p>
                </div>

                <div className="border-2 border-black rounded-lg p-6 bg-[#BFE5FB]">
                  <h3 className="text-xl font-bold mb-2">Consistent & Cohesive</h3>
                  <p className="text-gray-800">
                    All elements follow a consistent visual language, creating a cohesive experience across the
                    platform.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">Design System Overview</h2>
              <p>
                The Dreamclerk Design System provides a foundation for creating consistent, accessible, and visually
                engaging user interfaces. It includes:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Color Palette:</strong> A vibrant, pastel-based color scheme that maintains readability while
                  conveying a friendly, approachable tone.
                </li>
                <li>
                  <strong>Typography:</strong> A clean, readable type system based on the Inter font family with
                  consistent sizing and weight guidelines.
                </li>
                <li>
                  <strong>Spacing:</strong> A systematic approach to whitespace that creates visual rhythm and
                  hierarchy.
                </li>
                <li>
                  <strong>Components:</strong> A library of reusable UI components with the distinctive Dreamclerk
                  "doodle" style.
                </li>
                <li>
                  <strong>Illustrations:</strong> Custom illustrations that reinforce the brand's playful identity and
                  help explain complex concepts.
                </li>
              </ul>

              <div className="mt-8 p-6 border-2 border-black rounded-lg bg-[#FFEFB7]">
                <h3 className="text-xl font-bold mb-2">Using This Guide</h3>
                <p>
                  This design system serves as a reference for developers and designers working on the Dreamclerk
                  platform. Use the tabs above to navigate to specific sections of the design system.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="colors">
            <ColorPalette />
          </TabsContent>

          <TabsContent value="typography">
            <TypographyGuide />
          </TabsContent>

          <TabsContent value="spacing">
            <SpacingGuide />
          </TabsContent>

          <TabsContent value="components">
            <ComponentLibrary />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
