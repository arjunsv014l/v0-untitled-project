"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import DoodleButton from "../ui-elements/doodle-button"
import DoodleCard from "../ui-elements/doodle-card"
import GlassCard from "../ui-elements/glass-card"

interface CardProps {
  title: string
  content: ReactNode
  width?: "full" | "half" | "third"
  height?: "auto" | "tall" | "medium" | "short"
  accent?: boolean
}

interface CardDashboardLayoutProps {
  userType: "freshers" | "students" | "companies" | "universities"
  pageTitle: string
  pageDescription: string
  cards: CardProps[]
  sidebarContent?: ReactNode
  ctaText: string
  ctaLink: string
}

export default function CardDashboardLayout({
  userType,
  pageTitle,
  pageDescription,
  cards,
  sidebarContent,
  ctaText,
  ctaLink,
}: CardDashboardLayoutProps) {
  // Color themes for different user types
  const accentColors = {
    freshers: "bg-green-500",
    students: "bg-blue-500",
    companies: "bg-purple-500",
    universities: "bg-amber-500",
  }

  const getCardWidth = (width: CardProps["width"]) => {
    switch (width) {
      case "full":
        return "col-span-12"
      case "half":
        return "col-span-12 md:col-span-6"
      case "third":
        return "col-span-12 md:col-span-6 lg:col-span-4"
      default:
        return "col-span-12 md:col-span-6 lg:col-span-4"
    }
  }

  const getCardHeight = (height: CardProps["height"]) => {
    switch (height) {
      case "tall":
        return "min-h-[500px]"
      case "medium":
        return "min-h-[350px]"
      case "short":
        return "min-h-[200px]"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 md:max-w-2xl">
              <div className={`w-16 h-1 ${accentColors[userType]} mb-6`}></div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageTitle}</h1>
              <p className="text-lg text-gray-700">{pageDescription}</p>
            </div>
            {sidebarContent && (
              <div className="md:max-w-sm w-full">
                <GlassCard className="p-6">{sidebarContent}</GlassCard>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Card Dashboard */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${getCardWidth(card.width)} ${getCardHeight(card.height)}`}
              >
                <DoodleCard className={`h-full p-6 ${card.accent ? `border-t-4 ${accentColors[userType]}` : ""}`}>
                  <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                  <div className="h-full">{card.content}</div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Get Started?</h2>
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
