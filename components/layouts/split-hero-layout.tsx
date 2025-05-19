"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import DoodleButton from "../ui-elements/doodle-button"
import DoodleCard from "../ui-elements/doodle-card"
import DoodleBackground from "../ui-elements/doodle-background"

interface FeatureProps {
  icon: ReactNode
  title: string
  description: string
}

interface SplitHeroLayoutProps {
  userType: "freshers" | "students" | "companies" | "universities"
  heroTitle: string
  heroDescription: string
  heroImage: string
  heroImageAlt: string
  ctaText: string
  ctaLink: string
  features: FeatureProps[]
  contentSection: ReactNode
  testimonialSection?: ReactNode
}

export default function SplitHeroLayout({
  userType,
  heroTitle,
  heroDescription,
  heroImage,
  heroImageAlt,
  ctaText,
  ctaLink,
  features,
  contentSection,
  testimonialSection,
}: SplitHeroLayoutProps) {
  // Color themes for different user types
  const themeColors = {
    freshers: "from-green-100 to-blue-100 border-green-200",
    students: "from-blue-100 to-purple-100 border-blue-200",
    companies: "from-purple-100 to-pink-100 border-purple-200",
    universities: "from-amber-100 to-orange-100 border-amber-200",
  }

  const borderColors = {
    freshers: "border-green-500",
    students: "border-blue-500",
    companies: "border-purple-500",
    universities: "border-amber-500",
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${themeColors[userType]} border-b-2 border-black`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div
                className={`inline-flex items-center border-2 ${borderColors[userType]} px-4 py-2 rounded-full mb-6`}
              >
                <span className="font-medium capitalize">For {userType}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
              <p className="text-lg text-gray-700 mb-8">{heroDescription}</p>

              <Link href={ctaLink}>
                <DoodleButton size="lg">{ctaText}</DoodleButton>
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-first lg:order-last"
            >
              <DoodleCard className="p-6" doodle="stars">
                <img
                  src={heroImage || "/placeholder.svg"}
                  alt={heroImageAlt}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </DoodleCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Benefits</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover how Dreamclerk helps {userType} achieve their goals and maximize their potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex flex-col h-full">
                    <div className="bg-white border-2 border-black p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-700 flex-grow">{feature.description}</p>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <DoodleBackground className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" density="light">
        <div className="max-w-7xl mx-auto">{contentSection}</div>
      </DoodleBackground>

      {/* Testimonial Section (Optional) */}
      {testimonialSection && (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
          <div className="max-w-7xl mx-auto">{testimonialSection}</div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className={`bg-gradient-to-br ${themeColors[userType]} py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-black`}
      >
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
                {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </DoodleButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
