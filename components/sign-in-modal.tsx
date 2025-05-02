"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useUser } from "@/context/user-context"
import DoodleButton from "./ui-elements/doodle-button"

interface SignInModalProps {
  trigger: React.ReactNode
  isRegister?: boolean
}

export default function SignInModal({ trigger, isRegister = false }: SignInModalProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { login, register, isLoading } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      let success = false
      if (isRegister) {
        success = await register(email, password, name)
      } else {
        success = await login(email, password)
      }

      if (success) {
        setOpen(false)
      } else {
        setError("Failed to sign in/register")
      }
    } catch (err) {
      setError((err as Error).message || "Failed to sign in/register")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-bold">{isRegister ? "Register" : "Sign In"}</h2>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-500 p-3 rounded-lg flex items-center text-red-700"
            >
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <DoodleButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : isRegister ? "Register" : "Sign In"}
            </DoodleButton>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
