// Profile service to handle all profile-related operations
export class ProfileService {
  private static USER_STORAGE_KEY = "user"
  private static PROFILE_FIELDS = ["name", "email", "bio", "avatar"]

  /**
   * Check if a user's profile is completed
   */
  static isProfileComplete(userData: any): boolean {
    if (!userData) return false

    // If profileCompleted flag is explicitly set
    if (userData.profileCompleted === true) return true

    // Check required fields
    const requiredFields = ["name", "email", "bio"]
    for (const field of requiredFields) {
      if (!userData[field]) {
        return false
      }
    }

    return true
  }

  /**
   * Get missing profile fields
   */
  static getMissingFields(userData: any): string[] {
    if (!userData) return this.PROFILE_FIELDS

    return this.PROFILE_FIELDS.filter((field) => !userData[field])
  }

  /**
   * Save profile data to localStorage
   */
  static saveToLocalStorage(userData: any): void {
    if (typeof window === "undefined" || !userData) return

    try {
      const existingData = localStorage.getItem(this.USER_STORAGE_KEY)
      let updatedData

      if (existingData) {
        const parsedData = JSON.parse(existingData)
        updatedData = { ...parsedData, ...userData }
      } else {
        updatedData = userData
      }

      localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(updatedData))
      console.log("[ProfileService] Saved to localStorage:", Object.keys(userData))
    } catch (error) {
      console.error("[ProfileService] Error saving to localStorage:", error)
    }
  }

  /**
   * Get profile data from localStorage
   */
  static getFromLocalStorage(): any {
    if (typeof window === "undefined") return null

    try {
      const data = localStorage.getItem(this.USER_STORAGE_KEY)
      if (!data) return null

      return JSON.parse(data)
    } catch (error) {
      console.error("[ProfileService] Error getting from localStorage:", error)
      return null
    }
  }

  /**
   * Update profile data
   */
  static async updateProfile(userId: string, profileData: any): Promise<boolean> {
    try {
      // Save to localStorage first as fallback
      this.saveToLocalStorage(profileData)

      // Update on server
      const response = await fetch(`/api/user/${userId}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile on server")
      }

      console.log("[ProfileService] Profile updated successfully")
      return true
    } catch (error) {
      console.error("[ProfileService] Error updating profile:", error)
      return false
    }
  }

  /**
   * Complete profile
   */
  static async completeProfile(userId: string, profileData: any): Promise<boolean> {
    try {
      // Add profile completion flag
      const dataWithCompletion = {
        ...profileData,
        profileCompleted: true,
        profileCompletedAt: new Date().toISOString(),
      }

      // Save to localStorage first as fallback
      this.saveToLocalStorage(dataWithCompletion)

      // Update on server
      const response = await fetch(`/api/user/${userId}/complete-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithCompletion),
      })

      if (!response.ok) {
        throw new Error("Failed to complete profile on server")
      }

      console.log("[ProfileService] Profile completed successfully")
      return true
    } catch (error) {
      console.error("[ProfileService] Error completing profile:", error)
      return false
    }
  }
}
