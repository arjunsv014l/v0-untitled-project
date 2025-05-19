"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Brain, BarChart, Users, Zap, MessageSquare, Sparkles, Target, Award, Lightbulb } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"

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
                      <div className="flex items-center">
                        {tab === "social" && <BarChart className="h-4 w-4 mr-2" />}
                        {tab === "career" && <Target className="h-4 w-4 mr-2" />}
                        {tab === "network" && <Users className="h-4 w-4 mr-2" />}
                        {tab === "social" && "Social Skills"}
                        {tab === "career" && "Career Guidance"}
                        {tab === "network" && "Industry Connections"}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center mb-4">
                    {tabContent[activeTab].icon}
                    <h3 className="text-xl font-bold ml-3">{tabContent[activeTab].title}</h3>
                  </div>

                  <p className="text-gray-700 mb-6">{tabContent[activeTab].description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold mb-3 flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-[#F59E0B]" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {tabContent[activeTab].features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-start"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2 mt-1 flex-shrink-0 text-[#10B84A]"
                            >
                              <path
                                d="M5 12L9 16L19 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="border-2 border-black rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <img
                          src={tabContent[activeTab].image || "/placeholder.svg"}
                          alt={tabContent[activeTab].title}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>

                  {activeTab === "social" && (
                    <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
                          <img
                            src="/placeholder.svg?height=40&width=40&query=female student portrait"
                            alt="Student"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700 italic text-sm">
                            "The AI helped me identify that I needed to work on my active listening skills. After 4
                            weeks of guided practice, I've received feedback that I'm much more engaged in group
                            discussions."
                          </p>
                          <p className="text-xs font-medium mt-2">
                            - Engineering Student, Chennai Institute of Technology
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "career" && (
                    <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
                          <img
                            src="/placeholder.svg?height=40&width=40&query=male student portrait"
                            alt="Student"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700 italic text-sm">
                            "The AI identified data visualization as a key skill gap for my target role in business
                            analytics. Following its learning path, I developed this capability and secured an
                            internship that aligned perfectly with my career goals."
                          </p>
                          <p className="text-xs font-medium mt-2">- Business Student, SRM University</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "network" && (
                    <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
                          <img
                            src="/placeholder.svg?height=40&width=40&query=diverse student group"
                            alt="Student"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700 italic text-sm">
                            "The AI matched me with a senior product manager at a leading tech company based on my
                            interest in UX design. The personalized conversation starters helped me build a genuine
                            connection that led to a mentorship relationship."
                          </p>
                          <p className="text-xs font-medium mt-2">- Design Student, College of Engineering, Guindy</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <DoodleButton className="w-full text-center">
                <span className="flex items-center justify-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Meet Your AI Assistant
                </span>
              </DoodleButton>
            </motion.div>
          </div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">How Your AI Assistant Works</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Personalized Assessment",
                description: "Complete a comprehensive assessment to establish your baseline skills and goals.",
                icon: <Target className="h-10 w-10 text-[#10B84A]" />,
              },
              {
                step: 2,
                title: "Custom Development Plan",
                description: "Receive a tailored growth plan focusing on your specific needs and aspirations.",
                icon: <Award className="h-10 w-10 text-[#8B5CF6]" />,
              },
              {
                step: 3,
                title: "Guided Practice",
                description: "Engage in AI-facilitated exercises and real-world applications to build skills.",
                icon: <Zap className="h-10 w-10 text-[#EC4899]" />,
              },
              {
                step: 4,
                title: "Continuous Optimization",
                description: "Your AI adapts to your progress, refining recommendations as you grow.",
                icon: <Sparkles className="h-10 w-10 text-[#F59E0B]" />,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-black mr-4">
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <h4 className="text-lg font-bold">{step.title}</h4>
                </div>
                <div className="mb-4">{step.icon}</div>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">How Students Benefit</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Develop Essential Soft Skills",
                description: "Build communication, leadership, and teamwork abilities that employers value most.",
                icon: <BarChart className="h-10 w-10 text-[#10B84A]" />,
              },
              {
                title: "Make Informed Career Decisions",
                description: "Discover career paths that align with your unique strengths, values, and interests.",
                icon: <Lightbulb className="h-10 w-10 text-[#8B5CF6]" />,
              },
              {
                title: "Build Your Professional Network",
                description: "Connect with industry mentors who can provide guidance and open doors to opportunities.",
                icon: <Users className="h-10 w-10 text-[#EC4899]" />,
              },
              {
                title: "Prepare for Real-World Challenges",
                description: "Practice handling difficult workplace scenarios before encountering them in real life.",
                icon: <Target className="h-10 w-10 text-[#F59E0B]" />,
              },
              {
                title: "Track Your Growth Journey",
                description: "Visualize your progress and celebrate milestones as you develop professionally.",
                icon: <Award className="h-10 w-10 text-[#3B82F6]" />,
              },
              {
                title: "Get Personalized Feedback",
                description: "Receive tailored insights that help you refine your approach and accelerate growth.",
                icon: <MessageSquare className="h-10 w-10 text-[#10B84A]" />,
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of students already accelerating their personal and professional growth with our AI
            assistant.
          </p>
          <DoodleButton className="px-8 py-3 text-lg inline-block">
            <span className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Start Your Growth Journey
            </span>
          </DoodleButton>
        </motion.div>
      </div>
    </section>
  )
}
