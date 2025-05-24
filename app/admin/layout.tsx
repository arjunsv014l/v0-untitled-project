import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle, Users, BarChart, Settings, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard - Dreamclerk",
  description: "Admin dashboard for Dreamclerk",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 hidden md:block">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="space-y-2">
          <Link href="/admin/dashboard" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/registrations" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <UserCircle className="mr-2 h-4 w-4" />
              Registrations
            </Button>
          </Link>
          <Link href="/admin/users" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>
          <Link href="/admin/settings" passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <div className="pt-4 border-t border-gray-200 mt-4">
            <Link href="/" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
