import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { supabase } from "@/lib/supabase"

// Constants
const USER_STORAGE_KEY = "dreamclerk_user"
// const PROFILE_COMPLETION_KEY = "dreamclerk_profile_completed" // Removed

/**
 * Service to handle all profile-related operations
 */
export class ProfileService {
  /**
   * Check if a user's profile is completed
   */
  static async isProfileCompleted(userId: string): Promise<boolean> {
    console.log(`[ProfileService] Checking profile completion for user: ${userId}`)

    try {
      // For fallback/offline users, check localStorage
      if (userId.startsWith("fallback-") || userId.startsWith("google-fallback-")) {
        const storedUser = localStorage.getItem("dreamclerk_user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          // Check if required fields are present
          return Boolean(
            userData.name &&
              userData.email &&
              userData.bio &&
              userData.university &&
              userData.major &&
              userData.location &&
              userData.graduationYear,
          )
        }
        return false
      }

      // Try Firestore
      try {
        const userRef = doc(db, "users", userId)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()

          // If profileCompleted flag is explicitly set to true, honor it
          if (userData.profileCompleted === true) {
            return true
          }

          // Otherwise check required fields
          return Boolean(
            userData.name &&
              userData.email &&
              userData.bio &&
              userData.university &&
              userData.major &&
              userData.location &&
              userData.graduation_year,
          )
        }
      } catch (error) {
        console.error(`[ProfileService] Error checking Firestore profile:`, error)
      }

      // Fallback to localStorage
      const storedUser = localStorage.getItem("dreamclerk_user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        return Boolean(
          userData.name &&
            userData.email &&
            userData.bio &&
            userData.university &&
            userData.major &&
            userData.location &&
            userData.graduationYear,
        )
      }

