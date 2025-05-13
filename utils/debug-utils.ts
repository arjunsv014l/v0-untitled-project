// Debug utility to help troubleshoot state issues
export class DebugUtils {
  private static isDebugMode(): boolean {
    return process.env.NODE_ENV === "development"
  }

  /**
   * Log auth state for debugging
   */
  static logAuthState(user: any, loading: boolean): void {
    if (!this.isDebugMode()) return

    console.group("Auth State")
    console.log(
      "User:",
      user
        ? {
            id: user.id,
            email: user.email,
            profileCompleted: user.profileCompleted,
          }
        : null,
    )
    console.log("Loading:", loading)
    console.groupEnd()
  }

  /**
   * Log navigation event
   */
  static logNavigation(from: string, to: string, reason: string): void {
    if (!this.isDebugMode()) return

    console.group("Navigation")
    console.log(`From: ${from}`)
    console.log(`To: ${to}`)
    console.log(`Reason: ${reason}`)
    console.groupEnd()
  }

  /**
   * Log profile completion status
   */
  static logProfileStatus(user: any): void {
    if (!this.isDebugMode() || !user) return

    const requiredFields = ["name", "email", "bio"]
    const missingFields = requiredFields.filter((field) => !user[field])

    console.group("Profile Status")
    console.log("Profile Completed Flag:", user.profileCompleted)
    console.log("Missing Fields:", missingFields.length ? missingFields : "None")
    console.log("Has All Required Fields:", missingFields.length === 0)
    console.groupEnd()
  }

  /**
   * Add debug info to localStorage
   */
  static saveDebugInfo(key: string, data: any): void {
    if (!this.isDebugMode() || typeof window === "undefined") return

    try {
      const debugData = {
        timestamp: new Date().toISOString(),
        data,
      }

      localStorage.setItem(`debug_${key}`, JSON.stringify(debugData))
    } catch (error) {
      console.error("Error saving debug info:", error)
    }
  }
}
