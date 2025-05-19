"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"

interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
  delay?: number
  theme?: "primary" | "secondary" | "tertiary" | "quaternary"
}

export default function StatCard({ icon: Icon, value, label, delay = 0, theme = "primary" }: StatCardProps) {
  const themeClasses = {
    primary: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    secondary: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    tertiary: {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    quaternary: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <DoodleCard className="p-6 text-center">
        <div
          className={`${themeClasses[theme].bg} border-2 ${themeClasses[theme].border} p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className={`h-8 w-8 ${themeClasses[theme].text}`} />
        </div>
        <div className={`text-3xl font-bold mb-1 ${themeClasses[theme].text}`}>{value}</div>
        <div className="text-gray-700">{label}</div>
      </DoodleCard>
    </motion.div>
  )
}
