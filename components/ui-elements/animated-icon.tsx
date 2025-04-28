"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedIconProps {
  icon: LucideIcon
  className?: string
  size?: number
  color?: string
  hoverEffect?: boolean
}

export default function AnimatedIcon({
  icon: Icon,
  className,
  size = 24,
  color = "currentColor",
  hoverEffect = true,
}: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={cn("inline-flex", className)}
    >
      <Icon size={size} color={color} />
    </motion.div>
  )
}
