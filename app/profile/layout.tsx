import type React from "react"
import { AuthProvider } from "@/context/auth-context"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
