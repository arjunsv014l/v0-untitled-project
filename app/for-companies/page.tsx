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
  UserPlus,
  Star,
  Sparkles,
  Calendar,
  Camera,
  Search,
} from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import SignInModal from "@/components/sign-in-modal"
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
                <span className="font-medium">For AI Companies</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Partner With Students for Better Data & Engagement
              </h1>

              <p className="text-lg text-gray-700 mb-8">
                Connect with authentic student experiences to enhance your products, services, and marketing strategies,
                whether you're an AI company, social agency, or brand.
              </p>

              <SignInModal trigger={<DoodleButton size="lg">Partner With Us</DoodleButton>} />
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
              Access high-quality, structured student data and engagement opportunities that power the next generation
              of products, services, and marketing campaigns.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "AI Companies: Training Data",
                description:
                  "Access authentic, categorized student experiences that provide rich, contextual data for training AI models.",
              },
              {
                icon: Zap,
                title: "Social Agencies: Authentic Engagement",
                description:
                  "Connect with real student communities for genuine social campaigns and influencer partnerships.",
              },
              {
                icon: Brain,
                title: "Brands: Gen Z Insights",
                description:
                  "Gain deep understanding of student preferences, trends, and purchasing behaviors to inform product development.",
              },
              {
                icon: Shield,
                title: "Ethical & Compliant",
                description:
                  "All data is ethically sourced with explicit consent and anonymized to protect privacy while maintaining utility.",
              },
              {
                icon: Database,
                title: "Continuous Data Flow",
                description:
                  "Receive ongoing streams of fresh data to continuously improve your strategies and products.",
              },
              {
                icon: Shield,
                title: "Transparent Provenance",
                description:
                  "Know exactly where your data comes from with complete transparency about collection methods.",
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

      {/* Use Cases Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Partnership Opportunities</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover how different types of companies are leveraging Dreamclerk to create innovative solutions and
              effective campaigns.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "AI & EdTech Companies",
                description:
                  "Train AI models that understand student learning patterns and preferences to deliver truly personalized educational experiences.",
                applications: [
                  "Adaptive learning algorithms that adjust to individual student needs",
                  "Content recommendation systems based on real student preferences",
                  "Personalized study plans optimized for different learning styles",
                  "Early intervention systems for academic challenges",
                ],
              },
              {
                title: "Social Media Agencies",
                description:
                  "Create authentic campaigns that resonate with Gen Z through direct access to student influencers and communities.",
                applications: [
                  "Connect with student micro-influencers across multiple campuses",
                  "Develop campus ambassador programs with real community leaders",
                  "Test campaign concepts with real student audiences",
                  "Access authentic student-generated content for your campaigns",
                ],
              },
              {
                title: "Consumer Brands & Retail",
                description:
                  "Understand the preferences and behaviors of the college student demographic to create products and experiences they love.",
                applications: [
                  "Product testing and feedback from your target student demographic",
                  "Trend identification before they hit mainstream markets",
                  "Campus-specific marketing opportunities and events",
                  "Student loyalty and ambassador programs for sustained engagement",
                ],
              },
              {
                title: "Market Research & Analytics Firms",
                description:
                  "Access structured data about student behaviors, preferences, and trends to enhance your research capabilities.",
                applications: [
                  "Longitudinal studies of student behavior and preferences",
                  "Cross-campus comparative research on demographic trends",
                  "Real-time sentiment analysis on topics relevant to Gen Z",
                  "Custom research panels of students across different institutions",
                ],
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-8" doodle={index % 2 === 0 ? "stars" : "circles"}>
                  <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                  <p className="text-gray-700 mb-6">{useCase.description}</p>

                  <p className="font-bold text-gray-700 mb-2">Opportunities:</p>
                  <ul className="space-y-2">
                    {useCase.applications.map((application, i) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Available Data & Engagement Categories</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Dreamclerk provides structured student data and engagement opportunities across multiple categories, all
              ethically sourced and managed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Experiences",
                items: [
                  "Course feedback and experiences",
                  "Study habits and preferences",
                  "Academic challenges and solutions",
                  "Professor and teaching style evaluations",
                  "Learning resource utilization",
                ],
              },
              {
                title: "Campus Life",
                items: [
                  "Housing and dining experiences",
                  "Extracurricular activities",
                  "Campus facility usage patterns",
                  "Social events and community building",
                  "Transportation and accessibility",
                ],
              },
              {
                title: "Student Wellbeing",
                items: [
                  "Stress management strategies",
                  "Work-life balance approaches",
                  "Mental health challenges and resources",
                  "Physical health and wellness activities",
                  "Support system utilization",
                ],
              },
              {
                title: "Career Development",
                items: [
                  "Internship and job search experiences",
                  "Skill development activities",
                  "Networking and mentorship",
                  "Career planning and decision-making",
                  "Industry-specific preparation",
                ],
              },
              {
                title: "Financial Management",
                items: [
                  "Tuition and financial aid experiences",
                  "Budgeting and expense management",
                  "Part-time work and income sources",
                  "Financial literacy and education",
                  "Cost-saving strategies",
                ],
              },
              {
                title: "Technology Usage",
                items: [
                  "Educational technology preferences",
                  "Digital learning tool effectiveness",
                  "Online vs. in-person learning experiences",
                  "Communication platform utilization",
                  "Technology accessibility challenges",
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

      {/* Brand Partnership Examples Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Brand Partnership Examples</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how brands are already working with Dreamclerk to connect with the student demographic in authentic
              ways.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Campus Ambassador Programs",
                description:
                  "Recruit and manage student ambassadors who represent your brand on campus with authentic peer-to-peer marketing.",
                icon: UserPlus,
              },
              {
                title: "Student Influencer Campaigns",
                description:
                  "Connect with our network of student content creators who can showcase your products to their engaged followers.",
                icon: Star,
              },
              {
                title: "Focus Groups & Product Testing",
                description:
                  "Get real feedback on your products and services from demographically diverse student groups.",
                icon: Sparkles,
              },
              {
                title: "Campus Events & Activation",
                description:
                  "Create memorable on-campus experiences that generate buzz and foster genuine connections with students.",
                icon: Calendar,
              },
              {
                title: "Student Content Creation",
                description:
                  "Commission authentic student-created content that resonates with Gen Z and enhances your marketing efforts.",
                icon: Camera,
              },
              {
                title: "Custom Research Studies",
                description:
                  "Conduct tailored research on specific questions relevant to your brand's strategy and product development.",
                icon: Search,
              },
            ].map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="bg-white border-2 border-black p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <example.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{example.title}</h3>
                    <p className="text-gray-700">{example.description}</p>
                  </div>
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
              Get answers to common questions about Dreamclerk's data for AI companies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How is the data collected?",
                answer:
                  "Data is collected through our platform where students voluntarily share their daily college experiences. All students explicitly consent to having their anonymized data used for AI training purposes.",
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
                  "Yes, we can create custom data sets focused on specific categories, demographics, or topics based on your AI development needs.",
              },
              {
                question: "How often is new data available?",
                answer:
                  "We provide continuous data streams with new student experiences added daily. Partners can access updates on a schedule that works for their development cycles.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Connect with the Student Market?</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join forward-thinking companies that are using Dreamclerk's student data and engagement platform to create
            meaningful connections with the next generation.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <SignInModal
              trigger={
                <DoodleButton size="lg" className="px-8 py-6 text-lg">
                  Partner With Us
                </DoodleButton>
              }
            />
          </motion.div>
        </motion.div>
      </DoodleBackground>
    </main>
  )
}
