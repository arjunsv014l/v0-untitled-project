"use client"

import { motion } from "framer-motion"
import DoodleIllustration from "../ui/doodle-illustration"

export default function UniversitiesIllustration({ className = "" }: { className?: string }) {
  return (
    <DoodleIllustration className={className}>
      <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="50" y="50" width="400" height="300" rx="20" fill="#ECFDF5" stroke="#000" strokeWidth="2" />

        {/* University building */}
        <motion.g animate={{ y: [0, -3, 0, 3, 0] }} transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}>
          <rect x="150" y="150" width="200" height="150" fill="white" stroke="#000" strokeWidth="2" />
          <path d="M140 150H360L250 100L140 150Z" fill="white" stroke="#000" strokeWidth="2" />

          {/* Columns */}
          <rect x="170" y="200" width="20" height="100" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="215" y="200" width="20" height="100" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="260" y="200" width="20" height="100" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="305" y="200" width="20" height="100" fill="white" stroke="#000" strokeWidth="1.5" />

          {/* Steps */}
          <rect x="170" y="300" width="155" height="10" fill="white" stroke="#000" strokeWidth="1.5" />
          <rect x="180" y="310" width="135" height="10" fill="white" stroke="#000" strokeWidth="1.5" />

          {/* Door */}
          <rect x="235" y="250" width="30" height="50" fill="white" stroke="#000" strokeWidth="1.5" />
          <circle cx="240" cy="275" r="2" fill="#000" />

          {/* Windows */}
          <rect x="180" y="170" width="15" height="20" fill="#D1FAE5" stroke="#000" strokeWidth="1" />
          <rect x="210" y="170" width="15" height="20" fill="#D1FAE5" stroke="#000" strokeWidth="1" />
          <rect x="275" y="170" width="15" height="20" fill="#D1FAE5" stroke="#000" strokeWidth="1" />
          <rect x="305" y="170" width="15" height="20" fill="#D1FAE5" stroke="#000" strokeWidth="1" />
        </motion.g>

        {/* Students */}
        <motion.g
          initial={{ x: -20 }}
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        >
          <circle cx="120" cy="280" r="15" fill="#A7F3D0" stroke="#000" strokeWidth="1.5" />
          <circle cx="120" cy="280" r="8" fill="white" stroke="#000" strokeWidth="1" />
          <path d="M120 290L120 320" stroke="#000" strokeWidth="1.5" />
          <path d="M120 320L110 340" stroke="#000" strokeWidth="1.5" />
          <path d="M120 320L130 340" stroke="#000" strokeWidth="1.5" />
          <path d="M110 305L130 305" stroke="#000" strokeWidth="1.5" />
        </motion.g>

        <motion.g
          initial={{ x: 20 }}
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        >
          <circle cx="380" cy="280" r="15" fill="#A7F3D0" stroke="#000" strokeWidth="1.5" />
          <circle cx="380" cy="280" r="8" fill="white" stroke="#000" strokeWidth="1" />
          <path d="M380 290L380 320" stroke="#000" strokeWidth="1.5" />
          <path d="M380 320L370 340" stroke="#000" strokeWidth="1.5" />
          <path d="M380 320L390 340" stroke="#000" strokeWidth="1.5" />
          <path d="M370 305L390 305" stroke="#000" strokeWidth="1.5" />
        </motion.g>

        {/* Data visualization elements */}
        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          {/* Satisfaction chart */}
          <rect x="80" y="80" width="80" height="60" rx="5" fill="white" stroke="#000" strokeWidth="1.5" />
          <text x="120" y="95" textAnchor="middle" fontSize="8" fontFamily="Arial">
            Satisfaction
          </text>

          <motion.path
            d="M90 120 L100 110 L110 115 L120 100 L130 105 L140 95"
            stroke="#059669"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        >
          {/* Retention chart */}
          <rect x="340" y="80" width="80" height="60" rx="5" fill="white" stroke="#000" strokeWidth="1.5" />
          <text x="380" y="95" textAnchor="middle" fontSize="8" fontFamily="Arial">
            Retention
          </text>

          <motion.rect
            x="350"
            y="120"
            width="10"
            height="10"
            fill="#059669"
            initial={{ height: 0, y: 130 }}
            animate={{ height: 10, y: 120 }}
            transition={{ duration: 1 }}
          />

          <motion.rect
            x="365"
            y="115"
            width="10"
            height="15"
            fill="#10B981"
            initial={{ height: 0, y: 130 }}
            animate={{ height: 15, y: 115 }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          <motion.rect
            x="380"
            y="110"
            width="10"
            height="20"
            fill="#34D399"
            initial={{ height: 0, y: 130 }}
            animate={{ height: 20, y: 110 }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          <motion.rect
            x="395"
            y="105"
            width="10"
            height="25"
            fill="#6EE7B7"
            initial={{ height: 0, y: 130 }}
            animate={{ height: 25, y: 105 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.g>

        {/* Text bubble */}
        <motion.g animate={{ y: [0, -3, 0, 3, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <path
            d="M160 60C160 49.507 168.507 41 179 41H321C331.493 41 340 49.507 340 60V80C340 90.493 331.493 99 321 99H300L290 110L280 99H179C168.507 99 160 90.493 160 80V60Z"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <text x="250" y="70" textAnchor="middle" fontSize="12" fontFamily="Arial" fontWeight="bold">
            Transform your campus with data
          </text>
        </motion.g>
      </svg>
    </DoodleIllustration>
  )
}
