"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import DoodleBackground from "./ui-elements/doodle-background"
import DoodleButton from "./ui-elements/doodle-button"
import { ArrowRight, Mail, Star, Calendar, Sparkles } from "lucide-react"

export default function LaunchingSoon() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email)
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <DoodleBackground className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden" density="high" animated={true}>
      {/* Additional floating doodles */}
      <motion.div
        className="absolute top-10 left-10 opacity-30"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Star className="h-12 w-12 text-[#10B84A]" /> {/* Added text color for green */}
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 opacity-30"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Calendar className="h-12 w-12 text-[#8B5CF6]" /> {/* Added text color for purple */}
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-20 opacity-30"
        animate={{
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Sparkles className="h-10 w-10 text-[#EC4899]" /> {/* Added text color for pink */}
      </motion.div>

      <motion.div
        className="absolute top-20 right-1/4 opacity-30"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#10B84A" // Changed to green
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white">
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="mr-2 h-5 w-5" />
          </motion.div>
          <span className="font-medium">Coming Soon</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 relative">
          <span className="relative inline-block">
            Launching Soon
            <motion.svg
              width="100%"
              height="8"
              viewBox="0 0 100 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-2 left-0"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <path d="M0 4C20 0 40 8 60 4C80 0 100 8 100 4" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          We're working hard to bring Dreamclerk to life. Be the first to know when we launch and start earning from
          your college experiences.
        </p>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <DoodleButton type="submit">
              Notify Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </DoodleButton>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-black p-4 rounded-lg max-w-md mx-auto"
          >
            <Sparkles className="h-6 w-6 mx-auto mb-2" />
            <p className="font-medium">Thank you for your interest!</p>
            <p className="text-gray-600 text-sm mt-1">We'll notify you when Dreamclerk launches.</p>
          </motion.div>
        )}

        {/* Hand-drawn countdown */}
        <div className="mt-12 flex justify-center gap-6 md:gap-10">
          {["Summer", "2025"].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="relative"
            >
              <div className="bg-white border-2 border-black rounded-lg p-4 md:p-6 w-24 md:w-32 h-24 md:h-32 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold">{item}</span>
              </div>
              <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-2 -left-2 -right-2 -bottom-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <path
                  d={index === 0 ? "M10 30C20 10 80 10 90 30" : "M10 70C20 90 80 90 90 70"}
                  stroke={index === 0 ? "#10B84A" : "#8B5CF6"} // Changed to green and purple
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
                <path
                  d={index === 0 ? "M10 70C20 90 80 90 90 70" : "M10 30C20 10 80 10 90 30"}
                  stroke={index === 0 ? "#8B5CF6" : "#10B84A"} // Changed to purple and green
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              </motion.svg>
            </motion.div>
          ))}
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center items-center gap-2"
        >
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-bold"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="text-gray-600 ml-2">+1,240 people on the waitlist</span>
        </motion.div>
      </motion.div>

      {/* Additional doodle elements */}
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
