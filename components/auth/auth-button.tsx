"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import AuthModal from "./auth-modal"

interface AuthButtonProps {
  mode?: "signin" | "register"
  className?: string
  children?: React.ReactNode
}

export default function AuthButton({ mode = "signin", className = "", children }: AuthButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useUser()

  // Don't render the button if user is already logged in
  if (user) {
    return null
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={className}>
        {children || (mode === "signin" ? "Sign In" : "Register")}
      </button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialMode={mode} />
    </>
  )
}
