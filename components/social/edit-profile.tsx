"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, X, Check, Camera } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface EditProfileProps {
  onProfileUpdate: (updatedProfile: {
    name: string
    bio: string
    avatar: string | null
  }) => void
}

export function EditProfile({ onProfileUpdate }: EditProfileProps) {
  const { user, updateUserProfile } = useUser()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatar || null)
  const [nameError, setNameError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_BIO_LENGTH = 150

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setName(user?.name || "")
      setBio(user?.bio || "")
      setPreviewUrl(user?.avatar || null)
      setAvatarFile(null)
      setNameError("")
    }
  }, [open, user])

  // Clean up object URLs when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)

      // Revoke previous preview URL if it exists
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }

      // Create new preview URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const validateForm = (): boolean => {
    let isValid = true

    if (!name.trim()) {
      setNameError("Name is required")
      isValid = false
    } else {
      setNameError("")
    }

    return isValid
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      // In a real app, you would upload the avatar file to a storage service
      // and get back a URL. For now, we'll just use the preview URL.
      let avatarUrl = user?.avatar || null

      if (avatarFile) {
        // In a real app, this would be an API call to upload the file
        // For now, we'll just use the preview URL
        avatarUrl = previewUrl
      }

      // Update the profile
      const updatedProfile = {
        name,
        bio,
        avatar: avatarUrl,
      }

      // In a real app, you would call an API to update the profile
      await updateUserProfile({
        name,
        bio,
        avatar: avatarUrl,
      })

      // Notify parent component about the update
      onProfileUpdate(updatedProfile)

      // Close the dialog
      setOpen(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex items-center gap-2"
        aria-label="Edit profile"
      >
        <Edit size={16} />
        <span>Edit Profile</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-gray-200">
                  {previewUrl ? (
                    <AvatarImage src={previewUrl || "/placeholder.svg"} alt="Profile picture" />
                  ) : (
                    <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                  )}
                </Avatar>

                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                  onClick={triggerFileInput}
                  aria-label="Upload profile picture"
                >
                  <Camera size={16} />
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload profile picture"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={nameError ? "border-red-500" : ""}
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "name-error" : undefined}
              />
              {nameError && (
                <p id="name-error" className="text-sm text-red-500">
                  {nameError}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <span className={`text-xs ${bio.length > MAX_BIO_LENGTH ? "text-red-500" : "text-gray-500"}`}>
                  {bio.length}/{MAX_BIO_LENGTH}
                </span>
              </div>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                className={bio.length > MAX_BIO_LENGTH ? "border-red-500" : ""}
                rows={4}
                aria-invalid={bio.length > MAX_BIO_LENGTH}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="gap-2">
              <X size={16} />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!name.trim() || bio.length > MAX_BIO_LENGTH}
              className="gap-2"
            >
              <Check size={16} />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
