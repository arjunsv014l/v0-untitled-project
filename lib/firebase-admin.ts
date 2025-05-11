import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

// Initialize Firebase Admin
function initAdmin() {
  try {
    // Check if any Firebase apps have been initialized
    if (!getApps().length) {
      // Get the private key
      const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined

      // Check if required environment variables are set
      if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
        console.error("Firebase Admin initialization error: Missing required environment variables")
        // Return a dummy app to prevent crashes
        return { isInitialized: false }
      }

      // Initialize the app
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      })
      console.log("Firebase Admin initialized successfully")
      return { isInitialized: true }
    }
    return { isInitialized: true }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error)
    return { isInitialized: false }
  }
}

// Initialize Firebase Admin
const { isInitialized } = initAdmin()

// Export the admin services if initialized
export const adminAuth = isInitialized ? getAuth() : null
export const adminDb = isInitialized ? getFirestore() : null
export const isFirebaseAdminInitialized = isInitialized
