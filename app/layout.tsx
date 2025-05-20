import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { UserProvider } from "@/context/user-context"
import NetworkStatus from "@/components/network-status"
import ScrollToTop from "@/components/scroll-to-top"

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
          <ScrollToTop />
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
          <NetworkStatus />
        </UserProvider>
      </body>
    </html>
  )
}
