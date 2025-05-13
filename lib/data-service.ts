import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore"
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase"

// Types
export interface Post {
  id: string
  userId: string
  content: string
  imageUrl?: string
  createdAt: Timestamp
  likes: string[] // Array of user IDs who liked the post
  comments: Comment[]
  tags?: string[]
}

export interface Comment {
  id: string
  userId: string
  postId: string
  content: string
  createdAt: Timestamp
}

export interface Notification {
  id: string
  userId: string
  type: "like" | "comment" | "follow" | "mention" | "system"
  message: string
  sourceUserId?: string
  postId?: string
  createdAt: Timestamp
  read: boolean
  actionUrl?: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  username?: string
  bio?: string
  avatar?: string
  coverImage?: string
  university?: string
  major?: string
  location?: string
  graduationYear?: string
  website?: string
  role: "admin" | "student" | "teacher" | "guest"
  followers: string[] // Array of user IDs
  following: string[] // Array of user IDs
  createdAt: Timestamp
  lastActive?: Timestamp
  profileCompleted: boolean
  settings?: {
    emailNotifications: boolean
    darkMode: boolean
    language: string
  }
}

// User Profile Functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

export const createUserProfile = async (userId: string, userData: Partial<UserProfile>): Promise<boolean> => {
  try {
    const userProfile: Partial<UserProfile> = {
      ...userData,
      followers: [],
      following: [],
      createdAt: serverTimestamp() as Timestamp,
      profileCompleted: false,
      role: userData.role || "student",
    }

    await setDoc(doc(db, "users", userId), userProfile)
    return true
  } catch (error) {
    console.error("Error creating user profile:", error)
    return false
  }
}

export const updateUserProfile = async (userId: string, userData: Partial<UserProfile>): Promise<boolean> => {
  try {
    // First check if the document exists
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      // Update existing document
      await updateDoc(userRef, {
        ...userData,
        lastActive: serverTimestamp(),
      })
    } else {
      // Create new document with merged data
      const completeData = {
        email: userData.email || "",
        name: userData.name || "User",
        role: userData.role || "student",
        followers: [],
        following: [],
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
        profileCompleted: userData.profileCompleted || false,
        ...userData,
      }
      await setDoc(userRef, completeData)
    }

    return true
  } catch (error) {
    console.error("Error updating user profile:", error)
    return false
  }
}

// New function to ensure profile data is saved
export const ensureProfileData = async (userId: string, userData: Partial<UserProfile>): Promise<boolean> => {
  try {
    // Try to get the user profile
    const existingProfile = await getUserProfile(userId)

    if (existingProfile) {
      // Merge existing data with new data to ensure we don't lose fields
      const mergedData = {
        ...existingProfile,
        ...userData,
        lastActive: serverTimestamp(),
      }

      // Remove id from the data to avoid Firestore errors
      const { id, ...dataToUpdate } = mergedData

      await updateDoc(doc(db, "users", userId), dataToUpdate)
      console.log("Updated user profile with merged data:", userId)
    } else {
      // Create new profile
      await createUserProfile(userId, userData)
      console.log("Created new user profile:", userId)
    }

    return true
  } catch (error) {
    console.error("Error ensuring profile data:", error)

    // Try one more time with setDoc as a fallback
    try {
      const dataToSave = {
        ...userData,
        lastActive: serverTimestamp(),
        createdAt: serverTimestamp(),
        followers: [],
        following: [],
        role: userData.role || "student",
      }

      await setDoc(doc(db, "users", userId), dataToSave, { merge: true })
      console.log("Fallback: Saved user profile with merge:", userId)
      return true
    } catch (fallbackError) {
      console.error("Fallback error saving profile data:", fallbackError)
      return false
    }
  }
}

export const uploadProfileImage = async (
  userId: string,
  imageDataUrl: string,
  type: "avatar" | "cover",
): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `users/${userId}/${type}_${Date.now()}`)
    await uploadString(storageRef, imageDataUrl, "data_url")
    const downloadUrl = await getDownloadURL(storageRef)

    // Update user profile with new image URL
    const updateData = type === "avatar" ? { avatar: downloadUrl } : { coverImage: downloadUrl }

    await updateUserProfile(userId, updateData)
    return downloadUrl
  } catch (error) {
    console.error(`Error uploading ${type} image:`, error)
    return null
  }
}

// Add this function to ensure profile completion status is properly saved
export const markProfileAsCompleted = async (userId: string): Promise<boolean> => {
  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        profileCompleted: true,
        profile_completed_at: serverTimestamp(),
      })
    } else {
      await setDoc(
        userRef,
        {
          profileCompleted: true,
          profile_completed_at: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true },
      )
    }

    console.log("Profile marked as completed for user:", userId)
    return true
  } catch (error) {
    console.error("Error marking profile as completed:", error)
    return false
  }
}

