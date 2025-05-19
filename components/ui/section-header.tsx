"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center" | "right"
  theme?: "primary" | "secondary" | "tertiary" | "quaternary"
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "primary",
  className,
}: SectionHeaderProps) {
  const themeClasses = {
    primary: "text-blue-600", // Freshers
    secondary: "text-purple-600", // Students
    tertiary: "text-amber-600", // Companies
    quaternary: "text-emerald-600", // Universities
  }

  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={cn("max-w-3xl", alignClasses[align], className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={cn(
            "inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium border-2 border-black",
            themeClasses[theme],
          )}
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
