"use client"

import { motion } from "framer-motion"
import { Database, Shield, Zap, Brain, TrendingUp, Target } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import CompaniesIllustration from "@/components/illustrations/companies-illustration"
import SignInModal from "@/components/sign-in-modal"

export default function CompaniesSection() {
  return (
    <section
      id="for-companies"
      className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black bg-gradient-to-b from-amber-50 to-white relative overflow-hidden"
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
        <Database className="h-14 w-14 text-amber-600" />
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
        <TrendingUp className="h-12 w-12 text-amber-600" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="For Brands & Agencies"
          title="Real-Time Student Data for Authentic Engagement"
          description="Access structured, authentic student experiences to understand Gen Z, develop targeted campaigns, and create products that resonate with the next generation of consumers."
          theme="tertiary"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Database,
              title: "Real-Time Insights",
              description:
                "Access authentic, categorized student experiences that provide real-time insights into Gen Z preferences, behaviors, and trends.",
              theme: "tertiary",
              doodle: "lines",
            },
            {
              icon: Shield,
              title: "Ethical & Compliant",
              description:
                "All data is ethically sourced with explicit consent and anonymized to protect privacy while maintaining utility.",
              theme: "tertiary",
              doodle: "circles",
            },
            {
              icon: Zap,
              title: "Pre-Processed & Structured",
              description:
                "Save time with data that's already categorized, cleaned, and structured for immediate business application.",
              theme: "tertiary",
              doodle: "stars",
            },
          ].map((benefit, index) => (
            <FeatureCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index}
              theme={benefit.theme as any}
              doodle={benefit.doodle as any}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">The Real-Time Data Advantage</h3>
              <p className="text-gray-700 mb-6">
                Discover how Dreamclerk's real-time student data provides a competitive edge in understanding and
                engaging with Gen Z.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: Brain,
                    text: "Gain deep understanding of student experiences across academics, social life, purchasing habits, and digital engagement",
                  },
                  {
                    icon: TrendingUp,
                    text: "Identify emerging trends before they go mainstream with continuous streams of fresh data",
                  },
                  {
                    icon: Target,
                    text: "Create more effective campaigns and products with insights directly from your target demographic",
                  },
                  {
                    icon: Shield,
                    text: "All data is ethically sourced and compliant with privacy regulations",
                  },
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <feature.icon className="h-3.5 w-3.5 text-amber-600" />
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
              <CompaniesIllustration />
            </motion.div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <SignInModal
            trigger={
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium transition-colors cursor-pointer"
              >
                Explore Business Solutions
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
            isRegister={true}
          />
        </div>
      </div>
    </section>
  )
}
