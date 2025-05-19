"use client"

import { motion } from "framer-motion"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import Link from "next/link"

interface CTABannerProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  theme?: "primary" | "secondary" | "tertiary" | "quaternary"
}

export default function CTABanner({ title, description, buttonText, buttonLink, theme = "primary" }: CTABannerProps) {
  const themeClasses = {
    primary: "from-blue-50 to-white",
    secondary: "from-purple-50 to-white",
    tertiary: "from-amber-50 to-white",
    quaternary: "from-emerald-50 to-white",
  }

  return (
    <DoodleBackground className={`py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b ${themeClasses[theme]}`} density="medium">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">{title}</h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">{description}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
          <Link href={buttonLink}>
            <DoodleButton size="lg" className="px-8 py-6 text-lg">
              {buttonText}
            </DoodleButton>
          </Link>
        </motion.div>
      </motion.div>
    </DoodleBackground>
  )
}
