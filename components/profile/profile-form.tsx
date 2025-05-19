"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { getDocument, saveUserProfile } from "@/lib/firestore-helpers"
import DoodleButton from "@/components/ui-elements/doodle-button"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfileForm() {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    college: "",
    major: "",
    graduationYear: "",
    location: "",
    interests: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      instagram: "",
    },
  })
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        const { data, error } = await getDocument("users", user.id)

        if (error) {
          throw new Error(error)
        }

        if (data) {
          setFormData({
            name: data.name || user.name || "",
            bio: data.bio || "",
            college: data.college || "",
            major: data.major || "",
            graduationYear: data.graduationYear || "",
            location: data.location || "",
            interests: data.interests || "",
            socialLinks: {
              linkedin: data.socialLinks?.linkedin || "",
              twitter: data.socialLinks?.twitter || "",
              instagram: data.socialLinks?.instagram || "",
            },
          })

          if (data.avatar) {
            setAvatarPreview(data.avatar)
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        setMessage({
          type: "error",
          text: "Failed to load profile data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    setMessage({ type: "", text: "" })

    try {
      // Upload avatar if changed
      let avatarUrl = user.avatar
      if (avatar) {
        const avatarRef = ref(storage, `profileImages/${user.id}/${Date.now()}_${avatar.name}`)
        await uploadBytes(avatarRef, avatar)
        avatarUrl = await getDownloadURL(avatarRef)
      }

      // Update user profile in Firestore
      const { error } = await saveUserProfile(user.id, {
        ...formData,
        avatar: avatarUrl,
      })

      if (error) {
        throw new Error(error)
      }

      setMessage({
        type: "success",
        text: "Profile updated successfully!",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <DoodleCard className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black bg-gray-100 mx-auto">
              {avatarPreview ? (
                <img src={avatarPreview || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                  {formData.name.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 border-2 border-black cursor-pointer"
            >
              <Camera className="h-4 w-4" />
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1" required />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="college">College/University</Label>
              <Input
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="major">Major/Field of Study</Label>
              <Input id="major" name="major" value={formData.major} onChange={handleInputChange} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                type="number"
                min="2000"
                max="2030"
                value={formData.graduationYear}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="interests">Interests (comma separated)</Label>
            <Input
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="e.g. AI, Web Development, Photography"
              className="mt-1"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/username"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/username"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg ${
              message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <div className="flex justify-end">
          <DoodleButton type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </DoodleButton>
        </div>
      </form>
    </DoodleCard>
  )
}
