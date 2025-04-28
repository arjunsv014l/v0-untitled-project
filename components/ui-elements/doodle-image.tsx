"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DoodleImageProps {
  type: "ai-campus" | "monetize-experience" | "data-ethics" | "campus-improvements" | "freshman-guide" | "ai-future"
  className?: string
  width?: number
  height?: number
}

export default function DoodleImage({ type, className, width = 400, height = 200 }: DoodleImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden bg-white border-2 border-black rounded-xl", className)}
      style={{ width, height }}
    >
      {type === "ai-campus" && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Campus Building */}
          <rect x="100" y="75" width="100" height="75" fill="white" stroke="#10B84A" strokeWidth="2" />
          <polygon points="100,75 200,75 150,50" fill="white" stroke="#10B84A" strokeWidth="2" />
          <rect x="125" y="100" width="20" height="30" fill="white" stroke="#10B84A" strokeWidth="2" />
          <rect x="155" y="100" width="20" height="30" fill="white" stroke="#10B84A" strokeWidth="2" />

          {/* AI Brain */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <circle cx="275" cy="90" r="35" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M260,80 C265,70 285,70 290,80" stroke="#8B5CF6" strokeWidth="2" fill="none" />
            <path d="M260,100 C265,110 285,110 290,100" stroke="#8B5CF6" strokeWidth="2" fill="none" />
            <path d="M265,75 L265,105" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M275,75 L275,105" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M285,75 L285,105" stroke="#8B5CF6" strokeWidth="2" />
          </motion.g>

          {/* Connection Lines */}
          <motion.path
            d="M200,90 L240,90"
            stroke="#EC4899"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />

          {/* Students */}
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <circle cx="125" cy="150" r="10" fill="white" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="125" y1="160" x2="125" y2="175" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="125" y1="165" x2="115" y2="170" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="125" y1="165" x2="135" y2="170" stroke="#EC4899" strokeWidth="1.5" />

            <circle cx="155" cy="150" r="10" fill="white" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="155" y1="160" x2="155" y2="175" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="155" y1="165" x2="145" y2="170" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="155" y1="165" x2="165" y2="170" stroke="#EC4899" strokeWidth="1.5" />

            <circle cx="185" cy="150" r="10" fill="white" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="185" y1="160" x2="185" y2="175" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="185" y1="165" x2="175" y2="170" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="185" y1="165" x2="195" y2="170" stroke="#EC4899" strokeWidth="1.5" />
          </motion.g>

          {/* Text */}
          <text x="200" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333333">
            AI on Campus
          </text>
        </svg>
      )}

      {type === "monetize-experience" && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wallet */}
          <motion.g
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x="100" y="75" width="75" height="50" rx="5" fill="white" stroke="#10B84A" strokeWidth="2" />
            <rect x="110" y="85" width="55" height="30" rx="3" fill="white" stroke="#10B84A" strokeWidth="1.5" />
            <circle cx="137.5" cy="100" r="8" fill="white" stroke="#10B84A" strokeWidth="1.5" />
            <line x1="132.5" y1="100" x2="142.5" y2="100" stroke="#10B84A" strokeWidth="1.5" />
            <line x1="137.5" y1="95" x2="137.5" y2="105" stroke="#10B84A" strokeWidth="1.5" />
          </motion.g>

          {/* Coins */}
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <circle cx="225" cy="75" r="15" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <text x="225" y="79" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#8B5CF6">
              $
            </text>
          </motion.g>

          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <circle cx="250" cy="100" r="15" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <text x="250" y="104" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#8B5CF6">
              $
            </text>
          </motion.g>

          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <circle cx="275" cy="75" r="15" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <text x="275" y="79" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#8B5CF6">
              $
            </text>
          </motion.g>

          {/* Student */}
          <motion.g
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <circle cx="250" cy="150" r="15" fill="white" stroke="#EC4899" strokeWidth="2" />
            <line x1="250" y1="165" x2="250" y2="180" stroke="#EC4899" strokeWidth="2" />
            <line x1="250" y1="170" x2="240" y2="180" stroke="#EC4899" strokeWidth="2" />
            <line x1="250" y1="170" x2="260" y2="180" stroke="#EC4899" strokeWidth="2" />
            <line x1="235" y1="140" x2="245" y2="145" stroke="#EC4899" strokeWidth="1.5" />
            <line x1="265" y1="140" x2="255" y2="145" stroke="#EC4899" strokeWidth="1.5" />
          </motion.g>

          {/* Text */}
          <text x="200" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333333">
            Monetize Your Experience
          </text>
        </svg>
      )}

      {type === "data-ethics" && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield */}
          <motion.g
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M125,50 L175,50 L175,100 L150,125 L125,100 Z" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <circle cx="150" cy="75" r="12" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <text x="150" y="79" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#8B5CF6">
              P
            </text>
          </motion.g>

          {/* Data Flow */}
          <motion.g
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <rect x="225" y="50" width="75" height="15" rx="3" fill="white" stroke="#EC4899" strokeWidth="2" />
          </motion.g>

          <motion.g
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <rect x="225" y="75" width="75" height="15" rx="3" fill="white" stroke="#EC4899" strokeWidth="2" />
          </motion.g>

          <motion.g
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <rect x="225" y="100" width="75" height="15" rx="3" fill="white" stroke="#EC4899" strokeWidth="2" />
          </motion.g>

          <motion.path
            d="M175,57.5 L225,57.5"
            stroke="#10B84A"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          />

          <motion.path
            d="M175,82.5 L225,82.5"
            stroke="#10B84A"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          />

          <motion.path
            d="M175,107.5 L225,107.5"
            stroke="#10B84A"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          />

          {/* Lock */}
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <rect x="175" y="75" width="25" height="20" rx="3" fill="white" stroke="#10B84A" strokeWidth="2" />
            <rect x="182.5" y="65" width="10" height="10" rx="3" fill="white" stroke="#10B84A" strokeWidth="2" />
            <circle cx="187.5" cy="85" r="2.5" fill="#10B84A" />
          </motion.g>

          {/* Binary Data */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1, delay: 1.7 }}>
            <text x="150" y="150" fontFamily="monospace" fontSize="10" fill="#8B5CF6">
              10110101
            </text>
            <text x="150" y="165" fontFamily="monospace" fontSize="10" fill="#8B5CF6">
              01001010
            </text>
            <text x="250" y="150" fontFamily="monospace" fontSize="10" fill="#EC4899">
              11001100
            </text>
            <text x="250" y="165" fontFamily="monospace" fontSize="10" fill="#EC4899">
              00110011
            </text>
          </motion.g>

          {/* Text */}
          <text x="200" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333333">
            Data Ethics & Privacy
          </text>
        </svg>
      )}

      {type === "campus-improvements" && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Campus Building Before */}
          <motion.g initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <rect x="75" y="75" width="75" height="50" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <polygon points="75,75 150,75 112.5,50" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <rect x="90" y="90" width="15" height="20" fill="white" stroke="#8B5CF6" strokeWidth="1.5" />
            <rect x="120" y="90" width="15" height="20" fill="white" stroke="#8B5CF6" strokeWidth="1.5" />
          </motion.g>

          {/* Arrow */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <line x1="175" y1="87.5" x2="225" y2="87.5" stroke="#EC4899" strokeWidth="2" />
            <polygon points="225,87.5 215,82.5 215,92.5" fill="#EC4899" stroke="#EC4899" strokeWidth="1" />
          </motion.g>

          {/* Campus Building After */}
          <motion.g
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <rect x="250" y="75" width="75" height="50" fill="white" stroke="#10B84A" strokeWidth="2" />
            <polygon points="250,75 325,75 287.5,50" fill="white" stroke="#10B84A" strokeWidth="2" />
            <rect x="265" y="90" width="15" height="20" fill="white" stroke="#10B84A" strokeWidth="1.5" />
            <rect x="295" y="90" width="15" height="20" fill="white" stroke="#10B84A" strokeWidth="1.5" />
          </motion.g>

          {/* Improvements */}
          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 1.5 }}>
            <circle cx="287.5" cy="62.5" r="5" fill="#EC4899" />
          </motion.g>

          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 1.7 }}>
            <circle cx="287.5" cy="100" r="5" fill="#EC4899" />
          </motion.g>

          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 1.9 }}>
            <circle cx="262.5" cy="125" r="5" fill="#EC4899" />
          </motion.g>

          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 2.1 }}>
            <circle cx="312.5" cy="125" r="5" fill="#EC4899" />
          </motion.g>

          {/* Students */}
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.3 }}
          >
            <circle cx="262.5" cy="150" r="7.5" fill="white" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="262.5" y1="157.5" x2="262.5" y2="167.5" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="262.5" y1="160" x2="255" y2="165" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="262.5" y1="160" x2="270" y2="165" stroke="#8B5CF6" strokeWidth="1.5" />

            <circle cx="287.5" cy="150" r="7.5" fill="white" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="287.5" y1="157.5" x2="287.5" y2="167.5" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="287.5" y1="160" x2="280" y2="165" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="287.5" y1="160" x2="295" y2="165" stroke="#8B5CF6" strokeWidth="1.5" />

            <circle cx="312.5" cy="150" r="7.5" fill="white" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="312.5" y1="157.5" x2="312.5" y2="167.5" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="312.5" y1="160" x2="305" y2="165" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="312.5" y1="160" x2="320" y2="165" stroke="#8B5CF6" strokeWidth="1.5" />
          </motion.g>

          {/* Text */}
          <text x="200" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333333">
            Campus Improvements
          </text>
        </svg>
      )}

      {type === "freshman-guide" && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Graduation Cap */}
          <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <rect x="100" y="60" width="50" height="10" fill="white" stroke="#10B84A" strokeWidth="2" />
            <polygon points="125,50 150,60 125,70 100,60" fill="white" stroke="#10B84A" strokeWidth="2" />
            <line x1="140" y1="62.5" x2="140" y2="80" stroke="#10B84A" strokeWidth="2" />
            <line x1="135" y1="80" x2="145" y2="80" stroke="#10B84A" strokeWidth="2" />
          </motion.g>

          {/* Books */}
          <motion.g
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <rect x="100" y="100" width="30" height="40" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <rect x="105" y="95" width="30" height="40" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <rect x="110" y="90" width="30" height="40" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <line x1="115" y1="100" x2="135" y2="100" stroke="#8B5CF6" strokeWidth="1" />
            <line x1="115" y1="110" x2="135" y2="110" stroke="#8B5CF6" strokeWidth="1" />
            <line x1="115" y1="120" x2="135" y2="120" stroke="#8B5CF6" strokeWidth="1" />
          </motion.g>

          {/* Campus Map */}
          <motion.g
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <rect x="225" y="75" width="75" height="50" fill="white" stroke="#EC4899" strokeWidth="2" />
            <line x1="225" y1="90" x2="300" y2="90" stroke="#EC4899" strokeWidth="1" />
            <line x1="225" y1="105" x2="300" y2="105" stroke="#EC4899" strokeWidth="1" />
            <line x1="250" y1="75" x2="250" y2="125" stroke="#EC4899" strokeWidth="1" />
            <line x1="275" y1="75" x2="275" y2="125" stroke="#EC4899" strokeWidth="1" />
            <circle cx="262.5" cy="97.5" r="5" fill="#10B84A" />
            <text x="262.5" y="100" fontFamily="Arial" fontSize="6" textAnchor="middle" fill="white">
              YOU
            </text>
          </motion.g>

          {/* Checklist */}
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <rect x="225" y="135" width="75" height="40" fill="white" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="235" y1="145" x2="290" y2="145" stroke="#8B5CF6" strokeWidth="1" />
            <line x1="235" y1="155" x2="290" y2="155" stroke="#8B5CF6" strokeWidth="1" />
            <line x1="235" y1="165" x2="290" y2="165" stroke="#8B5CF6" strokeWidth="1" />
            <circle cx="230" cy="145" r="2" fill="#10B84A" />
            <circle cx="230" cy="155" r="2" fill="#10B84A" />
            <circle cx="230" cy="165" r="2" stroke="#10B84A" strokeWidth="1" fill="none" />
          </motion.g>

          {/* Student */}
          <motion.g
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <circle cx="175" cy="125" r="15" fill="white" stroke="#EC4899" strokeWidth="2" />
            <line x1="175" y1="140" x2="175" y2="165" stroke="#EC4899" strokeWidth="2" />
            <line x1="175" y1="145" x2="160" y2="155" stroke="#EC4899" strokeWidth="2" />
            <line x1="175" y1="145" x2="190" y2="155" stroke="#EC4899" strokeWidth="2" />
            <path d="M165,120 C170,115 180,115 185,120" stroke="#EC4899" strokeWidth="1.5" fill="none" />
          </motion.g>

          {/* Text */}
          <text x="200" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333333">
            Freshman Guide
          </text>
        </svg>
      )}

      {type === "ai-future" && (
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* AI Brain */}
          <motion.g
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <circle cx="125" cy="87.5" r="37.5" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M110,77.5 C115,67.5 135,67.5 140,77.5" stroke="#8B5CF6" strokeWidth="2" fill="none" />
            <path d="M110,97.5 C115,107.5 135,107.5 140,97.5" stroke="#8B5CF6" strokeWidth="2" fill="none" />
            <path d="M115,72.5 L115,102.5" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M125,72.5 L125,102.5" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M135,72.5 L135,102.5" stroke="#8B5CF6" strokeWidth="2" />
          </motion.g>

          {/* Future Timeline */}
          <motion.path
            d="M175,87.5 L300,87.5"
            stroke="#EC4899"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          >
            <circle cx="200" cy="87.5" r="5" fill="white" stroke="#EC4899" strokeWidth="2" />
            <text x="200" y="75" fontFamily="Arial" fontSize="8" textAnchor="middle" fill="#333333">
              2025
            </text>
          </motion.g>

          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.7 }}
          >
            <circle cx="237.5" cy="87.5" r="5" fill="white" stroke="#EC4899" strokeWidth="2" />
            <text x="237.5" y="75" fontFamily="Arial" fontSize="8" textAnchor="middle" fill="#333333">
              2030
            </text>
          </motion.g>

          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.9 }}
          >
            <circle cx="275" cy="87.5" r="5" fill="white" stroke="#EC4899" strokeWidth="2" />
            <text x="275" y="75" fontFamily="Arial" fontSize="8" textAnchor="middle" fill="#333333">
              2035
            </text>
          </motion.g>

          {/* Connection Lines */}
          <motion.path
            d="M162.5,87.5 L175,87.5"
            stroke="#10B84A"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 2.1 }}
          />

          {/* VR Headset */}
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.3 }}
          >
            <rect x="225" y="110" width="50" height="25" rx="5" fill="white" stroke="#10B84A" strokeWidth="2" />
            <rect x="237.5" y="110" width="25" height="10" rx="3" fill="white" stroke="#10B84A" strokeWidth="1.5" />
          </motion.g>

          {/* Floating Elements */}
          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              y: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              opacity: { duration: 0.5, delay: 2.5 },
            }}
          >
            <circle cx="175" cy="150" r="7.5" fill="white" stroke="#EC4899" strokeWidth="1.5" />
            <text x="175" y="153" fontFamily="Arial" fontSize="10" textAnchor="middle" fill="#EC4899">
              AI
            </text>
          </motion.g>

          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              y: { duration: 2.3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.3 },
              opacity: { duration: 0.5, delay: 2.7 },
            }}
          >
            <circle cx="200" cy="130" r="7.5" fill="white" stroke="#10B84A" strokeWidth="1.5" />
            <text x="200" y="133" fontFamily="Arial" fontSize="10" textAnchor="middle" fill="#10B84A">
              VR
            </text>
          </motion.g>

          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              y: { duration: 1.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.6 },
              opacity: { duration: 0.5, delay: 2.9 },
            }}
          >
            <circle cx="225" cy="150" r="7.5" fill="white" stroke="#8B5CF6" strokeWidth="1.5" />
            <text x="225" y="153" fontFamily="Arial" fontSize="10" textAnchor="middle" fill="#8B5CF6">
              AR
            </text>
          </motion.g>

          {/* Text */}
          <text x="200" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333333">
            The Future of AI in Education
          </text>
        </svg>
      )}
    </div>
  )
}
