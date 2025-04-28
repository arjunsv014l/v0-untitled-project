"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, BarChart, Users, Lightbulb, Building, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useEffect } from "react" // Add this import

export default function ForUniversitiesPage() {
  // Add this useEffect to scroll to top when the page loads
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
                const sectionPosition = document.getElementById("for-universities")?.offsetTop || 0
                localStorage.setItem("landingPageScrollPosition", sectionPosition.toString())
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
                <span className="font-medium">For Universities</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Campus with Real Student Insights</h1>

              <p className="text-lg text-gray-700 mb-8">
                Access authentic, structured student experiences to make data-driven decisions that improve campus life,
                academic offerings, and student satisfaction.
              </p>

              <Link href="/how-it-works">
                <DoodleButton size="lg">Partner With Us</DoodleButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <DoodleCard className="p-8" doodle="lines">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* University building */}
                    <g transform="translate(125, 80)">
                      <rect x="0" y="50" width="150" height="120" stroke="black" strokeWidth="2" fill="white" />
                      <path d="M75 0L150 50H0L75 0Z" stroke="black" strokeWidth="2" fill="white" />
                      <rect x="30" y="80" width="20" height="30" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="65" y="80" width="20" height="30" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="100" y="80" width="20" height="30" stroke="black" strokeWidth="1.5" fill="white" />
                      <rect x="65" y="130" width="20" height="40" stroke="black" strokeWidth="1.5" fill="white" />
                      <path d="M0 60H150" stroke="black" strokeWidth="1.5" />
                      <path d="M0 150H150" stroke="black" strokeWidth="1.5" />
                      <path d="M75 0V50" stroke="black" strokeWidth="1.5" strokeDasharray="4 4" />
                    </g>

                    {/* Charts */}
                    <g transform="translate(80, 250)">
                      <rect x="0" y="0" width="80" height="80" stroke="black" strokeWidth="1.5" fill="white" />
                      <path d="M10 10V70" stroke="black" strokeWidth="1.5" />
                      <path d="M10 70H70" stroke="black" strokeWidth="1.5" />
                      <path d="M20 50L30 30L40 40L50 20L60 35" stroke="black" strokeWidth="1.5" />
                      <circle cx="20" cy="50" r="3" stroke="black" strokeWidth="1" fill="white" />
                      <circle cx="30" cy="30" r="3" stroke="black" strokeWidth="1" fill="white" />
                      <circle cx="40" cy="40" r="3" stroke="black" strokeWidth="1" fill="white" />
                      <circle cx="50" cy="20" r="3" stroke="black" strokeWidth="1" fill="white" />
                      <circle cx="60" cy="35" r="3" stroke="black" strokeWidth="1" fill="white" />
                    </g>

                    <g transform="translate(240, 250)">
                      <rect x="0" y="0" width="80" height="80" stroke="black" strokeWidth="1.5" fill="white" />
                      <path d="M10 10V70" stroke="black" strokeWidth="1.5" />
                      <path d="M10 70H70" stroke="black" strokeWidth="1.5" />
                      <rect x="20" y="30" width="10" height="40" stroke="black" strokeWidth="1" fill="white" />
                      <rect x="35" y="20" width="10" height="50" stroke="black" strokeWidth="1" fill="white" />
                      <rect x="50" y="40" width="10" height="30" stroke="black" strokeWidth="1" fill="white" />
                    </g>

                    {/* Decorative elements */}
                    <path d="M60 60L70 50L80 60L70 70L60 60Z" stroke="black" strokeWidth="1" fill="white" />
                    <path d="M320 60L330 50L340 60L330 70L320 60Z" stroke="black" strokeWidth="1" fill="white" />
                    <path d="M60 340L70 330L80 340L70 350L60 340Z" stroke="black" strokeWidth="1" fill="white" />
                    <path d="M320 340L330 330L340 340L330 350L320 340Z" stroke="black" strokeWidth="1" fill="white" />
                  </svg>
                </div>
              </DoodleCard>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Dreamclerk Benefits Universities</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Gain unprecedented access to authentic student experiences and transform them into actionable insights for
              your institution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart,
                title: "Data-Driven Decisions",
                description:
                  "Access real-time, structured student insights to inform strategic decisions about campus life, academic offerings, and student services.",
              },
              {
                icon: Users,
                title: "Improve Student Retention",
                description:
                  "Identify factors affecting student satisfaction and address issues before they impact retention rates.",
              },
              {
                icon: Lightbulb,
                title: "Enhance Academic Experience",
                description:
                  "Gain insights into course effectiveness, teaching methods, and curriculum relevance from the student perspective.",
              },
              {
                icon: Building,
                title: "Optimize Campus Resources",
                description:
                  "Allocate resources more effectively based on actual student usage patterns and preferences.",
              },
              {
                icon: BarChart,
                title: "Track Improvement Metrics",
                description:
                  "Measure the impact of changes and initiatives with before-and-after student experience data.",
              },
              {
                icon: Users,
                title: "Strengthen Community",
                description:
                  "Foster a stronger campus community by addressing student needs and creating more engaging experiences.",
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

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works for Universities</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Dreamclerk provides a seamless way to access and utilize authentic student experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Partner with Dreamclerk",
                description:
                  "Establish a partnership that gives your institution access to anonymized student insights while maintaining privacy and ethical standards.",
              },
              {
                number: "02",
                title: "Access Structured Insights",
                description:
                  "Receive categorized, actionable insights about student experiences across academics, campus life, facilities, and more.",
              },
              {
                number: "03",
                title: "Implement & Measure",
                description:
                  "Use the insights to implement changes and measure their impact with continuous feedback from the student community.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex flex-col h-full">
                    <div className="bg-white border-2 border-black p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-700 flex-grow">{step.description}</p>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">University Success Stories</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how other institutions have transformed their campus experience with Dreamclerk insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Midwest State University",
                challenge: "Facing declining enrollment and student satisfaction scores",
                solution: "Used Dreamclerk insights to identify key pain points in student experience",
                results: [
                  "15% improvement in student satisfaction scores",
                  "8% increase in retention rates",
                  "Redesigned campus facilities based on actual usage patterns",
                  "Created new academic support programs addressing student needs",
                ],
              },
              {
                title: "Coastal Liberal Arts College",
                challenge: "Struggling to understand why certain programs had low enrollment",
                solution: "Leveraged Dreamclerk data to understand student perceptions and expectations",
                results: [
                  "Restructured curriculum based on student feedback",
                  "20% increase in applications to previously struggling programs",
                  "Improved faculty-student communication channels",
                  "Developed new interdisciplinary programs based on student interests",
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
                <DoodleCard className="h-full p-8" doodle={index === 0 ? "stars" : "circles"}>
                  <h3 className="text-2xl font-bold mb-4">{caseStudy.title}</h3>

                  <div className="mb-4">
                    <p className="font-bold text-gray-700">Challenge:</p>
                    <p className="text-gray-700">{caseStudy.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-bold text-gray-700">Solution:</p>
                    <p className="text-gray-700">{caseStudy.solution}</p>
                  </div>

                  <div>
                    <p className="font-bold text-gray-700">Results:</p>
                    <ul className="space-y-2 mt-2">
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
              Get answers to common questions about how Dreamclerk works for universities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How is student privacy protected?",
                answer:
                  "All student data is anonymized and aggregated. We follow strict privacy protocols and comply with all relevant regulations including FERPA.",
              },
              {
                question: "What types of insights can we access?",
                answer:
                  "Universities can access structured insights about academics, campus life, facilities, student services, and more - all categorized and presented in actionable formats.",
              },
              {
                question: "How much does it cost?",
                answer:
                  "We offer flexible pricing models based on institution size and needs. Contact us for a customized quote.",
              },
              {
                question: "How quickly can we implement Dreamclerk?",
                answer:
                  "Most universities can be onboarded within 4-6 weeks, with initial insights available shortly thereafter.",
              },
              {
                question: "Can we target specific areas of concern?",
                answer:
                  "Yes, we can create custom insight categories and reports focused on your institution's specific priorities and challenges.",
              },
              {
                question: "How do we encourage student participation?",
                answer:
                  "Dreamclerk handles student recruitment and incentives. We've developed effective methods to ensure high participation rates across diverse student populations.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Transform Your Campus?</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join forward-thinking institutions that are using authentic student insights to create better campus
            experiences and improve outcomes.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link href="/how-it-works">
              <DoodleButton size="lg" className="px-8 py-6 text-lg">
                Partner With Us
              </DoodleButton>
            </Link>
          </motion.div>
        </motion.div>
      </DoodleBackground>
    </main>
  )
}
