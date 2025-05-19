"use client"

import { motion } from "framer-motion"
import { Clock, Shield, DollarSign, PenTool, Brain, Database, CreditCard, CheckCircle } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"
import DoodleCard from "./ui-elements/doodle-card"
import Link from "next/link"
import { useState } from "react"

export default function EarnWithDreamclerk() {
  const [activeTab, setActiveTab] = useState<"how" | "faq">("how")

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 L100 0 L100 100 L0 100 Z" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <circle cx="50" cy="50" r="20" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="0.5" strokeDasharray="8 4" />
        </svg>
      </div>

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
            <DollarSign className="h-5 w-5 mr-2 text-[#10B84A]" />
            <span className="font-medium">Student Income Opportunity</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Turn Your Daily Campus Life Into Income</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Dreamclerk pays you for sharing your authentic college experiences. Just a few minutes a day can earn you up
            to $300 monthly while helping future students make better decisions.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border-2 border-black rounded-full p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setActiveTab("how")}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                activeTab === "how" ? "bg-[#10B84A] text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                activeTab === "faq" ? "bg-[#8B5CF6] text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              Common Questions
            </button>
          </div>
        </div>

        {/* How It Works Tab */}
        {activeTab === "how" && (
          <div>
            {/* Four-step process */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  step: 1,
                  title: "Journal Your Day",
                  description: "Spend 5 minutes sharing your authentic campus experiences through our simple app.",
                  icon: <PenTool className="h-10 w-10 text-[#10B84A]" />,
                  details: [
                    "Classes and professors",
                    "Campus facilities",
                    "Social events",
                    "Food and dining",
                    "Student life",
                  ],
                },
                {
                  step: 2,
                  title: "AI Analysis",
                  description: "Our AI technology analyzes and categorizes your entries into valuable insights.",
                  icon: <Brain className="h-10 w-10 text-[#8B5CF6]" />,
                  details: [
                    "Pattern recognition",
                    "Sentiment analysis",
                    "Trend identification",
                    "Insight generation",
                    "Anonymization",
                  ],
                },
                {
                  step: 3,
                  title: "Data Monetization",
                  description: "Anonymized insights are packaged and sold to trusted companies and organizations.",
                  icon: <Database className="h-10 w-10 text-[#EC4899]" />,
                  details: [
                    "Educational platforms",
                    "University services",
                    "Consumer brands",
                    "Mental health resources",
                    "AI companies",
                  ],
                },
                {
                  step: 4,
                  title: "Get Paid Monthly",
                  description: "Receive monthly payments based on the quality and consistency of your contributions.",
                  icon: <CreditCard className="h-10 w-10 text-[#F59E0B]" />,
                  details: [
                    "Direct deposits",
                    "Payment tracking",
                    "Bonus opportunities",
                    "Referral rewards",
                    "Loyalty incentives",
                  ],
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connector line between steps */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/4 right-0 w-1/2 h-0.5 border-t-2 border-dashed border-black z-0"></div>
                  )}

                  <DoodleCard className="h-full p-6 z-10 relative">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center mr-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <span className="font-bold">{step.step}</span>
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <div className="mb-4">{step.icon}</div>
                      <p className="text-gray-700 mb-4">{step.description}</p>
                      <ul className="space-y-1 mt-auto">
                        {step.details.map((detail, j) => (
                          <li key={j} className="flex items-start text-sm text-gray-600">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-1 mt-1 flex-shrink-0"
                            >
                              <path
                                d="M5 12L9 16L19 6"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </DoodleCard>
                </motion.div>
              ))}
            </div>

            {/* Key benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Why Students Love Dreamclerk</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Clock className="h-10 w-10 text-[#10B84A]" />,
                    title: "Quick & Easy",
                    description:
                      "Just 5 minutes a day to earn. No special skills required – if you can text, you can earn with Dreamclerk.",
                  },
                  {
                    icon: <Shield className="h-10 w-10 text-[#8B5CF6]" />,
                    title: "100% Private",
                    description:
                      "All entries are anonymized. Your personal information is never shared with third parties.",
                  },
                  {
                    icon: <DollarSign className="h-10 w-10 text-[#EC4899]" />,
                    title: "Real Income",
                    description:
                      "Earn $100-$300 monthly depending on consistency. Perfect for covering books, food, or weekend fun.",
                  },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <DoodleCard className="h-full p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">{benefit.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                        <p className="text-gray-700">{benefit.description}</p>
                      </div>
                    </DoodleCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Trust and Compliance Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <DoodleCard className="p-8 border-[#10B84A]">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-white border-2 border-black p-4 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Shield className="h-12 w-12 text-[#10B84A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Trusted & Compliant Platform</h3>
                    <p className="text-gray-700 mb-3">
                      Dreamclerk is fully compliant with the Digital Personal Data Protection (DPDP) Act, ensuring your
                      data is handled with the highest standards of security and privacy. We've built a trusted platform
                      where thousands of students safely share and earn.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "DPDP Act compliant data handling",
                        "End-to-end encryption for all personal information",
                        "Transparent data usage policies",
                        "Right to access and delete your data",
                        "Regular security audits and compliance checks",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-[#10B84A] flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DoodleCard>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/sign-up">
                <DoodleButton className="px-8 py-3 text-lg inline-block">Register Now</DoodleButton>
              </Link>
            </motion.div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  question: "How much time does it take each day?",
                  answer:
                    "Just 5 minutes! Our app is designed to make journaling quick and easy. You can write entries between classes, during lunch, or before bed.",
                },
                {
                  question: "Is my information really private?",
                  answer:
                    "Absolutely. We take privacy seriously. All journal entries are anonymized before analysis, and your personal information is never shared with third parties.",
                },
                {
                  question: "How do I get paid?",
                  answer:
                    "You'll receive monthly payments via direct deposit or PayPal. You can track your earnings in real-time through your dashboard.",
                },
                {
                  question: "What should I write about?",
                  answer:
                    "Share your authentic experiences about classes, professors, campus facilities, events, food, social life, or anything else related to your college experience.",
                },
                {
                  question: "Who buys this information?",
                  answer:
                    "Trusted organizations like educational platforms, universities, student service providers, and companies developing products for students.",
                },
                {
                  question: "Can I see how my data is being used?",
                  answer:
                    "Yes! We provide transparency reports showing how insights from student journals are helping improve campus experiences and products.",
                },
                {
                  question: "Is there a minimum commitment?",
                  answer:
                    "No minimum commitment. You can contribute as much or as little as you want, though consistent contributors earn more.",
                },
                {
                  question: "Can I invite my friends?",
                  answer:
                    "We have a referral program where you earn bonuses when friends join and become active contributors.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <DoodleCard className="h-full p-6">
                    <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </DoodleCard>
                </motion.div>
              ))}
            </div>

            {/* DPDP Act compliance callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <DoodleCard className="p-8 border-[#10B84A]">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-white border-2 border-black p-4 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Shield className="h-12 w-12 text-[#10B84A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">DPDP Act Compliant & Trusted Platform</h3>
                    <p className="text-gray-700">
                      Dreamclerk strictly adheres to the Digital Personal Data Protection (DPDP) Act. We implement
                      industry-leading security measures to protect your data, and we're transparent about how your
                      information is used. You control what you share and can delete your data at any time.
                    </p>
                    <Link href="/privacy" className="text-[#10B84A] font-medium inline-flex items-center mt-2">
                      Read our full privacy policy
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </DoodleCard>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">Have more questions? We're here to help!</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <DoodleButton variant="outline" className="px-6 py-3 inline-block">
                    Contact Support
                  </DoodleButton>
                </Link>
                <Link href="/sign-up">
                  <DoodleButton className="px-6 py-3 inline-block">Register Now</DoodleButton>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
