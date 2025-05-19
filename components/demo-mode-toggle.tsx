"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { enableMockAuth, isMockAuthEnabled } from "@/lib/mock-auth"

export default function DemoModeToggle() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    setIsEnabled(isMockAuthEnabled())
  }, [])

  const handleToggle = (checked: boolean) => {
    if (checked) {
      enableMockAuth()
      setIsEnabled(true)
      // Reload to apply changes
      window.location.reload()
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("useMockAuth")
        setIsEnabled(false)
        // Reload to apply changes
        window.location.reload()
      }
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="demo-mode" checked={isEnabled} onCheckedChange={handleToggle} />
      <Label htmlFor="demo-mode">Demo Mode</Label>
    </div>
  )
}