// Post Functions
export const createPost = async (
  userId: string,
  content: string,
  imageDataUrl?: string,
  tags?: string[],
): Promise<string | null> => {
  try {
    let imageUrl = undefined

    // Upload image if provided
    if (imageDataUrl) {
      const storageRef = ref(storage, `posts/${userId}/${Date.now()}`)
      await uploadString(storageRef, imageDataUrl, "data_url")
      imageUrl = await getDownloadURL(storageRef)
    }

    const postData: Omit<Post, "id"> = {
      userId,
      content,
      imageUrl,
      createdAt: serverTimestamp() as Timestamp,
      likes: [],
      comments: [],
      tags,
    }

    const postRef = await addDoc(collection(db, "posts"), postData)
    return postRef.id
  } catch (error) {
    console.error("Error creating post:", error)
    return null
  }
}

export const getPosts = async (limit = 20): Promise<Post[]> => {
  try {
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(limit))

    const snapshot = await getDocs(postsQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post)
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
}

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const postsQuery = query(collection(db, "posts"), where("userId", "==", userId), orderBy("createdAt", "desc"))

    const snapshot = await getDocs(postsQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post)
  } catch (error) {
    console.error("Error getting user posts:", error)
    return []
  }
}

export const getFollowingPosts = async (userIds: string[]): Promise<Post[]> => {
  if (!userIds.length) return []

  try {
    const postsQuery = query(
      collection(db, "posts"),
      where("userId", "in", userIds),
      orderBy("createdAt", "desc"),
      limit(50),
    )

    const snapshot = await getDocs(postsQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post)
  } catch (error) {
    console.error("Error getting following posts:", error)
    return []
  }
}

export const likePost = async (postId: string, userId: string): Promise<boolean> => {
  try {
    const postRef = doc(db, "posts", postId)
    const postDoc = await getDoc(postRef)

    if (!postDoc.exists()) return false

    const post = postDoc.data() as Post
    const likes = post.likes || []

    // Toggle like
    const isLiked = likes.includes(userId)
    const updatedLikes = isLiked ? likes.filter((id) => id !== userId) : [...likes, userId]

    await updateDoc(postRef, { likes: updatedLikes })

    // Create notification if post was liked (not unliked)
    if (!isLiked && post.userId !== userId) {
      await createNotification({
        userId: post.userId,
        type: "like",
        message: "liked your post",
        sourceUserId: userId,
        postId,
      })
    }

    return true
  } catch (error) {
    console.error("Error liking post:", error)
    return false
  }
}

export const addComment = async (postId: string, userId: string, content: string): Promise<boolean> => {
  try {
    const postRef = doc(db, "posts", postId)
    const postDoc = await getDoc(postRef)

    if (!postDoc.exists()) return false

    const post = postDoc.data() as Post
    const comments = post.comments || []

    const newComment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      postId,
      content,
      createdAt: serverTimestamp() as Timestamp,
    }

    await updateDoc(postRef, {
      comments: [...comments, newComment],
    })

    // Create notification if comment was added by someone else
    if (post.userId !== userId) {
      await createNotification({
        userId: post.userId,
        type: "comment",
        message: "commented on your post",
        sourceUserId: userId,
        postId,
      })
    }

    return true
  } catch (error) {
    console.error("Error adding comment:", error)
    return false
  }
}

// Notification Functions
export const createNotification = async (notificationData: {
  userId: string
  type: Notification["type"]
  message: string
  sourceUserId?: string
  postId?: string
  actionUrl?: string
}): Promise<string | null> => {
  try {
    // Set default actionUrl based on notification type if not provided
    let actionUrl = notificationData.actionUrl
    if (!actionUrl) {
      switch (notificationData.type) {
        case "like":
        case "comment":
        case "mention":
          actionUrl = "/dashboard/social"
          break
        case "follow":
          actionUrl = `/dashboard/social?user=${notificationData.sourceUserId}`
          break
        case "system":
          actionUrl = "/dashboard"
          break
      }
    }

    const notification: Omit<Notification, "id"> = {
      ...notificationData,
      actionUrl,
      createdAt: serverTimestamp() as Timestamp,
      read: false,
    }

    const notificationRef = await addDoc(collection(db, "notifications"), notification)
    return notificationRef.id
  } catch (error) {
    console.error("Error creating notification:", error)
    return null
  }
}

export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(50),
    )

    const snapshot = await getDocs(notificationsQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Notification)
  } catch (error) {
    console.error("Error getting user notifications:", error)
    return []
  }
}

