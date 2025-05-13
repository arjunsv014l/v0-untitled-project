import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import { UserProvider } from "@/context/user-context"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dreamclerk - Monetize Your College Experience",
  description: "Share your authentic college experiences and earn rewards with Dreamclerk.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
