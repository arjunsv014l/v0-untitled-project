"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import DoodleButton from "../ui-elements/doodle-button"
import DoodleCard from "../ui-elements/doodle-card"

interface FeatureProps {
  title: string
  description: string
  image: string
  imageAlt: string
  bulletPoints?: string[]
  ctaText?: string
  ctaLink?: string
}

interface ZigzagFeatureLayoutProps {
  userType: "freshers" | "students" | "companies" | "universities"
  pageTitle: string
  pageDescription: string
  features: FeatureProps[]
  headerContent?: ReactNode
  footerContent?: ReactNode
  mainCtaText: string
  mainCtaLink: string
}

export default function ZigzagFeatureLayout({
  userType,
  pageTitle,
  pageDescription,
  features,
  headerContent,
  footerContent,
  mainCtaText,
  mainCtaLink,
}: ZigzagFeatureLayoutProps) {
  // Color themes for different user types
  const accentColors = {
    freshers: "border-green-500 text-green-600",
    students: "border-blue-500 text-blue-600",
    companies: "border-purple-500 text-purple-600",
    universities: "border-amber-500 text-amber-600",
  }

  const bgColors = {
    freshers: "bg-green-50",
    students: "bg-blue-50",
    companies: "bg-purple-50",
    universities: "bg-amber-50",
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className={`w-24 h-1 ${accentColors[userType].split(" ")[0]} mx-auto mb-6`}></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageTitle}</h1>
            <p className="text-lg text-gray-700 mb-8">{pageDescription}</p>
            {headerContent && <div className="mt-8">{headerContent}</div>}
          </div>
        </div>
      </section>

      {/* Zigzag Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 ${
                index !== features.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* Image - alternating left/right */}
              <div className={index % 2 === 0 ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                <DoodleCard
                  className="p-6"
                  doodle={
                    index % 4 === 0 ? "stars" : index % 4 === 1 ? "circles" : index % 4 === 2 ? "lines" : "squiggles"
                  }
                >
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.imageAlt}
                    className="w-full h-auto rounded-lg"
                  />
                </DoodleCard>
              </div>

              {/* Content - alternating right/left */}
              <div className={index % 2 === 0 ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                <p className="text-lg text-gray-700 mb-6">{feature.description}</p>

                {feature.bulletPoints && (
                  <ul className="space-y-3 mb-6">
                    {feature.bulletPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <div
                          className={`mr-2 mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 ${accentColors[userType].split(" ")[0]} flex items-center justify-center`}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L9 16L19 6"
                              stroke="currentColor"
                              className={accentColors[userType].split(" ")[1]}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {feature.ctaText && feature.ctaLink && (
                  <Link href={feature.ctaLink}>
                    <DoodleButton size="md" variant="outline">
                      {feature.ctaText}
                    </DoodleButton>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${bgColors[userType]} py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-black`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          {footerContent ? (
            footerContent
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Get Started?</h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Join Dreamclerk today and discover how we can help you achieve your goals.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Link href={mainCtaLink}>
                  <DoodleButton size="lg" className="px-8 py-6 text-lg">
                    {mainCtaText}
                  </DoodleButton>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </section>
    </div>
  )
}