export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    await updateDoc(doc(db, "notifications", notificationId), {
      read: true,
    })
    return true
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return false
  }
}

export const markAllNotificationsAsRead = async (userId: string): Promise<boolean> => {
  try {
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      where("read", "==", false),
    )

    const snapshot = await getDocs(notificationsQuery)

    // Update each notification
    const updatePromises = snapshot.docs.map((doc) => updateDoc(doc.ref, { read: true }))

    await Promise.all(updatePromises)
    return true
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return false
  }
}

// Follow Functions
export const followUser = async (currentUserId: string, targetUserId: string): Promise<boolean> => {
  try {
    // Update current user's following list
    const currentUserRef = doc(db, "users", currentUserId)
    const currentUserDoc = await getDoc(currentUserRef)

    if (!currentUserDoc.exists()) return false

    const currentUserData = currentUserDoc.data() as UserProfile
    const following = currentUserData.following || []

    // Check if already following
    if (following.includes(targetUserId)) return true

    await updateDoc(currentUserRef, {
      following: [...following, targetUserId],
    })

    // Update target user's followers list
    const targetUserRef = doc(db, "users", targetUserId)
    const targetUserDoc = await getDoc(targetUserRef)

    if (!targetUserDoc.exists()) return false

    const targetUserData = targetUserDoc.data() as UserProfile
    const followers = targetUserData.followers || []

    await updateDoc(targetUserRef, {
      followers: [...followers, currentUserId],
    })

    // Create notification
    await createNotification({
      userId: targetUserId,
      type: "follow",
      message: "started following you",
      sourceUserId: currentUserId,
    })

    return true
  } catch (error) {
    console.error("Error following user:", error)
    return false
  }
}

export const unfollowUser = async (currentUserId: string, targetUserId: string): Promise<boolean> => {
  try {
    // Update current user's following list
    const currentUserRef = doc(db, "users", currentUserId)
    const currentUserDoc = await getDoc(currentUserRef)

    if (!currentUserDoc.exists()) return false

    const currentUserData = currentUserDoc.data() as UserProfile
    const following = currentUserData.following || []

    await updateDoc(currentUserRef, {
      following: following.filter((id) => id !== targetUserId),
    })

    // Update target user's followers list
    const targetUserRef = doc(db, "users", targetUserId)
    const targetUserDoc = await getDoc(targetUserRef)

    if (!targetUserDoc.exists()) return false

    const targetUserData = targetUserDoc.data() as UserProfile
    const followers = targetUserData.followers || []

    await updateDoc(targetUserRef, {
      followers: followers.filter((id) => id !== currentUserId),
    })

    return true
  } catch (error) {
    console.error("Error unfollowing user:", error)
    return false
  }
}

// Search Functions
export const searchUsers = async (query: string, limit = 10): Promise<UserProfile[]> => {
  try {
    // This is a simple implementation - in a real app, you'd use Algolia or similar
    const usersQuery = query(collection(db, "users"), orderBy("name"), limit(100))

    const snapshot = await getDocs(usersQuery)
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as UserProfile)

    // Filter users client-side (not efficient for large datasets)
    const filteredUsers = users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          (user.username && user.username.toLowerCase().includes(query.toLowerCase())) ||
          user.email.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, limit)

    return filteredUsers
  } catch (error) {
    console.error("Error searching users:", error)
    return []
  }
}

// Real-time listeners
export const subscribeToUserProfile = (userId: string, callback: (user: UserProfile | null) => void) => {
  return onSnapshot(
    doc(db, "users", userId),
    (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as UserProfile)
      } else {
        callback(null)
      }
    },
    (error) => {
      console.error("Error subscribing to user profile:", error)
      callback(null)
    },
  )
}

export const subscribeToPosts = (callback: (posts: Post[]) => void) => {
  return onSnapshot(
    query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(20)),
    (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post)
      callback(posts)
    },
    (error) => {
      console.error("Error subscribing to posts:", error)
      callback([])
    },
  )
}

export const subscribeToUserPosts = (userId: string, callback: (posts: Post[]) => void) => {
  return onSnapshot(
    query(collection(db, "posts"), where("userId", "==", userId), orderBy("createdAt", "desc")),
    (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post)
      callback(posts)
    },
    (error) => {
      console.error("Error subscribing to user posts:", error)
      callback([])
    },
  )
}

export const subscribeToNotifications = (userId: string, callback: (notifications: Notification[]) => void) => {
  return onSnapshot(
    query(collection(db, "notifications"), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(50)),
    (snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Notification)
      callback(notifications)
    },
    (error) => {
      console.error("Error subscribing to notifications:", error)
      callback([])
    },
  )
}
