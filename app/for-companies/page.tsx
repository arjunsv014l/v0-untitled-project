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
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import FAQAccordion from "@/components/ui/faq-accordion"
import CTABanner from "@/components/ui/cta-banner"
import CompaniesIllustration from "@/components/illustrations/companies-illustration"
import { useEffect } from "react"

export default function ForCompaniesPage() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b-2 border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
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
        </div>
      </div>

      {/* Hero Section */}
      <DoodleBackground className="pt-24 pb-16 bg-gradient-to-b from-amber-50 to-white" density="medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
                <span className="font-medium">For Brands & Agencies</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Real-Time Student Data for Authentic Engagement</h1>

              <p className="text-lg text-gray-700 mb-8">
                Access structured, authentic student experiences to understand Gen Z, develop targeted campaigns, and
                create products that resonate with the next generation of consumers.
              </p>

              <DoodleButton size="lg">Request Demo</DoodleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <DoodleCard className="p-8" doodle="squiggles">
                <CompaniesIllustration />
              </DoodleCard>
            </motion.div>
          </div>
        </div>
      </DoodleBackground>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Key Advantages"
            title="Why Companies Choose Dreamclerk"
            description="Access high-quality, structured student data that powers authentic engagement with Gen Z audiences and drives innovation."
            align="center"
            theme="tertiary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Real-Time Insights",
                description:
                  "Access authentic, categorized student experiences that provide real-time insights into Gen Z preferences, behaviors, and trends.",
                theme: "tertiary",
              },
              {
                icon: Shield,
                title: "Ethical & Compliant",
                description:
                  "All data is ethically sourced with explicit consent and anonymized to protect privacy while maintaining utility.",
                theme: "tertiary",
              },
              {
                icon: Zap,
                title: "Pre-Processed & Structured",
                description:
                  "Save time with data that's already categorized, cleaned, and structured for immediate business application.",
                theme: "tertiary",
              },
              {
                icon: Brain,
                title: "Gen Z Expertise",
                description:
                  "Gain deep understanding of student experiences across academics, social life, purchasing habits, and digital engagement.",
                theme: "tertiary",
              },
              {
                icon: TrendingUp,
                title: "Trend Forecasting",
                description:
                  "Identify emerging trends before they go mainstream with continuous streams of fresh data from campus environments.",
                theme: "tertiary",
              },
              {
                icon: Target,
                title: "Targeted Engagement",
                description:
                  "Create more effective campaigns and products with insights directly from your target demographic.",
                theme: "tertiary",
              },
            ].map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                delay={index}
                theme={benefit.theme as any}
                doodle={index % 3 === 0 ? "stars" : index % 3 === 1 ? "circles" : "lines"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Data Advantage Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Competitive Edge"
            title="The Real-Time Data Advantage"
            description="Discover how Dreamclerk's real-time student data provides a competitive edge in understanding and engaging with Gen Z."
            align="center"
            theme="tertiary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                  <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <example.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{example.title}</h4>
                  <p className="text-gray-700">{example.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Industry Solutions"
            title="How Different Companies Benefit"
            description="Discover how different types of companies are leveraging Dreamclerk data to create innovative solutions and authentic engagement."
            align="center"
            theme="tertiary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
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
                  <div className="bg-amber-50 border-2 border-amber-200 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <companyType.icon className="h-6 w-6 text-amber-600" />
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

      {/* Case Studies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Success Stories"
            title="How Companies Use Our Data"
            description="Explore how different companies are leveraging Dreamclerk's real-time student data to drive innovation and engagement."
            align="center"
            theme="tertiary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Common Questions"
            title="Frequently Asked Questions"
            description="Get answers to common questions about Dreamclerk's data for companies."
            align="center"
            theme="tertiary"
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <FAQAccordion
              items={[
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
              ]}
              theme="tertiary"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTABanner
        title="Ready to Understand Gen Z Like Never Before?"
        description="Join forward-thinking companies that are using Dreamclerk's structured student data to create authentic connections with the next generation."
        buttonText="Request Demo"
        buttonLink="/request-demo"
        theme="tertiary"
      />
    </main>
  )
}
