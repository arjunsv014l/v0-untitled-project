"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MessageSquare, Brain, BarChart4 } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Dreamclerk Works</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Transforming student experiences into structured insights through a simple three-step process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: MessageSquare,
              title: "Share Your College Life",
              description:
                "Students anonymously write daily journals covering academics, social life, lifestyle, and personal experiences.",
            },
            {
              icon: Brain,
              title: "AI-Powered Analysis",
              description:
                "Our AI categorizes student journals into key themes like academics, social interactions, lifestyle, and mental well-being.",
            },
            {
              icon: BarChart4,
              title: "Value for Everyone",
              description:
                "The structured insights create value for students, universities, and AI companies across the education ecosystem.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg border-2 border-black"
            >
              <div className="bg-white border-2 border-black p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/how-it-works">
            <DoodleButton>Learn More About Our Process</DoodleButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
