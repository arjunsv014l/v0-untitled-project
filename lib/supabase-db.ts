import { supabase } from "@/lib/supabase"

// User profile operations
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function updateUserProfile(userId: string, profileData: any) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating user profile:", error)
    throw error
  }

  return data
}

// Chat operations
export async function getUserChats(userId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .contains("participants", [userId])
    .order("last_message_time", { ascending: false, nullsFirst: false })

  if (error) {
    console.error("Error fetching user chats:", error)
    return []
  }

  // Fetch other user details for each chat
  const chatsWithUsers = await Promise.all(
    data.map(async (chat) => {
      const otherUserId = chat.participants.find((id: string) => id !== userId)
      if (otherUserId) {
        const { data: otherUser } = await supabase
          .from("profiles")
          .select("id, name, avatar_url")
          .eq("id", otherUserId)
          .single()

        return {
          ...chat,
          other_user: otherUser,
        }
      }
      return chat
    }),
  )

  return chatsWithUsers
}

export async function getChatMessages(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching chat messages:", error)
    return []
  }

  return data
}

export async function sendMessage(chatId: string, userId: string, userName: string, text: string, userAvatar?: string) {
  // Add message to the database
  const { error: messageError } = await supabase.from("messages").insert({
    text,
    sender_id: userId,
    sender_name: userName,
    sender_avatar: userAvatar,
    chat_id: chatId,
    created_at: new Date().toISOString(),
  })

  if (messageError) {
    console.error("Error sending message:", messageError)
    throw messageError
  }

  // Update the chat with the last message
  const { error: chatUpdateError } = await supabase
    .from("chats")
    .update({
      last_message: text,
      last_message_time: new Date().toISOString(),
    })
    .eq("id", chatId)

  if (chatUpdateError) {
    console.error("Error updating chat:", chatUpdateError)
    throw chatUpdateError
  }

  return true
}

export async function createOrGetChat(userId: string, recipientId: string) {
  // Check if a chat already exists between these users
  const { data: existingChats, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .contains("participants", [userId])
    .contains("participants", [recipientId])

  if (chatError) {
    console.error("Error fetching chats:", chatError)
    throw chatError
  }

  if (existingChats && existingChats.length > 0) {
    // Chat exists, return the first one
    return existingChats[0]
  } else {
    // Create a new chat
    const { data: newChat, error: createError } = await supabase
      .from("chats")
      .insert({
        participants: [userId, recipientId],
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (createError) {
      console.error("Error creating chat:", createError)
      throw createError
    }

    return newChat
  }
}

// User counter operations
export async function incrementUserCounter() {
  try {
    const { data, error } = await supabase.rpc("increment_user_count")

    if (error) {
      console.error("Error incrementing user count:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to increment user count:", error)
    throw error
  }
}

export async function getUserCount() {
  const { data, error } = await supabase.from("stats").select("count").eq("name", "user_counter").single()

  if (error) {
    console.error("Error fetching user count:", error)
    return 500 // Default fallback value
  }

  return data.count
}

// Notifications
export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notifications:", error)
    return []
  }

  return data
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

  if (error) {
    console.error("Error marking notification as read:", error)
    throw error
  }

  return true
}

export async function createNotification(userId: string, title: string, message: string, type = "info", link?: string) {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    title,
    message,
    type,
    link,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error creating notification:", error)
    throw error
  }

  return true
}

// Content operations
export async function getPublicContent(limit = 10) {
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching content:", error)
    return []
  }

  return data
}

export async function getUserContent(userId: string) {
  const { data, error } = await supabase
    .from("user_content")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user content:", error)
    return []
  }

  return data
}
