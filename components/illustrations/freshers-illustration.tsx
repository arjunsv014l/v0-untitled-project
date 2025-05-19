"use client"

import { motion } from "framer-motion"
import DoodleIllustration from "../ui/doodle-illustration"

export default function FreshersIllustration({ className = "" }: { className?: string }) {
  return (
    <DoodleIllustration className={className}>
      <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="50" y="50" width="400" height="300" rx="20" fill="#EBF5FF" stroke="#000" strokeWidth="2" />

        {/* Campus building */}
        <motion.g
          initial={{ y: 10 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <rect x="300" y="100" width="100" height="150" fill="white" stroke="#000" strokeWidth="2" />
          <path d="M290 100H410L350 70L290 100Z" fill="white" stroke="#000" strokeWidth="2" />
          <rect x="320" y="130" width="20" height="30" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="360" y="130" width="20" height="30" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="340" y="200" width="20" height="50" fill="white" stroke="#000" strokeWidth="1.5" />
        </motion.g>

        {/* Student 1 */}
        <motion.g
          initial={{ x: -10 }}
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <circle cx="120" cy="180" r="25" fill="#BFDBFE" stroke="#000" strokeWidth="1.5" />
          <circle cx="120" cy="180" r="15" fill="white" stroke="#000" strokeWidth="1.5" />
          <path d="M110 175L115 180L110 185" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M130 175L125 180L130 185" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M120 190L120 230" stroke="#000" strokeWidth="1.5" />
          <path d="M120 230L100 260" stroke="#000" strokeWidth="1.5" />
          <path d="M120 230L140 260" stroke="#000" strokeWidth="1.5" />
          <path d="M100 210L140 210" stroke="#000" strokeWidth="1.5" />
          <path
            d="M115 190C115 190 110 195 120 200C130 195 125 190 125 190"
            stroke="#000"
            strokeWidth="1.5"
            fill="none"
          />
        </motion.g>

        {/* Student 2 */}
        <motion.g
          initial={{ x: 10 }}
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <circle cx="200" cy="200" r="25" fill="#C7D2FE" stroke="#000" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="15" fill="white" stroke="#000" strokeWidth="1.5" />
          <path d="M190 195L195 200L190 205" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M210 195L205 200L210 205" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M200 210L200 250" stroke="#000" strokeWidth="1.5" />
          <path d="M200 250L180 280" stroke="#000" strokeWidth="1.5" />
          <path d="M200 250L220 280" stroke="#000" strokeWidth="1.5" />
          <path d="M180 230L220 230" stroke="#000" strokeWidth="1.5" />
          <path
            d="M195 210C195 210 190 215 200 220C210 215 205 210 205 210"
            stroke="#000"
            strokeWidth="1.5"
            fill="none"
          />
        </motion.g>

        {/* Books and backpack */}
        <motion.g animate={{ rotate: [0, 2, 0, -2, 0] }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}>
          <rect x="150" y="280" width="40" height="30" fill="#93C5FD" stroke="#000" strokeWidth="1.5" />
          <rect x="155" y="270" width="30" height="10" fill="#93C5FD" stroke="#000" strokeWidth="1.5" />
          <rect x="240" y="290" width="30" height="20" fill="#BFDBFE" stroke="#000" strokeWidth="1.5" />
          <rect x="250" y="280" width="30" height="20" fill="#BFDBFE" stroke="#000" strokeWidth="1.5" />
          <rect x="260" y="270" width="30" height="20" fill="#BFDBFE" stroke="#000" strokeWidth="1.5" />
        </motion.g>

        {/* Text bubble */}
        <motion.g animate={{ y: [0, -3, 0, 3, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <path
            d="M160 120C160 109.507 168.507 101 179 101H221C231.493 101 240 109.507 240 120V140C240 150.493 231.493 159 221 159H200L190 170L180 159H179C168.507 159 160 150.493 160 140V120Z"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <text x="200" y="130" textAnchor="middle" fontSize="12" fontFamily="Arial" fontWeight="bold">
            Excited for college!
          </text>
        </motion.g>

        {/* Decorative elements */}
        <motion.circle
          cx="80"
          cy="80"
          r="10"
          fill="#DBEAFE"
          stroke="#000"
          strokeWidth="1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.circle
          cx="420"
          cy="100"
          r="8"
          fill="#DBEAFE"
          stroke="#000"
          strokeWidth="1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.circle
          cx="400"
          cy="300"
          r="12"
          fill="#DBEAFE"
          stroke="#000"
          strokeWidth="1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
        />
      </svg>
    </DoodleIllustration>
  )
}
