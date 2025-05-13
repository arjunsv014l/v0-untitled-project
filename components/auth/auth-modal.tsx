"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import StepAuth from "./step-auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "signin" | "register"
}

export default function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0">
        <StepAuth initialMode={initialMode} onComplete={onClose} />
      </DialogContent>
    </Dialog>
  )
}
