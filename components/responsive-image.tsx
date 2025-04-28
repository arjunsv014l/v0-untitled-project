"use client"

import { useState } from "react"
import Image from "next/image"

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function ResponsiveImage({ src, alt, className = "", priority = false }: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
        className={`object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        priority={priority}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <svg
            className="w-10 h-10 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
