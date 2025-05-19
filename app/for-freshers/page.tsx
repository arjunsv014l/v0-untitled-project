"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, BookOpen, Award, Users, CheckCircle, Zap, Brain, Home, Lightbulb } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import TestimonialCard from "@/components/ui/testimonial-card"
import FAQAccordion from "@/components/ui/faq-accordion"
import CTABanner from "@/components/ui/cta-banner"
import FreshersIllustration from "@/components/illustrations/freshers-illustration"
import { useEffect } from "react"

export default function ForFreshersPage() {
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
                const sectionPosition = document.getElementById("for-freshers")?.offsetTop || 0
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
      <DoodleBackground className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white" density="medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
                <span className="font-medium">For Freshers</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Start Your College Journey with Confidence</h1>

              <p className="text-lg text-gray-700 mb-8">
                Dreamclerk helps freshers navigate the exciting but sometimes overwhelming world of higher education
                with real insights from students who've been there.
              </p>

              <DoodleButton size="lg">Register Now</DoodleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <DoodleCard className="p-8" doodle="stars">
                <FreshersIllustration />
              </DoodleCard>
            </motion.div>
          </div>
        </div>
      </DoodleBackground>

      {/* Key Resources Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Essential Resources"
            title="Everything You Need for Freshman Success"
            description="Dreamclerk provides comprehensive support for every aspect of your freshman experience."
            align="center"
            theme="primary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Success",
                description: "Get insider knowledge on courses, professors, study strategies, and academic resources.",
                icon: BookOpen,
                items: [
                  "Course selection guidance from experienced students",
                  "Professor reviews and teaching style insights",
                  "Study group connections and resource sharing",
                  "Academic support services navigation",
                ],
              },
              {
                title: "Campus Life",
                description: "Discover the ins and outs of campus living, from dorm life to social events.",
                icon: Users,
                items: [
                  "Dorm life essentials and roommate tips",
                  "Campus events calendar and highlights",
                  "Club and organization recommendations",
                  "Campus dining insights and hidden gems",
                ],
              },
              {
                title: "Social Connection",
                description: "Build your college community with strategies for making friends and connections.",
                icon: Brain,
                items: [
                  "First-week friendship opportunities",
                  "Interest-based connection methods",
                  "Peer mentorship matching",
                  "Balancing social life and academics",
                ],
              },
            ].map((resource, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6" doodle={i === 1 ? "circles" : "lines"}>
                  <div className="flex flex-col h-full">
                    <div className="bg-blue-50 border-2 border-blue-200 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <resource.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                    <ul className="space-y-2 mt-auto">
                      {resource.items.map((item, j) => (
                        <li key={j} className="flex items-start">
                          <div className="mr-2 mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          </div>
                          <span className="text-gray-700 text-sm">{item}</span>
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

      {/* Freshman Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Insider Knowledge"
            title="Freshman Tips & Insights"
            description="Learn from students who've been in your shoes with these practical tips for your first year."
            align="center"
            theme="primary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                tip: "Don't be afraid to visit professors during office hours - it's one of the most underutilized resources that can dramatically improve your academic performance.",
                author: "Michael J.",
                role: "Junior, Computer Science",
              },
              {
                tip: "Join at least one club or organization in your first semester. It's the fastest way to make friends with similar interests and feel connected to campus.",
                author: "Sophia L.",
                role: "Sophomore, Psychology",
              },
              {
                tip: "Create a budget in your first week. College expenses add up quickly, and having a plan will save you stress later in the semester.",
                author: "Jamal K.",
                role: "Senior, Business Administration",
              },
              {
                tip: "Explore the campus library early. Beyond books, they often have study rooms, technology rentals, and research specialists to help you.",
                author: "Emma T.",
                role: "Junior, English Literature",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <Lightbulb className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 mb-4">{item.tip}</p>
                      <div className="font-bold">{item.author}</div>
                      <div className="text-sm text-gray-600">{item.role}</div>
                    </div>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Why Choose Dreamclerk"
            title="How Dreamclerk Helps Freshers"
            description="Starting college is a major life transition. Dreamclerk provides the insights and support you need to make the most of your freshman year."
            align="center"
            theme="primary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Real Student Insights",
                description:
                  "Access authentic experiences from students at your university to understand what college life is really like.",
                theme: "primary",
              },
              {
                icon: Users,
                title: "Community Connection",
                description: "Connect with a network of peers and upperclassmen who can offer guidance and friendship.",
                theme: "primary",
              },
              {
                icon: Award,
                title: "Early Rewards",
                description:
                  "Start earning rewards from day one by sharing your own freshman experiences and contributing to the community.",
                theme: "primary",
              },
              {
                icon: CheckCircle,
                title: "Course Selection Help",
                description:
                  "Get recommendations on which courses to take based on real student feedback and experiences.",
                theme: "primary",
              },
              {
                icon: Zap,
                title: "Campus Life Navigation",
                description: "Learn about clubs, events, and social opportunities that match your interests and goals.",
                theme: "primary",
              },
              {
                icon: Brain,
                title: "Future Planning",
                description:
                  "Start building your academic and career path with insights from students who've successfully navigated similar journeys.",
                theme: "primary",
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

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Success Stories"
            title="Hear From Other Freshers"
            description="Don't just take our word for it. Here's what other first-year students have to say about Dreamclerk."
            align="center"
            theme="primary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Dreamclerk helped me find the right clubs to join and connect with seniors who gave me amazing advice about which professors to take classes with.",
                name: "Alex J.",
                role: "Freshman",
                organization: "Stanford University",
              },
              {
                quote:
                  "As a first-gen college student, I had no idea what to expect. The insights from other students on Dreamclerk made me feel prepared and confident.",
                name: "Maya T.",
                role: "Freshman",
                organization: "University of Michigan",
              },
              {
                quote:
                  "I earned enough rewards in my first semester to get a free coffee maker! Plus, the community helped me navigate the overwhelming first few weeks.",
                name: "Jamal K.",
                role: "Freshman",
                organization: "NYU",
              },
            ].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                organization={testimonial.organization}
                delay={index}
                theme="primary"
              />
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
            description="Get answers to common questions about how Dreamclerk works for freshers."
            align="center"
            theme="primary"
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <FAQAccordion
              items={[
                {
                  question: "When should I join Dreamclerk?",
                  answer:
                    "The best time to join is before or during your first semester. This gives you access to valuable insights when you need them most, and allows you to start earning rewards right away.",
                },
                {
                  question: "What kind of experiences should I share?",
                  answer:
                    "Share your authentic daily experiences - from classes and studying to social events and campus life. Your insights help future students and contribute to improving the college experience.",
                },
                {
                  question: "Is my information kept private?",
                  answer:
                    "Yes, all shared experiences are anonymized. Your privacy is our priority, and you control what you share and how it's used.",
                },
                {
                  question: "How do I earn rewards as a freshman?",
                  answer:
                    "You earn rewards by consistently sharing your experiences, providing quality insights, and engaging with the community. The more you contribute, the more you earn.",
                },
                {
                  question: "Can I connect with specific upperclassmen for advice?",
                  answer:
                    "Yes, Dreamclerk offers mentorship matching that connects freshers with upperclassmen who share similar interests, majors, or career goals.",
                },
                {
                  question: "How is Dreamclerk different from social media?",
                  answer:
                    "Unlike social media, Dreamclerk is specifically designed for educational insights and community building. We focus on meaningful exchanges rather than likes or followers.",
                },
              ]}
              theme="primary"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTABanner
        title="Ready to Start Your College Journey?"
        description="Join Dreamclerk today and get the insights, community, and rewards that will help you make the most of your freshman year."
        buttonText="Register Now"
        buttonLink="/register"
        theme="primary"
      />
    </main>
  )
}
