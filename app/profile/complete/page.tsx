"use client"

import dynamic from "next/dynamic"

const EnhancedProfileCompletion = dynamic(() => import("@/components/profile/enhanced-profile-completion"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  ),
})

export default function ProfileCompletePage() {
  return <EnhancedProfileCompletion />
}
