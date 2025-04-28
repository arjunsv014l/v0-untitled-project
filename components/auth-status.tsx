"use client"

import { useUser } from "@/context/user-context"
import DoodleCard from "./ui-elements/doodle-card"
import DoodleButton from "./ui-elements/doodle-button"
import SignInModal from "./sign-in-modal"
import { User, LogOut } from "lucide-react"

export function AuthStatus() {
  const { user, logout, isLoading } = useUser()

  if (isLoading) {
    return (
      <DoodleCard className="p-6">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
          <p>Loading authentication status...</p>
        </div>
      </DoodleCard>
    )
  }

  if (!user) {
    return (
      <DoodleCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Not Signed In</h3>
            <p className="text-gray-600">Sign in to access all features</p>
          </div>
          <div className="flex gap-2">
            <SignInModal trigger={<DoodleButton size="sm">Sign In</DoodleButton>} />
            <SignInModal
              trigger={
                <DoodleButton size="sm" variant="outline">
                  Register
                </DoodleButton>
              }
              isRegister={true}
            />
          </div>
        </div>
      </DoodleCard>
    )
  }

  return (
    <DoodleCard className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-gray-600 text-sm">
              {user.email} • {user.role}
            </p>
          </div>
        </div>
        <DoodleButton size="sm" variant="outline" onClick={logout} className="flex items-center gap-1">
          <LogOut className="h-4 w-4" />
          Sign Out
        </DoodleButton>
      </div>
    </DoodleCard>
  )
}
