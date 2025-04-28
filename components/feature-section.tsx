"use client"

import { motion } from "framer-motion"
import DoodleCard from "./ui-elements/doodle-card"

interface FeatureSectionProps {
  title: string
  subtitle: string
  icon: string
  features: string[]
  index?: number
}

export default function FeatureSection({ title, subtitle, icon, features, index = 0 }: FeatureSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "graduation-cap":
        return "🎓"
      case "wallet":
        return "💰"
      case "building":
        return "🏛️"
      case "cpu":
        return "🤖"
      default:
        return "🎓"
    }
  }

  const getDoodle = (index: number) => {
    const doodles = ["stars", "circles", "lines", "squiggles"] as const
    return doodles[index % doodles.length]
  }

  return (
    <DoodleCard
      className="p-8 hover:shadow-xl transition-all duration-500 group"
      delay={index * 0.1}
      doodle={getDoodle(index)}
    >
      <div className="flex items-center mb-6">
        <div className="bg-white border-2 border-black p-3 rounded-lg mr-4 shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <span className="text-2xl">{getIcon(icon)}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-black">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>

      <ul className="space-y-3">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            className="flex items-start"
          >
            <div className="mr-2 mt-1 flex-shrink-0 bg-white border-2 border-black rounded-full p-1 shadow-md transform transition-transform duration-300 group-hover:scale-110">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L9 16L19 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-gray-700">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </DoodleCard>
  )
}
