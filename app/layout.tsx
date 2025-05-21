import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { UserProvider } from "@/context/user-context"

export const metadata: Metadata = {
  title: "DreamClerk",
  description: "DreamClerk minimal app",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
