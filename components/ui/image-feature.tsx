"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import DoodleCard from "@/components/ui-elements/doodle-card"

interface ImageFeatureProps {
  image: string
  alt: string
  title: string
  description: string
  features: {
    icon: LucideIcon
    text: string
  }[]
  imagePosition?: "left" | "right"
  theme?: "primary" | "secondary" | "tertiary" | "quaternary"
  doodle?: "stars" | "circles" | "lines" | "squiggles" | "waves"
}

export default function ImageFeature({
  image,
  alt,
  title,
  description,
  features,
  imagePosition = "left",
  theme = "primary",
  doodle,
}: ImageFeatureProps) {
  const themeClasses = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    tertiary: "text-amber-600",
    quaternary: "text-emerald-600",
  }

  const ImageContent = (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={imagePosition === "right" ? "order-1 md:order-2" : "order-1 md:order-1"}
    >
      <DoodleCard className="p-6 md:p-8" doodle={doodle}>
        <img src={image || "/placeholder.svg"} alt={alt} className="w-full h-auto rounded-lg" />
      </DoodleCard>
    </motion.div>
  )

  const TextContent = (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "left" ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={imagePosition === "right" ? "order-2 md:order-1" : "order-2 md:order-2"}
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-gray-700 mb-6">{description}</p>

      <ul className="space-y-4">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <div className={`mr-3 mt-1 flex-shrink-0 ${themeClasses[theme]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-gray-700">{feature.text}</span>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {imagePosition === "left" ? (
        <>
          {ImageContent}
          {TextContent}
        </>
      ) : (
        <>
          {TextContent}
          {ImageContent}
        </>
      )}
    </div>
  )
}
