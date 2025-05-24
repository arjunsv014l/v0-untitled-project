"use client"

import { motion } from "framer-motion"
import { DollarSign, BarChart, Shield, Zap, Users, Award } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import StatCard from "@/components/ui/stat-card"
import StudentsIllustration from "@/components/illustrations/students-illustration"
import SignInModal from "@/components/sign-in-modal"

export default function StudentsSection() {
  return (
    <section
      id="for-students"
      className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white border-t-2 border-black relative overflow-hidden"
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
        <DollarSign className="h-14 w-14 text-purple-600" />
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
        <Award className="h-12 w-12 text-purple-600" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="For Students"
          title="Monetize Your College Experience"
          description="Turn your daily college life into valuable insights and earn rewards while helping future students make informed decisions."
          theme="secondary"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <StatCard icon={DollarSign} value="$200+" label="Average Monthly Earnings" theme="secondary" delay={0} />
          <StatCard icon={Users} value="10K+" label="Active Student Contributors" theme="secondary" delay={1} />
          <StatCard icon={Zap} value="5-10" label="Minutes Per Day" theme="secondary" delay={2} />
          <StatCard icon={Award} value="50+" label="Reward Options" theme="secondary" delay={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Share Experiences, Earn Rewards</h3>
              <p className="text-gray-700 mb-6">
                Spend just a few minutes each day sharing your authentic college experiences and convert them into
                valuable rewards.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: DollarSign,
                    text: "Earn tokens based on consistency and quality of your insights",
                  },
                  {
                    icon: Shield,
                    text: "All shared experiences are anonymized to protect your privacy",
                  },
                  {
                    icon: Zap,
                    text: "Our intuitive interface makes sharing quick and simple",
                  },
                  {
                    icon: BarChart,
                    text: "Track your impact and see how you're helping future students",
                  },
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <feature.icon className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white border-2 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <StudentsIllustration />
            </motion.div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <SignInModal
            trigger={
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium transition-colors cursor-pointer"
              >
                Learn How to Start Earning
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
            redirectPath="/for-students"
          />
        </div>
      </div>
    </section>
  )
}
