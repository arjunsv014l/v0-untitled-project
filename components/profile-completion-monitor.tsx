"use client"

import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"

interface ProfileCompletionMonitorProps {
  showDetails?: boolean
  className?: string
  disabled?: boolean
}

export default function ProfileCompletionMonitor({
  showDetails = false,
  className = "",
  disabled = true, // Set to true by default to disable the component
}: ProfileCompletionMonitorProps) {
  const { user } = useUser()
  const router = useRouter()

  // If disabled or no user, return null
  if (disabled || !user) return null

  // The rest of the component is left unchanged but won't be used when disabled
  return <div className={`hidden ${className}`}>{/* Content hidden by default */}</div>
}
