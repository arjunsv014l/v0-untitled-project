"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Home, HelpCircle } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useEffect, useState } from "react"

export default function FAQPage() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // FAQ data
  const faqCategories = [
    {
      title: "General Questions",
      items: [
        {
          question: "What is Dreamclerk?",
          answer:
            "Dreamclerk is a platform that helps students monetize their daily college experiences while providing valuable insights for universities and AI companies. We transform student experiences into structured data that benefits all stakeholders in the education ecosystem.",
        },
        {
          question: "How does Dreamclerk work?",
          answer:
            "Students share their daily college experiences through our platform. These experiences are anonymized, structured, and analyzed to provide valuable insights. Students earn rewards for their contributions, universities gain data to improve campus life, and companies access authentic Gen Z insights.",
        },
        {
          question: "Is Dreamclerk free to use?",
          answer:
            "Yes, Dreamclerk is free for students to join and use. We generate revenue through our partnerships with universities and companies who access the anonymized, aggregated insights.",
        },
        {
          question: "When will Dreamclerk launch?",
          answer:
            "Dreamclerk is currently in development and will launch soon. Sign up for our newsletter to be notified when we launch and to get early access.",
        },
      ],
    },
    {
      title: "For Students",
      items: [
        {
          question: "How do I earn rewards on Dreamclerk?",
          answer:
            "Students earn rewards by consistently sharing their daily college experiences through the platform. The more quality insights you provide, the more rewards you earn. Rewards can be redeemed for various benefits like gift cards, campus services, and exclusive opportunities.",
        },
        {
          question: "Is my personal information safe?",
          answer:
            "Yes, we take privacy very seriously. All experiences shared on the platform are anonymized before being processed. We never share personally identifiable information with universities or companies without explicit consent.",
        },
        {
          question: "What kind of experiences should I share?",
          answer:
            "We encourage you to share authentic experiences about all aspects of college life - from academics and studying to social events and campus facilities. The more comprehensive your insights, the more valuable they are to the community.",
        },
        {
          question: "Can I delete my account and data?",
          answer:
            "Yes, you can delete your account and personal data at any time through your account settings. However, anonymized insights that have already been processed and shared cannot be retroactively removed from aggregated datasets.",
        },
      ],
    },
    {
      title: "For Universities & Companies",
      items: [
        {
          question: "How can universities benefit from Dreamclerk?",
          answer:
            "Universities gain access to real-time, structured student insights that help them understand student experiences, identify areas for improvement, enhance student satisfaction, and make data-driven decisions about campus services and academic offerings.",
        },
        {
          question: "What kind of data do companies receive?",
          answer:
            "Companies receive anonymized, aggregated insights about student preferences, behaviors, and trends. This helps them better understand Gen Z audiences, develop more relevant products and services, and create more authentic marketing campaigns.",
        },
        {
          question: "How is the data collected and processed?",
          answer:
            "Data is collected through student submissions on our platform. It is then anonymized, structured, categorized, and analyzed using advanced AI techniques to extract meaningful insights while protecting individual privacy.",
        },
        {
          question: "How can my organization partner with Dreamclerk?",
          answer:
            "If you're interested in partnering with Dreamclerk, please contact us at partnerships@dreamclerk.com. We offer various partnership models for universities, companies, and other organizations interested in accessing student insights.",
        },
      ],
    },
  ]

  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  // Toggle FAQ item
  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

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
              <HelpCircle className="h-4 w-4 mr-2" />
              <span className="font-medium">Help</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>

            <p className="text-lg text-gray-700 mb-8">Find answers to the most common questions about Dreamclerk.</p>
          </div>
        </div>
      </DoodleBackground>

      {/* FAQ Content */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const isOpen = openItems[`${categoryIndex}-${itemIndex}`] || false
                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <DoodleCard className="overflow-hidden">
                        <button
                          onClick={() => toggleItem(categoryIndex, itemIndex)}
                          className="flex justify-between items-center w-full p-4 text-left"
                          aria-expanded={isOpen}
                        >
                          <h3 className="text-lg font-semibold">{item.question}</h3>
                          <span className="ml-2 flex-shrink-0">
                            <svg
                              className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 border-t border-gray-200">
                            <p className="text-gray-700">{item.answer}</p>
                          </div>
                        )}
                      </DoodleCard>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
