"use client"

import { useState } from "react"
import type { Notification } from "./notification-center"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface NotificationItemProps {
  notification: Notification
  onRead: () => void
}

export default function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.read)

  const handleClick = () => {
    if (!isRead) {
      setIsRead(true)
      onRead()
    }
  }

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

  const content = (
    <div
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
        !isRead ? "bg-blue-50" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-gray-900">{notification.title}</p>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">{formatDate(notification.created_at)}</span>
            {!isRead && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>}
          </div>
        </div>
      </div>
    </div>
  )

  if (notification.link) {
    return (
      <Link href={notification.link} onClick={handleClick}>
        {content}
      </Link>
    )
  }

  return content
}
