import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

/**
 * Debug utility to check profile completion status in Firestore
 */
export const checkProfileCompletionStatus = async (
  userId: string,
): Promise<{
  firestoreStatus: boolean | null
  firestoreData: any | null
  localStorageStatus: boolean | null
  localStorageData: any | null
}> => {
  const result = {
    firestoreStatus: null,
    firestoreData: null,
    localStorageStatus: null,
    localStorageData: null,
  }

  // Check Firestore
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      const data = userDoc.data()
      result.firestoreStatus = data.profileCompleted === true
      result.firestoreData = data
    }
  } catch (error) {
    console.error("Error checking Firestore profile status:", error)
  }

  // Check localStorage
  try {
    const localUser = localStorage.getItem("dreamclerk_user")
    if (localUser) {
      const userData = JSON.parse(localUser)
      result.localStorageStatus = userData.profileCompleted === true
      result.localStorageData = userData
    }
  } catch (error) {
    console.error("Error checking localStorage profile status:", error)
  }

  return result
}

/**
 * Debug utility to fix profile completion status if it's inconsistent
 */
export const fixProfileCompletionStatus = async (userId: string): Promise<boolean> => {
  try {
    const status = await checkProfileCompletionStatus(userId)

    // If Firestore says complete but localStorage doesn't, update localStorage
    if (status.firestoreStatus === true && status.localStorageStatus !== true) {
      if (status.localStorageData) {
        const updatedData = {
          ...status.localStorageData,
          profileCompleted: true,
        }
        localStorage.setItem("dreamclerk_user", JSON.stringify(updatedData))
        console.log("Fixed localStorage profile completion status")
      }
    }

    // If localStorage says complete but Firestore doesn't, update Firestore
    if (status.localStorageStatus === true && status.firestoreStatus !== true) {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        profileCompleted: true,
      })
      console.log("Fixed Firestore profile completion status")
    }

    return true
  } catch (error) {
    console.error("Error fixing profile completion status:", error)
    return false
  }
}

/**
 * Force profile completion status to true in both Firestore and localStorage
 */
export const forceProfileCompletion = async (userId: string): Promise<boolean> => {
  try {
    // Update Firestore
    if (!userId.startsWith("fallback-") && !userId.startsWith("google-fallback-")) {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        profileCompleted: true,
        profile_completed_at: new Date().toISOString(),
      })
      console.log("Forced profile completion in Firestore")
    }

    // Update localStorage
    const localUser = localStorage.getItem("dreamclerk_user")
    if (localUser) {
      const userData = JSON.parse(localUser)
      userData.profileCompleted = true
      userData.profileCompletedAt = new Date().toISOString()
      localStorage.setItem("dreamclerk_user", JSON.stringify(userData))
      console.log("Forced profile completion in localStorage")
    }

    return true
  } catch (error) {
    console.error("Error forcing profile completion:", error)
    return false
  }
}

/**
 * Debug utilities for troubleshooting data persistence issues
 */
export const debugStorageData = () => {
  if (typeof window === "undefined") return null

  try {
    const userData = localStorage.getItem("dreamclerk_user")
    const formData = localStorage.getItem("dreamclerk_profile_form_data")
    const stepData = localStorage.getItem("dreamclerk_profile_step")

    return {
      user: userData ? JSON.parse(userData) : null,
      formData: formData ? JSON.parse(formData) : null,
      step: stepData ? Number.parseInt(stepData, 10) : null,
    }
  } catch (error) {
    console.error("Error debugging storage data:", error)
    return {
      error: String(error),
      user: null,
      formData: null,
      step: null,
    }
  }
}

export const clearAllStorageData = () => {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem("dreamclerk_user")
    localStorage.removeItem("dreamclerk_profile_form_data")
    localStorage.removeItem("dreamclerk_profile_step")
    console.log("All storage data cleared")
  } catch (error) {
    console.error("Error clearing storage data:", error)
  }
}

export const logProfileData = (userId: string, profileData: any) => {
  console.group(`Profile Data for User: ${userId}`)
  console.log("Profile Data:", profileData)
  console.log("Storage Data:", debugStorageData())
  console.groupEnd()
}
