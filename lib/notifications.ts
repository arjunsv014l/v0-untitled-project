import { supabase } from "./supabase"

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
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      title,
      message,
      type,
      link,
      read: false,
      created_at: new Date().toISOString(),
    })

    if (error) throw error
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
    const notifications = userIds.map((userId) => ({
      user_id: userId,
      title: notification.title,
      message: notification.message,
      type: notification.type || "info",
      link: notification.link,
      read: false,
      created_at: new Date().toISOString(),
    }))

    const { error } = await supabase.from("notifications").insert(notifications)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error sending notifications to multiple users:", error)
    return { success: false, error }
  }
}
