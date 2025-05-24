"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import DoodleButton from "./ui-elements/doodle-button"
import { Eye, EyeOff, Mail, Lock, User, Calendar, School, BookOpen, AlertCircle } from "lucide-react"
import SuccessAnimation from "./success-animation"

const currentYear = new Date().getFullYear()
const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + i)

const interestOptions = [
  "Technology",
  "Business",
  "Arts",
  "Science",
  "Engineering",
  "Medicine",
  "Law",
  "Education",
  "Sports",
  "Music",
  "Design",
  "Writing",
]

const referralSources = [
  "Search Engine",
  "Social Media",
  "Friend Referral",
  "Campus Event",
  "Advertisement",
  "Email",
  "Other",
]

export default function RegistrationForm() {
  const router = useRouter()
  const { register } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    college: "",
    major: "",
    graduationYear: "",
    bio: "",
    referralSource: "",
  })
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.email || !formData.password || !formData.name) {
        setError("Email, password, and name are required")
        setIsLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long")
        setIsLoading(false)
        return
      }

      if (!acceptTerms) {
        setError("You must accept the terms and conditions")
        setIsLoading(false)
        return
      }

      // First register with basic info using context
      const result = await register(formData.email, formData.password, formData.name, formData.dob)

      if (!result.success) {
        throw new Error(result.error?.message || "Registration failed")
      }

      // Then send additional profile data to our API
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: result.userId,
          college: formData.college,
          major: formData.major,
          graduationYear: formData.graduationYear ? Number.parseInt(formData.graduationYear) : undefined,
          bio: formData.bio,
          interests: selectedInterests,
          referralSource: formData.referralSource,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        console.warn("Profile update warning:", data.error)
        // Continue despite profile update warning
      }

      // Show success animation
      setShowSuccessAnimation(true)

      // Redirect after animation completes
      setTimeout(() => {
        setShowSuccessAnimation(false)
        router.push("/dashboard?mode=edit&newUser=true")
      }, 2500)
    } catch (error) {
      console.error("Registration error:", error)
      setError((error as Error).message || "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showSuccessAnimation ? (
        <SuccessAnimation onComplete={() => router.push("/dashboard?mode=edit&newUser=true")} />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Join Dreamclerk</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-lg font-semibold">Basic Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
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
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
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

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
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
              </div>

              {/* Education Information */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-lg font-semibold">Education Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="college"
                      name="college"
                      type="text"
                      placeholder="University of Example"
                      className="pl-10"
                      value={formData.college}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Field of Study</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="major"
                        name="major"
                        type="text"
                        placeholder="Computer Science"
                        className="pl-10"
                        value={formData.major}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                    <Select
                      value={formData.graduationYear}
                      onValueChange={(value) => handleSelectChange("graduationYear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {graduationYears.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-lg font-semibold">Additional Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us a bit about yourself..."
                    className="min-h-[100px]"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={selectedInterests.includes(interest)}
                          onCheckedChange={() => toggleInterest(interest)}
                        />
                        <label
                          htmlFor={`interest-${interest}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referralSource">How did you hear about us?</Label>
                  <Select
                    value={formData.referralSource}
                    onValueChange={(value) => handleSelectChange("referralSource", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {referralSources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(!!checked)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <DoodleButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register Now"}
            </DoodleButton>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </>
      )}
    </div>
  )
}
