"use client"

import { motion } from "framer-motion"
import { BookOpen, Award, Users, CheckCircle, Brain } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import FreshersIllustration from "@/components/illustrations/freshers-illustration"
import SignInModal from "@/components/sign-in-modal"

export default function FreshersSection() {
  return (
    <section
      id="for-freshers"
      className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
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
        <BookOpen className="h-14 w-14 text-blue-600" />
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
        <Brain className="h-12 w-12 text-blue-600" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="For Freshers"
          title="Start Your College Journey with Confidence"
          description="Dreamclerk helps freshers navigate the exciting but sometimes overwhelming world of higher education with real insights from students who've been there."
          theme="primary"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Get the Inside Scoop on College Life</h3>
              <p className="text-gray-700 mb-6">
                Access authentic insights from current students to help you navigate your first year with confidence.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: BookOpen,
                    text: "Course selection guidance from experienced students",
                  },
                  {
                    icon: Users,
                    text: "Connect with a network of peers and upperclassmen",
                  },
                  {
                    icon: Award,
                    text: "Start earning rewards from day one by sharing your own experiences",
                  },
                  {
                    icon: CheckCircle,
                    text: "Get recommendations on which professors to take classes with",
                  },
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <feature.icon className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white border-2 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <FreshersIllustration />
            </motion.div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <SignInModal
            trigger={
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium transition-colors cursor-pointer"
                onClick={() => (window.location.href = "/for-freshers")}
              >
                Learn More About Freshman Resources
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            }
            isRegister={false}
          />
        </div>
      </div>
    </section>
  )
}
