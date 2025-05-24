"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfileCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to dashboard - no profile completion needed
    router.push("/dashboard")
  }, [router])

  return null
}
