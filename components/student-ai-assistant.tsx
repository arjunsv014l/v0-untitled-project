"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Brain, BarChart, Users, MessageSquare, Sparkles, Target } from "lucide-react"

export default function StudentAIAssistant() {
  const [activeTab, setActiveTab] = useState<"social" | "career" | "network">("social")

  const tabContent = {
    social: {
      title: "Social Skills Development",
      description:
        "Track and enhance your communication abilities with personalized feedback and guided practice scenarios.",
      features: [
        "Analyze your communication patterns across 12 key social competencies",
        "Receive tailored exercises to strengthen specific social skills",
        "Track your progress with visual growth indicators",
        "Practice with AI-generated scenarios relevant to campus life",
      ],
      icon: <BarChart className="h-10 w-10 text-[#10B84A]" />,
      image: "/student-communication-dashboard.png",
    },
    career: {
      title: "Career Guidance",
      description:
        "Get personalized career recommendations and skill development paths based on your unique strengths and goals.",
      features: [
        "Discover career paths aligned with your personal strengths",
        "Identify skill gaps for your target roles with actionable plans",
        "Access customized learning resources for your career goals",
        "Receive guidance on building a standout professional portfolio",
      ],
      icon: <Target className="h-10 w-10 text-[#8B5CF6]" />,
      image: "/career-path-visualization.png",
    },
    network: {
      title: "Industry Connections",
      description:
        "Connect with industry professionals who match your career interests through our intelligent matchmaking system.",
      features: [
        "Get matched with industry mentors based on your career goals",
        "Prepare for professional interactions with personalized talking points",
        "Receive introductions to relevant industry leaders",
        "Build and nurture your professional network strategically",
      ],
      icon: <Users className="h-10 w-10 text-[#EC4899]" />,
      image: "/professional-networking-interface.png",
    },
  }

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black relative overflow-hidden bg-gray-50">
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

      {/* Floating elements */}
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
        <Brain className="h-14 w-14 text-[#10B84A]" />
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
        <Sparkles className="h-12 w-12 text-[#8B5CF6]" />
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
            <Brain className="h-5 w-5 mr-2 text-[#10B84A]" />
            <span className="font-medium">AI-Powered Growth</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Personal AI Development Assistant</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Meet your AI companion that helps you develop essential social skills, guides your career journey, and
            connects you with industry professionals who can accelerate your growth.
          </p>
        </motion.div>

        {/* AI Assistant Showcase */}
        <div className="mb-16 bg-white p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left side: AI visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10B84A]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 rounded-xl blur-xl"></div>
                <div className="relative bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-black">
                      <Brain className="h-8 w-8 text-[#8B5CF6]" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-black mr-3 flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-[#10B84A]" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 border-2 border-black">
                        <p className="text-sm">How can I help with your development today?</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-start justify-end"
                    >
                      <div className="bg-[#10B84A]/10 rounded-lg p-3 border-2 border-black">
                        <p className="text-sm">I need help preparing for my upcoming interview.</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-start"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-black mr-3 flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-[#10B84A]" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 border-2 border-black">
                        <p className="text-sm">
                          I'll help you prepare! Let's create a personalized interview practice plan based on your
                          target role and current skills.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="flex items-center justify-center space-x-1"
                    >
                      <span className="w-2 h-2 bg-[#10B84A] rounded-full"></span>
                      <span className="w-2 h-2 bg-[#8B5CF6] rounded-full"></span>
                      <span className="w-2 h-2 bg-[#EC4899] rounded-full"></span>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold mb-2">Always Learning, Always Growing</h3>
                <p className="text-gray-700">
                  Your AI assistant adapts to your unique needs and evolves as you develop.
                </p>
              </div>
            </motion.div>

            {/* Right side: Feature tabs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {(["social", "career", "network"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full border-2 border-black font-medium transition-all ${
                        activeTab === tab
                          ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                          : "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
                      }`}
                    >
                      {tabContent[tab].title}
                    </button>
                  ))}
                </div>
                <div className="bg-gray-100 rounded-lg p-8 border-2 border-black">
                  <h3 className="text-xl font-bold mb-4">{tabContent[activeTab].title}</h3>
                  <p className="text-gray-700 mb-6">{tabContent[activeTab].description}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {tabContent[activeTab].features.map((feature, index) => (
                      <li key={index} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
