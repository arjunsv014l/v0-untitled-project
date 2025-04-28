"use client"

import { motion } from "framer-motion"
import SignInModal from "./sign-in-modal"
import DoodleButton from "./ui-elements/doodle-button"
import { Sparkles, ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.1) 2px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 border-2 border-black rounded-xl p-8 md:p-12 bg-white/80 backdrop-blur-sm">
          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 right-0 -mt-6 -mr-6"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="h-12 w-12 text-[#8B5CF6]" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 -mb-6 -ml-6"
            animate={{ rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="25" stroke="#10B84A" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Text content */}
            <div className="md:col-span-3">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#10B84A] to-[#8B5CF6]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to transform your college experience?
              </motion.h2>

              <motion.p
                className="text-lg text-gray-700 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Join thousands of students who are earning from their experiences and contributing to the future of
                AI-driven education.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <SignInModal
                  trigger={
                    <DoodleButton className="px-6 py-3 text-lg">
                      <span className="flex items-center">
                        Register Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </DoodleButton>
                  }
                  isRegister={true}
                />

                <span className="text-sm text-gray-500 italic">No credit card required</span>
              </motion.div>
            </div>

            {/* Illustration */}
            <div className="md:col-span-2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Student figure */}
                  <g transform="translate(100, 30)">
                    {/* Head */}
                    <circle cx="50" cy="30" r="25" fill="white" stroke="black" strokeWidth="2" />

                    {/* Body */}
                    <path d="M50 55L50 120" stroke="black" strokeWidth="2" />

                    {/* Arms */}
                    <path d="M50 70L20 90" stroke="black" strokeWidth="2" />
                    <path d="M50 70L80 60" stroke="black" strokeWidth="2" />

                    {/* Legs */}
                    <path d="M50 120L30 160" stroke="black" strokeWidth="2" />
                    <path d="M50 120L70 160" stroke="black" strokeWidth="2" />

                    {/* Graduation cap */}
                    <rect x="25" y="10" width="50" height="5" fill="#10B84A" stroke="black" strokeWidth="1" />
                    <path d="M50 0L75 10L50 20L25 10L50 0Z" fill="#10B84A" stroke="black" strokeWidth="1" />
                    <path d="M65 12V25" stroke="black" strokeWidth="1" />
                    <circle cx="65" cy="25" r="3" fill="#10B84A" stroke="black" strokeWidth="1" />

                    {/* Laptop */}
                    <rect x="15" y="90" width="30" height="20" rx="2" fill="white" stroke="black" strokeWidth="1" />
                    <rect x="15" y="110" width="30" height="2" rx="1" fill="white" stroke="black" strokeWidth="1" />

                    {/* Data visualization from laptop */}
                    <path d="M20 95C25 85 35 85 40 95" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M20 100C25 90 35 90 40 100" stroke="#10B84A" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M20 105C25 95 35 95 40 105" stroke="#EC4899" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Coins/tokens around */}
                    <circle cx="90" cy="90" r="10" fill="white" stroke="#10B84A" strokeWidth="1" />
                    <text x="85" y="94" fontFamily="Arial" fontSize="12" fill="#10B84A">
                      $
                    </text>

                    <circle cx="100" cy="120" r="8" fill="white" stroke="#8B5CF6" strokeWidth="1" />
                    <text x="96" y="124" fontFamily="Arial" fontSize="10" fill="#8B5CF6">
                      $
                    </text>

                    <circle cx="85" cy="150" r="12" fill="white" stroke="#EC4899" strokeWidth="1" />
                    <text x="80" y="155" fontFamily="Arial" fontSize="14" fill="#EC4899">
                      $
                    </text>
                  </g>
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Stats at bottom */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#10B84A]">5,000+</p>
              <p className="text-sm text-gray-600">Active Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#8B5CF6]">50+</p>
              <p className="text-sm text-gray-600">Universities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#EC4899]">10k+</p>
              <p className="text-sm text-gray-600">Daily Insights</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
