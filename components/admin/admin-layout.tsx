import type { ReactNode } from "react"
import AdminSidebar from "./admin-sidebar"
import AuthWrapper from "@/components/auth-wrapper"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthWrapper requiredRoles={["admin"]}>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AuthWrapper>
  )
}
