// Centralized configuration for button actions and navigation
export type ButtonAction = "register" | "login" | "navigate" | "logout" | "toggle" | "submit" | "custom"

export interface ButtonConfig {
  action: ButtonAction
  label: string
  destination?: string
  variant?: "primary" | "outline" | "secondary" | "gradient"
  size?: "sm" | "md" | "lg"
  requiresAuth?: boolean
  adminOnly?: boolean
  customAction?: () => void
}

// Standard button configurations
export const BUTTON_CONFIGS = {
  // Authentication buttons
  REGISTER: {
    action: "register" as ButtonAction,
    label: "Register Now",
    variant: "primary",
    requiresAuth: false,
  },
  LOGIN: {
    action: "login" as ButtonAction,
    label: "Sign In",
    variant: "outline",
    requiresAuth: false,
  },
  LOGOUT: {
    action: "logout" as ButtonAction,
    label: "Logout",
    variant: "outline",
    requiresAuth: true,
  },

  // Navigation buttons
  PROFILE: {
    action: "navigate" as ButtonAction,
    label: "Profile",
    destination: "/profile",
    variant: "outline",
    requiresAuth: true,
  },
  ADMIN_DASHBOARD: {
    action: "navigate" as ButtonAction,
    label: "Admin Dashboard",
    destination: "/admin/dashboard",
    variant: "outline",
    requiresAuth: true,
    adminOnly: true,
  },
  HOW_IT_WORKS: {
    action: "navigate" as ButtonAction,
    label: "Learn More",
    destination: "/how-it-works",
    variant: "outline",
    requiresAuth: false,
  },

  // Form submission
  SUBMIT_FORM: {
    action: "submit" as ButtonAction,
    label: "Submit",
    variant: "primary",
    requiresAuth: false,
  },
}

// Helper function to get button config with overrides
export function getButtonConfig(
  configKey: keyof typeof BUTTON_CONFIGS,
  overrides?: Partial<ButtonConfig>,
): ButtonConfig {
  const baseConfig = BUTTON_CONFIGS[configKey]
  return { ...baseConfig, ...overrides }
}
