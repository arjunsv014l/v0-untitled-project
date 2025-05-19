"use client"

import { motion } from "framer-motion"
import DoodleIllustration from "../ui/doodle-illustration"

export default function CompaniesIllustration({ className = "" }: { className?: string }) {
  return (
    <DoodleIllustration className={className}>
      <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="50" y="50" width="400" height="300" rx="20" fill="#FEF3C7" stroke="#000" strokeWidth="2" />

        {/* Data visualization elements */}
        <motion.g animate={{ y: [0, -5, 0, 5, 0] }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}>
          {/* Bar chart */}
          <rect x="100" y="150" width="100" height="150" rx="5" fill="white" stroke="#000" strokeWidth="1.5" />
          <line x1="110" y1="280" x2="190" y2="280" stroke="#000" strokeWidth="1.5" />
          <line x1="110" y1="160" x2="110" y2="280" stroke="#000" strokeWidth="1.5" />

          <motion.rect
            x="120"
            y="240"
            width="15"
            height="40"
            fill="#FCD34D"
            stroke="#000"
            strokeWidth="1"
            initial={{ height: 0, y: 280 }}
            animate={{ height: 40, y: 240 }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          <motion.rect
            x="145"
            y="220"
            width="15"
            height="60"
            fill="#FBBF24"
            stroke="#000"
            strokeWidth="1"
            initial={{ height: 0, y: 280 }}
            animate={{ height: 60, y: 220 }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          <motion.rect
            x="170"
            y="200"
            width="15"
            height="80"
            fill="#F59E0B"
            stroke="#000"
            strokeWidth="1"
            initial={{ height: 0, y: 280 }}
            animate={{ height: 80, y: 200 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.g>

        <motion.g animate={{ y: [0, 5, 0, -5, 0] }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}>
          {/* Line chart */}
          <rect x="220" y="150" width="100" height="150" rx="5" fill="white" stroke="#000" strokeWidth="1.5" />
          <line x1="230" y1="280" x2="310" y2="280" stroke="#000" strokeWidth="1.5" />
          <line x1="230" y1="160" x2="230" y2="280" stroke="#000" strokeWidth="1.5" />

          <motion.path
            d="M230 260 L250 240 L270 250 L290 210 L310 230"
            stroke="#D97706"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />

          <motion.circle cx="230" cy="260" r="4" fill="#FCD34D" stroke="#000" strokeWidth="1" />
          <motion.circle cx="250" cy="240" r="4" fill="#FCD34D" stroke="#000" strokeWidth="1" />
          <motion.circle cx="270" cy="250" r="4" fill="#FCD34D" stroke="#000" strokeWidth="1" />
          <motion.circle cx="290" cy="210" r="4" fill="#FCD34D" stroke="#000" strokeWidth="1" />
          <motion.circle cx="310" cy="230" r="4" fill="#FCD34D" stroke="#000" strokeWidth="1" />
        </motion.g>

        <motion.g animate={{ y: [0, -3, 0, 3, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          {/* Pie chart */}
          <circle cx="400" cy="225" r="50" fill="white" stroke="#000" strokeWidth="1.5" />

          <motion.path
            d="M400 225 L400 175 A50 50 0 0 1 443.3 200 Z"
            fill="#FCD34D"
            stroke="#000"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <motion.path
            d="M400 225 L443.3 200 A50 50 0 0 1 425 275 Z"
            fill="#F59E0B"
            stroke="#000"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />

          <motion.path
            d="M400 225 L425 275 A50 50 0 0 1 350 250 Z"
            fill="#D97706"
            stroke="#000"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />

          <motion.path
            d="M400 225 L350 250 A50 50 0 0 1 400 175 Z"
            fill="#B45309"
            stroke="#000"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          />
        </motion.g>

        {/* Data nodes and connections */}
        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <circle cx="150" cy="100" r="15" fill="#FEF3C7" stroke="#000" strokeWidth="1.5" />
          <circle cx="250" cy="80" r="15" fill="#FEF3C7" stroke="#000" strokeWidth="1.5" />
          <circle cx="350" cy="100" r="15" fill="#FEF3C7" stroke="#000" strokeWidth="1.5" />

          <line x1="165" y1="100" x2="235" y2="85" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="265" y1="80" x2="335" y2="95" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" />

          <line x1="150" y1="115" x2="150" y2="145" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="250" y1="95" x2="250" y2="145" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="350" y1="115" x2="350" y2="145" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" />
        </motion.g>

        {/* Text labels */}
        <text x="150" y="105" textAnchor="middle" fontSize="10" fontFamily="Arial" fontWeight="bold">
          Gen Z
        </text>
        <text x="250" y="85" textAnchor="middle" fontSize="10" fontFamily="Arial" fontWeight="bold">
          Data
        </text>
        <text x="350" y="105" textAnchor="middle" fontSize="10" fontFamily="Arial" fontWeight="bold">
          Insights
        </text>

        {/* Text bubble */}
        <motion.g animate={{ y: [0, -3, 0, 3, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <path
            d="M160 320C160 309.507 168.507 301 179 301H321C331.493 301 340 309.507 340 320V340C340 350.493 331.493 359 321 359H300L290 370L280 359H179C168.507 359 160 350.493 160 340V320Z"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <text x="250" y="330" textAnchor="middle" fontSize="12" fontFamily="Arial" fontWeight="bold">
            Real-time student data insights
          </text>
        </motion.g>
      </svg>
    </DoodleIllustration>
  )
}
