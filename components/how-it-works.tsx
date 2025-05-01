"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Brain, BarChart4, Check } from "lucide-react"

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const steps = [
    {
      title: "Share Your College Life",
      description:
        "Students anonymously write daily journals covering academics, social life, lifestyle, and personal experiences.",
      icon: MessageSquare,
      benefits: [
        "Share authentic, unfiltered experiences",
        "Ensure privacy through anonymity",
        "Contribute to a growing student-driven knowledge hub",
      ],
      color: "#10B84A", // Green
    },
    {
      title: "AI-Powered Insights & Analysis",
      description:
        "Our AI categorizes student journals into key themes like academics, social interactions, lifestyle, university reviews, and mental well-being.",
      icon: Brain,
      benefits: [
        "Automatic categorization of student experiences",
        "Trend & sentiment analysis for deeper insights",
        "Verified, bias-free data for AI model training",
      ],
      color: "#8B5CF6", // Purple
    },
    {
      title: "Value for Everyone",
      description: "The structured insights create value across the education ecosystem.",
      icon: BarChart4,
      benefits: [
        "Students make informed choices with real student experiences",
        "Universities enhance campus life with structured insights",
        "AI companies train models using high-quality, real-world data",
        "Mental health firms analyze student well-being and trends",
      ],
      color: "#EC4899", // Pink
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-6 lg:px-8 bg-white text-black border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            How Dreamclerk Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Transforming real student experiences into structured insights—powered by AI, protected by anonymity, and
            driving real-world impact.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
              className="bg-white rounded-xl overflow-hidden border-2 border-black hover:border-black transition-all duration-300 hover:shadow-md relative"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mr-4">
                    <step.icon className="h-6 w-6" style={{ color: step.color }} />
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center mr-3 text-sm font-medium">
                      {index + 1}
                    </div>

                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{step.description}</p>

                <ul className="space-y-3">
                  {step.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <Check className="mr-2 mt-1 flex-shrink-0 h-5 w-5" style={{ color: step.color }} />
                      <span className="text-gray-600 text-sm">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <AnimatePresence>
                  {hoveredStep === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="mt-6 flex justify-center"
                    >
                      <motion.a
                        href="/how-it-works"
                        className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium transition-all border-2 border-black hover:bg-black hover:text-white w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn more
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-2 right-2 w-10 h-10 opacity-20">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    border: `1px solid ${step.color}`,
                    opacity: 0.5,
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
