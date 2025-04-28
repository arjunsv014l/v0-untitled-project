"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface ColorProps {
  name: string
  hex: string
  className: string
  textClass?: string
}

export default function ColorPalette() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const ColorSwatch = ({ name, hex, className, textClass = "text-black" }: ColorProps) => (
    <div className="flex flex-col">
      <div
        className={`h-24 rounded-lg border-2 border-black ${className} relative mb-2 cursor-pointer transition-all hover:scale-105`}
        onClick={() => copyToClipboard(hex)}
      >
        {copied === hex && (
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg flex items-center justify-center">
            <div className="bg-white px-2 py-1 rounded-full border border-black flex items-center gap-1">
              <Check className="h-3 w-3" />
              <span className="text-xs">Copied!</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">{name}</span>
        <button onClick={() => copyToClipboard(hex)} className="text-gray-500 hover:text-black">
          <span className={`text-xs ${textClass}`}>{hex}</span>
          <Copy className="h-3 w-3 inline ml-1" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Primary Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Mint Green" hex="#C5F0C0" className="bg-[#C5F0C0]" />
          <ColorSwatch name="Lavender" hex="#E5CEFC" className="bg-[#E5CEFC]" />
          <ColorSwatch name="Sky Blue" hex="#BFE5FB" className="bg-[#BFE5FB]" />
          <ColorSwatch name="Peach" hex="#FFCFA3" className="bg-[#FFCFA3]" />
          <ColorSwatch name="Yellow" hex="#FDFD96" className="bg-[#FDFD96]" />
          <ColorSwatch name="Pink" hex="#FFCCE5" className="bg-[#FFCCE5]" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Neutral Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ColorSwatch name="Black" hex="#000000" className="bg-black" textClass="text-white" />
          <ColorSwatch name="Gray 800" hex="#1F2937" className="bg-gray-800" textClass="text-white" />
          <ColorSwatch name="Gray 500" hex="#6B7280" className="bg-gray-500" textClass="text-white" />
          <ColorSwatch name="Gray 300" hex="#D1D5DB" className="bg-gray-300" />
          <ColorSwatch name="White" hex="#FFFFFF" className="bg-white" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Semantic Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <ColorSwatch name="Success" hex="#C5F0C0" className="bg-[#C5F0C0]" />
          <ColorSwatch name="Warning" hex="#FFEFB7" className="bg-[#FFEFB7]" />
          <ColorSwatch name="Error" hex="#FFCDD5" className="bg-[#FFCDD5]" />
          <ColorSwatch name="Info" hex="#BFE5FB" className="bg-[#BFE5FB]" />
        </div>
      </div>
    </div>
  )
}
