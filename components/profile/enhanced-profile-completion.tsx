"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle, Loader2, Camera } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { incrementUserCount } from "@/components/user-counter-widget"
import { motion } from "framer-motion"
import DoodleButton from "@/components/ui-elements/doodle-button"

const CURRENT_YEAR = new Date().getFullYear()
const GRADUATION_YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR + i)

export default function EnhancedProfileCompletion() {
  const { user } = useUser()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    college: "",
    major: "",
    graduationYear: "",
    location: "",
    interests: "",
    skills: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
    },
    privacySettings: {
      showEmail: false,
      showLocation: true,
      allowTagging: true,
      allowMessaging: true,
    },
    marketingConsent: false,
    profileVisibility: "public",
  })

  // Load existing user data if available
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return

      try {
        const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (error) throw error

        if (profile) {
          setFormData({
            name: profile.name || user.name || "",
            bio: profile.bio || "",
            college: profile.college || "",
            major: profile.major || "",
            graduationYear: profile.graduation_year?.toString() || "",
            location: profile.location || "",
            interests: Array.isArray(profile.interests) ? profile.interests.join(", ") : profile.interests || "",
            skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : profile.skills || "",
            socialLinks: {
              linkedin: profile.social_links?.linkedin || "",
              twitter: profile.social_links?.twitter || "",
              github: profile.social_links?.github || "",
            },
            privacySettings: {
              showEmail: profile.privacy_settings?.showEmail ?? false,
              showLocation: profile.privacy_settings?.showLocation ?? true,
              allowTagging: profile.privacy_settings?.allowTagging ?? true,
              allowMessaging: profile.privacy_settings?.allowMessaging ?? true,
            },
            marketingConsent: profile.marketing_consent || false,
            profileVisibility: profile.profile_visibility || "public",
          })

          if (profile.avatar_url) {
            setAvatarPreview(profile.avatar_url)
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      }
    }

    loadUserData()
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatar(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be logged in to complete your profile")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Upload avatar if provided
      let avatarUrl = avatarPreview
      if (avatar) {
        const fileName = `${user.id}/${Date.now()}_${avatar.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatar, {
            upsert: true,
          })

        if (uploadError) throw uploadError

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName)

        avatarUrl = publicUrl
      }

      // Convert interests and skills to arrays
      const interests = formData.interests
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)

      const skills = formData.skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)

      // Update profile in Supabase
      const { data, error } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          bio: formData.bio,
          college: formData.college,
          major: formData.major,
          graduation_year: formData.graduationYear ? Number.parseInt(formData.graduationYear) : null,
          location: formData.location,
          interests,
          skills,
          social_links: formData.socialLinks,
          privacy_settings: formData.privacySettings,
          marketing_consent: formData.marketingConsent,
          profile_visibility: formData.profileVisibility,
          avatar_url: avatarUrl,
          // Remove is_profile_complete field if it's causing issues
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()

      if (error) throw error

      setSuccess("Profile completed successfully!")

      // Increment user counter if this is a new profile completion
      try {
        await incrementUserCount()
      } catch (counterError) {
        console.error("Error incrementing counter:", counterError)
      }

      // Wait a moment to show success message
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setError(error.message || "Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Basic Information</h3>
              <p className="text-gray-500">Let's start with your basic details</p>
            </div>

            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black bg-gray-100 mx-auto">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                      {formData.name.charAt(0).toUpperCase() || "?"}
                    </div>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 border-2 border-black cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">Add a profile photo</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Education & Skills</h3>
              <p className="text-gray-500">Tell us about your education and skills</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="college">College/University</Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="e.g. Stanford University"
                />
              </div>

              <div>
                <Label htmlFor="major">Major/Field of Study</Label>
                <Input
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="e.g. Computer Science"
                />
              </div>

              <div>
                <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                <Select
                  value={formData.graduationYear}
                  onValueChange={(value) => handleSelectChange("graduationYear", value)}
                >
                  <SelectTrigger id="graduationYear">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADUATION_YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g. JavaScript, Python, Public Speaking"
                />
              </div>

              <div>
                <Label htmlFor="interests">Interests (comma separated)</Label>
                <Input
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="e.g. AI, Web Development, Design"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Social & Privacy</h3>
              <p className="text-gray-500">Connect your social profiles and set privacy preferences</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <Input
                  id="linkedin"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter/X Profile URL</Label>
                <Input
                  id="twitter"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>

              <div>
                <Label htmlFor="github">GitHub Profile URL</Label>
                <Input
                  id="github"
                  name="socialLinks.github"
                  value={formData.socialLinks.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Privacy Settings</h4>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showEmail"
                      checked={formData.privacySettings.showEmail}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("privacySettings.showEmail", checked as boolean)
                      }
                    />
                    <Label htmlFor="showEmail" className="text-sm font-normal">
                      Show my email address on my profile
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showLocation"
                      checked={formData.privacySettings.showLocation}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("privacySettings.showLocation", checked as boolean)
                      }
                    />
                    <Label htmlFor="showLocation" className="text-sm font-normal">
                      Show my location on my profile
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowTagging"
                      checked={formData.privacySettings.allowTagging}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("privacySettings.allowTagging", checked as boolean)
                      }
                    />
                    <Label htmlFor="allowTagging" className="text-sm font-normal">
                      Allow others to tag me in posts
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowMessaging"
                      checked={formData.privacySettings.allowMessaging}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("privacySettings.allowMessaging", checked as boolean)
                      }
                    />
                    <Label htmlFor="allowMessaging" className="text-sm font-normal">
                      Allow direct messages from other users
                    </Label>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select
                  value={formData.profileVisibility}
                  onValueChange={(value) => handleSelectChange("profileVisibility", value)}
                >
                  <SelectTrigger id="profileVisibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can view</SelectItem>
                    <SelectItem value="connections">Connections only</SelectItem>
                    <SelectItem value="private">Private - Only you</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Complete Your Profile</h3>
              <p className="text-gray-500">Review your information and complete your profile</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Profile Summary</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Name:</span> {formData.name}
                  </li>
                  <li>
                    <span className="font-medium">Bio:</span> {formData.bio || "Not provided"}
                  </li>
                  <li>
                    <span className="font-medium">Location:</span> {formData.location || "Not provided"}
                  </li>
                  <li>
                    <span className="font-medium">Education:</span>{" "}
                    {formData.college ? `${formData.college}, ${formData.major}` : "Not provided"}
                  </li>
                  <li>
                    <span className="font-medium">Skills:</span> {formData.skills || "Not provided"}
                  </li>
                  <li>
                    <span className="font-medium">Profile visibility:</span> {formData.profileVisibility}
                  </li>
                </ul>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => handleCheckboxChange("marketingConsent", checked as boolean)}
                />
                <Label htmlFor="marketingConsent" className="text-sm font-normal">
                  I agree to receive updates about new features, events, and opportunities
                </Label>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="termsAgreement" checked={true} disabled />
                <Label htmlFor="termsAgreement" className="text-sm font-normal">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to complete your profile</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/login")} className="w-full">
              Log In
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">
            Tell us more about yourself to get the most out of DreamClerk
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                  {step < 4 && (
                    <div
                      className={`absolute top-1/2 left-full w-[calc(100%-2rem)] h-0.5 -translate-y-1/2 ${
                        step < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Basics</span>
              <span>Education</span>
              <span>Social</span>
              <span>Review</span>
            </div>
          </div>

          {/* Form steps */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>

          {/* Error and success messages */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm flex items-start mt-6">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 text-green-600 rounded-md text-sm flex items-start mt-6">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep} disabled={isLoading}>
              Previous
            </Button>
          )}

          {currentStep < 4 ? (
            <Button onClick={nextStep} className="ml-auto">
              Next
            </Button>
          ) : (
            <DoodleButton onClick={handleSubmit} disabled={isLoading} className="ml-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : (
                "Complete Profile"
              )}
            </DoodleButton>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