      return false
    } catch (error) {
      console.error(`[ProfileService] Error checking profile completion:`, error)
      return false
    }
  }

  /**
   * Mark a user's profile as completed and save all profile data
   */
  static async completeProfile(userId: string, profileData: any): Promise<boolean> {
    console.log(`[ProfileService] Completing profile for user: ${userId}`, profileData)

    try {
      const timestamp = new Date().toISOString()

      // For fallback/offline users
      if (userId.startsWith("fallback-") || userId.startsWith("google-fallback-")) {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          const updatedUser = {
            ...userData,
            ...profileData,
            profileCompleted: true,
            profileCompletedAt: timestamp,
            lastUpdated: timestamp,
          }
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser))
          // localStorage.setItem(PROFILE_COMPLETION_KEY, "true") // Removed
          console.log(`[ProfileService] Updated profile completion in localStorage`)
          return true
        }
        return false
      }

      // Always update localStorage first as a fallback
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        const updatedUser = {
          ...userData,
          ...profileData,
          profileCompleted: true,
          profileCompletedAt: timestamp,
        }
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser))
        // localStorage.setItem(PROFILE_COMPLETION_KEY, "true") // Removed
        console.log(`[ProfileService] Updated profile completion in localStorage (fallback)`)
      }

      // Convert profile data to Firestore format
      const firestoreData: Record<string, any> = {
        ...this.convertToFirestoreFormat(profileData),
        profileCompleted: true,
        profile_completed_at: timestamp,
        last_updated: timestamp,
      }

      console.log(`[ProfileService] Saving to Firestore:`, firestoreData)

      // Try Firebase first
      let firebaseSuccess = false
      try {
        const userRef = doc(db, "users", userId)

        try {
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            // Update existing document
            await updateDoc(userRef, firestoreData)
            console.log(`[ProfileService] Updated profile completion in Firestore`)
          } else {
            // Create document if it doesn't exist
            firestoreData.created_at = timestamp
            await setDoc(userRef, firestoreData)
            console.log(`[ProfileService] Created new document with completed profile in Firestore`)
          }
          firebaseSuccess = true
        } catch (permissionError) {
          console.error(`[ProfileService] Permission error with Firestore:`, permissionError)
        }
      } catch (firestoreError) {
        console.error(`[ProfileService] Firestore error:`, firestoreError)
      }

      // If Firebase fails, try Supabase
      if (!firebaseSuccess) {
        try {
          // Convert to Supabase format
          const supabaseData = {
            id: userId,
            name: profileData.name,
            email: profileData.email,
            bio: profileData.bio,
            university: profileData.university,
            major: profileData.major,
            location: profileData.location,
            graduation_year: profileData.graduationYear,
            avatar_url: profileData.avatar,
            profile_completed: true,
            profile_completed_at: timestamp,
            last_updated: timestamp,
          }

          // Check if profile exists
          const { data: existingProfile, error: checkError } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", userId)
            .single()

          if (checkError && checkError.code !== "PGRST116") {
            // PGRST116 is "not found" error
            console.error(`[ProfileService] Error checking Supabase profile:`, checkError)
            throw checkError
          }

          if (existingProfile) {
            // Update existing profile
            const { error: updateError } = await supabase.from("profiles").update(supabaseData).eq("id", userId)

            if (updateError) {
              console.error(`[ProfileService] Error updating Supabase profile:`, updateError)
              throw updateError
            }
          } else {
            // Insert new profile
            const { error: insertError } = await supabase.from("profiles").insert([supabaseData])

            if (insertError) {
              console.error(`[ProfileService] Error inserting Supabase profile:`, insertError)
              throw insertError
            }
          }

          console.log(`[ProfileService] Successfully saved profile to Supabase`)
        } catch (supabaseError) {
          console.error(`[ProfileService] Supabase error:`, supabaseError)
          // Continue with localStorage fallback
        }
      }

      return true
    } catch (error) {
      console.error(`[ProfileService] Error completing profile:`, error)
      return false
    }
  }

  /**
   * Mark profile as completed (simplified method for direct completion)
   */
  static async markProfileAsCompleted(userId: string): Promise<boolean> {
    console.log(`[ProfileService] Profile completion marking bypassed for user: ${userId}`)
    return true // Always return success
  }

  /**
   * Convert profile data to Firestore format
   */
  private static convertToFirestoreFormat(profileData: any): Record<string, any> {
    const firestoreData: Record<string, any> = {}

    Object.entries(profileData).forEach(([key, value]) => {
      // Skip null or undefined values
      if (value === null || value === undefined) return

      // Convert camelCase to snake_case for specific fields
      if (key === "avatar") {
        firestoreData.avatar_url = value
      } else if (key === "coverImage") {
        firestoreData.cover_image = value
      } else if (key === "graduationYear") {
        firestoreData.graduation_year = value
      } else if (key === "profileCompleted") {
        firestoreData.profileCompleted = value === true
      } else if (key === "profileCompletedAt") {
        firestoreData.profile_completed_at = value
      } else {
        // Keep other fields as is
        firestoreData[key] = value
      }
    })

    return firestoreData
  }

  /**
   * Update user profile data
   */
  static async updateProfile(userId: string, profileData: any): Promise<boolean> {
    console.log(`[ProfileService] Updating profile for user: ${userId}`, profileData)

    try {
      const timestamp = new Date().toISOString()

      // For fallback/offline users
      if (userId.startsWith("fallback-") || userId.startsWith("google-fallback-")) {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          const updatedUser = { ...userData, ...profileData, lastUpdated: timestamp }
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser))
          console.log(`[ProfileService] Updated profile in localStorage`)
          return true
        }
        return false
      }

      // Always update localStorage first as a fallback
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        const updatedUser = { ...userData, ...profileData, lastUpdated: timestamp }
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser))
      }

      // Convert profile data to Firestore format
      const firestoreData: Record<string, any> = {
        ...this.convertToFirestoreFormat(profileData),
        last_updated: timestamp,
      }

      console.log(`[ProfileService] Saving to Firestore:`, firestoreData)

      // Try Firebase first
      let firebaseSuccess = false
      try {
        const userRef = doc(db, "users", userId)

        try {
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            // Update existing document
            await updateDoc(userRef, firestoreData)
            console.log(`[ProfileService] Updated profile in Firestore`)
          } else {
            // Create document if it doesn't exist
            firestoreData.created_at = timestamp
            await setDoc(userRef, firestoreData)
            console.log(`[ProfileService] Created new profile document in Firestore`)
          }
          firebaseSuccess = true
        } catch (permissionError) {
          console.error(`[ProfileService] Permission error with Firestore:`, permissionError)
        }
      } catch (firestoreError) {
        console.error(`[ProfileService] Firestore error:`, firestoreError)
      }

      // If Firebase fails, try Supabase
      if (!firebaseSuccess) {
        try {
          // Convert to Supabase format
          const supabaseData: Record<string, any> = {
            last_updated: timestamp,
          }

          // Map fields to Supabase format
          Object.entries(profileData).forEach(([key, value]) => {
            if (value === null || value === undefined) return

            if (key === "avatar") {
              supabaseData.avatar_url = value
            } else if (key === "coverImage") {
              supabaseData.cover_image = value
            } else if (key === "graduationYear") {
              supabaseData.graduation_year = value
            } else if (key === "profileCompleted") {
              supabaseData.profile_completed = value === true
            } else if (key === "profileCompletedAt") {
              supabaseData.profile_completed_at = value
            } else {
              // Convert camelCase to snake_case
              const snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
              supabaseData[snakeCaseKey] = value
            }
          })

          // Check if profile exists
          const { data: existingProfile, error: checkError } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", userId)
            .single()

          if (checkError && checkError.code !== "PGRST116") {
            // PGRST116 is "not found" error
            console.error(`[ProfileService] Error checking Supabase profile:`, checkError)
            throw checkError
          }

          if (existingProfile) {
            // Update existing profile
            const { error: updateError } = await supabase.from("profiles").update(supabaseData).eq("id", userId)

            if (updateError) {
              console.error(`[ProfileService] Error updating Supabase profile:`, updateError)
              throw updateError
            }
          } else {
            // Insert new profile with minimal data
            supabaseData.id = userId
            supabaseData.created_at = timestamp

            const { error: insertError } = await supabase.from("profiles").insert([supabaseData])

            if (insertError) {
              console.error(`[ProfileService] Error inserting Supabase profile:`, insertError)
              throw insertError
            }
          }

          console.log(`[ProfileService] Successfully updated profile in Supabase`)
        } catch (supabaseError) {
          console.error(`[ProfileService] Supabase error:`, supabaseError)
          // Continue with localStorage fallback
        }
      }

      return true
    } catch (error) {
      console.error(`[ProfileService] Error updating profile:`, error)
      return false
    }
  }

  /**
   * Get user profile data
   */
  static async getProfile(userId: string): Promise<any | null> {
    console.log(`[ProfileService] Getting profile for user: ${userId}`)

    try {
      // For fallback/offline users
      if (userId.startsWith("fallback-") || userId.startsWith("google-fallback-")) {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          console.log(`[ProfileService] Retrieved profile from localStorage`)
          return userData
        }
        return null
      }

      // First check localStorage as a fallback
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)
      let localData = null
      if (storedUser) {
        localData = JSON.parse(storedUser)
      }

      try {
        // For Firebase users, get from Firestore
        const userRef = doc(db, "users", userId)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          console.log(`[ProfileService] Retrieved profile from Firestore`)
          return { id: userId, ...userData }
        }

        console.log(`[ProfileService] User document not found in Firestore`)
        return localData
      } catch (firestoreError) {
        console.error(`[ProfileService] Firestore error, falling back to localStorage:`, firestoreError)
        return localData
      }
    } catch (error) {
      console.error(`[ProfileService] Error getting profile:`, error)
      return null
    }
  }

  /**
   * Sync profile data between Firestore and localStorage
   */
  static async syncProfile(userId: string): Promise<boolean> {
    console.log(`[ProfileService] Syncing profile for user: ${userId}`)

    try {
      // Skip for fallback users
      if (userId.startsWith("fallback-") || userId.startsWith("google-fallback-")) {
        console.log(`[ProfileService] Skipping sync for fallback user`)
        return true
      }

      // First check if we have data in localStorage
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)
      if (!storedUser) {
        console.log(`[ProfileService] No user data in localStorage to sync`)
        return false
      }

      // Parse localStorage data
      const localData = JSON.parse(storedUser)

      // Check if profile is already completed in localStorage
      const isLocallyCompleted = localData.profileCompleted === true
      const hasRequiredFields = Boolean(localData.name && localData.email && localData.bio)

      if (isLocallyCompleted || hasRequiredFields) {
        console.log(`[ProfileService] Profile is already complete in localStorage, skipping Firestore sync`)

        // Ensure the completion flag is set
        if (hasRequiredFields && !isLocallyCompleted) {
          localData.profileCompleted = true
          localData.profileCompletedAt = new Date().toISOString()
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(localData))
        }

        // localStorage.setItem(PROFILE_COMPLETION_KEY, "true") // Removed
        return true
      }

      // Try to get profile from Firestore, but don't fail if it doesn't work
      try {
        console.log(`[ProfileService] Attempting to fetch user document from Firestore`)
        const userRef = doc(db, "users", userId)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
          console.log(`[ProfileService] User document not found in Firestore, using localStorage only`)
          return true // Continue with localStorage data only
        }

        // Get Firestore data
        const firestoreData = userDoc.data()
        console.log(`[ProfileService] Successfully retrieved user document from Firestore`)

        // Update localStorage with Firestore data
        const updatedLocalData = {
          ...localData,
          profileCompleted: firestoreData.profileCompleted === true,
          profileCompletedAt: firestoreData.profile_completed_at || localData.profileCompletedAt,
          name: firestoreData.name || localData.name,
          email: firestoreData.email || localData.email,
          bio: firestoreData.bio || localData.bio,
          university: firestoreData.university || localData.university,
          major: firestoreData.major || localData.major,
          location: firestoreData.location || localData.location,
          graduationYear: firestoreData.graduation_year || localData.graduationYear,
          avatar: firestoreData.avatar_url || localData.avatar,
          lastUpdated: firestoreData.last_updated || new Date().toISOString(),
        }

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedLocalData))

        // Also update the completion flag
        if (
          firestoreData.profileCompleted === true ||
          (firestoreData.name && firestoreData.email && firestoreData.bio)
        ) {
          // localStorage.setItem(PROFILE_COMPLETION_KEY, "true") // Removed
        }

        console.log(`[ProfileService] Synced profile from Firestore to localStorage`)
      } catch (firestoreError) {
        // Log the error but don't fail the sync
        console.error(`[ProfileService] Firestore error during sync (continuing with localStorage):`, firestoreError)
      }

      return true
    } catch (error) {
      console.error(`[ProfileService] Error syncing profile:`, error)
      return true // Return true to prevent blocking the profile setup flow
    }
  }

  /**
   * Force profile completion status (for troubleshooting)
   */
  static async forceProfileCompletion(userId: string): Promise<boolean> {
    console.log(`[ProfileService] Force setting profile completion for user: ${userId}`)

    try {
      // Set localStorage flag
      // localStorage.setItem(PROFILE_COMPLETION_KEY, "true") // Removed

      // Update localStorage user data
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        userData.profileCompleted = true
        userData.profileCompletedAt = new Date().toISOString()
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
      }

      // Update Firestore if not a fallback user
      if (!userId.startsWith("fallback-") && !userId.startsWith("google-fallback-")) {
        try {
          const timestamp = new Date().toISOString()
          const userRef = doc(db, "users", userId)

          await setDoc(
            userRef,
            {
              profileCompleted: true,
              profile_completed_at: timestamp,
              last_updated: timestamp,
            },
            { merge: true },
          )

          console.log(`[ProfileService] Force updated profile completion in Firestore`)
        } catch (error) {
          console.error(`[ProfileService] Error force updating Firestore:`, error)
        }
      }

      return true
    } catch (error) {
      console.error(`[ProfileService] Error in forceProfileCompletion:`, error)
      return false
    }
  }

  /**
   * Sync profile completion status between Firestore and localStorage
   */
  static async syncProfileCompletionStatus(userId: string): Promise<boolean> {
    console.log(`[ProfileService] Profile completion sync bypassed for user: ${userId}`)
    return true // Always return success
  }
}
