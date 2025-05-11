"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, DollarSign, BarChart, Shield, Zap, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useEffect } from "react"

export default function ForStudentsPage() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <DoodleBackground className="pt-24 pb-16" density="medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
              <Home className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
              onClick={() => {
                // Save the scroll position of the section on the landing page
                const sectionPosition = document.getElementById("for-students")?.offsetTop || 0
                localStorage.setItem("landingPageScrollPosition", sectionPosition.toString())
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* Mobile-optimized hero section with image first on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image first on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <DoodleCard className="p-8" doodle="circles">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Wallet */}
                    <g transform="translate(150, 100)">
                      <rect x="0" y="0" width="120" height="80" rx="10" stroke="black" strokeWidth="2" fill="white" />
                      <rect
                        x="10"
                        y="20"
                        width="100"
                        height="40"
                        rx="5"
                        stroke="black"
                        strokeWidth="1.5"
                        fill="white"
                      />
                      <circle cx="60" cy="40" r="15" stroke="black" strokeWidth="1.5" fill="white" />
                      <path d="M55 40H65" stroke="black" strokeWidth="1.5" />
                      <path d="M60 35V45" stroke="black" strokeWidth="1.5" />
                    </g>

                    {/* Dollar signs */}
                    <g transform="translate(80, 220)">
                      <circle cx="30" cy="30" r="30" stroke="black" strokeWidth="2" fill="white" />
                      <path d="M30 15V45" stroke="black" strokeWidth="2" />
                      <path d="M20 20H40" stroke="black" strokeWidth="2" />
                      <path d="M20 40H40" stroke="black" strokeWidth="2" />
                    </g>

                    <g transform="translate(260, 220)">
                      <circle cx="30" cy="30" r="30" stroke="black" strokeWidth="2" fill="white" />
                      <path d="M30 15V45" stroke="black" strokeWidth="2" />
                      <path d="M20 20H40" stroke="black" strokeWidth="2" />
                      <path d="M20 40H40" stroke="black" strokeWidth="2" />
                    </g>

                    {/* Coins */}
                    <circle cx="80" cy="80" r="20" stroke="black" strokeWidth="1.5" fill="white" />
                    <circle cx="320" cy="80" r="20" stroke="black" strokeWidth="1.5" fill="white" />
                    <circle cx="80" cy="320" r="20" stroke="black" strokeWidth="1.5" fill="white" />
                    <circle cx="320" cy="320" r="20" stroke="black" strokeWidth="1.5" fill="white" />

                    {/* Dollar symbols in coins */}
                    <path d="M80 70V90" stroke="black" strokeWidth="1.5" />
                    <path d="M75 75H85" stroke="black" strokeWidth="1.5" />
                    <path d="M75 85H85" stroke="black" strokeWidth="1.5" />

                    <path d="M320 70V90" stroke="black" strokeWidth="1.5" />
                    <path d="M315 75H325" stroke="black" strokeWidth="1.5" />
                    <path d="M315 85H325" stroke="black" strokeWidth="1.5" />

                    <path d="M80 310V330" stroke="black" strokeWidth="1.5" />
                    <path d="M75 315H85" stroke="black" strokeWidth="1.5" />
                    <path d="M75 325H85" stroke="black" strokeWidth="1.5" />

                    <path d="M320 310V330" stroke="black" strokeWidth="1.5" />
                    <path d="M315 315H325" stroke="black" strokeWidth="1.5" />
                    <path d="M315 325H325" stroke="black" strokeWidth="1.5" />
                  </svg>
                </div>
              </DoodleCard>
            </motion.div>

            {/* Text content second on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
                <span className="font-medium">For Students</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Monetize Your College Experience</h1>

              <p className="text-lg text-gray-700 mb-8">
                Turn your daily college life into valuable insights and earn rewards while helping future students make
                informed decisions.
              </p>

              <Link href="/how-it-works">
                <DoodleButton size="lg">Start Earning Today</DoodleButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </DoodleBackground>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Students Earn with Dreamclerk</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Dreamclerk makes it easy to monetize your daily college experiences while helping future students make
              better decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {[
              {
                title: "Share Your Experiences",
                description:
                  "Spend just a few minutes each day sharing your authentic college experiences through our simple journaling interface.",
                steps: [
                  "Log your daily academic experiences",
                  "Share insights about campus life and events",
                  "Record your thoughts on professors and courses",
                  "Document your personal growth and challenges",
                ],
              },
              {
                title: "Earn Rewards",
                description:
                  "Convert your insights into Student-Created Data Tokens (SCDTs) that can be exchanged for real rewards.",
                steps: [
                  "Earn tokens based on consistency and quality",
                  "Receive bonuses for particularly valuable insights",
                  "Exchange tokens for gift cards, campus services, and more",
                  "Build a portfolio of contributions that grows in value",
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-8" doodle={index === 0 ? "stars" : "lines"}>
                  <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                  <p className="text-gray-700 mb-6">{section.description}</p>

                  <ul className="space-y-3">
                    {section.steps.map((step, i) => (
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
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </DoodleCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Monetize Your Time",
                description: "Turn your everyday college experiences into a source of income and rewards.",
              },
              {
                icon: BarChart,
                title: "Build Your Profile",
                description:
                  "Create a digital portfolio of your contributions that showcases your insights and impact.",
              },
              {
                icon: Shield,
                title: "Privacy Protected",
                description:
                  "All shared experiences are anonymized to protect your privacy while still providing value.",
              },
              {
                icon: Zap,
                title: "Quick & Easy",
                description:
                  "Our intuitive interface makes sharing your experiences quick and simple - just a few minutes a day.",
              },
              {
                icon: DollarSign,
                title: "Flexible Rewards",
                description:
                  "Choose from a variety of reward options including gift cards, campus services, and exclusive opportunities.",
              },
              {
                icon: BarChart,
                title: "Impact Tracking",
                description:
                  "See how your contributions are helping future students and improving the college experience.",
              },
            ].map((benefit, index) => (
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
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-700 flex-grow">{benefit.description}</p>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the page content remains the same */}
      {/* Testimonials */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hear From Other Students</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how other students are benefiting from sharing their experiences on Dreamclerk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I've earned over $500 in rewards this semester just by sharing my daily experiences. It takes me less than 10 minutes a day!",
                name: "Taylor R.",
                university: "UC Berkeley",
              },
              {
                quote:
                  "As a student who works part-time, the extra income from Dreamclerk has been a game-changer for my budget. Plus, I love knowing I'm helping future students.",
                name: "Jordan L.",
                university: "University of Texas",
              },
              {
                quote:
                  "The rewards are great, but what I value most is seeing how my experiences are helping incoming students make better decisions about their education.",
                name: "Sam W.",
                university: "Boston College",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      className="mb-4"
                    >
                      <path
                        d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7M10 11V19H6C5.46957 19 4.96086 18.7893 4.58579 18.4142C4.21071 18.0391 4 17.5304 4 17V11M10 11H14M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7M20 11V19H16C15.4696 19 14.9609 18.7893 14.5858 18.4142C14.2107 18.0391 14 17.5304 14 17V11M20 11H14"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-700 italic mb-6 flex-grow">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.university}</p>
                    </div>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get answers to common questions about how Dreamclerk works for students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How much can I earn with Dreamclerk?",
                answer:
                  "Earnings vary based on consistency, quality, and depth of your contributions. Active students typically earn between $50-$200 per month in rewards.",
              },
              {
                question: "How much time does it take each day?",
                answer:
                  "Most students spend just 5-10 minutes per day sharing their experiences. Our interface is designed to be quick and intuitive.",
              },
              {
                question: "What kind of experiences should I share?",
                answer:
                  "Share your authentic daily experiences - from classes and studying to social events and campus life. Your insights help future students and contribute to improving the college experience.",
              },
              {
                question: "Is my information kept private?",
                answer:
                  "Yes, all shared experiences are anonymized. Your privacy is our priority, and you control what you share and how it's used.",
              },
              {
                question: "How do I redeem my rewards?",
                answer:
                  "You can exchange your earned tokens for gift cards, campus services, exclusive opportunities, and more through our rewards marketplace.",
              },
              {
                question: "Can I see how my insights are helping others?",
                answer:
                  "Yes, Dreamclerk provides impact metrics that show how your contributions are helping future students and improving the college experience.",
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
      <DoodleBackground className="py-20 px-4 md:px-6 lg:px-8" density="medium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Start Earning?</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are monetizing their college experiences and making a difference for future
            generations.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link href="/how-it-works">
              <DoodleButton size="lg" className="px-8 py-6 text-lg">
                Start Earning Today
              </DoodleButton>
            </Link>
          </motion.div>
        </motion.div>
      </DoodleBackground>
    </main>
  )
}
