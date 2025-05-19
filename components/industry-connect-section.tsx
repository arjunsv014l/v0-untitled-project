"use client"

import { motion } from "framer-motion"
import { Users, Briefcase, Link2, Network, GraduationCap, Building } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"

// Toggle this to show/hide reviews
const SHOW_REVIEWS = false

export default function IndustryConnectSection() {
  // Update any industry connections or events to be Chennai-specific

  // Example update (assuming this section exists):
  const upcomingEvents = [
    {
      id: 1,
      title: "Chennai Tech Summit 2025",
      organizer: "TCS and Anna University",
      location: "Anna University Campus, Guindy",
      date: "March 15-16, 2025",
      description: "Connect with leading tech companies in Chennai and explore internship and job opportunities.",
      image: "/virtual-career-fair.png",
    },
    {
      id: 2,
      title: "Finance Career Panel",
      organizer: "Madras University Business School",
      location: "Madras University Centenary Auditorium",
      date: "April 5, 2025",
      description: "Learn from finance professionals from Chennai's top banks and financial institutions.",
      image: "/finance-panel.png",
    },
    {
      id: 3,
      title: "Healthcare Innovation Workshop",
      organizer: "Apollo Hospitals and Sri Ramachandra University",
      location: "Sri Ramachandra Campus, Porur",
      date: "May 10, 2025",
      description:
        "Explore the latest healthcare innovations and career opportunities in Chennai's growing medical sector.",
      image: "/healthcare-innovation-workshop.png",
    },
  ]
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 border-t-2 border-black relative overflow-hidden">
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

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect with Industry Leaders</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            StudentConnect bridges the gap between campus and career, giving you direct access to mentors, events, and
            projects from leading companies—all integrated into your social experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Link2 className="h-10 w-10 text-[#10B84A]" />,
              title: "Networking Opportunities",
              description:
                "Connect with professionals from top companies and build your professional network while still in college.",
            },
            {
              icon: <Briefcase className="h-10 w-10 text-[#8B5CF6]" />,
              title: "Mentorship Programs",
              description:
                "Receive guidance from industry experts who can help shape your career path and professional development.",
            },
            {
              icon: <Building className="h-10 w-10 text-[#EC4899]" />,
              title: "Corporate Partnerships",
              description:
                "Gain access to exclusive opportunities with our corporate partners including internships and job placements.",
            },
            {
              icon: <Network className="h-10 w-10 text-[#F59E0B]" />,
              title: "Industry Insights",
              description:
                "Stay updated with the latest trends and requirements in your field of interest through direct industry connections.",
            },
            {
              icon: <GraduationCap className="h-10 w-10 text-[#3B82F6]" />,
              title: "Skill Development",
              description:
                "Develop industry-relevant skills through workshops and training sessions conducted by professionals.",
            },
            {
              icon: <Users className="h-10 w-10 text-[#10B84A]" />,
              title: "Community Events",
              description:
                "Participate in industry meetups, hackathons, and networking events to expand your professional circle.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700 mb-4">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Industry Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Featured Industry Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Tech Innovations Inc.",
                logo: "/professional-headshot.png",
                industry: "Technology",
                opportunities: 12,
                badge: "Top Recruiter",
              },
              {
                name: "Global Finance Partners",
                logo: "/female-tech-leader.png",
                industry: "Finance",
                opportunities: 8,
                badge: "Mentorship Leader",
              },
              {
                name: "Healthcare Innovations",
                logo: "/marketing-executive.png",
                industry: "Healthcare",
                opportunities: 5,
                badge: "Research Partner",
              },
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex-shrink-0 overflow-hidden border-2 border-black">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.industry}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{partner.opportunities} Opportunities</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full border border-green-200">
                    {partner.badge}
                  </span>
                </div>
                <DoodleButton size="sm" className="w-full mt-2">
                  View Opportunities
                </DoodleButton>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        {SHOW_REVIEWS && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote:
                    "Through a mentorship connection on StudentConnect, I landed my dream internship at Google. My mentor guided me through the entire interview process!",
                  author: "Jamie Rivera",
                  role: "Computer Science Junior",
                  university: "Stanford University",
                },
                {
                  quote:
                    "The industry projects on StudentConnect gave me real-world experience that made my resume stand out. I'm now working at my dream company!",
                  author: "Taylor Washington",
                  role: "Marketing Senior",
                  university: "NYU",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex mb-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M10 11L8 17H5L7 11H5V5H11V11H10ZM18 11L16 17H13L15 11H13V5H19V11H18Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.university}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <DoodleButton className="px-8 py-3 text-lg inline-block">Join StudentConnect Today</DoodleButton>
        </motion.div>
      </div>
    </section>
  )
}
