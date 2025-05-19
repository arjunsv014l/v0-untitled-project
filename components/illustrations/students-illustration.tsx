"use client"

import { motion } from "framer-motion"
import DoodleIllustration from "../ui/doodle-illustration"

export default function StudentsIllustration({ className = "" }: { className?: string }) {
  return (
    <DoodleIllustration className={className}>
      <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="50" y="50" width="400" height="300" rx="20" fill="#F5F3FF" stroke="#000" strokeWidth="2" />

        {/* Student 1 with phone */}
        <motion.g
          initial={{ x: -5 }}
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <circle cx="150" cy="180" r="25" fill="#DDD6FE" stroke="#000" strokeWidth="1.5" />
          <circle cx="150" cy="180" r="15" fill="white" stroke="#000" strokeWidth="1.5" />
          <path d="M140 175L145 180L140 185" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M160 175L155 180L160 185" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M150 190L150 230" stroke="#000" strokeWidth="1.5" />
          <path d="M150 230L130 260" stroke="#000" strokeWidth="1.5" />
          <path d="M150 230L170 260" stroke="#000" strokeWidth="1.5" />
          <path d="M130 210L170 210" stroke="#000" strokeWidth="1.5" />

          {/* Phone */}
          <rect x="170" y="200" width="20" height="35" rx="3" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="172" y="205" width="16" height="25" rx="1" fill="#C4B5FD" stroke="#000" strokeWidth="0.5" />
          <circle cx="180" cy="235" r="2" fill="#000" />

          {/* Money symbols */}
          <motion.g
            animate={{ y: [0, -10, -20], opacity: [1, 0.8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <path d="M180 190L180 180" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M175 185L185 185" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* Student 2 with phone */}
        <motion.g
          initial={{ x: 5 }}
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <circle cx="300" cy="200" r="25" fill="#C4B5FD" stroke="#000" strokeWidth="1.5" />
          <circle cx="300" cy="200" r="15" fill="white" stroke="#000" strokeWidth="1.5" />
          <path d="M290 195L295 200L290 205" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M310 195L305 200L310 205" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M300 210L300 250" stroke="#000" strokeWidth="1.5" />
          <path d="M300 250L280 280" stroke="#000" strokeWidth="1.5" />
          <path d="M300 250L320 280" stroke="#000" strokeWidth="1.5" />
          <path d="M280 230L320 230" stroke="#000" strokeWidth="1.5" />

          {/* Phone */}
          <rect x="260" y="220" width="20" height="35" rx="3" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="262" y="225" width="16" height="25" rx="1" fill="#C4B5FD" stroke="#000" strokeWidth="0.5" />
          <circle cx="270" cy="255" r="2" fill="#000" />

          {/* Money symbols */}
          <motion.g
            animate={{ y: [0, -10, -20], opacity: [1, 0.8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            <path d="M270 210L270 200" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M265 205L275 205" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* Coins and rewards */}
        <motion.g animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}>
          <circle cx="220" cy="120" r="20" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
          <path d="M220 110V130" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          <path d="M210 120H230" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        <motion.g
          animate={{ rotate: [0, -5, 0, 5, 0] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <circle cx="350" cy="130" r="15" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
          <path d="M350 122V138" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          <path d="M342 130H358" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        <motion.g animate={{ rotate: [0, 8, 0, -8, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <circle cx="120" cy="130" r="18" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
          <path d="M120 121V139" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          <path d="M111 130H129" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Gift card */}
        <motion.g animate={{ y: [0, -5, 0, 5, 0] }} transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}>
          <rect x="380" y="200" width="50" height="30" rx="3" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="385" y="205" width="40" height="5" rx="1" fill="#C4B5FD" />
          <rect x="385" y="215" width="20" height="5" rx="1" fill="#C4B5FD" />
          <path d="M385 225H425" stroke="#000" strokeWidth="0.5" strokeDasharray="2 2" />
        </motion.g>

        {/* Text bubble */}
        <motion.g animate={{ y: [0, -3, 0, 3, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <path
            d="M200 80C200 69.507 208.507 61 219 61H281C291.493 61 300 69.507 300 80V100C300 110.493 291.493 119 281 119H260L250 130L240 119H219C208.507 119 200 110.493 200 100V80Z"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <text x="250" y="90" textAnchor="middle" fontSize="12" fontFamily="Arial" fontWeight="bold">
            Earn rewards daily!
          </text>
        </motion.g>
      </svg>
    </DoodleIllustration>
  )
}
