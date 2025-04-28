"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle, BookOpen, Users, Award, Home } from "lucide-react"
import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { useEffect } from "react"

export default function ForFreshersPage() {
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
                const sectionPosition = document.getElementById("for-freshers")?.offsetTop || 0
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
                <span className="font-medium">For Freshers</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">Start Your College Journey with Confidence</h1>

              <p className="text-lg text-gray-700 mb-8">
                Dreamclerk helps freshers navigate the exciting but sometimes overwhelming world of higher education
                with real insights from students who've been there.
              </p>

              <DoodleButton size="lg">Coming Soon</DoodleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <DoodleCard className="p-8" doodle="stars">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Graduation cap */}
                    <g transform="translate(150, 100)">
                      <rect x="0" y="10" width="100" height="20" stroke="black" strokeWidth="2" fill="white" />
                      <path d="M50 0L100 20L50 40L0 20L50 0Z" stroke="black" strokeWidth="2" fill="white" />
                      <path d="M80 25V60" stroke="black" strokeWidth="2" />
                      <path d="M70 60H90" stroke="black" strokeWidth="2" />
                    </g>

                    {/* Books */}
                    <g transform="translate(80, 200)">
                      <rect x="0" y="0" width="60" height="80" stroke="black" strokeWidth="2" fill="white" />
                      <rect x="10" y="-10" width="60" height="80" stroke="black" strokeWidth="2" fill="white" />
                      <rect x="20" y="-20" width="60" height="80" stroke="black" strokeWidth="2" fill="white" />
                      <path d="M30 10H70" stroke="black" strokeWidth="1" />
                      <path d="M30 25H70" stroke="black" strokeWidth="1" />
                      <path d="M30 40H70" stroke="black" strokeWidth="1" />
                    </g>

                    {/* Student */}
                    <g transform="translate(250, 220)">
                      <circle cx="30" cy="30" r="30" stroke="black" strokeWidth="2" fill="white" />
                      <circle cx="30" cy="20" r="15" stroke="black" strokeWidth="2" fill="white" />
                      <path d="M10 60C10 45 50 45 50 60" stroke="black" strokeWidth="2" fill="white" />
                    </g>

                    {/* Stars */}
                    <path
                      d="M50 50L60 30L70 50L90 60L70 70L60 90L50 70L30 60L50 50Z"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="white"
                    />
                    <path
                      d="M330 70L340 50L350 70L370 80L350 90L340 110L330 90L310 80L330 70Z"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="white"
                    />
                    <path
                      d="M80 320L90 300L100 320L120 330L100 340L90 360L80 340L60 330L80 320Z"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="white"
                    />
                    <path
                      d="M300 300L310 280L320 300L340 310L320 320L310 340L300 320L280 310L300 300Z"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="white"
                    />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Dreamclerk Helps Freshers</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Starting college is a major life transition. Dreamclerk provides the insights and support you need to make
              the most of your freshman year.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Real Student Insights",
                description:
                  "Access authentic experiences from students at your university to understand what college life is really like.",
              },
              {
                icon: Users,
                title: "Community Connection",
                description: "Connect with a network of peers and upperclassmen who can offer guidance and friendship.",
              },
              {
                icon: Award,
                title: "Early Rewards",
                description:
                  "Start earning rewards from day one by sharing your own freshman experiences and contributing to the community.",
              },
              {
                icon: CheckCircle,
                title: "Course Selection Help",
                description:
                  "Get recommendations on which courses to take based on real student feedback and experiences.",
              },
              {
                icon: CheckCircle,
                title: "Campus Life Navigation",
                description: "Learn about clubs, events, and social opportunities that match your interests and goals.",
              },
              {
                icon: CheckCircle,
                title: "Future Planning",
                description:
                  "Start building your academic and career path with insights from students who've successfully navigated similar journeys.",
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

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 border-t-2 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hear From Other Freshers</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what other first-year students have to say about Dreamclerk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Dreamclerk helped me find the right clubs to join and connect with seniors who gave me amazing advice about which professors to take classes with.",
                name: "Alex J.",
                university: "Stanford University",
              },
              {
                quote:
                  "As a first-gen college student, I had no idea what to expect. The insights from other students on Dreamclerk made me feel prepared and confident.",
                name: "Maya T.",
                university: "University of Michigan",
              },
              {
                quote:
                  "I earned enough rewards in my first semester to get a free coffee maker! Plus, the community helped me navigate the overwhelming first few weeks.",
                name: "Jamal K.",
                university: "NYU",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DoodleCard className="h-full p-6">
                  <div className="flex flex-col h-full">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-4"
                    >
                      <path
                        d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 5 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7M10 11V19H6C5.46957 19 4.96086 18.7893 4.58579 18.4142C4.21071 18.0391 4 17.5304 4 17V11M10 11H14M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7M20 11V19H16C15.4696 19 14.9609 18.7893 14.5858 18.4142C14.2107 18.0391 14 17.5304 14 17V11M20 11H14"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-700 italic mb-6 flex-grow">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.university}</p>
                    </div>
                  </div>
                </DoodleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
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
              Get answers to common questions about how Dreamclerk works for freshers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
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
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Start Your College Journey?</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join Dreamclerk today and get the insights, community, and rewards that will help you make the most of your
            freshman year.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <DoodleButton size="lg" className="px-8 py-6 text-lg">
              Coming Soon
            </DoodleButton>
          </motion.div>
        </motion.div>
      </DoodleBackground>
    </main>
  )
}
