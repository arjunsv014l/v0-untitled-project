"use client"

import { motion } from "framer-motion"
import { Users, Briefcase, Award, Lightbulb, Target, MessageSquare } from "lucide-react"
import DoodleButton from "./ui-elements/doodle-button"

export default function StudentCommunitiesSection() {
  const opportunities = [
    {
      id: 1,
      name: "Industry Mentorship",
      image: "/study-group.png",
      members: 840,
      description:
        "Connect with experienced professionals who provide personalized guidance to accelerate your career growth and skill development.",
    },
    {
      id: 2,
      name: "Exclusive Internships",
      image: "/campus-foodies.png",
      members: 1250,
      description:
        "Access internship opportunities exclusively available to platform members, with direct application channels to participating companies.",
    },
    {
      id: 3,
      name: "Industry Projects",
      image: "/dorm-life.png",
      members: 1890,
      description:
        "Work on real-world projects proposed by companies, building your portfolio while making valuable professional connections.",
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
          <div className="inline-flex items-center border-2 border-black px-4 py-2 rounded-full mb-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Briefcase className="h-5 w-5 mr-2 text-[#10B84A]" />
            <span className="font-medium">Career Connections</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A platform where professionals and industries meet students
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We connect students directly with industry professionals who can provide mentorship, opportunities, and
            career guidance based on your unique skills and potential.
          </p>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">How Connections Happen</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Showcase Your Potential",
                description:
                  "Create a profile highlighting your skills, projects, and achievements that industry professionals can discover.",
                icon: <Award className="h-10 w-10 text-[#10B84A]" />,
              },
              {
                step: 2,
                title: "Get Discovered",
                description:
                  "Industry professionals browse student profiles based on skills and interests they're looking for.",
                icon: <Target className="h-10 w-10 text-[#8B5CF6]" />,
              },
              {
                step: 3,
                title: "Connect Directly",
                description:
                  "Receive mentorship, project opportunities, and career guidance directly from industry professionals.",
                icon: <MessageSquare className="h-10 w-10 text-[#EC4899]" />,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-black mr-4">
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <h4 className="text-xl font-bold">{step.title}</h4>
                </div>
                <div className="mb-4">{step.icon}</div>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two-column section: For Students and For Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* For Students */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Award className="h-6 w-6 mr-2 text-[#10B84A]" />
              For Students
            </h3>
            <p className="text-gray-700 mb-4">
              Gain direct access to industry professionals who can help accelerate your career through mentorship and
              opportunities.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#10B84A]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Receive personalized mentorship from industry experts</span>
              </li>
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#10B84A]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Access exclusive internships and job opportunities</span>
              </li>
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#10B84A]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Work on real industry projects to build your portfolio</span>
              </li>
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#10B84A]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Get feedback on your skills from professionals who hire</span>
              </li>
            </ul>
            <DoodleButton className="w-full">Join as a Student</DoodleButton>
          </motion.div>

          {/* For Industry */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Briefcase className="h-6 w-6 mr-2 text-[#8B5CF6]" />
              For Industry Professionals
            </h3>
            <p className="text-gray-700 mb-4">
              Discover promising talent early and build meaningful connections with the next generation of
              professionals.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#8B5CF6]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Find students with specific skills that match your needs</span>
              </li>
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#8B5CF6]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Mentor promising talent before they enter the job market</span>
              </li>
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#8B5CF6]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Test potential hires through collaborative projects</span>
              </li>
              <li className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-1 flex-shrink-0 text-[#8B5CF6]"
                >
                  <path
                    d="M5 12L9 16L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-700">Build your personal brand as an industry mentor</span>
              </li>
            </ul>
            <DoodleButton className="w-full">Join as a Professional</DoodleButton>
          </motion.div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="h-10 w-10 text-[#10B84A]" />,
                title: "Skill Showcase",
                description:
                  "Create a dynamic portfolio highlighting your skills, projects, and achievements that gets noticed by industry professionals.",
              },
              {
                icon: <Briefcase className="h-10 w-10 text-[#8B5CF6]" />,
                title: "Industry Connections",
                description:
                  "Connect directly with professionals from leading companies who can provide guidance and opportunities.",
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-[#EC4899]" />,
                title: "Personalized Mentorship",
                description:
                  "Receive tailored advice and feedback from professionals who've succeeded in your field of interest.",
              },
              {
                icon: <Target className="h-10 w-10 text-[#F59E0B]" />,
                title: "Opportunity Matching",
                description:
                  "Get matched with opportunities that align with your skills and career goals through our smart matching system.",
              },
              {
                icon: <Lightbulb className="h-10 w-10 text-[#3B82F6]" />,
                title: "Industry Projects",
                description:
                  "Work on real-world projects proposed by companies that demonstrate your abilities to potential employers.",
              },
              {
                icon: <Users className="h-10 w-10 text-[#10B84A]" />,
                title: "Community Support",
                description:
                  "Join a community of students and professionals sharing knowledge, opportunities, and support.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Direct Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Direct Opportunities for Students</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunities.map((opportunity, i) => (
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
                      src={opportunity.image || "/placeholder.svg"}
                      alt={opportunity.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{opportunity.name}</h4>
                    <p className="text-sm text-gray-600">{opportunity.members}+ participants</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">{opportunity.description}</p>
                </div>
                <DoodleButton size="sm" className="w-full">
                  Explore Opportunity
                </DoodleButton>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16 bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Success Stories</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-black rounded-lg p-4 bg-gray-50">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
                  <img src="/study-group.png" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Computer Science Student</h4>
                  <p className="text-sm text-gray-600">Anna University</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Through this platform, I connected with a senior developer who mentored me on a machine learning
                project. This led to a summer internship that completely changed my career trajectory."
              </p>
            </div>

            <div className="border-2 border-black rounded-lg p-4 bg-gray-50">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
                  <img src="/professional-headshot.png" alt="Professional" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Technology Director</h4>
                  <p className="text-sm text-gray-600">Leading Tech Company</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "We discovered three exceptional students through the platform who brought fresh perspectives to our
                team. What started as mentorship evolved into hiring all three after graduation."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of students and professionals already connecting and creating opportunities together.
          </p>
          <DoodleButton className="px-8 py-3 text-lg inline-block">Join Our Platform</DoodleButton>
        </motion.div>
      </div>
    </section>
  )
}
