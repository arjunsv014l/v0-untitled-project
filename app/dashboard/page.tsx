"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import FeedSection from "@/components/dashboard/feed-section"
import MessagesSection from "@/components/dashboard/messages-section"
import ProfileSection from "@/components/dashboard/profile-section"
import AcademicSection from "@/components/dashboard/academic-section"
import SettingsSection from "@/components/dashboard/settings-section"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<string>("feed")

  // Render the appropriate section based on the active section state
  const renderSection = () => {
    switch (activeSection) {
      case "feed":
        return <FeedSection />
      case "messages":
        return <MessagesSection />
      case "profile":
        return <ProfileSection />
      case "academic":
        return <AcademicSection />
      case "settings":
        return <SettingsSection />
      default:
        return <FeedSection />
    }
  }

  return (
    <DashboardLayout onSectionChange={setActiveSection} activeSection={activeSection}>
      {renderSection()}
    </DashboardLayout>
  )
}
