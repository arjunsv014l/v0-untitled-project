"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfileCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to dashboard - profile page is eliminated
    router.replace("/dashboard")
  }, [router])

  return null
}
