"use client"

import { useState, useEffect } from "react"
import { Rocket, Star } from "lucide-react"
import DoodleCard from "./ui-elements/doodle-card"
import { motion } from "framer-motion"

export default function LaunchingSoon() {
  const [days, setDays] = useState(30)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)

      if (difference <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <DoodleCard className="p-6 relative overflow-hidden">
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              opacity: [null, 1, 0.3],
              scale: [null, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-full"
          >
            <Rocket className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Launching Soon!</h2>

        <p className="text-center text-gray-600 mb-8">
          We're working hard to bring you an amazing experience. Stay tuned for exciting features and opportunities!
        </p>

        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-3 text-center border-2 border-purple-100">
            <div className="text-xl md:text-3xl font-bold text-purple-700">{days}</div>
            <div className="text-xs md:text-sm text-purple-600">Days</div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 text-center border-2 border-indigo-100">
            <div className="text-xl md:text-3xl font-bold text-indigo-700">{hours}</div>
            <div className="text-xs md:text-sm text-indigo-600">Hours</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center border-2 border-blue-100">
            <div className="text-xl md:text-3xl font-bold text-blue-700">{minutes}</div>
            <div className="text-xs md:text-sm text-blue-600">Minutes</div>
          </div>
          <div className="bg-cyan-50 rounded-lg p-3 text-center border-2 border-cyan-100">
            <div className="text-xl md:text-3xl font-bold text-cyan-700">{seconds}</div>
            <div className="text-xs md:text-sm text-cyan-600">Seconds</div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            We'll notify you via email when we launch. Make sure to check your inbox!
          </p>
        </div>
      </div>
    </DoodleCard>
  )
}
