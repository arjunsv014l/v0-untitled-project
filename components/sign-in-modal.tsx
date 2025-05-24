"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DoodleButton from "./ui-elements/doodle-button"
import { Eye, EyeOff, Mail, Lock, User, Calendar, AlertCircle, BookOpen, GraduationCap } from "lucide-react"
import { useUser } from "@/context/user-context"
import { signInWithGoogle } from "@/lib/social-auth"
import SuccessAnimation from "./success-animation"
import WelcomeToast from "./welcome-toast"

interface SignInModalProps {
  trigger: React.ReactNode
  isRegister?: boolean
  onSuccess?: () => void
  redirectPath?: string
  isCareerButton?: boolean
  careerContent?: React.ReactNode
}

interface AuthResult {
  success: boolean
  userId?: string
  error?: {
    code: string
    message: string
    isNetworkError?: boolean
  }
}

export default function SignInModal({
  trigger,
  isRegister = false,
  onSuccess,
  redirectPath = "/dashboard",
  isCareerButton = false,
  careerContent = null,
}: SignInModalProps) {
  const router = useRouter()
  const { user, register, login, isLoading: authLoading } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    college: "",
    major: "",
    graduationYear: "",
    bio: "",
    location: "",
    interests: "",
    referralCode: "",
    marketingConsent: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showCareerContent, setShowCareerContent] = useState(false)
  // Track whether registration is completed
  const [registrationCompleted, setRegistrationCompleted] = useState(false)
  const [isRegisterState, setIsRegisterState] = useState(isRegister)
  const [showWelcomeToast, setShowWelcomeToast] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6 // Email, Password, Name, DOB, University, Major
  // Current year for graduation year options
  const currentYear = new Date().getFullYear()
  const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + i)

  // Reset isRegisterState when isRegister prop changes
  useEffect(() => {
    setIsRegisterState(isRegister)
  }, [isRegister])

  // Handle click on trigger button
  const handleTriggerClick = (e: React.MouseEvent) => {
    // Always prevent default to avoid any unwanted form submissions or navigation
    e.preventDefault()
    e.stopPropagation()

    if (isCareerButton) {
      // For career buttons, show content instead of redirecting
      if (user) {
        setShowCareerContent(true)
        setIsOpen(true)
      } else {
        // Not logged in, show the login modal with registration mode
        setShowCareerContent(false)
        setIsOpen(true)
      }
    } else {
      // Normal behavior for non-career buttons
      if (user) {
        // User is already logged in, redirect to profile/dashboard
        router.push(redirectPath)
      } else {
        // User is not logged in, open the modal
        setIsOpen(true)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRegistrationSuccess = () => {
    setRegistrationCompleted(true)
    setShowSuccessAnimation(true)
    // Show welcome toast
    setShowWelcomeToast(true)

    // Reset form
    setFormData({
      email: "",
      password: "",
      name: "",
      dob: "",
      college: "",
      major: "",
      graduationYear: "",
      bio: "",
      location: "",
      interests: "",
      referralCode: "",
      marketingConsent: false,
    })

    // Close modal after animation completes
    setTimeout(() => {
      setShowSuccessAnimation(false)

      if (isCareerButton) {
        // For career buttons, show content after successful login
        setShowCareerContent(true)
      } else {
        // For normal buttons, close modal and redirect or call onSuccess
        setIsOpen(false)
        if (onSuccess) {
          onSuccess()
        } else {
          // Redirect to dashboard directly - no profile page needed
          router.push(redirectPath)
        }
      }
    }, 2500) // Animation duration + small buffer
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.email) {
        setError("Email is required")
        setIsLoading(false)
        return
      }

      if (!formData.password) {
        setError("Password is required")
        setIsLoading(false)
        return
      }

      // Validate password
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long")
        setIsLoading(false)
        return
      }

      // Validate name for registration
      if (isRegisterState && !formData.name) {
        setError("Name is required")
        setIsLoading(false)
        return
      }

      // Handle login or registration
      let result: AuthResult

      if (isRegisterState) {
        // For registration, include all profile data
        const interests = formData.interests
          ? formData.interests
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          : []

        result = await register(
          formData.email,
          formData.password,
          formData.name,
          formData.dob,
          null, // avatar
          formData.college,
          formData.major,
          formData.graduationYear ? Number.parseInt(formData.graduationYear) : undefined,
          formData.bio,
          interests,
          formData.location,
          formData.referralCode,
          formData.marketingConsent,
        )
      } else {
        result = await login(formData.email, formData.password)
      }

      if (result.success) {
        setSuccess(isRegisterState ? "Registration successful!" : "Login successful!")
        handleRegistrationSuccess()
      } else {
        if (result.error?.isNetworkError) {
          setError("Network error: Please check your internet connection and try again.")
        } else {
          setError(
            result.error?.message ||
              (isRegisterState ? "Registration failed. Please try again." : "Login failed. Please try again."),
          )
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
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
        setSuccess("Google sign-in successful!")
        handleRegistrationSuccess()
      } else {
        setError(result.error?.message || "Failed to sign in with Google")
      }
    } catch (error) {
      console.error("Google sign-in error:", error)
      setError((error as Error).message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Check if user is already logged in and handle accordingly
  useEffect(() => {
    if (user && isOpen && !isCareerButton) {
      // For non-career buttons, redirect if logged in
      setIsOpen(false)
      router.push(redirectPath)
    } else if (user && isOpen && isCareerButton) {
      // For career buttons, show content if logged in
      setShowCareerContent(true)
    }
  }, [user, isOpen, router, redirectPath, isCareerButton])

  // Reset registration completed state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setRegistrationCompleted(false)
      setCurrentStep(1)
      setError(null)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={handleTriggerClick}>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {showSuccessAnimation ? (
          <SuccessAnimation
            onComplete={() => {
              setShowSuccessAnimation(false)

              if (isCareerButton) {
                // For career buttons, show content after successful login
                setShowCareerContent(true)
              } else {
                // For normal buttons, close modal and redirect or call onSuccess
                setIsOpen(false)
                if (onSuccess) {
                  onSuccess()
                } else {
                  // Only redirect if registration is completed
                  if (registrationCompleted) {
                    router.push(redirectPath)
                  }
                }
              }
            }}
          />
        ) : showCareerContent ? (
          // Show career content for logged-in users on career buttons
          <div className="career-content">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">Career Information</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {careerContent || (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Career Opportunities</h3>
                  <p>
                    Thank you for your interest in career opportunities with Dreamclerk. As a registered user, you now
                    have access to exclusive job listings and career resources.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Available Positions</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Campus Ambassador</li>
                      <li>Student Community Manager</li>
                      <li>Content Creator</li>
                      <li>Social Media Specialist</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    To apply for any of these positions, please visit your dashboard and explore the opportunities
                    section.
                  </p>
                  <DoodleButton
                    onClick={() => {
                      setIsOpen(false)
                      router.push("/dashboard")
                    }}
                    className="w-full"
                  >
                    Go to Dashboard
                  </DoodleButton>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Show login/register form for non-logged-in users
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                {isRegisterState ? "Join Dreamclerk" : "Welcome Back"}
              </DialogTitle>
            </DialogHeader>

            {isRegisterState && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Progress indicator */}
                <div className="flex justify-between mb-6">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 mx-1 rounded-full transition-colors ${
                        i < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Step 1: Email */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="auth-email">What's your email?</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="auth-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          autoFocus
                          required
                        />
                      </div>
                    </div>
                    <DoodleButton
                      type="button"
                      className="w-full"
                      onClick={() => {
                        if (!formData.email) {
                          setError("Email is required")
                          return
                        }
                        setError(null)
                        setCurrentStep(2)
                      }}
                      disabled={!formData.email}
                    >
                      Continue
                    </DoodleButton>
                  </div>
                )}

                {/* Step 2: Password */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="auth-password">Create a password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="auth-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.password}
                          onChange={handleInputChange}
                          autoFocus
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
                      <p className="text-xs text-gray-500">Must be at least 6 characters</p>
                    </div>
                    <div className="flex space-x-3">
                      <DoodleButton
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </DoodleButton>
                      <DoodleButton
                        type="button"
                        className="flex-1"
                        onClick={() => {
                          if (!formData.password) {
                            setError("Password is required")
                            return
                          }
                          if (formData.password.length < 6) {
                            setError("Password must be at least 6 characters")
                            return
                          }
                          setError(null)
                          setCurrentStep(3)
                        }}
                        disabled={!formData.password || formData.password.length < 6}
                      >
                        Continue
                      </DoodleButton>
                    </div>
                  </div>
                )}

                {/* Step 3: Name */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">What's your name?</Label>
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
                          autoFocus
                          required
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <DoodleButton
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setCurrentStep(2)}
                      >
                        Back
                      </DoodleButton>
                      <DoodleButton
                        type="button"
                        className="flex-1"
                        onClick={() => {
                          if (!formData.name) {
                            setError("Name is required")
                            return
                          }
                          setError(null)
                          setCurrentStep(4)
                        }}
                        disabled={!formData.name}
                      >
                        Continue
                      </DoodleButton>
                    </div>
                  </div>
                )}

                {/* Step 4: Date of Birth (Optional) */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">When's your birthday? (Optional)</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          className="pl-10"
                          value={formData.dob}
                          onChange={handleInputChange}
                          autoFocus
                        />
                      </div>
                      <p className="text-xs text-gray-500">You can skip this if you prefer</p>
                    </div>
                    <div className="flex space-x-3">
                      <DoodleButton
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setCurrentStep(3)}
                      >
                        Back
                      </DoodleButton>
                      <DoodleButton
                        type="button"
                        className="flex-1"
                        onClick={() => {
                          setError(null)
                          setCurrentStep(5)
                        }}
                      >
                        {formData.dob ? "Continue" : "Skip"}
                      </DoodleButton>
                    </div>
                  </div>
                )}

                {/* Step 5: University */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="college">Which university do you attend?</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="college"
                          name="college"
                          type="text"
                          placeholder="University of Example"
                          className="pl-10"
                          value={formData.college}
                          onChange={handleInputChange}
                          autoFocus
                        />
                      </div>
                      <p className="text-xs text-gray-500">Optional - helps us personalize your experience</p>
                    </div>
                    <div className="flex space-x-3">
                      <DoodleButton
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setCurrentStep(4)}
                      >
                        Back
                      </DoodleButton>
                      <DoodleButton
                        type="button"
                        className="flex-1"
                        onClick={() => {
                          setError(null)
                          setCurrentStep(6)
                        }}
                      >
                        {formData.college ? "Continue" : "Skip"}
                      </DoodleButton>
                    </div>
                  </div>
                )}

                {/* Step 6: Major */}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="major">What's your major?</Label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="major"
                          name="major"
                          type="text"
                          placeholder="Computer Science, Business, etc."
                          className="pl-10"
                          value={formData.major}
                          onChange={handleInputChange}
                          autoFocus
                        />
                      </div>
                      <p className="text-xs text-gray-500">Optional - helps connect you with relevant opportunities</p>
                    </div>
                    <div className="text-xs text-gray-600 mt-4">
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
                    <div className="flex space-x-3">
                      <DoodleButton
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setCurrentStep(5)}
                      >
                        Back
                      </DoodleButton>
                      <DoodleButton type="submit" className="flex-1" disabled={isLoading || authLoading}>
                        {isLoading || authLoading ? "Creating Account..." : "Complete Registration"}
                      </DoodleButton>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="text-center mt-4 text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterState(false)
                      setCurrentStep(1)
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}

            {!isRegisterState && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="auth-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="auth-email"
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
                  <Label htmlFor="auth-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="auth-password"
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

                <DoodleButton type="submit" className="w-full" disabled={isLoading || authLoading}>
                  {isLoading || authLoading ? "Signing In..." : "Sign In"}
                </DoodleButton>

                <div className="text-center mt-4 text-sm">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsRegisterState(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Register
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-md text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{success}</span>
                  </div>
                )}
              </form>
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
              {isRegisterState ? "Sign up with Google" : "Sign in with Google"}
            </DoodleButton>
          </>
        )}
        {/* Welcome Toast */}
        <WelcomeToast
          userName={formData.name || "there"}
          isVisible={showWelcomeToast}
          onClose={() => setShowWelcomeToast(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
