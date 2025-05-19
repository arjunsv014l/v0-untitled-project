"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQAccordionProps {
  items: {
    question: string
    answer: string
  }[]
  theme?: "primary" | "secondary" | "tertiary" | "quaternary"
}

export default function FAQAccordion({ items, theme = "primary" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const themeClasses = {
    primary: {
      border: "border-blue-200",
      activeBg: "bg-blue-50",
      text: "text-blue-600",
    },
    secondary: {
      border: "border-purple-200",
      activeBg: "bg-purple-50",
      text: "text-purple-600",
    },
    tertiary: {
      border: "border-amber-200",
      activeBg: "bg-amber-50",
      text: "text-amber-600",
    },
    quaternary: {
      border: "border-emerald-200",
      activeBg: "bg-emerald-50",
      text: "text-emerald-600",
    },
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn("border-2 border-black rounded-lg overflow-hidden", isOpen && themeClasses[theme].activeBg)}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isOpen ? "transform rotate-180" : "",
                  themeClasses[theme].text,
                )}
              />
            </button>
            {isOpen && (
              <div className="p-4 pt-0 border-t border-gray-200">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
