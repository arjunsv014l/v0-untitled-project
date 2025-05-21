"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DoodleButton from "./ui-elements/doodle-button"
import { Eye, EyeOff, Mail, Lock, User, Calendar, AlertCircle } from "lucide-react"
import { useUser } from "@/context/user-context"
import { signInWithGoogle } from "@/lib/social-auth"
import SuccessAnimation from "./success-animation"

interface SignInModalProps {
  trigger: React.ReactNode
  isRegister?: boolean
  onSuccess?: () => void
}

export default function SignInModal({ trigger, isRegister = false, onSuccess }: SignInModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { register, isLoading: authLoading } = useUser()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegistrationSuccess = () => {
    setShowSuccessAnimation(true)
    // Reset form
    setFormData({
      email: "",
      password: "",
      name: "",
      dob: "",
    })

    // Close modal after animation completes
    setTimeout(() => {
      setShowSuccessAnimation(false)
      setIsOpen(false)
      if (onSuccess) onSuccess()
    }, 2500) // Animation duration + small buffer
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      // Validate password
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long")
        setIsLoading(false)
        return
      }

      const result = await register(formData.email, formData.password, formData.name, formData.dob)
      if (result.success) {
        handleRegistrationSuccess()
      } else {
        if (result.error?.isNetworkError) {
          setError("Network error: Please check your internet connection and try again.")
        } else {
          setError(result.error?.message || "Registration failed. Please try again.")
        }
      }
    } catch (error) {
      setError((error as Error).message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signInWithGoogle()
      if (result.success) {
        handleRegistrationSuccess()
      } else {
        setError(result.error?.message || "Failed to sign in with Google")
      }
    } catch (error) {
      setError((error as Error).message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simplified registration with mock data
      const result = await register("user@example.com", "password", "Demo User")

      if (result.success) {
        setIsOpen(false)
        if (onSuccess) onSuccess()
      } else {
        setError("Registration failed")
      }
    } catch (error) {
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {showSuccessAnimation ? (
          <SuccessAnimation
            onComplete={() => {
              setShowSuccessAnimation(false)
              setIsOpen(false)
              if (onSuccess) onSuccess()
            }}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">Join Dreamclerk</DialogTitle>
            </DialogHeader>

            {isRegister ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      className="pl-10"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="register-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-600">
                  By registering, you agree to our{" "}
                  <a href="/terms" className="underline hover:text-black">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="underline hover:text-black">
                    Privacy Policy
                  </a>
                  .
                </div>

                <DoodleButton type="submit" className="w-full" disabled={isLoading || authLoading}>
                  {isLoading || authLoading ? "Creating Account..." : "Register Now"}
                </DoodleButton>
              </form>
            ) : (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Join DreamClerk</h2>

                  <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? "Creating Account..." : "Register Now"}
                  </button>

                  {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 w-full py-2 px-4 border border-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <DoodleButton
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={isLoading || authLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </DoodleButton>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
