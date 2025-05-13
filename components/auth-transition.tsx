"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"

export default function AuthTransition() {
  const [message, setMessage] = useState("Signing you in...")
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (isLoading) {
      return // Wait until loading is complete
    }

    const redirectToDashboard = async () => {
      try {
        console.log("[AuthTransition] Starting redirect sequence")

        // Show a sequence of messages
        setTimeout(() => setMessage("Preparing your dashboard..."), 800)
        setTimeout(() => setMessage("Almost there..."), 1600)

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          console.log("[AuthTransition] Redirecting to dashboard")
          router.push("/dashboard")
        }, 2000)
      } catch (error) {
        console.error("[AuthTransition] Error during auth transition:", error)
        // Fallback to direct navigation if there's an error
        router.push("/dashboard")
      }
    }

    // In development mode or if user exists, redirect to dashboard
    if (user) {
      console.log("[AuthTransition] User authenticated, starting redirect")
      redirectToDashboard()
    } else {
      console.log("[AuthTransition] No user found, redirecting to home")
      router.push("/")
    }
  }, [user, isLoading, router])

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome{user ? `, ${user.name || ""}` : ""}!</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
