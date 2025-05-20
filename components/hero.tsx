"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import DoodleBackground from "./ui-elements/doodle-background"
import DoodleButton from "./ui-elements/doodle-button"
import { Star, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import SignInModal from "./sign-in-modal"
import Counter from "./counter"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [counterUpdated, setCounterUpdated] = useState(false)

  // Handle successful registration
  const handleRegistrationSuccess = () => {
    setCounterUpdated(true)
    // Reset the flag after animation completes
    setTimeout(() => setCounterUpdated(false), 2000)
  }

  // Listen for global counter updates
  useEffect(() => {
    const handleGlobalCounterUpdate = () => {
      setCounterUpdated(true)
      setTimeout(() => setCounterUpdated(false), 2000)
    }

    window.addEventListener("userRegistered", handleGlobalCounterUpdate)
    window.addEventListener("userCountUpdated", handleGlobalCounterUpdate)

    return () => {
      window.removeEventListener("userRegistered", handleGlobalCounterUpdate)
      window.removeEventListener("userCountUpdated", handleGlobalCounterUpdate)
    }
  }, [])

  return (
    <DoodleBackground className="pt-20 pb-16 md:pt-32 md:pb-24" density="high">
      {/* Additional floating doodles */}
      <motion.div
        className="absolute top-20 left-[10%] opacity-20 hidden md:block"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Star className="h-16 w-16 text-[#10B84A]" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-[5%] opacity-20 hidden md:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Sparkles className="h-16 w-16 text-[#8B5CF6]" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-[15%] opacity-20 hidden md:block"
        animate={{
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Zap className="h-14 w-14 text-[#EC4899]" />
      </motion.div>

      <motion.div
        className="absolute top-2/3 left-[20%] opacity-20 hidden md:block"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 3L14.5 8.5L21 9.5L16.5 13.5L18 20L12 17L6 20L7.5 13.5L3 9.5L9.5 8.5L12 3Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">Revolutionizing Student Data</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-black">
              Earn From Your College Experience with AI-Powered Insights
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
              Share your daily college life, earn rewards, and contribute to the future of AI-driven education.
            </p>

            {/* Register Now button and Learn More button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              {/* Active users widget */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center bg-white border-2 border-black px-4 py-3 rounded-lg"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700 mr-2 font-medium">Active Users:</span>
                <Counter endValue={12458} duration={2000} />
              </motion.div>

              <SignInModal
                trigger={
                  <DoodleButton size="lg" variant="primary" className="group">
                    Register Now
                  </DoodleButton>
                }
                isRegister={true}
                onSuccess={handleRegistrationSuccess}
              />

              <Link href="/how-it-works">
                <DoodleButton size="lg" variant="outline" className="group">
                  Learn More
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </DoodleButton>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "📚", text: "Real Student Experiences" },
                { icon: "🧠", text: "AI-Powered Insights" },
                { icon: "👥", text: "Growing Community" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center p-3 bg-white border-2 border-black rounded-lg"
                >
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[450px] md:h-[550px]">
              <div className="absolute inset-0 bg-white border-2 border-black rounded-2xl overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px]">
                  {/* Hand-drawn doodle visualization */}
                  <div className="relative">
                    {/* Central hub */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white border-2 border-black rounded-full"
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 160 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0"
                      >
                        <path
                          d="M80 40C93.3333 53.3333 106.667 53.3333 120 40"
                          stroke="#10B84A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M40 80C53.3333 93.3333 53.3333 106.667 40 120"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M120 120C106.667 106.667 106.667 93.3333 120 80"
                          stroke="#EC4899"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M80 120C66.6667 106.667 53.3333 106.667 40 120"
                          stroke="#10B84A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="30"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="5 5"
                        />
                      </svg>
                    </motion.div>

                    {/* Orbiting elements */}
                    {[...Array(5)].map((_, i) => {
                      const angle = (i / 5) * Math.PI * 2
                      const radius = 150
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      const size = 20 + Math.random() * 30

                      return (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 rounded-full bg-white border-2 border-black"
                          style={{
                            width: size,
                            height: size,
                            marginLeft: -size / 2,
                            marginTop: -size / 2,
                          }}
                          animate={{
                            x: [x, x * 0.9, x],
                            y: [y, y * 1.1, y],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: i * 0.2,
                          }}
                        >
                          {/* Doodle inside circle */}
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {i % 5 === 0 && (
                              <path
                                d="M20 10L23 17H30L24 22L27 30L20 25L13 30L16 22L10 17H17L20 10Z"
                                stroke="#10B84A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {i % 5 === 1 && (
                              <path
                                d="M10 10H30V30H10V10Z"
                                stroke="#8B5CF6"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {i % 5 === 2 && (
                              <circle
                                cx="20"
                                cy="20"
                                r="10"
                                stroke="#EC4899"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {i % 5 === 3 && (
                              <path
                                d="M10 20C10 15 15 10 20 10C25 10 30 15 30 20C30 25 25 30 20 30C15 30 10 25 10 20Z"
                                stroke="#10B84A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {i % 5 === 4 && (
                              <path
                                d="M10 15L20 10L30 15L20 20L10 15ZM10 25L20 20L30 25L20 30L10 25Z"
                                stroke="#8B5CF6"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                          </svg>
                        </motion.div>
                      )
                    })}

                    {/* Connection lines */}
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="-200 -200 400 400">
                      <motion.g
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        {[...Array(20)].map((_, i) => {
                          const startAngle = (i / 20) * Math.PI * 2
                          const endAngle = ((i + 10) / 20) * Math.PI * 2
                          const startRadius = 30 + Math.random() * 20
                          const endRadius = 120 + Math.random() * 30
                          const startX = Math.cos(startAngle) * startRadius
                          const startY = Math.sin(startAngle) * startRadius
                          const endX = Math.cos(endAngle) * endRadius
                          const endY = Math.sin(endAngle) * endRadius

                          // Alternate between the three main colors
                          const colors = ["#10B84A", "#8B5CF6", "#EC4899"]
                          const colorIndex = i % 3

                          return (
                            <motion.path
                              key={i}
                              d={`M ${startX} ${startY} L ${endX} ${endY}`}
                              stroke={colors[colorIndex]}
                              strokeWidth="1"
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{
                                pathLength: 1,
                                opacity: [0, 0.8, 0],
                              }}
                              transition={{
                                duration: 3 + (i % 3),
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: i * 0.1,
                              }}
                            />
                          )
                        })}
                      </motion.g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -right-10 top-20 bg-white border-2 border-black p-4 rounded-lg max-w-[200px]"
            >
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                <span className="text-sm font-semibold">Student Insight</span>
              </div>
              <p className="text-xs text-gray-700">
                "The campus events are amazing! Made so many connections this semester."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -left-10 bottom-20 bg-white border-2 border-black p-4 rounded-lg max-w-[200px]"
            >
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                <span className="text-sm font-semibold">AI Analysis</span>
              </div>
              <p className="text-xs text-gray-700">
                "87% of students report positive experiences with campus networking events."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hand-drawn wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path
            fill="#ffffff"
            stroke="black"
            strokeWidth="2"
            d="M0,32C60,45,120,58,180,58C240,58,300,45,360,40C420,35,480,38,540,42C600,45,660,48,720,48C780,48,840,45,900,42C960,38,1020,35,1080,35C1140,35,1200,38,1260,40C1320,42,1380,45,1410,46L1440,48L1440,100L0,100Z"
          ></path>
        </svg>
      </div>
    </DoodleBackground>
  )
}
