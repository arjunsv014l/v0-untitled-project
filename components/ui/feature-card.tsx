"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  theme?: "primary" | "secondary" | "tertiary" | "quaternary"
  doodle?: "stars" | "circles" | "lines" | "squiggles" | "waves"
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  theme = "primary",
  doodle,
}: FeatureCardProps) {
  const themeClasses = {
    primary: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
    },
    secondary: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
    },
    tertiary: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
    },
    quaternary: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-600",
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <DoodleCard className="h-full p-6" doodle={doodle}>
        <div className="flex flex-col h-full">
          <div
            className={`${themeClasses[theme].bg} border-2 ${themeClasses[theme].border} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}
          >
            <Icon className={`h-6 w-6 ${themeClasses[theme].text}`} />
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-700 flex-grow">{description}</p>
        </div>
      </DoodleCard>
    </motion.div>
  )
}
