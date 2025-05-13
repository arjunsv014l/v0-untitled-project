"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import { Loader2, ArrowRight, Mail, Lock, User, Check } from "lucide-react"

interface StepAuthProps {
  initialMode?: "signin" | "register"
  onComplete?: () => void
}

export default function StepAuth({ initialMode = "signin", onComplete }: StepAuthProps) {
  const [mode, setMode] = useState<"signin" | "register">(initialMode)
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { login, register, loginWithGoogle, isDevelopmentMode } = useUser()
  const router = useRouter()

  // Reset steps when mode changes
  useEffect(() => {
    setStep(1)
    setError("")
  }, [mode])

  const handleNext = () => {
    setError("")

    // Validate current step
    if (step === 1 && !email) {
      setError("Please enter your email address")
      return
    }

    if (step === 2 && !password) {
      setError("Please enter your password")
      return
    }

    if (step === 3 && mode === "register" && !name) {
      setError("Please enter your name")
      return
    }

    // Move to next step or submit
    if (step < 2 || (step < 3 && mode === "register")) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setError("")
    setIsLoading(true)

    try {
      if (mode === "signin") {
        console.log("[StepAuth] Attempting login with:", email)
        const result = await login(email, password)

        if (result.success) {
          console.log("[StepAuth] Login successful")
          setSuccess(true)
          setTimeout(() => {
            router.push("/dashboard")
            if (onComplete) onComplete()
          }, 1500)
        } else {
          console.log("[StepAuth] Login failed:", result.error)
          setError(result.error || "Login failed. Please try again.")
          setStep(1) // Reset to first step on error
        }
      } else {
        console.log("[StepAuth] Attempting registration with:", email)
        const result = await register(email, password, name)

        if (result.success) {
          console.log("[StepAuth] Registration successful")
          setSuccess(true)
          setTimeout(() => {
            router.push("/dashboard")
            if (onComplete) onComplete()
          }, 1500)
        } else {
          console.log("[StepAuth] Registration failed:", result.error)
          setError(result.error || "Registration failed. Please try again.")
          setStep(1) // Reset to first step on error
        }
      }
    } catch (err) {
      console.error("[StepAuth] Authentication error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setIsLoading(true)

    try {
      console.log("[StepAuth] Attempting Google login")
      const result = await loginWithGoogle()

      if (result.success) {
        console.log("[StepAuth] Google login successful")
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
          if (onComplete) onComplete()
        }, 1500)
      } else {
        console.log("[StepAuth] Google login failed:", result.error)
        setError(result.error || "Google login failed. Please try again.")
      }
    } catch (err) {
      console.error("[StepAuth] Google login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleNext()
    }
  }

  // For development mode, show a hint
  const devModeHint = isDevelopmentMode ? (
    <div className="mt-2 text-xs text-gray-500 text-center">
      <p>Development mode: Use any email and password</p>
    </div>
  ) : null

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-center">{mode === "signin" ? "Welcome back!" : "Account created!"}</h2>
        <p className="text-gray-600 text-center">Redirecting you to your dashboard...</p>
        <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setMode("signin")}
          className={`px-4 py-2 ${mode === "signin" ? "font-bold border-b-2 border-black" : "text-gray-500"}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("register")}
          className={`px-4 py-2 ${mode === "register" ? "font-bold border-b-2 border-black" : "text-gray-500"}`}
        >
          Register
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-medium">What's your email?</h3>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-medium">Enter your password</h3>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {step === 3 && mode === "register" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-medium">What's your name?</h3>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {devModeHint}

        <button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>
                {step === (mode === "register" ? 3 : 2)
                  ? mode === "signin"
                    ? "Sign In"
                    : "Create Account"
                  : "Continue"}
              </span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "signin" ? "register" : "signin")}
            className="text-black font-medium hover:underline"
          >
            {mode === "signin" ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  )
}
