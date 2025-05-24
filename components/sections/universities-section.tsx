"use client"

import { motion } from "framer-motion"
import { BarChart, Users, Lightbulb, Building, Award } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import UniversitiesIllustration from "@/components/illustrations/universities-illustration"
import SignInModal from "@/components/sign-in-modal"

export default function UniversitiesSection() {
  return (
    <section
      id="for-universities"
      className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 to-white border-t-2 border-black relative overflow-hidden"
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
        <Building className="h-14 w-14 text-emerald-600" />
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
        <Award className="h-12 w-12 text-emerald-600" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="For Universities"
          title="Transform Your Campus with Real Student Insights"
          description="Access authentic, structured student experiences to make data-driven decisions that improve campus life, academic offerings, and student satisfaction."
          theme="quaternary"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Data-Driven Campus Improvement</h3>
              <p className="text-gray-700 mb-6">
                Use real-time student insights to enhance the campus experience and improve student outcomes.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: BarChart,
                    text: "Access real-time, structured student insights to inform strategic decisions",
                  },
                  {
                    icon: Users,
                    text: "Identify factors affecting student satisfaction and address issues before they impact retention",
                  },
                  {
                    icon: Lightbulb,
                    text: "Gain insights into course effectiveness and curriculum relevance from the student perspective",
                  },
                  {
                    icon: Building,
                    text: "Allocate resources more effectively based on actual student usage patterns and preferences",
                  },
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <feature.icon className="h-3.5 w-3.5 text-emerald-600" />
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
              <UniversitiesIllustration />
            </motion.div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Partner with Dreamclerk",
              description:
                "Establish a partnership that gives your institution access to anonymized student insights while maintaining privacy and ethical standards.",
              icon: Building,
              number: "01",
              theme: "quaternary",
              doodle: "stars",
            },
            {
              title: "Access Structured Insights",
              description:
                "Receive categorized, actionable insights about student experiences across academics, campus life, facilities, and more.",
              icon: BarChart,
              number: "02",
              theme: "quaternary",
              doodle: "circles",
            },
            {
              title: "Implement & Measure",
              description:
                "Use the insights to implement changes and measure their impact with continuous feedback from the student community.",
              icon: Lightbulb,
              number: "03",
              theme: "quaternary",
              doodle: "lines",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border-2 border-black rounded-lg p-6 h-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold text-emerald-600">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <SignInModal
            trigger={
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium transition-colors cursor-pointer"
              >
                Explore University Partnerships
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
            redirectPath="/for-universities"
          />
        </div>
      </div>
    </section>
  )
}
