"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Camera } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import DoodleCard from "@/components/ui-elements/doodle-card"
import { supabase } from "@/lib/supabase"

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
  college: z.string().optional(),
  major: z.string().optional(),
  location: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ProfileEditorProps {
  onSaved?: () => void
}

export default function ProfileEditor({ onSaved }: ProfileEditorProps) {
  const { user, isLoading, updateProfile } = useUser()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0) // Add key to force re-render

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      college: user?.college || "",
      major: user?.major || "",
      location: user?.location || "",
    },
  })

  // Load user data into form when available or when user changes
  useEffect(() => {
    if (user) {
      // Reset form with current user data
      form.reset({
        name: user.name || "",
        bio: user.bio || "",
        college: user.college || "",
        major: user.major || "",
        location: user.location || "",
      })

      // Update avatar preview
      if (user.avatar_url) {
        setAvatarPreview(user.avatar_url)
      } else {
        setAvatarPreview(null)
      }

      // Clear any existing file selection
      setAvatar(null)

      // Force form re-render by updating key
      setFormKey((prev) => prev + 1)
    }
  }, [user, form])

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

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (!user) return

    setIsSaving(true)
    setMessage(null)

    try {
      // Upload avatar if changed
      let avatarUrl = user.avatar_url
      if (avatar) {
        // Delete old avatar if exists
        if (user.avatar_url) {
          const oldPath = user.avatar_url.split("/").slice(-2).join("/")
          await supabase.storage.from("avatars").remove([oldPath])
        }

        const fileName = `${user.id}/${Date.now()}_${avatar.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatar, {
            upsert: true,
          })

        if (uploadError) {
          throw new Error(`Avatar upload failed: ${uploadError.message}`)
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName)

        avatarUrl = publicUrl
      }

      // Update profile
      const success = await updateProfile({
        name: data.name,
        bio: data.bio || "",
        college: data.college || "",
        major: data.major || "",
        location: data.location || "",
        avatar_url: avatarUrl,
      })

      if (success) {
        setMessage({
          type: "success",
          text: "Profile updated successfully!",
        })

        // Clear the file input after successful save
        setAvatar(null)

        // Call onSaved callback if provided
        if (onSaved) {
          setTimeout(() => {
            onSaved()
          }, 1500)
        }
      } else {
        setMessage({
          type: "error",
          text: "Failed to update profile. Please try again.",
        })
      }
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile. Please try again.",
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

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please log in to edit your profile.</p>
      </div>
    )
  }

  return (
    <DoodleCard className="p-6" key={formKey}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar Upload */}
          <div className="text-center mb-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black bg-gray-100 mx-auto">
                {avatarPreview ? (
                  <img src={avatarPreview || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                    {user.name?.charAt(0).toUpperCase() || "?"}
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
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    rows={3}
                    placeholder="Tell us about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College/University</FormLabel>
                  <FormControl>
                    <Input placeholder="University name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major/Field of Study</FormLabel>
                  <FormControl>
                    <Input placeholder="Your field of study" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {message && (
            <div
              className={`p-3 rounded-lg ${
                message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-end gap-3">
            {/* Add a refresh button to manually sync data */}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Force refresh the form with current user data
                if (user) {
                  form.reset({
                    name: user.name || "",
                    bio: user.bio || "",
                    college: user.college || "",
                    major: user.major || "",
                    location: user.location || "",
                  })
                  setAvatarPreview(user.avatar_url || null)
                  setAvatar(null)
                  setMessage({
                    type: "success",
                    text: "Form refreshed with latest data",
                  })
                }
              }}
            >
              Refresh
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DoodleCard>
  )
}
