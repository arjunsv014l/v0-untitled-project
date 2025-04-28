"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, MessageSquare, Brain, BarChart4, DollarSign, Users, Lightbulb, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useEffect } from "react"

export default function HowItWorksPage() {
  // Add this useEffect to scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <DoodleBackground className="pt-24 pb-16" density="low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
              <span className="font-medium">The Process</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Dreamclerk Works</h1>

            <p className="text-lg text-gray-700 mb-8">
              Transforming real student experiences into structured insights—powered by AI, protected by anonymity, and
              driving real-world impact.
            </p>
          </div>
        </div>
      </DoodleBackground>

      {/* Core Process Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MessageSquare,
                title: "Share Your College Life",
                description:
                  "Students anonymously write daily journals covering academics, social life, lifestyle, and personal experiences.",
                details: [
                  "Share authentic, unfiltered experiences",
                  "Ensure privacy through anonymity",
                  "Contribute to a growing student-driven knowledge hub",
                ],
              },
              {
                icon: Brain,
                title: "AI-Powered Insights & Analysis",
                description:
                  "Our AI categorizes student journals into key themes like academics, social interactions, lifestyle, university reviews, and mental well-being.",
                details: [
                  "Automatic categorization of student experiences",
                  "Trend & sentiment analysis for deeper insights",
                  "Verified, bias-free data for AI model training",
                ],
              },
              {
                icon: BarChart4,
                title: "Value for Everyone",
                description: "The structured insights create value across the education ecosystem.",
                details: [
                  "Students make informed choices with real student experiences",
                  "Universities enhance campus life with structured insights",
                  "AI companies train models using high-quality, real-world data",
                ],
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex flex-col h-full">
                    <div className="bg-white border-2 border-black p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center mr-3 text-sm font-medium">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    <ul className="space-y-2 mt-auto">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 mt-1 flex-shrink-0"
                          >
                            <path
                              d="M5 12L9 16L19 6"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits for Everyone</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Dreamclerk creates value for all participants in the education ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "For Students",
                benefits: [
                  "Earn rewards for sharing daily experiences",
                  "Build a portfolio of contributions",
                  "Access insights from other students",
                  "Contribute to improving education",
                ],
              },
              {
                icon: Users,
                title: "For Universities",
                benefits: [
                  "Access real-time student feedback",
                  "Make data-driven campus improvements",
                  "Enhance student satisfaction and retention",
                  "Identify trends and opportunities",
                ],
              },
              {
                icon: Lightbulb,
                title: "For AI Companies",
                benefits: [
                  "Access high-quality, structured data",
                  "Train AI models with authentic student experiences",
                  "Develop education-focused AI solutions",
                  "Contribute to ethical data usage in education",
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex flex-col h-full">
                    <div className="bg-white border-2 border-black p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 mt-1 flex-shrink-0"
                          >
                            <path
                              d="M5 12L9 16L19 6"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get answers to common questions about how Dreamclerk works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How is student privacy protected?",
                answer:
                  "All student data is anonymized and aggregated. We follow strict privacy protocols and comply with all relevant regulations.",
              },
              {
                question: "How much can students earn?",
                answer:
                  "Earnings vary based on consistency, quality, and depth of contributions. Active students typically earn between $50-$200 per month in rewards.",
              },
              {
                question: "What kind of experiences should students share?",
                answer:
                  "Students should share authentic daily experiences about academics, campus life, social activities, and personal growth.",
              },
              {
                question: "How is the data used?",
                answer:
                  "Data is categorized, anonymized, and used to provide insights to universities and AI companies to improve education experiences.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <DoodleBackground className="py-16 px-4 md:px-6 lg:px-8" density="low">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Learn More?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Explore how Dreamclerk is transforming the education experience through real student insights.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link href="/">
              <DoodleButton size="lg" className="px-8">
                Back to Home
              </DoodleButton>
            </Link>
          </motion.div>
        </motion.div>
      </DoodleBackground>
    </main>
  )
}
