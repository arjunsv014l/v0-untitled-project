"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { ProfileService } from "@/services/profile-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import LoadingState from "@/components/loading-state"

export default function ProfileCompletion() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Safely access auth context
  const authContext = useAuth()

  const user = authContext?.user
  const updateProfile = authContext?.updateProfile

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      })
    }
  }, [user])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")

      // Validate form
      if (!formData.name || !formData.email || !formData.bio) {
        setError("All fields are required")
        return
      }

      if (!user) {
        setError("You must be logged in to complete your profile")
        return
      }

      // Update profile with form data and mark as complete
      const success = await ProfileService.completeProfile(user.id, {
        ...formData,
        profileCompleted: true,
      })

      if (!success) {
        throw new Error("Failed to complete profile")
      }

      // Update user in auth context
      if (updateProfile) {
        await updateProfile({
          ...formData,
          profileCompleted: true,
        })
      }

      setSuccess(true)

      // Redirect will be handled by the navigation guard
    } catch (error) {
      console.error("[ProfileCompletion] Error:", error)
      setError("An error occurred while completing your profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading && !user) {
    return <LoadingState message="Loading profile..." />
  }

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Please provide the following information to complete your profile.</CardDescription>
        </CardHeader>

        <CardContent>
          {error && <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">{error}</div>}

          {success && (
            <div className="bg-green-50 text-green-800 p-3 rounded-md mb-4">
              Profile completed successfully! Redirecting to dashboard...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  disabled={loading || Boolean(user?.email)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  disabled={loading}
                  required
                  rows={4}
                />
                <p className="text-xs text-gray-500">{formData.bio.length}/500 characters</p>
              </div>
            </div>

            <div className="mt-6">
              <Button type="submit" className="w-full" disabled={loading || !updateProfile}>
                {loading ? "Saving..." : "Complete Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
