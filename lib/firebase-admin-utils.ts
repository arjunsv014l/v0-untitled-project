import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, getApps, cert } from "firebase-admin/app"

// Initialize Firebase Admin if not already initialized
export const initAdmin = () => {
  if (getApps().length === 0) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }

    initializeApp({
      credential: cert(serviceAccount),
    })
  }

  return getFirestore()
}

// Create the initial database structure
export async function setupDatabase() {
  const db = initAdmin()

  // Create registrations collection
  const registrationsRef = db.collection("registrations")

  // Create stats documents for registrations
  const statsRef = db.collection("stats")
  await statsRef.doc("registrations").set(
    {
      totalCount: 0,
      pendingCount: 0,
      verifiedCount: 0,
      completedCount: 0,
      rejectedCount: 0,
      lastUpdated: new Date(),
    },
    { merge: true },
  )

  // Create configuration document
  await statsRef.doc("config").set(
    {
      registrationEnabled: true,
      requireEmailVerification: true,
      requireProfileCompletion: true,
      lastUpdated: new Date(),
    },
    { merge: true },
  )

  return {
    registrationsRef,
    statsRef,
  }
}
