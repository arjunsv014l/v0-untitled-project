"use client"

import { motion } from "framer-motion"
import { Users, Camera, Award, MessageSquare, Calendar, Hash, Sparkles, Heart, Share2, Star, Zap } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"
import Image from "next/image"
import SignInModal from "./sign-in-modal"

// Toggle this to show/hide reviews
const SHOW_REVIEWS = false

export default function CampusCommunitySection() {
  // Update any testimonials or user quotes to reflect Chennai college experiences

  // Example update (assuming this section exists):
  const testimonials = [
    {
      id: 1,
      name: "Ramesh Subramaniam",
      college: "IIT Madras",
      avatar: "/diverse-student-portrait.png",
      quote:
        "Dreamclerk helped me connect with seniors who guided me through my first year at IIT Madras. The platform's community features are incredibly helpful for newcomers to Chennai.",
    },
    {
      id: 2,
      name: "Anitha Krishnamurthy",
      college: "Women's Christian College",
      avatar: "/diverse-student-group.png",
      quote:
        "I found study partners from other colleges in Chennai through Dreamclerk. We meet regularly at Elliot's Beach to prepare for competitive exams together.",
    },
    {
      id: 3,
      name: "Harish Venkataraman",
      college: "Loyola College",
      avatar: "/smiling-student.png",
      quote:
        "The events section helped me discover cultural festivals happening across Chennai campuses. I've participated in inter-college competitions I wouldn't have known about otherwise.",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black relative overflow-hidden">
      {/* Animated background elements */}
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
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Camera className="h-16 w-16 text-[#10B84A]" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-[5%] opacity-10 hidden md:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Calendar className="h-14 w-14 text-[#8B5CF6]" />
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
            <Sparkles className="h-5 w-5 mr-2 text-[#10B84A]" />
            <span className="font-medium">Your Digital Campus</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Campus Community, Digitized</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Connect with verified students who actually understand what college life is like—no random followers, just
            real campus connections. Create a living digital record of your entire college journey.
          </p>
        </motion.div>

        {/* Feature cards in a visually appealing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Users className="h-10 w-10 text-[#10B84A]" />,
              title: "Verified Student Network",
              description:
                "Connect exclusively with verified college students who understand the unique challenges and joys of campus life.",
              color: "border-[#10B84A]",
              bgColor: "bg-[#10B84A]/5",
            },
            {
              icon: <Camera className="h-10 w-10 text-[#8B5CF6]" />,
              title: "Authentic Moments",
              description:
                "Share your dorm setups, study sessions, campus events, and everything that makes college life memorable.",
              color: "border-[#8B5CF6]",
              bgColor: "bg-[#8B5CF6]/5",
            },
            {
              icon: <Calendar className="h-10 w-10 text-[#3B82F6]" />,
              title: "4-Year Timeline",
              description:
                "Capture your entire college journey from freshman orientation to graduation. Look back on how you've grown year by year.",
              color: "border-[#3B82F6]",
              bgColor: "bg-[#3B82F6]/5",
            },
            {
              icon: <Award className="h-10 w-10 text-[#EC4899]" />,
              title: "Campus Influencer",
              description:
                "Showcase your talents, side hustles, and unique perspective. It's about authentic content, not follower counts.",
              color: "border-[#EC4899]",
              bgColor: "bg-[#EC4899]/5",
            },
            {
              icon: <MessageSquare className="h-10 w-10 text-[#F59E0B]" />,
              title: "Collaborative Creation",
              description:
                "Tag friends, collaborate on posts, and start trends that spread across your campus community.",
              color: "border-[#F59E0B]",
              bgColor: "bg-[#F59E0B]/5",
            },
            {
              icon: <Hash className="h-10 w-10 text-[#10B84A]" />,
              title: "Campus Trends",
              description:
                "Discover what's happening on your campus and others. Join conversations and events that matter to students like you.",
              color: "border-[#10B84A]",
              bgColor: "bg-[#10B84A]/5",
            },
            {
              icon: <Users className="h-8 w-8 text-[#10B84A]" />,
              title: "Connect with Peers",
              description:
                "Find and connect with students who share your interests, major, or career goals. Build a network that supports your academic journey.",
            },
            {
              icon: <Star className="h-8 w-8 text-[#8B5CF6]" />,
              title: "Discover Opportunities",
              description:
                "Access exclusive internships, research positions, and job openings shared within your campus community.",
            },
            {
              icon: <Zap className="h-8 w-8 text-[#EC4899]" />,
              title: "Share Knowledge",
              description:
                "Exchange study resources, course recommendations, and career advice with students who've been in your shoes.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 
                hover:-translate-y-1`}
            >
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Campus Life Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Experience Campus Life</h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Large feature image */}
            <motion.div
              className="md:col-span-8 relative rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[300px] md:h-[400px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/diverse-students-studying.png"
                alt="Students collaborating on campus"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium inline-block mb-2 w-fit">
                  Trending on Campus
                </span>
                <h4 className="text-white text-xl md:text-2xl font-bold">Study Group Meetups</h4>
                <p className="text-white/90 mt-1">Connect with peers for collaborative learning sessions</p>
                <div className="flex items-center mt-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <Image
                          src={`/professional-headshot.png`}
                          alt="Student"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-white ml-2 text-sm">+42 students joined today</span>
                </div>
              </div>
            </motion.div>

            {/* Smaller feature images */}
            <div className="md:col-span-4 grid grid-rows-2 gap-4 md:gap-6">
              <motion.div
                className="relative rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[140px] md:h-[190px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/campus-foodies.png" alt="Campus food event" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-white text-lg font-bold">Campus Foodies</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/90 text-sm">1,872+ members</span>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-white" />
                      <span className="text-white text-sm">243</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[140px] md:h-[190px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/dorm-life.png" alt="Dorm life" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-white text-lg font-bold">Dorm Life</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/90 text-sm">3,104+ members</span>
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4 text-white" />
                      <span className="text-white text-sm">89</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Campus Influence Program - New section replacing the 4-Year Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 bg-white p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Campus Influence Program</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold mb-4">Build Your Campus Presence</h4>
              <p className="text-gray-700 mb-6">
                Our Campus Influence Program helps you develop your personal brand and establish yourself as a
                recognized voice on campus. Share your unique perspective and build a following that extends beyond
                graduation.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Create content that resonates with your campus community",
                  "Develop your unique voice and personal brand",
                  "Connect with brands looking for authentic student voices",
                  "Access exclusive workshops and mentorship opportunities",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 mt-1 flex-shrink-0 text-[#EC4899]"
                    >
                      <path
                        d="M5 12L9 16L19 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <SignInModal
                trigger={<DoodleButton className="w-full md:w-auto">Join the Program</DoodleButton>}
                isRegister={true}
              />
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#EC4899]/10 rounded-xl -z-10 transform rotate-3"></div>
              <div className="border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <div className="border-b-2 border-black p-3 flex justify-between items-center bg-[#EC4899]/10">
                  <h4 className="font-bold">Campus Influence Levels</h4>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {[
                      {
                        level: "Rising Star",
                        icon: "⭐",
                        benefits: ["Basic analytics", "Community support", "Content tips"],
                      },
                      {
                        level: "Campus Creator",
                        icon: "🔥",
                        benefits: ["Advanced analytics", "Collaboration tools", "Monthly workshops"],
                      },
                      {
                        level: "Campus Ambassador",
                        icon: "👑",
                        benefits: ["Brand partnerships", "Monetization options", "Exclusive events"],
                      },
                      {
                        level: "Campus Legend",
                        icon: "🏆",
                        benefits: ["Full monetization suite", "Mentorship program", "Industry connections"],
                      },
                    ].map((level, i) => (
                      <div key={i} className="flex items-start">
                        <div className="text-2xl mr-3">{level.icon}</div>
                        <div>
                          <h5 className="font-bold">{level.level}</h5>
                          <div className="text-sm text-gray-600">{level.benefits.join(" • ")}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
