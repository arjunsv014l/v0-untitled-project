import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Log environment variable status (without exposing actual values)
console.log("Firebase API Key available:", !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
console.log("Firebase Auth Domain available:", !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
console.log("Firebase Project ID available:", !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)

// Initialize Firebase
let app
let auth
let db
let storage

try {
  // Initialize Firebase only if we're in a browser environment
  if (typeof window !== "undefined") {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)

    console.log("Firebase initialized successfully")
  } else {
    console.log("Firebase initialization skipped (server-side)")
  }
} catch (initError) {
  console.error("Firebase initialization error:", initError)
}

// Simple function to check if Firebase is initialized
export function isFirebaseInitialized() {
  return !!app && !!auth && !!db && !!storage
}

// Function to get a user's profile
export async function getUserProfile(userId: string) {
  if (!isFirebaseInitialized()) {
    console.error("Firebase not initialized")
    return null
  }

  try {
    const docRef = db.collection("users").doc(userId)
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      return docSnap.data()
    } else {
      console.log("No such user profile document!")
      return null
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

export { app, auth, db, storage }
