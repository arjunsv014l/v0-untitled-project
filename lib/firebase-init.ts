import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Initialize Firebase with proper error handling
export const initializeFirebase = () => {
  try {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }

    // Log configuration for debugging (without sensitive data)
    console.log("Firebase config:", {
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
    })

    // Check if all required config values are present
    const requiredKeys = ["apiKey", "authDomain", "projectId"]
    const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig])

    if (missingKeys.length > 0) {
      console.error(`Missing Firebase configuration keys: ${missingKeys.join(", ")}`)
      throw new Error("Firebase configuration incomplete")
    }

    // Initialize Firebase
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app)

    // Set persistence to local for better user experience
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.warn("Failed to set auth persistence:", error)
    })

    return { app, auth, db, storage, error: null }
  } catch (error) {
    console.error("Error initializing Firebase:", error)
    throw error
  }
}

// Helper function to check network connectivity
export const checkNetworkConnectivity = (): boolean => {
  return typeof navigator !== "undefined" && navigator.onLine
}

// Helper function to retry a function with exponential backoff
export async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 3, initialDelay = 300): Promise<T> {
  let retries = 0
  let delay = initialDelay

  while (true) {
    try {
      return await fn()
    } catch (error: any) {
      if (retries >= maxRetries || error.code !== "auth/network-request-failed") {
        throw error
      }

      console.log(`Retrying after ${delay}ms due to network error...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      retries++
      delay *= 2 // Exponential backoff
    }
  }
}
