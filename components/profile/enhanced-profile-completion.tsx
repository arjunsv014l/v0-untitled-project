"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Alert } from "@mui/material"

type Profile = {
  id?: string
  username?: string
  full_name?: string
  avatar_url?: string
  website?: string
}

const EnhancedProfileCompletion = () => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [website, setWebsite] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const user = useUser()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState<"success" | "error">("success")

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        if (!user) throw new Error("No user")

        const { data, error, status } = await supabase
          .from("profiles")
          .select(`username, full_name, website, avatar_url`)
          .eq("id", user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username || "")
          setFullName(data.full_name || "")
          setWebsite(data.website || "")
          setAvatarUrl(data.avatar_url || "")
        }
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [user, supabase])

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(avatar)
    } else {
      setAvatarPreview(null)
    }
  }, [avatar])

  const updateProfile = async (profile: Profile) => {
    try {
      setLoading(true)
      if (!user) throw new Error("No user")

      const updates = {
        id: user.id,
        username,
        full_name: fullName,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
        ...profile,
      }

      const { error } = await supabase.from("profiles").upsert(updates)

      if (error) {
        throw error
      }
    } catch (error: any) {
      setAlertMessage(error.message)
      setAlertType("error")
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      // Validate username
      if (!username) {
        setAlertMessage("Username is required.")
        setAlertType("error")
        setShowAlert(true)
        return
      }

      // Validate full name
      if (!fullName) {
        setAlertMessage("Full name is required.")
        setAlertType("error")
        setShowAlert(true)
        return
      }

      // Upload avatar if provided
      let avatarUrl = avatarPreview
      if (avatar && avatarUrl?.startsWith("data:")) {
        try {
          const fileName = `${user.id}/${Date.now()}_${avatar.name}`
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(fileName, avatar, {
              upsert: true,
            })

          if (uploadError) {
            // If bucket doesn't exist, skip avatar upload but continue with profile update
            if (uploadError.message.includes("Bucket not found")) {
              console.warn("Avatar bucket not found, skipping avatar upload")
              avatarUrl = null
            } else {
              throw uploadError
            }
          } else {
            // Get public URL only if upload was successful
            const {
              data: { publicUrl },
            } = supabase.storage.from("avatars").getPublicUrl(fileName)

            avatarUrl = publicUrl
          }
        } catch (avatarError) {
          console.error("Error uploading avatar:", avatarError)
          // Continue without avatar
          avatarUrl = null
        }
      }

      await updateProfile({ avatar_url: avatarUrl || avatarUrl })

      setAlertMessage("Profile updated successfully!")
      setAlertType("success")
      setShowAlert(true)

      setTimeout(() => {
        router.push("/account")
      }, 2000)
    } catch (error: any) {
      setAlertMessage(error.message)
      setAlertType("error")
      setShowAlert(true)
    }
  }

  return (
    <div className="form-widget">
      {showAlert && (
        <Alert severity={alertType} onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setAvatar(e.target.files[0])
              }
            }}
          />
          {avatarPreview && (
            <img
              src={avatarPreview || "/placeholder.svg"}
              alt="Avatar Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        <div>
          <button className="button block primary" disabled={loading}>
            {loading ? "Updating ..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EnhancedProfileCompletion
