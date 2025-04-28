"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DoodleCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  delay?: number
  doodle?: "stars" | "circles" | "lines" | "squiggles" | "none"
}

export default function DoodleCard({
  children,
  className,
  hoverEffect = true,
  delay = 0,
  doodle = "none",
}: DoodleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.05)",
            }
          : {}
      }
      className={cn(
        "bg-white border-2 border-black rounded-xl transition-all duration-300 relative overflow-hidden",
        className,
      )}
    >
      {doodle !== "none" && (
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
          {doodle === "stars" && (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 8L36 20H48L38 28L42 40L32 32L22 40L26 28L16 20H28L32 8Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 8L18 14H24L19 18L21 24L16 20L11 24L13 18L8 14H14L16 8Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M48 48L50 54H56L51 58L53 64L48 60L43 64L45 58L40 54H46L48 48Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {doodle === "circles" && (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="32"
                cy="32"
                r="16"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 4"
              />
              <circle
                cx="32"
                cy="32"
                r="8"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="16"
                cy="16"
                r="4"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="48"
                cy="48"
                r="4"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {doodle === "lines" && (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8L56 56" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 24L40 56" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 8L56 40" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 40L24 56" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40 8L56 24" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}

          {doodle === "squiggles" && (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 16C12 12 20 20 24 16C28 12 36 20 40 16C44 12 52 20 56 16"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 32C12 28 20 36 24 32C28 28 36 36 40 32C44 28 52 36 56 32"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 48C12 44 20 52 24 48C28 44 36 52 40 48C44 44 52 52 56 48"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      )}

      {children}
    </motion.div>
  )
}
