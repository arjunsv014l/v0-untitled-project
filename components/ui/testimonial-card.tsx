"use client"

import { motion } from "framer-motion"
import DoodleCard from "@/components/ui-elements/doodle-card"

interface TestimonialCardProps {
  quote: string
  name: string
  role?: string
  organization?: string
  delay?: number
  theme?: "primary" | "secondary" | "tertiary" | "quaternary"
}

export default function TestimonialCard({
  quote,
  name,
  role,
  organization,
  delay = 0,
  theme = "primary",
}: TestimonialCardProps) {
  const themeClasses = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    tertiary: "text-amber-600",
    quaternary: "text-emerald-600",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <DoodleCard className="h-full p-6">
        <div className="flex flex-col h-full">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`mb-4 ${themeClasses[theme]}`}
          >
            <path
              d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7M10 11V19H6C5.46957 19 4.96086 18.7893 4.58579 18.4142C4.21071 18.0391 4 17.5304 4 17V11M10 11H14M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7M20 11V19H16C15.4696 19 14.9609 18.7893 14.5858 18.4142C14.2107 18.0391 14 17.5304 14 17V11M20 11H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-gray-700 italic mb-6 flex-grow">{quote}</p>
          <div>
            <p className="font-bold">{name}</p>
            {role && <p className="text-gray-600 text-sm">{role}</p>}
            {organization && <p className="text-gray-600 text-sm">{organization}</p>}
          </div>
        </div>
      </DoodleCard>
    </motion.div>
  )
}
