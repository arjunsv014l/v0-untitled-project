"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Home, LifeBuoy, Mail, FileText, HelpCircle } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useEffect } from "react"

export default function SupportPage() {
  // Scroll to top when the page loads
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
              <LifeBuoy className="h-4 w-4 mr-2" />
              <span className="font-medium">Help & Support</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help?</h1>

            <p className="text-lg text-gray-700 mb-8">
              We're here to assist you with any questions or issues you might have about Dreamclerk.
            </p>
          </div>
        </div>
      </DoodleBackground>

      {/* Support Options */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: "Contact Us",
                description: "Have a specific question? Reach out to our support team directly.",
                action: "Email Support",
                link: "mailto:info@dreamclerk.com",
              },
              {
                icon: FileText,
                title: "Documentation",
                description: "Explore our guides and documentation to learn more about Dreamclerk.",
                action: "View Docs",
                link: "/how-it-works",
              },
              {
                icon: HelpCircle,
                title: "FAQs",
                description: "Find answers to commonly asked questions about our platform.",
                action: "View FAQs",
                link: "/faq",
              },
            ].map((option, index) => (
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
                      <option.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-gray-700 mb-6">{option.description}</p>
                    <div className="mt-auto">
                      <Link href={option.link}>
                        <DoodleButton size="sm" className="w-full">
                          {option.action}
                        </DoodleButton>
                      </Link>
                    </div>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-700">
              Have a specific question or feedback? Send us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <DoodleCard className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  placeholder="Tell us more about your question or issue..."
                ></textarea>
              </div>
              <div>
                <DoodleButton type="submit" className="w-full md:w-auto">
                  Send Message
                </DoodleButton>
              </div>
            </form>
          </DoodleCard>
        </div>
      </section>
    </main>
  )
}
