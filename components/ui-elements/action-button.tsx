"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import DoodleButton from "./doodle-button"
import SignInModal from "../sign-in-modal"
import type { ButtonConfig } from "@/lib/button-config"

interface ActionButtonProps extends Omit<ButtonConfig, "action" | "label"> {
  config: ButtonConfig
  className?: string
  icon?: React.ReactNode
  disabled?: boolean
  onSuccess?: () => void
}

export default function ActionButton({
  config,
  className = "",
  icon,
  disabled = false,
  onSuccess,
  ...props
}: ActionButtonProps) {
  const router = useRouter()
  const { user, logout } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if user has permission to use this button
  const hasPermission = () => {
    if (config.requiresAuth && !user) return false
    if (config.adminOnly && (!user || user.role !== "admin")) return false
    return true
  }

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!hasPermission()) {
      // If authentication is required but user is not logged in, show login modal
      if (config.requiresAuth) {
        setIsModalOpen(true)
        return
      }
    }

    // Handle different button actions
    switch (config.action) {
      case "register":
        setIsModalOpen(true)
        break

      case "login":
        setIsModalOpen(true)
        break

      case "logout":
        logout()
        break

      case "navigate":
        if (config.destination) {
          router.push(config.destination)
          window.scrollTo(0, 0)
        }
        break

      case "custom":
        if (config.customAction) {
          config.customAction()
        }
        break

      // For submit buttons, the form's onSubmit will handle this
      case "submit":
        // Do nothing, let the form handle it
        break

      default:
        console.warn(`Unknown button action: ${config.action}`)
    }
  }

  // For register/login buttons, render with SignInModal
  if (config.action === "register" || config.action === "login") {
    return (
      <SignInModal
        trigger={
          <DoodleButton
            variant={config.variant}
            size={config.size}
            className={className}
            disabled={disabled}
            icon={icon}
          >
            {config.label}
          </DoodleButton>
        }
        isRegister={config.action === "register"}
        onSuccess={onSuccess}
        redirectPath={config.destination || "/profile"}
      />
    )
  }

  // For all other buttons, render a standard DoodleButton
  return (
    <DoodleButton
      variant={config.variant}
      size={config.size}
      className={className}
      onClick={handleAction}
      disabled={disabled || !hasPermission()}
      type={config.action === "submit" ? "submit" : "button"}
      icon={icon}
    >
      {config.label}
    </DoodleButton>
  )
}
