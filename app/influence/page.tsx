"use client"

import { motion } from "framer-motion"
import { Award, TrendingUp, Users, Star, Briefcase } from "lucide-react"
import DoodleButton from "@/components/ui-elements/doodle-button"
import Link from "next/link"
import DoodleCard from "@/components/ui-elements/doodle-card"

export default function InfluencePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 border-b-2 border-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-5"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 20C50 10 80 30 80 50C80 70 50 90 20 80C-10 70 -10 30 20 20Z"
              stroke="black"
              strokeWidth="0.5"
            />
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

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Star className="h-5 w-5 mr-2 text-[#EC4899]" />
              <span className="font-medium">Career Development</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">Measuring Your Career</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Build your personal brand and establish yourself as a recognized voice on campus. Connect directly with
              industry opportunities and showcase your skills to potential employers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Direct Industry Connections</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our platform brings industry opportunities directly to your hands. No more endless job searching -
                connect with companies looking for students just like you.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Access exclusive internship and job opportunities",
                  "Connect with recruiters from top companies",
                  "Showcase your skills and experiences to potential employers",
                  "Build relationships with industry professionals",
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <DoodleCard className="p-6 md:p-10" doodle="stars">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="80" stroke="#10B84A" strokeWidth="2" strokeDasharray="8 8" />
                    <circle cx="200" cy="200" r="150" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Briefcase */}
                    <g transform="translate(150, 120)">
                      <rect x="0" y="20" width="100" height="70" rx="5" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <rect x="30" y="0" width="40" height="20" rx="5" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <line x1="30" y1="20" x2="70" y2="20" stroke="#10B84A" strokeWidth="2" />
                      <line x1="0" y1="40" x2="100" y2="40" stroke="#10B84A" strokeWidth="2" />
                    </g>

                    {/* Building */}
                    <g transform="translate(120, 220)">
                      <rect x="0" y="0" width="60" height="80" stroke="#8B5CF6" strokeWidth="2" fill="white" />
                      <rect x="10" y="10" width="10" height="10" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <rect x="30" y="10" width="10" height="10" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <rect x="10" y="30" width="10" height="10" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <rect x="30" y="30" width="10" height="10" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <rect x="10" y="50" width="10" height="10" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <rect x="30" y="50" width="10" height="10" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                      <rect x="20" y="70" width="20" height="10" stroke="#8B5CF6" strokeWidth="1" fill="white" />
                    </g>

                    {/* Network */}
                    <g transform="translate(220, 220)">
                      <circle cx="30" cy="30" r="30" stroke="#EC4899" strokeWidth="2" fill="white" />
                      <circle cx="15" cy="20" r="5" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <circle cx="45" cy="20" r="5" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <circle cx="15" cy="40" r="5" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <circle cx="45" cy="40" r="5" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <circle cx="30" cy="10" r="5" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <circle cx="30" cy="50" r="5" stroke="#EC4899" strokeWidth="1" fill="white" />
                      <line x1="15" y1="20" x2="45" y2="20" stroke="#EC4899" strokeWidth="1" />
                      <line x1="15" y1="40" x2="45" y2="40" stroke="#EC4899" strokeWidth="1" />
                      <line x1="15" y1="20" x2="15" y2="40" stroke="#EC4899" strokeWidth="1" />
                      <line x1="45" y1="20" x2="45" y2="40" stroke="#EC4899" strokeWidth="1" />
                      <line x1="30" y1="10" x2="15" y2="20" stroke="#EC4899" strokeWidth="1" />
                      <line x1="30" y1="10" x2="45" y2="20" stroke="#EC4899" strokeWidth="1" />
                      <line x1="30" y1="50" x2="15" y2="40" stroke="#EC4899" strokeWidth="1" />
                      <line x1="30" y1="50" x2="45" y2="40" stroke="#EC4899" strokeWidth="1" />
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
          </div>
        </div>
      </section>

      {/* Personal Brand Building */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Build Your Personal Brand</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Become your own brand promoter and establish yourself as a recognized voice in your field. Share your
              unique perspective and build a following that extends beyond graduation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Star className="h-10 w-10 text-[#EC4899]" />,
                title: "Personal Brand Development",
                description:
                  "Develop your unique voice and create content that resonates with your community and industry professionals.",
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-[#8B5CF6]" />,
                title: "Growth Strategies",
                description:
                  "Learn proven strategies to grow your personal brand and increase your visibility in your field.",
              },
              {
                icon: <Users className="h-10 w-10 text-[#10B84A]" />,
                title: "Network Building",
                description:
                  "Connect with like-minded students and industry professionals to expand your professional network.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Measurement Tools */}
      <section className="py-20 px-4 md:px-6 lg:px-8 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Career Measurement Tools</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Track your progress and measure your career growth with our comprehensive suite of tools designed to help
              you succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="space-y-6">
                {[
                  {
                    title: "Skill Assessment",
                    description:
                      "Identify your strengths and areas for improvement with our comprehensive skill assessment tools.",
                    icon: <Award className="h-6 w-6 text-[#EC4899]" />,
                  },
                  {
                    title: "Career Progress Tracking",
                    description:
                      "Monitor your career development and track your progress towards your professional goals.",
                    icon: <TrendingUp className="h-6 w-6 text-[#8B5CF6]" />,
                  },
                  {
                    title: "Industry Insights",
                    description: "Stay updated with the latest trends and requirements in your field of interest.",
                    icon: <Briefcase className="h-6 w-6 text-[#10B84A]" />,
                  },
                  {
                    title: "Networking Metrics",
                    description: "Measure the growth and effectiveness of your professional network.",
                    icon: <Users className="h-6 w-6 text-[#EC4899]" />,
                  },
                ].map((tool, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start bg-white p-4 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="mr-4 p-2 bg-gray-100 rounded-full">{tool.icon}</div>
                    <div>
                      <h4 className="font-bold">{tool.title}</h4>
                      <p className="text-gray-600">{tool.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
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

                    {/* Graph */}
                    <g transform="translate(125, 100)">
                      <rect x="0" y="0" width="150" height="100" stroke="#10B84A" strokeWidth="2" fill="white" />
                      <path d="M0 80L30 60L60 70L90 40L120 30L150 10" stroke="#10B84A" strokeWidth="2" fill="none" />
                      <circle cx="30" cy="60" r="3" stroke="#10B84A" strokeWidth="1" fill="white" />
                      <circle cx="60" cy="70" r="3" stroke="#10B84A" strokeWidth="1" fill="white" />
                      <circle cx="90" cy="40" r="3" stroke="#10B84A" strokeWidth="1" fill="white" />
                      <circle cx="120" cy="30" r="3" stroke="#10B84A" strokeWidth="1" fill="white" />
                      <circle cx="150" cy="10" r="3" stroke="#10B84A" strokeWidth="1" fill="white" />
                    </g>

                    {/* Gauge */}
                    <g transform="translate(150, 220)">
                      <path d="M0 50 A50 50 0 0 1 100 50" stroke="#8B5CF6" strokeWidth="2" fill="none" />
                      <path d="M20 50 A30 30 0 0 1 80 50" stroke="#EC4899" strokeWidth="4" fill="none" />
                      <line x1="50" y1="50" x2="70" y2="30" stroke="#8B5CF6" strokeWidth="2" />
                      <circle cx="50" cy="50" r="5" stroke="#8B5CF6" strokeWidth="1" fill="white" />
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Join our community today and start building your personal brand while connecting with industry
              opportunities.
            </p>
            <Link href="/">
              <DoodleButton className="px-8 py-3 text-lg inline-block">Join Dreamclerk Today</DoodleButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
