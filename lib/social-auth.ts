import { supabase } from "./supabase"

interface AuthResult {
  success: boolean
  userId?: string
  error?: {
    code: string
    message: string
    isNetworkError?: boolean
  }
}

export const signInWithGoogle = async (): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Google sign-in error:", error)
      return {
        success: false,
        error: {
          code: error.code || "google_signin_error",
          message: error.message || "Failed to sign in with Google",
        },
      }
    }

    // For OAuth, we don't get a user ID immediately as the user is redirected
    // The success is determined by whether the redirect happened
    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Unexpected error during Google sign-in:", error)

    // Check if it's a network error
    const isNetworkError = !navigator.onLine || error.message?.includes("network") || error.message?.includes("fetch")

    return {
      success: false,
      error: {
        code: "unexpected_error",
        message: error.message || "An unexpected error occurred",
        isNetworkError,
      },
    }
  }
}

export const signInWithGithub = async (): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("GitHub sign-in error:", error)
      return {
        success: false,
        error: {
          code: error.code || "github_signin_error",
          message: error.message || "Failed to sign in with GitHub",
        },
      }
    }

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Unexpected error during GitHub sign-in:", error)

    const isNetworkError = !navigator.onLine || error.message?.includes("network") || error.message?.includes("fetch")

    return {
      success: false,
      error: {
        code: "unexpected_error",
        message: error.message || "An unexpected error occurred",
        isNetworkError,
      },
    }
  }
}
