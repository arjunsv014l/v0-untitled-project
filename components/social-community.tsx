"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Users, Briefcase, Building, GraduationCap, Network, Link2 } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"

export default function SocialCommunity() {
  const [activeTab, setActiveTab] = useState("trending")
  const [showComments, setShowComments] = useState<number | null>(null)
  const [registeredUsers, setRegisteredUsers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate fetching registered users count from localStorage or use a default value
  useEffect(() => {
    const fetchUserCount = () => {
      try {
        setIsLoading(true)
        // Get stored count or use default
        const storedCount = localStorage.getItem("dreamclerk_user_count")
        const baseCount = 8750

        if (storedCount) {
          setRegisteredUsers(Number.parseInt(storedCount))
        } else {
          // Set a default count if none exists
          setRegisteredUsers(baseCount)
          localStorage.setItem("dreamclerk_user_count", baseCount.toString())
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user count:", error)
        // Fallback to a default number if there's an error
        setRegisteredUsers(8750)
        setIsLoading(false)
      }
    }

    fetchUserCount()

    // Simulate occasional user count increases
    const interval = setInterval(() => {
      setRegisteredUsers((prev) => {
        const newCount = prev + Math.floor(Math.random() * 3) + 1
        localStorage.setItem("dreamclerk_user_count", newCount.toString())
        return newCount
      })
    }, 60000) // Increase count every minute

    return () => clearInterval(interval)
  }, [])

  const opportunities = [
    {
      id: 1,
      company: "TCS Innovation Lab",
      logo: "/diverse-student-group.png",
      position: "Software Engineering Internship",
      content:
        "Looking for passionate computer science students for our summer internship program. Work on real projects with our engineering team in our Chennai office!",
      likes: 124,
      comments: [
        {
          id: 1,
          author: "Priya Sundaram",
          avatar: "/diverse-student-portrait.png",
          content:
            "I interned at TCS last summer - amazing experience and mentorship! The Chennai office has a great work culture.",
          time: "1 hour ago",
        },
        {
          id: 2,
          author: "Karthik Venkatesh",
          avatar: "/smiling-student.png",
          content: "Do they accept students from Loyola College or is it only Anna University and IIT Madras?",
          time: "30 minutes ago",
        },
      ],
      time: "2 days ago",
      tags: ["Tech", "Internship", "SoftwareEngineering"],
      liked: false,
      deadline: "April 15, 2025",
      location: "OMR & Siruseri IT Park, Chennai",
    },
    {
      id: 2,
      company: "HDFC Bank South Division",
      logo: "/diverse-student-portrait.png",
      position: "Finance Leadership Program",
      content:
        "Our 2-year rotational program gives business and finance graduates from Madras University and SRM University hands-on experience across multiple departments. Competitive salary and mentorship included.",
      likes: 98,
      comments: [
        {
          id: 1,
          author: "Aravind Krishnan",
          avatar: "/diverse-student-group.png",
          content:
            "The mentorship program here is incredible. Really helped launch my career after graduating from MCC.",
          time: "4 hours ago",
        },
      ],
      time: "5 days ago",
      tags: ["Finance", "Leadership", "GraduateProgram"],
      liked: false,
      deadline: "November 30, 2024",
      location: "Nungambakkam & T. Nagar, Chennai",
    },
    {
      id: 3,
      company: "Apollo Healthcare Innovations",
      logo: "/smiling-student.png",
      position: "Research Assistant - Biotech",
      content:
        "Join our cutting-edge research team working on breakthrough medical technologies at our Chennai facility. Perfect for biology, chemistry, and bioengineering students from Sri Ramachandra Medical College and VIT Chennai.",
      likes: 167,
      comments: [
        {
          id: 1,
          author: "Tharani Ramesh",
          avatar: "/diverse-students-studying.png",
          content:
            "Does this require previous lab experience or are they willing to train students from Stella Maris College?",
          time: "20 hours ago",
        },
        {
          id: 2,
          author: "Senthil Kumar",
          avatar: "/diverse-students-studying.png",
          content:
            "I worked with their team last semester - they provide excellent training for students from all colleges in Chennai!",
          time: "12 hours ago",
        },
        {
          id: 3,
          author: "Jayashree Kannan",
          avatar: "/diverse-students-studying.png",
          content:
            "The mentors are incredibly supportive and the work is meaningful. Great opportunity for SSN College students.",
          time: "10 hours ago",
        },
      ],
      time: "1 week ago",
      tags: ["Healthcare", "Research", "Biotech"],
      liked: false,
      deadline: "Rolling applications",
      location: "Porur & Vandalur, Chennai",
    },
  ]

  const [localOpportunities, setLocalOpportunities] = useState(opportunities)

  const featuredPartners = [
    {
      name: "TCS Innovation Lab",
      logo: "/diverse-students-studying.png",
      industry: "Technology",
      opportunities: 12,
      badge: "Top Recruiter",
    },
    {
      name: "HDFC Bank South Division",
      logo: "/diverse-students-studying.png",
      industry: "Finance",
      opportunities: 8,
      badge: "Mentorship Leader",
    },
    {
      name: "Apollo Healthcare Innovations",
      logo: "/diverse-students-studying.png",
      industry: "Healthcare",
      opportunities: 5,
      badge: "Research Partner",
    },
  ]

  const handleLike = (postId: number) => {
    setLocalOpportunities((prevOpportunities) =>
      prevOpportunities.map((opportunity) => {
        if (opportunity.id === postId) {
          return {
            ...opportunity,
            likes: opportunity.liked ? opportunity.likes - 1 : opportunity.likes + 1,
            liked: !opportunity.liked,
          }
        }
        return opportunity
      }),
    )
  }

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
            Dreamclerk connects students directly with leading industries and corporations, fostering valuable
            networking, mentorship, and career opportunities.
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <DoodleButton className="px-8 py-3 text-lg inline-block">Register Now</DoodleButton>
        </motion.div>
      </div>
    </section>
  )
}
