"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/lib/hooks"
import { useRouter } from "next/router"

export default function ProfileForm() {
  const { user, updateUser, isLoading } = useUser()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const updatedUser = {
      ...user,
      name,
      email,
    }

    await updateUser(updatedUser)
    router.push("/dashboard")
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}
