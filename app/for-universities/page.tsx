"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, BarChart, Users, Lightbulb, Building, Home, Award } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import FAQAccordion from "@/components/ui/faq-accordion"
import CTABanner from "@/components/ui/cta-banner"
import ImageFeature from "@/components/ui/image-feature"
import UniversitiesIllustration from "@/components/illustrations/universities-illustration"
import { useEffect } from "react"

export default function ForUniversitiesPage() {
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
                const sectionPosition = document.getElementById("for-universities")?.offsetTop || 0
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
      <DoodleBackground className="pt-24 pb-16 bg-gradient-to-b from-emerald-50 to-white" density="medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

              <DoodleButton size="lg">Partner With Us</DoodleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <DoodleCard className="p-8" doodle="lines">
                <UniversitiesIllustration />
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
            title="How Dreamclerk Benefits Universities"
            description="Gain unprecedented access to authentic student experiences and transform them into actionable insights for your institution."
            align="center"
            theme="quaternary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart,
                title: "Data-Driven Decisions",
                description:
                  "Access real-time, structured student insights to inform strategic decisions about campus life, academic offerings, and student services.",
                theme: "quaternary",
              },
              {
                icon: Users,
                title: "Improve Student Retention",
                description:
                  "Identify factors affecting student satisfaction and address issues before they impact retention rates.",
                theme: "quaternary",
              },
              {
                icon: Lightbulb,
                title: "Enhance Academic Experience",
                description:
                  "Gain insights into course effectiveness, teaching methods, and curriculum relevance from the student perspective.",
                theme: "quaternary",
              },
              {
                icon: Building,
                title: "Optimize Campus Resources",
                description:
                  "Allocate resources more effectively based on actual student usage patterns and preferences.",
                theme: "quaternary",
              },
              {
                icon: BarChart,
                title: "Track Improvement Metrics",
                description:
                  "Measure the impact of changes and initiatives with before-and-after student experience data.",
                theme: "quaternary",
              },
              {
                icon: Users,
                title: "Strengthen Community",
                description:
                  "Foster a stronger campus community by addressing student needs and creating more engaging experiences.",
                theme: "quaternary",
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

      {/* Implementation Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Simple Process"
            title="How It Works for Universities"
            description="Dreamclerk provides a seamless way to access and utilize authentic student experiences."
            align="center"
            theme="quaternary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="bg-white border-2 border-black rounded-lg p-6 h-full">
                  <div className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="font-bold text-emerald-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Insights Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Actionable Insights"
            title="Data That Drives Improvement"
            description="Dreamclerk provides comprehensive insights across all aspects of the student experience."
            align="center"
            theme="quaternary"
          />

          <div className="mt-12">
            <ImageFeature
              image="/university-campus-students.png"
              alt="Data visualization of student insights"
              title="Comprehensive Student Experience Data"
              description="Access insights across multiple dimensions of student life to inform strategic decisions."
              features={[
                {
                  icon: Building,
                  text: "Campus Life: Housing preferences, facility usage, social activities, and community engagement",
                },
                {
                  icon: Lightbulb,
                  text: "Academics: Course feedback, teaching methods, study resources, and curriculum relevance",
                },
                {
                  icon: Users,
                  text: "Student Services: Support program effectiveness, accessibility, and improvement opportunities",
                },
                {
                  icon: Award,
                  text: "Career Development: Internship experiences, career preparation, and employment outcomes",
                },
              ]}
              imagePosition="right"
              theme="quaternary"
              doodle="waves"
            />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Success Stories"
            title="University Success Stories"
            description="See how other institutions have transformed their campus experience with Dreamclerk insights."
            align="center"
            theme="quaternary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Common Questions"
            title="Frequently Asked Questions"
            description="Get answers to common questions about how Dreamclerk works for universities."
            align="center"
            theme="quaternary"
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <FAQAccordion
              items={[
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
              ]}
              theme="quaternary"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTABanner
        title="Ready to Transform Your Campus?"
        description="Join forward-thinking institutions that are using authentic student insights to create better campus experiences and improve outcomes."
        buttonText="Partner With Us"
        buttonLink="/partner"
        theme="quaternary"
      />
    </main>
  )
}
