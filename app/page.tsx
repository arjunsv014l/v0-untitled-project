"use client"
import Hero from "@/components/hero"
import { useEffect } from "react"
import FreshersSection from "@/components/sections/freshers-section"
import StudentsSection from "@/components/sections/students-section"
import CompaniesSection from "@/components/sections/companies-section"
import UniversitiesSection from "@/components/sections/universities-section"
import StudentAIAssistant from "@/components/student-ai-assistant"
import EarnWithDreamclerk from "@/components/earn-with-dreamclerk"
import CampusCommunitySection from "@/components/campus-community-section"
import PersonalBrandingSection from "@/components/personal-branding-section"
import CampusInfluenceProgram from "@/components/campus-influence-program"
import SocialCommunity from "@/components/social-community"
import LaunchingSoon from "@/components/launching-soon"
import { LandingChatbot } from "@/components/landing-chatbot"

export default function Home() {
  useEffect(() => {
    // Check if we're returning from another page
    const savedScrollPosition = localStorage.getItem("landingPageScrollPosition")
    if (savedScrollPosition) {
      // Use smooth scrolling for a nice transition
      window.scrollTo({
        top: Number.parseInt(savedScrollPosition),
        behavior: "smooth",
      })
      // Clear the saved position after restoring
      localStorage.removeItem("landingPageScrollPosition")
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Earn With Dreamclerk Section */}
      <EarnWithDreamclerk />

      {/* For Freshers Section */}
      <FreshersSection />

      {/* For Students Section */}
      <StudentsSection />

      {/* For Companies Section */}
      <CompaniesSection />

      {/* For Universities Section */}
      <UniversitiesSection />

      {/* AI Assistant Feature */}
      <StudentAIAssistant />

      {/* Campus Community Section */}
      <CampusCommunitySection />

      {/* Student Community Section */}
      <SocialCommunity />

      {/* Personal Branding Section */}
      <PersonalBrandingSection />

      {/* Campus Influence Program */}
      <CampusInfluenceProgram />

      {/* Launching Soon Section - Moved to be the last section */}
      <LaunchingSoon />

      {/* Floating Chatbot */}
      <LandingChatbot />
    </main>
  )
}
