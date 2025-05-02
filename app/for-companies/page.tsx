"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Database,
  Shield,
  Zap,
  Brain,
  Home,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useEffect } from "react"

export default function ForCompaniesPage() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <DoodleBackground className="pt-24 pb-16" density="medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mr-4">
              <Home className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
              onClick={() => {
                // Save the scroll position of the section on the landing page
                const sectionPosition = document.getElementById("for-companies")?.offsetTop || 0
                localStorage.setItem("landingPageScrollPosition", sectionPosition.toString())
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* Mobile-optimized hero section with image first on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image first on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <DoodleCard className="p-8" doodle="squiggles">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* CPU/Brain */}
                    <g transform="translate(150, 100)">
                      <rect x="0" y="0" width="120" height="120" rx="10" stroke="black" strokeWidth="2" fill="white" />
                      <circle cx="60" cy="60" r="40" stroke="black" strokeWidth="1.5" fill="white" />
                      <path d="M60 20V100" stroke="black" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M20 60H100" stroke="black" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M30 30L90 90" stroke="black" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M30 90L90 30" stroke="black" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="60" cy="60" r="15" stroke="black" strokeWidth="1.5" fill="white" />

                      {/* Connection points */}
                      <rect x="-5" y="30" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="-5" y="80" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="115" y="30" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="115" y="80" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="30" y="-5" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="80" y="-5" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="30" y="115" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="80" y="115" width="10" height="10" stroke="black" strokeWidth="1.5" fill="white" />
                    </g>

                    {/* Data nodes */}
                    <g transform="translate(80, 280)">
                      <circle cx="15" cy="15" r="15" stroke="black" strokeWidth="1.5" fill="white" />
                      <circle cx="65" cy="15" r="15" stroke="black" strokeWidth="1.5" fill="white" />
                      <circle cx="115" cy="15" r="15" stroke="black" strokeWidth="1.5" fill="white" />
                      <path d="M30 15H50" stroke="black" strokeWidth="1.5" />
                      <path d="M80 15H100" stroke="black" strokeWidth="1.5" />
                    </g>

                    <g transform="translate(240, 280)">
                      <circle cx="15" cy="15" r="15" stroke="black" strokeWidth="1.5" fill="white" />
                      <circle cx="65" cy="15" r="15" stroke="black" strokeWidth="1.5" fill="white" />
                      <path d="M30 15H50" stroke="black" strokeWidth="1.5" />
                    </g>

                    {/* Binary code */}
                    <g transform="translate(60, 60)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="12" fill="black">
                        10110
                      </text>
                    </g>

                    <g transform="translate(300, 60)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="12" fill="black">
                        01001
                      </text>
                    </g>

                    <g transform="translate(60, 340)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="12" fill="black">
                        11001
                      </text>
                    </g>

                    <g transform="translate(300, 340)">
                      <text x="0" y="0" fontFamily="monospace" fontSize="12" fill="black">
                        10010
                      </text>
                    </g>
                  </svg>
                </div>
              </DoodleCard>
            </motion.div>

            {/* Text content second on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
                <span className="font-medium">For Brands & Agencies</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Real-Time Student Data for Authentic Engagement</h1>

              <p className="text-lg text-gray-700 mb-8">
                Access structured, authentic student experiences to understand Gen Z, develop targeted campaigns, and
                create products that resonate with the next generation of consumers.
              </p>

              <Link href="/how-it-works">
                <DoodleButton size="lg">Coming Soon</DoodleButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </DoodleBackground>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Companies Choose Dreamclerk</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Access high-quality, structured student data that powers authentic engagement with Gen Z audiences and
              drives innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Real-Time Insights",
                description:
                  "Access authentic, categorized student experiences that provide real-time insights into Gen Z preferences, behaviors, and trends.",
              },
              {
                icon: Shield,
                title: "Ethical & Compliant",
                description:
                  "All data is ethically sourced with explicit consent and anonymized to protect privacy while maintaining utility.",
              },
              {
                icon: Zap,
                title: "Pre-Processed & Structured",
                description:
                  "Save time with data that's already categorized, cleaned, and structured for immediate business application.",
              },
              {
                icon: Brain,
                title: "Gen Z Expertise",
                description:
                  "Gain deep understanding of student experiences across academics, social life, purchasing habits, and digital engagement.",
              },
              {
                icon: TrendingUp,
                title: "Trend Forecasting",
                description:
                  "Identify emerging trends before they go mainstream with continuous streams of fresh data from campus environments.",
              },
              {
                icon: Target,
                title: "Targeted Engagement",
                description:
                  "Create more effective campaigns and products with insights directly from your target demographic.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex flex-col h-full">
                    <div className="bg-white border-2 border-black p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-700 flex-grow">{benefit.description}</p>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Types Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Different Companies Benefit</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover how different types of companies are leveraging Dreamclerk data to create innovative solutions
              and authentic engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "For Brands",
                description:
                  "Connect with Gen Z through authentic insights that drive product development and marketing strategies.",
                applications: [
                  "Develop products that resonate with student needs and preferences",
                  "Create marketing campaigns that speak authentically to Gen Z",
                  "Identify emerging trends before they go mainstream",
                  "Understand purchasing behaviors and decision factors",
                  "Test concepts and messaging with real student feedback",
                ],
                icon: Users,
              },
              {
                title: "For Agencies",
                description:
                  "Deliver exceptional results for clients targeting the student demographic with data-driven strategies.",
                applications: [
                  "Develop campaigns based on real student insights rather than assumptions",
                  "Create content that authentically resonates with Gen Z audiences",
                  "Provide clients with unique insights into the student market",
                  "Measure campaign effectiveness with real student feedback",
                  "Stay ahead of trends with continuous data streams",
                ],
                icon: BarChart3,
              },
              {
                title: "For Social Companies",
                description:
                  "Build platforms and features that genuinely engage student users and meet their evolving needs.",
                applications: [
                  "Design features that address actual student communication patterns",
                  "Understand content preferences and engagement drivers",
                  "Identify pain points in existing social platforms",
                  "Develop community-building tools based on campus social dynamics",
                  "Create safer, more engaging digital environments",
                ],
                icon: LineChart,
              },
            ].map((companyType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard
                  className="h-full p-8"
                  doodle={index % 3 === 0 ? "stars" : index % 3 === 1 ? "circles" : "lines"}
                >
                  <div className="bg-white border-2 border-black p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <companyType.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{companyType.title}</h3>
                  <p className="text-gray-700 mb-6">{companyType.description}</p>

                  <p className="font-bold text-gray-700 mb-2">Applications:</p>
                  <ul className="space-y-2">
                    {companyType.applications.map((application, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 mt-1 flex-shrink-0"
                        >
                          <path
                            d="M5 12L9 16L19 6"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-gray-700">{application}</span>
                      </li>
                    ))}
                  </ul>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Categories Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Available Data Categories</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Dreamclerk provides structured student data across multiple categories, all ethically sourced and
              anonymized.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Consumer Behavior",
                items: [
                  "Purchasing preferences and patterns",
                  "Brand perception and loyalty factors",
                  "Price sensitivity and value assessment",
                  "Influence factors in buying decisions",
                  "Sustainability and ethical considerations",
                ],
              },
              {
                title: "Digital Engagement",
                items: [
                  "Platform preferences and usage patterns",
                  "Content consumption habits",
                  "Social media engagement behaviors",
                  "Digital communication preferences",
                  "Technology adoption and trends",
                ],
              },
              {
                title: "Lifestyle & Interests",
                items: [
                  "Entertainment and leisure activities",
                  "Food and dining preferences",
                  "Fashion and personal style trends",
                  "Travel and experience priorities",
                  "Health and wellness approaches",
                ],
              },
              {
                title: "Values & Motivations",
                items: [
                  "Social causes and activism interests",
                  "Career aspirations and motivations",
                  "Community and belonging needs",
                  "Personal development priorities",
                  "Financial goals and concerns",
                ],
              },
              {
                title: "Campus Trends",
                items: [
                  "Emerging social activities and events",
                  "Popular campus services and amenities",
                  "Student organization participation",
                  "On-campus vs. off-campus preferences",
                  "Transportation and mobility patterns",
                ],
              },
              {
                title: "Media & Content",
                items: [
                  "Content format preferences (video, audio, text)",
                  "Influencer impact and credibility factors",
                  "Entertainment consumption patterns",
                  "News and information sources",
                  "Content creation and sharing behaviors",
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 mt-1 flex-shrink-0"
                        >
                          <path
                            d="M5 12L9 16L19 6"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-Time Data Advantages Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Real-Time Data Advantage</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover how Dreamclerk's real-time student data provides a competitive edge in understanding and engaging
              with Gen Z.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <DoodleCard className="h-full p-8">
                <h3 className="text-2xl font-bold mb-6">Traditional Market Research</h3>
                <ul className="space-y-4">
                  {[
                    "Static snapshots that quickly become outdated",
                    "Relies on what people say they do, not what they actually do",
                    "Often based on small sample sizes with limited diversity",
                    "Expensive and time-consuming to conduct regularly",
                    "Typically focuses on broad demographics rather than specific contexts",
                    "Results often influenced by research environment and framing",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 mt-1 flex-shrink-0 text-red-500"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </DoodleCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <DoodleCard className="h-full p-8" doodle="stars">
                <h3 className="text-2xl font-bold mb-6">Dreamclerk Real-Time Data</h3>
                <ul className="space-y-4">
                  {[
                    "Continuous stream of fresh insights that evolve with trends",
                    "Based on actual behaviors and experiences, not just stated preferences",
                    "Large, diverse sample of students across different institutions",
                    "Cost-effective access to ongoing data without repeated research costs",
                    "Contextual insights specific to campus environments and student life",
                    "Natural data collection in authentic environments",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 mt-1 flex-shrink-0 text-green-500"
                      >
                        <path
                          d="M5 12L9 16L19 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </DoodleCard>
            </motion.div>
          </div>

          <div className="bg-white border-2 border-black rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Real-Time Data in Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Trend Identification",
                  description:
                    "Identify emerging trends 3-6 months before they appear in traditional market research, giving you a first-mover advantage.",
                  icon: TrendingUp,
                },
                {
                  title: "Campaign Optimization",
                  description:
                    "Adjust messaging and targeting in real-time based on actual student responses and engagement patterns.",
                  icon: Target,
                },
                {
                  title: "Product Development",
                  description:
                    "Develop products and features informed by authentic student needs and preferences as they evolve.",
                  icon: PieChart,
                },
              ].map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-gray-50 border-2 border-black p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <example.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{example.title}</h4>
                  <p className="text-gray-700">{example.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Companies Use Our Data</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Explore how different companies are leveraging Dreamclerk's real-time student data to drive innovation and
              engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Fashion Brand Discovers Campus Micro-Trends",
                description:
                  "A leading fashion brand used Dreamclerk data to identify emerging style preferences among college students months before they appeared on social media. This allowed them to adjust their upcoming collection and marketing strategy, resulting in a 32% increase in Gen Z engagement.",
                results: [
                  "Identified 5 micro-trends before mainstream visibility",
                  "Adjusted product development for upcoming season",
                  "Created targeted campus ambassador program",
                  "32% increase in Gen Z engagement metrics",
                  "18% higher conversion rate on campus-focused campaigns",
                ],
              },
              {
                title: "Food Delivery App Optimizes Campus Experience",
                description:
                  "A food delivery platform leveraged Dreamclerk's real-time data to understand student dining patterns and pain points. By redesigning their app experience specifically for campus users, they saw a 45% increase in student orders and significantly improved retention.",
                results: [
                  "Identified key ordering times and group ordering patterns",
                  "Developed campus-specific features based on student feedback",
                  "Created targeted promotions aligned with student schedules",
                  "45% increase in orders from campus locations",
                  "28% improvement in student user retention",
                ],
              },
              {
                title: "Marketing Agency Creates Authentic Gen Z Campaign",
                description:
                  "An agency working with a tech client used Dreamclerk data to develop a campus marketing campaign that authentically resonated with students. By understanding actual student language, concerns, and digital behaviors, they created content that achieved 3x the engagement of previous campaigns.",
                results: [
                  "Developed authentic messaging based on actual student conversations",
                  "Identified key digital touchpoints for campaign distribution",
                  "Created content formats aligned with student preferences",
                  "3x higher engagement than previous campaigns",
                  "40% increase in positive brand sentiment among Gen Z",
                ],
              },
              {
                title: "Social Platform Enhances Student Features",
                description:
                  "A social media platform used Dreamclerk insights to develop new features specifically addressing student communication needs. By understanding how students actually use social platforms for academic and social coordination, they created tools that drove a 27% increase in daily active users among college students.",
                results: [
                  "Identified unmet communication needs in campus environments",
                  "Developed new features addressing student-specific use cases",
                  "Created campus-focused onboarding experience",
                  "27% increase in daily active users among college demographic",
                  "22% higher time spent in app by student users",
                ],
              },
            ].map((caseStudy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-8" doodle={index % 2 === 0 ? "stars" : "circles"}>
                  <h3 className="text-2xl font-bold mb-4">{caseStudy.title}</h3>
                  <p className="text-gray-700 mb-6">{caseStudy.description}</p>

                  <p className="font-bold text-gray-700 mb-2">Results:</p>
                  <ul className="space-y-2">
                    {caseStudy.results.map((result, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 mt-1 flex-shrink-0"
                        >
                          <path
                            d="M5 12L9 16L19 6"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get answers to common questions about Dreamclerk's data for companies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How is the data collected?",
                answer:
                  "Data is collected through our platform where students voluntarily share their daily college experiences. All students explicitly consent to having their anonymized data used for business insights and research purposes.",
              },
              {
                question: "Is the data GDPR and CCPA compliant?",
                answer:
                  "Yes, all our data collection and processing practices comply with GDPR, CCPA, and other relevant privacy regulations. We maintain strict data governance protocols.",
              },
              {
                question: "How is the data structured?",
                answer:
                  "Data is pre-processed, categorized, and structured according to industry standards. We provide both raw and processed formats, with comprehensive metadata and documentation.",
              },
              {
                question: "Can we request custom data sets?",
                answer:
                  "Yes, we can create custom data sets focused on specific categories, demographics, or topics based on your business needs.",
              },
              {
                question: "How often is new data available?",
                answer:
                  "We provide continuous data streams with new student experiences added daily. Partners can access updates on a schedule that works for their business cycles.",
              },
              {
                question: "How do you ensure data quality?",
                answer:
                  "We employ multiple quality assurance processes, including automated validation, human review, and statistical analysis to ensure the data is accurate, relevant, and valuable.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <DoodleBackground className="py-20 px-4 md:px-6 lg:px-8" density="medium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Understand Gen Z Like Never Before?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join forward-thinking companies that are using Dreamclerk's structured student data to create authentic
            connections with the next generation.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link href="/how-it-works">
              <DoodleButton size="lg" className="px-8 py-6 text-lg">
                Coming Soon
              </DoodleButton>
            </Link>
          </motion.div>
        </motion.div>
      </DoodleBackground>
    </main>
  )
}
