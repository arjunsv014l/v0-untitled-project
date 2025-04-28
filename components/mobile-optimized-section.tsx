"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface MobileOptimizedSectionProps {
  title: string
  subtitle: string
  description: ReactNode
  image: ReactNode
  ctaButton?: ReactNode
  reversed?: boolean
  id?: string
}

export default function MobileOptimizedSection({
  title,
  subtitle,
  description,
  image,
  ctaButton,
  reversed = false,
  id,
}: MobileOptimizedSectionProps) {
  return (
    <section id={id} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            reversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image always appears first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            {image}
          </motion.div>

          {/* Content appears second on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
              <span className="font-medium">{subtitle}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>

            <div className="text-lg text-gray-700 mb-8">{description}</div>

            {ctaButton && <div>{ctaButton}</div>}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
