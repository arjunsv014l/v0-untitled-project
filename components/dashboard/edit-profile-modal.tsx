"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Camera } from "lucide-react"
import { useUser } from "@/context/user-context"

interface UserProfile {
  name: string
  username: string
  avatar: string
  coverImage: string
  bio: string
  location: string
  joined: string
  education: string
  website: string
  stats: {
    posts: number
    followers: number
    following: number
  }
}

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userProfile: UserProfile
  onSave: (updatedProfile: UserProfile) => void
  requiredFields?: string[]
}

export default function EditProfileModal({
  isOpen,
  onClose,
  userProfile,
  onSave,
  requiredFields = [],
}: EditProfileModalProps) {
  const [profile, setProfile] = useState<UserProfile>(userProfile)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const { uploadProfileImage } = useUser()

  // Field labels for display
  const fieldLabels: Record<string, string> = {
    name: "name",
    email: "email",
    bio: "bio",
    university: "education",
    major: "major",
    location: "location",
    graduationYear: "graduationYear",
  }

  // Update local state when userProfile changes
  useEffect(() => {
    setProfile(userProfile)
    setAvatarPreview(null)
    setCoverPreview(null)
  }, [userProfile, isOpen])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setCoverPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Upload images if changed
    const updatedProfile = { ...profile }

    if (avatarPreview) {
      const avatarUrl = await uploadProfileImage(avatarPreview, "avatar")
      if (avatarUrl) {
        updatedProfile.avatar = avatarUrl
      }
    }

    if (coverPreview) {
      const coverUrl = await uploadProfileImage(coverPreview, "cover")
      if (coverUrl) {
        updatedProfile.coverImage = coverUrl
      }
    }

    onSave(updatedProfile)
    onClose()
  }

  const isFieldRequired = (fieldName: string) => {
    return requiredFields.includes(fieldName) || requiredFields.includes(fieldLabels[fieldName] || "")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={coverPreview || profile.coverImage || "/placeholder.svg"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                <Camera size={16} />
                <input type="file" className="hidden" accept="image/*" onChange={handleCoverChange} />
              </label>
            </div>
          </div>

          {/* Avatar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <div className="relative w-24 h-24 mx-auto bg-gray-100 rounded-full overflow-hidden">
              <img
                src={avatarPreview || profile.avatar || "/placeholder.svg"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                <Camera size={14} />
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name {isFieldRequired("name") && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isFieldRequired("name") ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              required
            />
            {isFieldRequired("name") && (
              <p className="text-xs text-red-500 mt-1">This field is required to complete your profile</p>
            )}
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio {isFieldRequired("bio") && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isFieldRequired("bio") ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            ></textarea>
            {isFieldRequired("bio") && (
              <p className="text-xs text-red-500 mt-1">This field is required to complete your profile</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location {isFieldRequired("location") && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isFieldRequired("location") ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {isFieldRequired("location") && (
              <p className="text-xs text-red-500 mt-1">This field is required to complete your profile</p>
            )}
          </div>

          {/* Education */}
          <div className="mb-4">
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
              University/College {isFieldRequired("university") && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={profile.education}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isFieldRequired("university") ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {isFieldRequired("university") && (
              <p className="text-xs text-red-500 mt-1">This field is required to complete your profile</p>
            )}
          </div>

          {/* Major */}
          <div className="mb-4">
            <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
              Major/Field of Study {isFieldRequired("major") && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="major"
              name="major"
              value={profile.major || ""}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isFieldRequired("major") ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {isFieldRequired("major") && (
              <p className="text-xs text-red-500 mt-1">This field is required to complete your profile</p>
            )}
          </div>

          {/* Graduation Year */}
          <div className="mb-4">
            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year {isFieldRequired("graduationYear") && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="graduationYear"
              name="graduationYear"
              value={profile.graduationYear || ""}
              onChange={handleChange}
              placeholder="e.g. 2025"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isFieldRequired("graduationYear") ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {isFieldRequired("graduationYear") && (
              <p className="text-xs text-red-500 mt-1">This field is required to complete your profile</p>
            )}
          </div>

          {/* Website */}
          <div className="mb-6">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={profile.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="example.com"
            />
          </div>

          {requiredFields.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Note:</span> Fields marked with * are required to complete your profile.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
