// User types
export interface User {
  id: string
  email: string
  name?: string
  username?: string
  bio?: string
  avatar?: string
  coverImage?: string
  location?: string
  website?: string
  followingCount?: number
  followerCount?: number
  postCount?: number
  createdAt?: string
  updatedAt?: string
}

// Post types
export interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  image?: string
  likes: number
  comments: Comment[]
  createdAt: Date
  liked: boolean
  bookmarked: boolean
}

// Comment types
export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: Date
}

// Profile update types
export interface ProfileUpdate {
  name?: string
  bio?: string
  avatar?: string
  coverImage?: string
  location?: string
  website?: string
}
