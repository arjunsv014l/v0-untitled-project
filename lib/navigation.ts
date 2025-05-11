import type { User } from "@/context/user-context"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// Define application routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PROFILE_SETUP: "/profile-setup",
  LOGIN: "/login",
  REGISTER: "/register",
}

// Track if navigation is in progress to prevent flutter
let isNavigating = false

/**
 * Navigate to the dashboard page
 */
export function navigateToDashboard(router: AppRouterInstance): void {
  // Prevent multiple navigations
  if (isNavigating) return

  isNavigating = true

  // Add a timestamp to prevent caching issues
  const timestamp = new Date().getTime()
  console.log("Navigating to dashboard with timestamp:", timestamp)

  router.push(`/dashboard?t=${timestamp}`)

  // Reset the navigation flag after a delay
  setTimeout(() => {
    isNavigating = false
  }, 500)
}

/**
 * Navigate to the profile setup page
 */
export function navigateToProfileSetup(router: AppRouterInstance): void {
  // Prevent multiple navigations
  if (isNavigating) return

  isNavigating = true

  // Add a timestamp to prevent caching issues
  const timestamp = new Date().getTime()
  console.log("Navigating to profile setup with timestamp:", timestamp)

  router.push(`/profile-setup?t=${timestamp}`)

  // Reset the navigation flag after a delay
  setTimeout(() => {
    isNavigating = false
  }, 500)
}

// Check if this is the user's first login
export function isFirstTimeLogin(user: User): boolean {
  // Check if the user has a firstLogin flag
  return user.firstLogin === true || !user.lastLogin
}

/**
 * Handle post-authentication navigation based on profile completion status
 */
export function handlePostAuthNavigation(router: AppRouterInstance, user: User | null): void {
  // Prevent multiple navigations
  if (isNavigating) return

  isNavigating = true

  if (!user) {
    console.log("No user, redirecting to home")
    router.push(ROUTES.HOME)

    // Reset the navigation flag after a delay
    setTimeout(() => {
      isNavigating = false
    }, 500)
    return
  }

  console.log("User authenticated, redirecting to dashboard")
  navigateToDashboard(router)
}
