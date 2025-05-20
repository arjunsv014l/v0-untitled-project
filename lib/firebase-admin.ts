import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

// Initialize Firebase Admin SDK
const initializeFirebaseAdmin = () => {
  try {
    // Check if Firebase Admin is already initialized
    if (getApps().length === 0) {
      // Get credentials from environment variables
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }

      // Check if all required credentials are present
      if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error("Firebase Admin credentials are missing or incomplete")
      }

      // Initialize the app
      const app = initializeApp({
        credential: cert(serviceAccount as any),
        // The databaseURL is not needed for Firestore, it will use the default database
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      })

      console.log("Firebase Admin SDK initialized successfully with database ID: (default)")
      return app
    }

    return getApps()[0]
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error)
    throw error
  }
}

// Get Firestore instance
const getAdminFirestore = () => {
  const app = initializeFirebaseAdmin()
  return getFirestore(app)
}

// Get Auth instance
const getAdminAuth = () => {
  const app = initializeFirebaseAdmin()
  return getAuth(app)
}

export { initializeFirebaseAdmin, getAdminFirestore, getAdminAuth }
