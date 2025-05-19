"use client"

import { useState } from "react"
import { Users, Brain, Zap, BarChart, Shield, Target } from "lucide-react"
import SplitHeroLayout from "./layouts/split-hero-layout"
import CardDashboardLayout from "./layouts/card-dashboard-layout"
import ZigzagFeatureLayout from "./layouts/zigzag-feature-layout"
import TabbedContentLayout from "./layouts/tabbed-content-layout"
import DoodleCard from "./ui-elements/doodle-card"
import DoodleButton from "./ui-elements/doodle-button"

export default function LayoutExamples() {
  const [selectedLayout, setSelectedLayout] = useState("split-hero")
  const [selectedUserType, setSelectedUserType] = useState<"freshers" | "students" | "companies" | "universities">(
    "students",
  )

  // Example data for layouts
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-Time Insights",
      description:
        "Access authentic, categorized experiences that provide real-time insights into preferences and trends.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy Protected",
      description: "All shared experiences are anonymized to protect privacy while still providing value.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Data-Driven Decisions",
      description: "Make informed decisions based on structured, authentic data from real experiences.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Targeted Engagement",
      description: "Create more effective strategies with insights directly from your target demographic.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Connection",
      description: "Connect with a network of peers and professionals who can offer guidance and opportunities.",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Continuous Learning",
      description: "Stay ahead with continuous streams of fresh insights and emerging trends.",
    },
  ]

  const zigzagFeatures = [
    {
      title: "Personalized Experience",
      description:
        "Dreamclerk adapts to your specific needs and goals, providing a tailored experience that evolves with you.",
      image: "/personalized-dashboard.png",
      imageAlt: "Personalized dashboard interface",
      bulletPoints: [
        "Custom recommendations based on your profile",
        "Adaptive learning path that evolves with your progress",
        "Personalized insights tailored to your specific goals",
        "Customizable interface to match your workflow",
      ],
      ctaText: "Learn More",
      ctaLink: "/features",
    },
    {
      title: "Data-Driven Insights",
      description:
        "Access powerful analytics and insights that help you make informed decisions and track your progress.",
      image: "/data-analytics-dashboard.png",
      imageAlt: "Data analytics dashboard",
      bulletPoints: [
        "Comprehensive analytics dashboard",
        "Trend identification and forecasting",
        "Performance tracking and benchmarking",
        "Actionable recommendations based on data",
      ],
      ctaText: "Explore Analytics",
      ctaLink: "/analytics",
    },
    {
      title: "Community Collaboration",
      description:
        "Connect with a vibrant community of peers, mentors, and industry professionals to expand your network.",
      image: "/community-collaboration.png",
      imageAlt: "Community collaboration interface",
      bulletPoints: [
        "Connect with like-minded individuals",
        "Participate in group discussions and projects",
        "Access mentorship opportunities",
        "Collaborate on shared goals and initiatives",
      ],
      ctaText: "Join Community",
      ctaLink: "/community",
    },
  ]

  const tabContent = [
    {
      label: "Getting Started",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Getting Started with Dreamclerk</h3>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Dreamclerk! Here's everything you need to know to get started on your journey.
          </p>
          <div className="space-y-6">
            <div className="border-l-4 border-gray-300 pl-4">
              <h4 className="text-xl font-semibold mb-2">Create Your Profile</h4>
              <p className="text-gray-700">
                Set up your personalized profile to get the most out of Dreamclerk. Add your interests, goals, and
                preferences to receive tailored recommendations.
              </p>
            </div>
            <div className="border-l-4 border-gray-300 pl-4">
              <h4 className="text-xl font-semibold mb-2">Explore Features</h4>
              <p className="text-gray-700">
                Discover all the powerful features Dreamclerk has to offer. From data insights to community connections,
                there's something for everyone.
              </p>
            </div>
            <div className="border-l-4 border-gray-300 pl-4">
              <h4 className="text-xl font-semibold mb-2">Connect with Others</h4>
              <p className="text-gray-700">
                Build your network by connecting with peers, mentors, and industry professionals. Collaboration is at
                the heart of the Dreamclerk experience.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Features & Benefits",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Features & Benefits</h3>
          <p className="text-lg text-gray-700 mb-6">
            Discover the powerful features and benefits that make Dreamclerk the perfect platform for your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">{feature.icon}</div>
                  <h4 className="text-lg font-semibold">{feature.title}</h4>
                </div>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Success Stories",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Success Stories</h3>
          <p className="text-lg text-gray-700 mb-6">Read about how others have achieved their goals with Dreamclerk.</p>
          <div className="space-y-8">
            {[1, 2, 3].map((item, index) => (
              <DoodleCard key={index} className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                    <div className="bg-gray-200 rounded-lg w-full aspect-square"></div>
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="text-xl font-semibold mb-2">Success Story {item}</h4>
                    <p className="text-gray-700 mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                    <div className="text-sm text-gray-500">John Doe, University of Example</div>
                  </div>
                </div>
              </DoodleCard>
            ))}
          </div>
        </div>
      ),
    },
  ]

  const renderSelectedLayout = () => {
    switch (selectedLayout) {
      case "split-hero":
        return (
          <SplitHeroLayout
            userType={selectedUserType}
            heroTitle="Transform Your Experience with Dreamclerk"
            heroDescription="Access powerful tools and insights designed specifically for your needs. Join our community today and discover the difference."
            heroImage="/students-collaborating.png"
            heroImageAlt="Students collaborating"
            ctaText="Get Started"
            ctaLink="/register"
            features={features}
            contentSection={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Why Choose Dreamclerk</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Dreamclerk provides a unique platform that connects you with the resources, community, and
                    opportunities you need to succeed.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 12L9 16L19 6"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">Personalized experience tailored to your needs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 12L9 16L19 6"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">Data-driven insights to help you make informed decisions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 12L9 16L19 6"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">Community support from peers and professionals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 12L9 16L19 6"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">Continuous improvement based on your feedback</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <DoodleCard className="p-6 h-full" doodle="circles">
                    <h3 className="text-xl font-bold mb-4">What Our Users Say</h3>
                    <div className="space-y-6">
                      <div className="border-l-4 border-gray-300 pl-4">
                        <p className="text-gray-700 italic mb-2">
                          "Dreamclerk has completely transformed how I approach my goals. The insights and community
                          support have been invaluable."
                        </p>
                        <p className="text-sm font-medium">- Alex J., Student</p>
                      </div>
                      <div className="border-l-4 border-gray-300 pl-4">
                        <p className="text-gray-700 italic mb-2">
                          "The data-driven approach has helped us make better decisions and connect with our target
                          audience in meaningful ways."
                        </p>
                        <p className="text-sm font-medium">- Sarah T., Company Representative</p>
                      </div>
                      <div className="border-l-4 border-gray-300 pl-4">
                        <p className="text-gray-700 italic mb-2">
                          "As a university administrator, Dreamclerk has provided insights that have directly improved
                          student satisfaction and engagement."
                        </p>
                        <p className="text-sm font-medium">- Dr. Michael R., University</p>
                      </div>
                    </div>
                  </DoodleCard>
                </div>
              </div>
            }
            testimonialSection={
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6">Trusted by Users Everywhere</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
                  Join thousands of satisfied users who have transformed their experience with Dreamclerk.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-16 w-32 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            }
          />
        )
      case "card-dashboard":
        return (
          <CardDashboardLayout
            userType={selectedUserType}
            pageTitle="Your Dreamclerk Dashboard"
            pageDescription="Access all your tools, insights, and resources in one convenient place."
            cards={[
              {
                title: "Quick Overview",
                content: (
                  <div>
                    <p className="text-gray-700 mb-4">
                      Welcome back! Here's a summary of your recent activity and important updates.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <h4 className="font-medium mb-2">Recent Activity</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Profile Views</span>
                          <span className="font-medium">24</span>
                        </li>
                        <li className="flex justify-between">
                          <span>New Connections</span>
                          <span className="font-medium">7</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Pending Tasks</span>
                          <span className="font-medium">3</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
                width: "half",
                height: "medium",
                accent: true,
              },
              {
                title: "Your Progress",
                content: (
                  <div className="h-full flex flex-col">
                    <p className="text-gray-700 mb-4">Track your progress and achievements over time.</p>
                    <div className="flex-grow flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">75%</span>
                        </div>
                        <svg className="absolute top-0 left-0" width="128" height="128" viewBox="0 0 128 128">
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray="377"
                            strokeDashoffset="94"
                            className="text-green-500"
                            transform="rotate(-90 64 64)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ),
                width: "half",
                height: "medium",
              },
              {
                title: "Recent Updates",
                content: (
                  <div>
                    <ul className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <li key={item} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <h4 className="font-medium mb-1">Update Title {item}</h4>
                          <p className="text-sm text-gray-700 mb-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore.
                          </p>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
                width: "third",
                height: "tall",
              },
              {
                title: "Recommended Resources",
                content: (
                  <div>
                    <ul className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <li key={item} className="flex items-start">
                          <div className="bg-gray-200 w-12 h-12 rounded-lg mr-3 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium mb-1">Resource {item}</h4>
                            <p className="text-sm text-gray-700">
                              Short description of this recommended resource and why it's relevant.
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
                width: "third",
                height: "tall",
              },
              {
                title: "Upcoming Events",
                content: (
                  <div>
                    <ul className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <li key={item} className="border-l-4 border-gray-300 pl-4">
                          <h4 className="font-medium mb-1">Event {item}</h4>
                          <p className="text-sm text-gray-700 mb-1">
                            Brief description of what this event is about and why you might be interested.
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-3">June {10 + item}, 2023</span>
                            <span>10:00 AM</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
                width: "third",
                height: "tall",
              },
              {
                title: "Quick Actions",
                content: (
                  <div className="grid grid-cols-2 gap-4">
                    {["Update Profile", "Connect", "Explore", "Settings"].map((action, index) => (
                      <button
                        key={index}
                        className="p-4 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors text-center"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                ),
                width: "full",
                height: "short",
              },
            ]}
            sidebarContent={
              <div>
                <h3 className="text-xl font-bold mb-4">Your Profile</h3>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-600">Student at Example University</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors text-center">
                  Edit Profile
                </button>
              </div>
            }
            ctaText="Explore More Features"
            ctaLink="/features"
          />
        )
      case "zigzag-feature":
        return (
          <ZigzagFeatureLayout
            userType={selectedUserType}
            pageTitle="Discover Dreamclerk Features"
            pageDescription="Explore the powerful features that make Dreamclerk the perfect platform for your needs."
            features={zigzagFeatures}
            headerContent={
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <DoodleButton size="md" variant="outline">
                  Watch Demo
                </DoodleButton>
                <DoodleButton size="md">Get Started</DoodleButton>
              </div>
            }
            mainCtaText="Start Your Journey"
            mainCtaLink="/register"
          />
        )
      case "tabbed-content":
        return (
          <TabbedContentLayout
            userType={selectedUserType}
            pageTitle="Everything You Need to Know"
            pageDescription="Comprehensive information and resources to help you make the most of Dreamclerk."
            heroImage="/students-technology.png"
            heroImageAlt="Students using technology"
            tabs={tabContent}
            ctaText="Join Dreamclerk Today"
            ctaLink="/register"
          />
        )
      default:
        return <div>Select a layout to preview</div>
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b-2 border-black sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Layout Preview</h2>
              <p className="text-gray-600">Select a layout and user type to preview</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedLayout}
                onChange={(e) => setSelectedLayout(e.target.value)}
                className="px-4 py-2 border-2 border-black rounded-lg"
              >
                <option value="split-hero">Split-Screen Hero</option>
                <option value="card-dashboard">Card Dashboard</option>
                <option value="zigzag-feature">Zigzag Feature</option>
                <option value="tabbed-content">Tabbed Content</option>
              </select>
              <select
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value as any)}
                className="px-4 py-2 border-2 border-black rounded-lg"
              >
                <option value="freshers">Freshers</option>
                <option value="students">Students</option>
                <option value="companies">Companies</option>
                <option value="universities">Universities</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {renderSelectedLayout()}
    </div>
  )
}
