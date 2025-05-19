"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, DollarSign, BarChart, Shield, Zap, Home, Users, Award } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import TestimonialCard from "@/components/ui/testimonial-card"
import FAQAccordion from "@/components/ui/faq-accordion"
import CTABanner from "@/components/ui/cta-banner"
import StatCard from "@/components/ui/stat-card"
import StudentsIllustration from "@/components/illustrations/students-illustration"
import { useEffect } from "react"

export default function ForStudentsPage() {
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
                const sectionPosition = document.getElementById("for-students")?.offsetTop || 0
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
      <DoodleBackground className="pt-24 pb-16 bg-gradient-to-b from-purple-50 to-white" density="medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6">
                <span className="font-medium">For Students</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Monetize Your College Experience</h1>

              <p className="text-lg text-gray-700 mb-8">
                Turn your daily college life into valuable insights and earn rewards while helping future students make
                informed decisions.
              </p>

              <DoodleButton size="lg">Start Earning Today</DoodleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <DoodleCard className="p-8" doodle="circles">
                <StudentsIllustration />
              </DoodleCard>
            </motion.div>
          </div>
        </div>
      </DoodleBackground>

      {/* Earnings Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Earning Potential"
            title="How Much Can You Earn?"
            description="Dreamclerk makes it easy to monetize your daily college experiences while helping future students make better decisions."
            align="center"
            theme="secondary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon={DollarSign} value="$200+" label="Average Monthly Earnings" theme="secondary" delay={0} />
            <StatCard icon={Users} value="10K+" label="Active Student Contributors" theme="secondary" delay={1} />
            <StatCard icon={Zap} value="5-10" label="Minutes Per Day" theme="secondary" delay={2} />
            <StatCard icon={Award} value="50+" label="Reward Options" theme="secondary" delay={3} />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Simple Process"
            title="How Students Earn with Dreamclerk"
            description="A simple three-step process to turn your everyday college experiences into rewards."
            align="center"
            theme="secondary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Share Your Experiences",
                description:
                  "Spend just a few minutes each day sharing your authentic college experiences through our simple journaling interface.",
                icon: Users,
                number: "01",
                theme: "secondary",
                doodle: "stars",
              },
              {
                title: "Build Your Profile",
                description:
                  "Create a digital portfolio of your contributions that showcases your insights and impact on the community.",
                icon: BarChart,
                number: "02",
                theme: "secondary",
                doodle: "circles",
              },
              {
                title: "Earn Rewards",
                description:
                  "Convert your insights into Student-Created Data Tokens (SCDTs) that can be exchanged for real rewards.",
                icon: DollarSign,
                number: "03",
                theme: "secondary",
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
                  <div className="bg-purple-50 border-2 border-purple-200 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="font-bold text-purple-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Key Benefits"
            title="Why Share Your Experiences"
            description="Beyond earning rewards, there are many reasons to contribute to the Dreamclerk community."
            align="center"
            theme="secondary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Monetize Your Time",
                description: "Turn your everyday college experiences into a source of income and rewards.",
                theme: "secondary",
              },
              {
                icon: BarChart,
                title: "Build Your Profile",
                description:
                  "Create a digital portfolio of your contributions that showcases your insights and impact.",
                theme: "secondary",
              },
              {
                icon: Shield,
                title: "Privacy Protected",
                description:
                  "All shared experiences are anonymized to protect your privacy while still providing value.",
                theme: "secondary",
              },
              {
                icon: Zap,
                title: "Quick & Easy",
                description:
                  "Our intuitive interface makes sharing your experiences quick and simple - just a few minutes a day.",
                theme: "secondary",
              },
              {
                icon: DollarSign,
                title: "Flexible Rewards",
                description:
                  "Choose from a variety of reward options including gift cards, campus services, and exclusive opportunities.",
                theme: "secondary",
              },
              {
                icon: BarChart,
                title: "Impact Tracking",
                description:
                  "See how your contributions are helping future students and improving the college experience.",
                theme: "secondary",
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Success Stories"
            title="Hear From Other Students"
            description="See how other students are benefiting from sharing their experiences on Dreamclerk."
            align="center"
            theme="secondary"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I've earned over $500 in rewards this semester just by sharing my daily experiences. It takes me less than 10 minutes a day!",
                name: "Taylor R.",
                role: "Junior",
                organization: "UC Berkeley",
              },
              {
                quote:
                  "As a student who works part-time, the extra income from Dreamclerk has been a game-changer for my budget. Plus, I love knowing I'm helping future students.",
                name: "Jordan L.",
                role: "Sophomore",
                organization: "University of Texas",
              },
              {
                quote:
                  "The rewards are great, but what I value most is seeing how my experiences are helping incoming students make better decisions about their education.",
                name: "Sam W.",
                role: "Senior",
                organization: "Boston College",
              },
            ].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                organization={testimonial.organization}
                delay={index}
                theme="secondary"
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
            description="Get answers to common questions about how Dreamclerk works for students."
            align="center"
            theme="secondary"
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <FAQAccordion
              items={[
                {
                  question: "How much can I earn with Dreamclerk?",
                  answer:
                    "Earnings vary based on consistency, quality, and depth of your contributions. Active students typically earn between $50-$200 per month in rewards.",
                },
                {
                  question: "How much time does it take each day?",
                  answer:
                    "Most students spend just 5-10 minutes per day sharing their experiences. Our interface is designed to be quick and intuitive.",
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
                  question: "How do I redeem my rewards?",
                  answer:
                    "You can exchange your earned tokens for gift cards, campus services, exclusive opportunities, and more through our rewards marketplace.",
                },
                {
                  question: "Can I see how my insights are helping others?",
                  answer:
                    "Yes, Dreamclerk provides impact metrics that show how your contributions are helping future students and improving the college experience.",
                },
              ]}
              theme="secondary"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTABanner
        title="Ready to Start Earning?"
        description="Join thousands of students who are monetizing their college experiences and making a difference for future generations."
        buttonText="Start Earning Today"
        buttonLink="/register"
        theme="secondary"
      />
    </main>
  )
}
