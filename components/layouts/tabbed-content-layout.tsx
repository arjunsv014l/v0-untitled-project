"use client"

import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import DoodleButton from "../ui-elements/doodle-button"
import DoodleCard from "../ui-elements/doodle-card"
import DoodleBackground from "../ui-elements/doodle-background"

interface TabProps {
  label: string
  content: ReactNode
}

interface TabbedContentLayoutProps {
  userType: "freshers" | "students" | "companies" | "universities"
  pageTitle: string
  pageDescription: string
  heroImage?: string
  heroImageAlt?: string
  tabs: TabProps[]
  sidebarContent?: ReactNode
  ctaText: string
  ctaLink: string
}

export default function TabbedContentLayout({
  userType,
  pageTitle,
  pageDescription,
  heroImage,
  heroImageAlt,
  tabs,
  sidebarContent,
  ctaText,
  ctaLink,
}: TabbedContentLayoutProps) {
  const [activeTab, setActiveTab] = useState(0)

  // Color themes for different user types
  const accentColors = {
    freshers: "border-green-500 text-green-600 hover:bg-green-50",
    students: "border-blue-500 text-blue-600 hover:bg-blue-50",
    companies: "border-purple-500 text-purple-600 hover:bg-purple-50",
    universities: "border-amber-500 text-amber-600 hover:bg-amber-50",
  }

  const activeTabColors = {
    freshers: "border-green-500 bg-green-50 text-green-700",
    students: "border-blue-500 bg-blue-50 text-blue-700",
    companies: "border-purple-500 bg-purple-50 text-purple-700",
    universities: "border-amber-500 bg-amber-50 text-amber-700",
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DoodleBackground className="pt-24 pb-16" density="light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div
                className={`inline-flex items-center border-2 ${accentColors[userType].split(" ")[0]} px-4 py-2 rounded-full mb-6`}
              >
                <span className="font-medium capitalize">For {userType}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageTitle}</h1>
              <p className="text-lg text-gray-700 mb-8">{pageDescription}</p>

              <Link href={ctaLink}>
                <DoodleButton size="lg">{ctaText}</DoodleButton>
              </Link>
            </motion.div>

            {/* Hero Image (if provided) */}
            {heroImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <DoodleCard className="p-6" doodle="stars">
                  <img
                    src={heroImage || "/placeholder.svg"}
                    alt={heroImageAlt || "Hero image"}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </DoodleCard>
              </motion.div>
            )}
          </div>
        </div>
      </DoodleBackground>

      {/* Tabbed Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Tabs Navigation */}
              <div className="flex flex-wrap border-b-2 border-gray-200 mb-8">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === index
                        ? activeTabColors[userType]
                        : `border-transparent ${accentColors[userType].split(" ")[2]} text-gray-600`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {tabs[activeTab].content}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {sidebarContent ? (
                sidebarContent
              ) : (
                <DoodleCard className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    {tabs.map((tab, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setActiveTab(index)}
                          className={`text-left w-full px-4 py-2 rounded-lg transition-colors ${
                            activeTab === index ? activeTabColors[userType] : `hover:bg-gray-100 text-gray-700`
                          }`}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </DoodleCard>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join Dreamclerk today and discover how we can help you achieve your goals.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link href={ctaLink}>
              <DoodleButton size="lg" className="px-8 py-6 text-lg">
                {ctaText}
              </DoodleButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
