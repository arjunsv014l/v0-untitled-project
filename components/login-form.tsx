"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import DoodleButton from "./ui-elements/doodle-button"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

export default function LoginForm() {
  const { login, isLoading } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
    } catch (err) {
      setError((err as Error).message || "Failed to login")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="pt-2">
          <DoodleButton type="submit" className="w-full" variant="gradient" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </DoodleButton>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Demo accounts:</p>
          <p>admin@dreamclerk.com / password123</p>
          <p>student@dreamclerk.com / password123</p>
          <p>editor@dreamclerk.com / password123</p>
        </div>
      </form>
    </div>
  )
}
