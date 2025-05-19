"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from "lucide-react"
import type { Notification } from "./notification-center"

interface NotificationItemProps {
  notification: Notification
  onRead: () => void
}

export default function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleRead = () => {
    if (!notification.read) {
      onRead()
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      onRead()
    }, 300)
  }

  if (!isVisible) return null

  const getIcon = () => {
    switch (notification.type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSecs < 60) {
      return "just now"
    } else if (diffMins < 60) {
      return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const content = (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-start ${
        !notification.read ? "bg-blue-50" : ""
      }`}
      onClick={handleRead}
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-grow">
        <h4 className="text-sm font-medium">{notification.title}</h4>
        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">{getTimeAgo(notification.createdAt)}</span>
          {!notification.read && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleDismiss()
        }}
        className="ml-2 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>
  }

  return content
}
