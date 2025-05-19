import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore"

export type NotificationType = "info" | "success" | "warning" | "error"

interface SendNotificationParams {
  userId: string
  title: string
  message: string
  type?: NotificationType
  link?: string
}

export const sendNotification = async ({ userId, title, message, type = "info", link }: SendNotificationParams) => {
  try {
    const notificationsRef = collection(db, "users", userId, "notifications")
    await addDoc(notificationsRef, {
      userId,
      title,
      message,
      type,
      link,
      read: false,
      createdAt: new Date().toISOString(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending notification:", error)
    return { success: false, error }
  }
}

export const sendNotificationToMultipleUsers = async (
  userIds: string[],
  notification: Omit<SendNotificationParams, "userId">,
) => {
  try {
    const promises = userIds.map((userId) =>
      sendNotification({
        userId,
        ...notification,
      }),
    )
    await Promise.all(promises)
    return { success: true }
  } catch (error) {
    console.error("Error sending notifications to multiple users:", error)
    return { success: false, error }
  }
}
