"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Home, Star, Sparkles, Zap, Heart, Music, Coffee, Shield } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import { useEffect } from "react"
import Footer from "@/components/footer"

export default function AboutPage() {
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="border-2 border-black rounded-xl p-8 bg-white"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Gen Z style stick figure with floating elements */}
                <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background elements */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="15"
                    fill="#10B84A" // Changed from #FFCB91 to green
                    animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                  <motion.circle
                    cx="320"
                    cy="80"
                    r="10"
                    fill="#8B5CF6" // Changed from #FF9A8B to purple
                    animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
                  />
                  <motion.circle
                    cx="80"
                    cy="320"
                    r="12"
                    fill="#EC4899" // Changed from #A0E7E5 to pink
                    animate={{ y: [0, -12, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
                  />
                  <motion.circle
                    cx="320"
                    cy="320"
                    r="8"
                    fill="#10B84A" // Changed from #B5EAEA to green
                    animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1.5 }}
                  />
                  {/* Squiggly lines */}
                  <path d="M40 150C60 130 80 170 100 150" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M300 150C320 130 340 170 360 150" stroke="#10B84A" strokeWidth="2" strokeLinecap="round" />
                  <path d="M40 250C60 230 80 270 100 250" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
                  <path d="M300 250C320 230 340 270 360 250" stroke="#10B84A" strokeWidth="2" strokeLinecap="round" />
                  {/* Stick figure with headphones */}
                  <g transform="translate(200, 200) scale(1.2)">
                    {/* Head */}
                    <circle cx="0" cy="-40" r="30" stroke="black" strokeWidth="3" fill="#F0FDF4" />
                    {/* Headphones */}
                    <path
                      d="M-40 -40 C-40 -60, -20 -80, 0 -80 C20 -80, 40 -60, 40 -40"
                      stroke="#333333"
                      strokeWidth="3"
                      fill="none"
                    />
                    <rect x="-40" y="-55" width="10" height="30" rx="5" stroke="black" strokeWidth="3" fill="#8B5CF6" />
                    <rect x="30" y="-55" width="10" height="30" rx="5" stroke="black" strokeWidth="3" fill="#8B5CF6" />
                    {/* Face with spectacles */}
                    <circle cx="-10" cy="-45" r="3" fill="#333333" /> {/* Left eye */}
                    <circle cx="10" cy="-45" r="3" fill="#333333" /> {/* Right eye */}
                    <path d="M-10 -30 C-5 -25, 5 -25, 10 -30" stroke="#333333" strokeWidth="2" /> {/* Smile */}
                    {/* Spectacles */}
                    <circle cx="-10" cy="-45" r="7" stroke="#10B84A" strokeWidth="1.5" fill="none" />
                    <circle cx="10" cy="-45" r="7" stroke="#10B84A" strokeWidth="1.5" fill="none" />
                    <path d="M-3 -45 L3 -45" stroke="#10B84A" strokeWidth="1.5" />
                    <path d="M-17 -45 L-25 -40" stroke="#10B84A" strokeWidth="1.5" />
                    <path d="M17 -45 L25 -40" stroke="#10B84A" strokeWidth="1.5" />
                    {/* Body */}
                    <path d="M0 -10 L0 50" stroke="#333333" strokeWidth="3" /> {/* Torso */}
                    <path d="M0 0 L-30 30" stroke="#333333" strokeWidth="3" /> {/* Left arm */}
                    <path d="M0 0 L30 30" stroke="#333333" strokeWidth="3" /> {/* Right arm */}
                    <path d="M0 50 L-20 90" stroke="#333333" strokeWidth="3" /> {/* Left leg */}
                    <path d="M0 50 L20 90" stroke="#333333" strokeWidth="3" /> {/* Right leg */}
                    {/* Phone in hand */}
                    <rect x="20" y="30" width="15" height="25" rx="2" stroke="#333333" strokeWidth="2" fill="#EC4899" />
                    {/* Add a t-shirt */}
                    <path d="M-15 0 L0 -10 L15 0 L15 25 L-15 25 Z" fill="#10B84A" stroke="#333333" strokeWidth="1.5" />
                    {/* Add some hair */}
                    <path d="M-20 -50 C-15 -70, 15 -70, 20 -50" stroke="#333333" strokeWidth="2" fill="#8B5CF6" />
                  </g>
                  {/* Floating emojis */}
                  <motion.g
                    animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    transform="translate(100, 100)"
                  >
                    <text fontSize="24" fontFamily="Arial">
                      💯
                    </text>
                  </motion.g>
                  <motion.g
                    animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.7 }}
                    transform="translate(300, 120)"
                  >
                    <text fontSize="24" fontFamily="Arial">
                      🔥
                    </text>
                  </motion.g>
                  <motion.g
                    animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                    transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1.2 }}
                    transform="translate(120, 300)"
                  >
                    <text fontSize="24" fontFamily="Arial">
                      ✨
                    </text>
                  </motion.g>
                  <motion.g
                    animate={{ y: [0, -7, 0], rotate: [0, -7, 0] }}
                    transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
                    transform="translate(280, 280)"
                  >
                    <text fontSize="24" fontFamily="Arial">
                      🚀
                    </text>
                  </motion.g>
                  {/* Add some aesthetic floating elements */}
                  <motion.circle
                    cx="150"
                    cy="150"
                    r="8"
                    fill="#10B84A"
                    animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.2 }}
                  />
                  <motion.circle
                    cx="250"
                    cy="150"
                    r="6"
                    fill="#8B5CF6"
                    animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1.5 }}
                  />
                  <motion.circle
                    cx="150"
                    cy="250"
                    r="10"
                    fill="#EC4899"
                    animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.8 }}
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
                <span className="font-medium">About Us</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet the Founder</h1>

              <p className="text-lg text-gray-700 mb-8">
                Get to know the vision and mission behind Dreamclerk, and the entrepreneur who's making it happen.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white border-2 border-black p-6 rounded-xl"
              >
                <p className="text-gray-700">
                  I'm Arjun SV, an entrepreneur driven by a passion for creating opportunities for students. Through
                  Dreamclerk, I aim to bridge the gap between education, technology, and financial independence. My
                  vision is to build an AI-powered data marketplace where students can share their college experiences
                  and earn from it. With a goal of onboarding 100,000+ students and partnering with top AI firms and
                  universities, Dreamclerk is not just a platform—it's a movement to redefine student empowerment
                  through data.
                </p>
              </motion.div>

              <div className="mt-8 flex justify-start">
                <Link href="/how-it-works">
                  <DoodleButton size="sm" className="px-3 py-1 text-sm">
                    Learn More
                  </DoodleButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </DoodleBackground>

      {/* Our Mission Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Empower Students",
                description:
                  "Create opportunities for students to monetize their experiences while contributing to the future of education.",
              },
              {
                icon: Sparkles,
                title: "Transform Education",
                description:
                  "Provide universities with authentic insights to improve campus life and academic offerings.",
              },
              {
                icon: Zap,
                title: "Advance AI",
                description:
                  "Supply high-quality, structured data to help AI companies develop better educational technology.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black p-6 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Heart,
                title: "Authenticity",
                description: "We value real, unfiltered experiences that provide genuine insights into student life.",
              },
              {
                icon: Shield,
                title: "Privacy",
                description:
                  "We're committed to protecting student privacy through anonymization and ethical data practices.",
              },
              {
                icon: Coffee,
                title: "Accessibility",
                description:
                  "We believe in making our platform accessible to students from all backgrounds and institutions.",
              },
              {
                icon: Music,
                title: "Innovation",
                description:
                  "We continuously innovate to create better ways for students to share and benefit from their experiences.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mr-4">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                </div>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Dreamclerk Works</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Share Your College Life",
                description:
                  "Students anonymously write daily journals covering academics, social life, lifestyle, and personal experiences.",
              },
              {
                title: "AI-Powered Insights",
                description:
                  "Our AI categorizes student journals into key themes like academics, social interactions, lifestyle, and mental well-being.",
              },
              {
                title: "Earn Rewards",
                description:
                  "Students earn tokens that can be exchanged for gift cards, campus services, and exclusive opportunities.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black p-6 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mb-4 text-lg font-medium">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/how-it-works" className="inline-flex items-center text-black hover:underline font-medium">
              Learn More
              <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
            </Link>
          </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Join the Movement</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Be part of the revolution that's changing how students earn and contribute to the future of education and
            AI.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link href="/how-it-works">
              <DoodleButton size="sm" className="px-4 py-2 text-sm">
                Learn More
              </DoodleButton>
            </Link>
          </motion.div>
        </motion.div>
      </DoodleBackground>

      {/* Include the footer */}
      <Footer />
    </main>
  )
}
