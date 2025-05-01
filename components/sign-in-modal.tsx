"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Mail, Upload, Camera, User, AlertCircle, Calendar, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface SignInModalProps {
  trigger: React.ReactNode
  isRegister?: boolean
}

export default function SignInModal({ trigger, isRegister = false }: SignInModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [university, setUniversity] = useState("")
  const [major, setMajor] = useState("")
  const [bio, setBio] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { login, loginWithGoogle, register } = useUser()
  const [registrationStep, setRegistrationStep] = useState(1)
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [user, setUser] = useState<any>(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Check for existing session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  // Check password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    // Length check
    if (password.length >= 8) strength += 1
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1
    // Contains number
    if (/[0-9]/.test(password)) strength += 1
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }, [password])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    resetForm()
  }, [])

  const validateEmail = (email: string): boolean => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle email sign in/register using the context
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      if (isRegister) {
        if (!name) {
          setError("Please enter your name")
          setIsSubmitting(false)
          return
        }

        if (!acceptTerms) {
          setError("You must accept the terms and conditions")
          setIsSubmitting(false)
          return
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setIsSubmitting(false)
          return
        }
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address")
        setIsSubmitting(false)
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        setIsSubmitting(false)
        return
      }

      // Add more detailed logging
      console.log("Form validation passed, proceeding with authentication")
      console.log("Email:", email)
      console.log("Password length:", password.length)
      console.log("Is register mode:", isRegister)

      let success = false

      if (isRegister) {
        // Register new user
        try {
          console.log("Attempting to register user:", email)
          success = await register(email, password, name, dob, profilePhoto)
          console.log("Registration result:", success)

          if (!success) {
            setError("Registration failed. This email may already be in use or there was a server error.")
          } else {
            closeModal()
            router.push("/dashboard")
          }
        } catch (regError) {
          console.error("Registration error in component:", regError)
          setError("Registration failed. Please try again later.")
        }
      } else {
        // Login existing user
        try {
          console.log("Attempting to login user:", email)
          success = await login(email, password)
          console.log("Login result:", success)

          if (!success) {
            setError("Invalid email or password.")
          } else {
            closeModal()
            router.push("/dashboard")
          }
        } catch (loginError) {
          console.error("Login error in component:", loginError)
          setError("Login failed. Please try again later.")
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true)
      console.log("Attempting Google sign-in")

      const success = await loginWithGoogle()
      console.log("Google sign-in result:", success)

      if (success) {
        closeModal()
        router.push("/dashboard")
      } else {
        setError("Failed to sign in with Google. Please try again.")
      }
    } catch (error) {
      console.error("Google sign-in error:", error)
      setError("An error occurred with Google sign-in. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setName("")
    setDob("")
    setUniversity("")
    setMajor("")
    setBio("")
    setAcceptTerms(false)
    setProfilePhoto(null)
    setError("")
    setIsSubmitting(false)
    setRegistrationStep(1)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfilePhoto(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleStepNavigation = () => {
    // Validate current step
    if (registrationStep === 1 && !name) {
      setError("Please enter your name")
      return
    }

    if (registrationStep === 2 && !validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (registrationStep === 3) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }
    }

    if (registrationStep === 5) {
      // Final step - submit the form
      handleEmailSignIn(new Event("submit") as any)
      return
    }

    // Clear any errors and proceed to next step
    setError("")
    setRegistrationStep((prev) => prev + 1)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
  }

  // Demo login function for easier testing
  const handleDemoLogin = async (demoType: "admin" | "student") => {
    setIsSubmitting(true)
    setError("")

    try {
      const demoEmail = demoType === "admin" ? "admin@example.com" : "student@example.com"
      const demoPassword = "password"

      console.log(`Attempting demo login as ${demoType}:`, demoEmail)
      const success = await login(demoEmail, demoPassword)

      if (success) {
        closeModal()
        router.push("/dashboard")
      } else {
        setError(`Demo ${demoType} login failed. Please try again.`)
      }
    } catch (error) {
      console.error("Demo login error:", error)
      setError("Demo login failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fallback login for testing
  const handleFallbackLogin = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // Create a mock user session
      console.log("Using fallback login method")

      // Simulate successful login
      setTimeout(() => {
        console.log("Fallback login successful")
        closeModal()
        router.push("/dashboard")
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      console.error("Fallback login error:", error)
      setError("Login failed. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open === false) {
          closeModal()
        } else {
          setIsOpen(open)
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={`p-0 border-none bg-transparent shadow-none ${
          isMobile ? "w-[95%] max-w-[350px]" : "sm:max-w-[400px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]"
        >
          {/* Close button */}
          <div
            className="absolute top-3 right-3 z-20 cursor-pointer touch-manipulation"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              closeModal()
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 shadow-sm">
              <X className="h-5 w-5" />
            </div>
          </div>

          {/* Updated colorful background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-300 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 rounded-full transform -translate-x-16 translate-y-16"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`signin-${registrationStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6 relative z-10"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 bg-gradient-to-br from-green-200 to-blue-200">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-black">{isRegister ? "Join Dreamclerk" : "Welcome Back"}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {isRegister ? "Start monetizing your college experience" : "Sign in to continue"}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {isRegister && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Step {registrationStep} of 5</span>
                    <span className="text-xs text-gray-500">{registrationStep === 5 ? "Final Step" : "Continue"}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-black h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(registrationStep / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {isRegister && registrationStep === 1 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div
                      className="w-20 h-20 mx-auto mb-2 rounded-full border-2 border-black overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      {profilePhoto ? (
                        <img
                          src={profilePhoto || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <User className="h-8 w-8 mb-0.5" />
                          <span className="text-xs">Add Photo</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex justify-center space-x-3">
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="text-sm text-gray-600 flex items-center hover:text-black"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          // In a real app, this would trigger the camera
                          alert("Camera functionality would open here")
                        }}
                        className="text-sm text-gray-600 flex items-center hover:text-black"
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        Camera
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        disabled={isSubmitting}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}

              {isRegister && registrationStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="email@example.com"
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll send a verification link to this email</p>
                  </div>

                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                      University/College
                    </label>
                    <input
                      type="text"
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Your university or college"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                      Major/Field of Study
                    </label>
                    <input
                      type="text"
                      id="major"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Your major or field of study"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              {isRegister && registrationStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="Create a strong password"
                        required
                        minLength={6}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {password && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-700">Password strength:</span>
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: passwordStrength <= 1 ? "red" : passwordStrength <= 3 ? "orange" : "green",
                            }}
                          >
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-gray-600">
                          <li className="flex items-center">
                            <span className={password.length >= 8 ? "text-green-500" : "text-gray-400"}>
                              {password.length >= 8 ? <CheckCircle2 className="h-3 w-3 inline mr-1" /> : "•"}
                            </span>
                            At least 8 characters
                          </li>
                          <li className="flex items-center">
                            <span className={/[A-Z]/.test(password) ? "text-green-500" : "text-gray-400"}>
                              {/[A-Z]/.test(password) ? <CheckCircle2 className="h-3 w-3 inline mr-1" /> : "•"}
                            </span>
                            Uppercase letter
                          </li>
                          <li className="flex items-center">
                            <span className={/[0-9]/.test(password) ? "text-green-500" : "text-gray-400"}>
                              {/[0-9]/.test(password) ? <CheckCircle2 className="h-3 w-3 inline mr-1" /> : "•"}
                            </span>
                            Number
                          </li>
                          <li className="flex items-center">
                            <span className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-gray-400"}>
                              {/[^A-Za-z0-9]/.test(password) ? <CheckCircle2 className="h-3 w-3 inline mr-1" /> : "•"}
                            </span>
                            Special character
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="Confirm your password"
                        required
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {password && confirmPassword && (
                      <p className={`text-xs mt-1 ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}>
                        {password === confirmPassword ? (
                          <span className="flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Passwords match
                          </span>
                        ) : (
                          "Passwords do not match"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {isRegister && registrationStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio (Optional)
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                      placeholder="Tell us a bit about yourself..."
                      rows={4}
                      disabled={isSubmitting}
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{bio.length}/200 characters</p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-green-600 hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-green-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              )}

              {isRegister && registrationStep === 5 && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-800 mb-2">Almost there!</h3>
                    <p className="text-sm text-green-700">
                      Please review your information before creating your account:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li className="flex">
                        <span className="font-medium w-24 text-gray-600">Name:</span>
                        <span className="text-black">{name}</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-24 text-gray-600">Email:</span>
                        <span className="text-black">{email}</span>
                      </li>
                      {university && (
                        <li className="flex">
                          <span className="font-medium w-24 text-gray-600">University:</span>
                          <span className="text-black">{university}</span>
                        </li>
                      )}
                      {major && (
                        <li className="flex">
                          <span className="font-medium w-24 text-gray-600">Major:</span>
                          <span className="text-black">{major}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {!isRegister && (
                <div className="space-y-4">
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="w-full h-10 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group text-base disabled:opacity-70"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-100 via-green-100 to-blue-100 opacity-0 group-hover:opacity-50 transition-opacity"></span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative z-10"
                    >
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
                    <span className="relative z-10">Continue with Google</span>
                  </Button>

                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-3 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="email@example.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 text-base border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                          placeholder="Enter your password"
                          required
                          minLength={6}
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="flex justify-end mt-1">
                        <a href="#" className="text-sm text-green-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-base mt-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" />
                          <span>Sign in with Email</span>
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {isRegister ? (
                <div className="flex space-x-2 mt-4">
                  {registrationStep > 1 && (
                    <Button
                      type="button"
                      onClick={() => setRegistrationStep((prev) => Math.max(1, prev - 1))}
                      className="flex-1 h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-black border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-base"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleStepNavigation}
                    disabled={isSubmitting || (registrationStep === 4 && !acceptTerms)}
                    className="flex-1 h-10 flex items-center justify-center bg-black hover:bg-gray-800 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : registrationStep < 5 ? (
                      "Continue"
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-1" />
                        <span>Create Account</span>
                      </>
                    )}
                  </Button>
                </div>
              ) : null}

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      closeModal()
                      // This would typically navigate to the other modal
                      // For now, we'll just show an alert
                      alert(isRegister ? "Would navigate to sign in" : "Would navigate to register")
                    }}
                    className="text-green-600 hover:underline font-medium"
                  >
                    {isRegister ? "Sign in" : "Sign up"}
                  </a>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs font-medium text-center text-gray-700 mb-2">Quick access demo accounts:</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => handleDemoLogin("admin")}
                    disabled={isSubmitting}
                    className="flex-1 h-8 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
                  >
                    Admin Demo
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDemoLogin("student")}
                    disabled={isSubmitting}
                    className="flex-1 h-8 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
                  >
                    Student Demo
                  </Button>
                </div>
              </div>

              {/* Fallback login button for testing */}
              <div className="mt-3 text-xs text-center">
                <Button
                  type="button"
                  onClick={handleFallbackLogin}
                  disabled={isSubmitting}
                  className="w-full h-8 text-xs bg-green-100 hover:bg-green-200 text-green-800 border border-green-300 mt-2"
                >
                  Use Fallback Login (Testing Only)
                </Button>
                <p className="text-gray-500 mt-1">Use this option if other login methods fail</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
