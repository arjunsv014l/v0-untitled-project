"use client"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import { motion } from "framer-motion"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import Link from "next/link"

// Import the LaunchingSoon component
import LaunchingSoon from "@/components/launching-soon"

// Add these imports at the top
import { Star, Sparkles, Zap, BookOpen, GraduationCap, Building, Brain } from "lucide-react"

// Add this at the top of the file, after the imports
import { useEffect } from "react"

// Add this useEffect inside the Home component, right after the component declaration
export default function Home() {
  useEffect(() => {
    // Check if we're returning from another page
    const savedScrollPosition = localStorage.getItem("landingPageScrollPosition")
    if (savedScrollPosition) {
      // Use smooth scrolling for a nice transition
      window.scrollTo({
        top: Number.parseInt(savedScrollPosition),
        behavior: "smooth",
      })
      // Clear the saved position after restoring
      localStorage.removeItem("landingPageScrollPosition")
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* How It Works Section - Moved to appear after Hero and before For Freshers */}
      <HowItWorks />

      {/* For Freshers Section */}
      <section
        id="for-freshers"
        className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black relative overflow-hidden"
      >
        {/* Floating doodles */}
        <motion.div
          className="absolute top-20 right-[10%] opacity-10 hidden md:block"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <GraduationCap className="h-14 w-14 text-[#10B84A]" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-[5%] opacity-10 hidden md:block"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <BookOpen className="h-12 w-12 text-[#8B5CF6]" />
        </motion.div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <DoodleCard className="p-6 md:p-10" doodle="stars">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="80" stroke="#10B84A" strokeWidth="2" strokeDasharray="8 8" />
                    <circle cx="200" cy="200" r="150" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Graduation cap */}
                    <g transform="translate(170, 120)">
                      <rect x="0" y="10" width="60" height="10" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <path d="M30 0L60 10L30 20L0 10L30 0Z" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <path d="M50 12V30" stroke="#10B84A" strokeWidth="2" />
                      <path d="M45 30H55" stroke="#10B84A" strokeWidth="2" />
                    </g>

                    {/* Books */}
                    <g transform="translate(120, 220)">
                      <rect x="0" y="0" width="40" height="60" stroke="#8B5CF6" strokeWidth="2" fill="white" />
                      <rect x="5" y="-10" width="40" height="60" stroke="#8B5CF6" strokeWidth="2" fill="white" />
                      <rect x="10" y="-20" width="40" height="60" stroke="#8B5CF6" strokeWidth="2" fill="white" />
                      <path d="M15 0H45" stroke="#8B5CF6" strokeWidth="1" />
                      <path d="M15 10H45" stroke="#8B5CF6" strokeWidth="1" />
                      <path d="M15 20H45" stroke="#8B5CF6" strokeWidth="1" />
                    </g>

                    {/* Lightbulb */}
                    <g transform="translate(250, 220)">
                      <circle cx="20" cy="20" r="20" stroke="#EC4899" strokeWidth="2" fill="white" />
                      <path d="M20 0V10" stroke="#EC4899" strokeWidth="2" />
                      <path d="M20 30V40" stroke="#EC4899" strokeWidth="2" />
                      <path d="M0 20H10" stroke="#EC4899" strokeWidth="2" />
                      <path d="M30 20H40" stroke="#EC4899" strokeWidth="2" />
                      <path d="M5 5L12 12" stroke="#EC4899" strokeWidth="2" />
                      <path d="M28 28L35 35" stroke="#EC4899" strokeWidth="2" />
                      <path d="M5 35L12 28" stroke="#EC4899" strokeWidth="2" />
                      <path d="M28 12L35 5" stroke="#EC4899" strokeWidth="2" />
                    </g>

                    {/* Stars */}
                    <path
                      d="M100 100L105 90L110 100L120 105L110 110L105 120L100 110L90 105L100 100Z"
                      stroke="#10B84A"
                      strokeWidth="1.5"
                      fill="white"
                    />
                    <path
                      d="M300 100L305 90L310 100L320 105L310 110L305 120L300 110L290 105L300 100Z"
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                      fill="white"
                    />
                    <path
                      d="M100 300L105 290L110 300L120 305L110 310L105 320L100 310L90 305L100 300Z"
                      stroke="#EC4899"
                      strokeWidth="1.5"
                      fill="white"
                    />
                    <path
                      d="M300 300L305 290L310 300L320 305L310 310L305 320L300 310L290 305L300 300Z"
                      stroke="#10B84A"
                      strokeWidth="1.5"
                      fill="white"
                    />
                  </svg>
                </div>
              </DoodleCard>
            </motion.div>

            {/* Text content second on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mr-4 text-lg">
                  1
                </span>
                For Freshers
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Just starting your college journey? Dreamclerk helps you navigate the exciting but sometimes
                overwhelming world of higher education.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Gain valuable insights and real-world opportunities",
                  "Earn rewards by contributing your daily college experiences",
                  "Get AI-driven career and education recommendations",
                  "Become part of a student-driven digital community",
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
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
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/for-freshers">
                <DoodleButton className="mt-4 w-full text-center">Learn More</DoodleButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section
        id="for-students"
        className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black relative overflow-hidden"
      >
        {/* Floating doodles */}
        <motion.div
          className="absolute top-20 left-[10%] opacity-10 hidden md:block"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Star className="h-14 w-14 text-[#10B84A]" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-[5%] opacity-10 hidden md:block"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Sparkles className="h-12 w-12 text-[#8B5CF6]" />
        </motion.div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <DoodleCard className="p-6 md:p-10" doodle="circles">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="80" stroke="#10B84A" strokeWidth="2" strokeDasharray="8 8" />
                    <circle cx="200" cy="200" r="150" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Wallet */}
                    <g transform="translate(150, 120)">
                      <rect x="0" y="0" width="100" height="60" rx="5" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <rect
                        x="10"
                        y="15"
                        width="80"
                        height="30"
                        rx="3"
                        stroke="#10B84A"
                        strokeWidth="1.5"
                        fill="white"
                      />
                      <circle cx="50" cy="30" r="10" stroke="#10B84A" strokeWidth="1.5" fill="white" />
                      <path d="M45 30H55" stroke="#10B84A" strokeWidth="1.5" />
                      <path d="M50 25V35" stroke="#10B84A" strokeWidth="1.5" />
                    </g>

                    {/* Dollar signs */}
                    <g transform="translate(120, 220)">
                      <circle cx="20" cy="20" r="20" stroke="#8B5CF6" strokeWidth="2" fill="white" />
                      <path d="M20 10V30" stroke="#8B5CF6" strokeWidth="2" />
                      <path d="M15 15H25" stroke="#8B5CF6" strokeWidth="2" />
                      <path d="M15 25H25" stroke="#8B5CF6" strokeWidth="2" />
                    </g>

                    <g transform="translate(260, 220)">
                      <circle cx="20" cy="20" r="20" stroke="#EC4899" strokeWidth="2" fill="white" />
                      <path d="M20 10V30" stroke="#EC4899" strokeWidth="2" />
                      <path d="M15 15H25" stroke="#EC4899" strokeWidth="2" />
                      <path d="M15 25H25" stroke="#EC4899" strokeWidth="2" />
                    </g>

                    {/* Coins */}
                    <circle cx="100" cy="100" r="15" stroke="#10B84A" strokeWidth="1.5" fill="white" />
                    <circle cx="300" cy="100" r="15" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                    <circle cx="100" cy="300" r="15" stroke="#EC4899" strokeWidth="1.5" fill="white" />
                    <circle cx="300" cy="300" r="15" stroke="#10B84A" strokeWidth="1.5" fill="white" />

                    {/* Dollar symbols in coins */}
                    <path d="M100 95V105" stroke="#10B84A" strokeWidth="1" />
                    <path d="M97 98H103" stroke="#10B84A" strokeWidth="1" />
                    <path d="M97 102H103" stroke="#10B84A" strokeWidth="1" />

                    <path d="M300 95V105" stroke="#8B5CF6" strokeWidth="1" />
                    <path d="M297 98H303" stroke="#8B5CF6" strokeWidth="1" />
                    <path d="M297 102H303" stroke="#8B5CF6" strokeWidth="1" />

                    <path d="M100 295V305" stroke="#EC4899" strokeWidth="1" />
                    <path d="M97 298H103" stroke="#EC4899" strokeWidth="1" />
                    <path d="M97 302H103" stroke="#EC4899" strokeWidth="1" />

                    <path d="M300 295V305" stroke="#10B84A" strokeWidth="1" />
                    <path d="M297 298H303" stroke="#10B84A" strokeWidth="1" />
                    <path d="M297 302H303" stroke="#10B84A" strokeWidth="1" />
                  </svg>
                </div>
              </DoodleCard>
            </motion.div>

            {/* Text content second on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mr-4 text-lg">
                  2
                </span>
                For Students
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Current students can earn from their daily experiences while helping future generations make informed
                decisions about their education.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Share daily updates about college life and earn rewards",
                  "Help future students make informed choices",
                  "Build a digital profile showcasing academic and social experiences",
                  "Exchange Student-Created Data Tokens (SCDTs) for exclusive benefits",
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
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
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/for-students">
                <DoodleButton className="mt-4 w-full text-center">Learn More</DoodleButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Universities Section */}
      <section
        id="for-universities"
        className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black relative overflow-hidden"
      >
        {/* Floating doodles */}
        <motion.div
          className="absolute top-20 right-[10%] opacity-10 hidden md:block"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Building className="h-14 w-14 text-[#10B84A]" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-[5%] opacity-10 hidden md:block"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Zap className="h-12 w-12 text-[#EC4899]" />
        </motion.div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <DoodleCard className="p-6 md:p-10" doodle="lines">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="80" stroke="#10B84A" strokeWidth="2" strokeDasharray="8 8" />
                    <circle cx="200" cy="200" r="150" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" />

                    {/* University building */}
                    <g transform="translate(125, 100)">
                      <rect x="0" y="40" width="150" height="100" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <path d="M75 0L150 40H0L75 0Z" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <rect x="30" y="70" width="20" height="30" stroke="#10B84A" strokeWidth="1.5" fill="white" />
                      <rect x="65" y="70" width="20" height="30" stroke="#10B84A" strokeWidth="1.5" fill="white" />
                      <rect x="100" y="70" width="20" height="30" stroke="#10B84A" strokeWidth="1.5" fill="white" />
                      <rect x="65" y="110" width="20" height="30" stroke="#10B84A" strokeWidth="1.5" fill="white" />
                      <path d="M0 50H150" stroke="#10B84A" strokeWidth="1.5" />
                      <path d="M0 130H150" stroke="#10B84A" strokeWidth="1.5" />
                    </g>

                    {/* Charts */}
                    <g transform="translate(100, 250)">
                      <rect x="0" y="0" width="60" height="60" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <path d="M10 50L30 20L50 40" stroke="#8B5CF6" strokeWidth="1.5" />
                      <circle cx="10" cy="50" r="3" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <circle cx="30" cy="20" r="3" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <circle cx="50" cy="40" r="3" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                    </g>

                    <g transform="translate(240, 250)">
                      <rect x="0" y="0" width="60" height="60" stroke="#EC4899" strokeWidth="1.5" fill="white" />
                      <path d="M10 10V50" stroke="#EC4899" strokeWidth="1.5" />
                      <path d="M10 50H50" stroke="#EC4899" strokeWidth="1.5" />
                      <rect x="15" y="30" width="10" height="20" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <rect x="30" y="20" width="10" height="30" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <rect x="45" y="10" width="10" height="40" stroke="#EC4899" strokeWidth="1" fill="white" />
                    </g>

                    {/* Decorative elements */}
                    <path d="M80 80L90 70L100 80L90 90L80 80Z" stroke="#10B84A" strokeWidth="1" fill="white" />
                    <path d="M320 80L330 70L340 80L330 90L320 80Z" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                    <path d="M80 320L90 310L100 320L90 330L80 320Z" stroke="#EC4899" strokeWidth="1" fill="white" />
                    <path d="M320 320L330 310L340 320L330 330L320 320Z" stroke="#10B84A" strokeWidth="1" fill="white" />
                  </svg>
                </div>
              </DoodleCard>
            </motion.div>

            {/* Text content second on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mr-4 text-lg">
                  3
                </span>
                For Universities
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Universities gain unprecedented access to real-time student experiences, enabling data-driven
                improvements to campus life and academic offerings.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Access real-time student experiences to improve campus life",
                  "Identify key areas for academic and infrastructure enhancements",
                  "Enhance student retention with data-driven strategies",
                  "Direct engagement with students through structured insights",
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
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
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/for-universities">
                <DoodleButton className="mt-4 w-full text-center">Learn More</DoodleButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For AI Companies Section */}
      <section
        id="for-companies"
        className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black relative overflow-hidden"
      >
        {/* Floating doodles */}
        <motion.div
          className="absolute top-20 left-[10%] opacity-10 hidden md:block"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Brain className="h-14 w-14 text-[#10B84A]" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-[5%] opacity-10 hidden md:block"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Sparkles className="h-12 w-12 text-[#8B5CF6]" />
        </motion.div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <DoodleCard className="p-6 md:p-10" doodle="squiggles">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="80" stroke="#10B84A" strokeWidth="2" strokeDasharray="8 8" />
                    <circle cx="200" cy="200" r="150" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" />

                    {/* CPU/Brain */}
                    <g transform="translate(150, 120)">
                      <rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        rx="10"
                        stroke="#10B84A"
                        strokeWidth="2"
                        fill="white"
                      />
                      <circle cx="50" cy="50" r="30" stroke="#10B84A" strokeWidth="1.5" fill="white" />
                      <path d="M50 20V80" stroke="#10B84A" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M20 50H80" stroke="#10B84A" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M30 30L70 70" stroke="#10B84A" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M30 70L70 30" stroke="#10B84A" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="50" cy="50" r="10" stroke="#10B84A" strokeWidth="1.5" fill="white" />

                      {/* Connection points */}
                      <rect x="-5" y="25" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <rect x="-5" y="65" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <rect x="95" y="25" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <rect x="95" y="65" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <rect x="25" y="-5" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <rect x="65" y="-5" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <rect x="25" y="95" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                      <rect x="65" y="95" width="10" height="10" stroke="#8B5CF6" strokeWidth="1.5" fill="white" />
                    </g>

                    {/* Data nodes */}
                    <g transform="translate(100, 280)">
                      <circle cx="10" cy="10" r="10" stroke="#EC4899" strokeWidth="1.5" fill="white" />
                      <circle cx="50" cy="10" r="10" stroke="#EC4899" strokeWidth="1.5" fill="white" />
                      <circle cx="90" cy="10" r="10" stroke="#EC4899" strokeWidth="1.5" fill="white" />
                      <path d="M20 10H40" stroke="#EC4899" strokeWidth="1.5" />
                      <path d="M60 10H80" stroke="#EC4899" strokeWidth="1.5" />
                    </g>

                    <g transform="translate(240, 280)">
                      <circle cx="10" cy="10" r="10" stroke="#EC4899" strokeWidth="1.5" fill="white" />
                      <circle cx="50" cy="10" r="10" stroke="#EC4899" strokeWidth="1.5" fill="white" />
                      <path d="M20 10H40" stroke="#EC4899" strokeWidth="1.5" />
                    </g>

                    {/* Binary code */}
                    <g transform="translate(80, 80)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="10" fill="#10B84A">
                        10110
                      </text>
                    </g>

                    <g transform="translate(300, 80)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="10" fill="#8B5CF6">
                        01001
                      </text>
                    </g>

                    <g transform="translate(80, 320)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="10" fill="#EC4899">
                        11001
                      </text>
                    </g>

                    <g transform="translate(300, 320)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="10" fill="#10B84A">
                        10010
                      </text>
                    </g>
                  </svg>
                </div>
              </DoodleCard>
            </motion.div>

            {/* Text content second on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mr-4 text-lg">
                  4
                </span>
                For Companies
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Brands, agencies, and social companies gain access to high-quality, real-time student data that powers
                innovative solutions and authentic engagement.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Access real-time categorized student data for targeted campaigns",
                  "Understand emerging trends and preferences among Gen Z audiences",
                  "Develop products and services informed by authentic student experiences",
                  "Create meaningful connections with the next generation of consumers",
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
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
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/for-companies">
                <DoodleButton className="mt-4 w-full text-center">Learn More</DoodleButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add LaunchingSoon section here where SocialCommunity was previously */}
      <LaunchingSoon />

      {/* Remove this duplicate LaunchingSoon section */}
    </main>
  )
}
