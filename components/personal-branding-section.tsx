"use client"

import { motion } from "framer-motion"
import { Award, Briefcase, Star } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"
import Link from "next/link"

export default function PersonalBrandingSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 20C50 10 80 30 80 50C80 70 50 90 20 80C-10 70 -10 30 20 20Z" stroke="black" strokeWidth="0.5" />
          <path
            d="M80 20C110 10 140 30 140 50C140 70 110 90 80 80C50 70 50 30 80 20Z"
            stroke="black"
            strokeWidth="0.5"
          />
          <path
            d="M20 80C50 70 80 90 80 110C80 130 50 150 20 140C-10 130 -10 90 20 80Z"
            stroke="black"
            strokeWidth="0.5"
          />
          <path
            d="M80 80C110 70 140 90 140 110C140 130 110 150 80 140C50 130 50 90 80 80Z"
            stroke="black"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-[10%] opacity-10 hidden md:block"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Star className="h-16 w-16 text-[#EC4899]" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-[5%] opacity-10 hidden md:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Award className="h-14 w-14 text-[#8B5CF6]" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Briefcase className="h-5 w-5 mr-2 text-[#EC4899]" />
            <span className="font-medium">Personal Branding</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">Build Your Personal Brand</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Establish yourself as a recognized voice on campus. Share your unique perspective and build a following that
            extends beyond graduation.
          </p>
        </motion.div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Discover Your Unique Value",
              description:
                "Identify your strengths, passions, and what makes you stand out from the crowd. Your personal brand should reflect your authentic self.",
              icon: "🔍",
              color: "bg-blue-100",
            },
            {
              title: "Create Compelling Content",
              description:
                "Share your knowledge, experiences, and insights through various formats. Consistent content creation helps establish your expertise.",
              icon: "✏️",
              color: "bg-purple-100",
            },
            {
              title: "Build Your Network",
              description:
                "Connect with peers, professors, industry professionals, and alumni. Your network is one of your most valuable assets.",
              icon: "🤝",
              color: "bg-pink-100",
            },
          ].map((strategy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div
                className={`text-3xl mx-auto mb-4 w-16 h-16 ${strategy.color} rounded-full flex items-center justify-center`}
              >
                {strategy.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{strategy.title}</h3>
              <p className="text-gray-700">{strategy.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Key Elements of Your Personal Brand</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-lg">
                  1
                </span>
                Digital Presence
              </h4>
              <ul className="space-y-3">
                {[
                  "Professional social media profiles that showcase your achievements and interests",
                  "A personal website or portfolio that highlights your projects and skills",
                  "Consistent username and profile picture across platforms for easy recognition",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 mt-1 text-[#EC4899]"
                    >
                      <path
                        d="M5 12L9 16L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-lg">
                  2
                </span>
                Networking Strategy
              </h4>
              <ul className="space-y-3">
                {[
                  "Attend industry events, career fairs, and campus activities to expand your connections",
                  "Engage meaningfully with your network through comments, messages, and collaboration",
                  "Join relevant student organizations and professional groups in your field",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 mt-1 text-[#EC4899]"
                    >
                      <path
                        d="M5 12L9 16L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3 text-lg">
                  3
                </span>
                Content Creation
              </h4>
              <ul className="space-y-3">
                {[
                  "Share your academic projects, research, and creative work",
                  "Write articles or create videos about topics in your field of interest",
                  "Document your learning journey and share insights with peers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 mt-1 text-[#EC4899]"
                    >
                      <path
                        d="M5 12L9 16L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 text-lg">
                  4
                </span>
                Professional Development
              </h4>
              <ul className="space-y-3">
                {[
                  "Continuously develop skills relevant to your career goals",
                  "Seek mentorship from professors and industry professionals",
                  "Participate in workshops, courses, and certifications to enhance your expertise",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 mt-1 text-[#EC4899]"
                    >
                      <path
                        d="M5 12L9 16L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/influence">
            <DoodleButton className="px-8 py-3 text-lg inline-block bg-[#EC4899] hover:bg-[#EC4899]/90 text-white border-black">
              Learn More About Personal Branding
            </DoodleButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
