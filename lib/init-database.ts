import { getAdminFirestore } from "./firebase-admin"
import { FieldValue } from "firebase-admin/firestore"

// Initialize the database structure for the default database
export async function initializeDatabase() {
  try {
    console.log("Initializing database structure for database ID: (default)")
    const db = getAdminFirestore()

    // Create stats collection with userCounter document if it doesn't exist
    const userCounterRef = db.collection("stats").doc("userCounter")
    const userCounterDoc = await userCounterRef.get()

    if (!userCounterDoc.exists) {
      console.log("Creating userCounter document")
      await userCounterRef.set({
        count: 500, // Start with 500 users
        lastUpdated: FieldValue.serverTimestamp(),
      })
    }

    // Create registrations stats document if it doesn't exist
    const registrationsStatsRef = db.collection("stats").doc("registrations")
    const registrationsStatsDoc = await registrationsStatsRef.get()

    if (!registrationsStatsDoc.exists) {
      console.log("Creating registrations stats document")
      await registrationsStatsRef.set({
        total: 0,
        bySource: {
          email: 0,
          google: 0,
          facebook: 0,
          other: 0,
        },
        byStatus: {
          pending: 0,
          verified: 0,
          completed: 0,
          rejected: 0,
        },
        lastUpdated: FieldValue.serverTimestamp(),
      })
    }

    // Create config document if it doesn't exist
    const configRef = db.collection("stats").doc("config")
    const configDoc = await configRef.get()

    if (!configDoc.exists) {
      console.log("Creating config document")
      await configRef.set({
        registrationEnabled: true,
        requireEmailVerification: false,
        allowSocialLogin: true,
        initialUserCount: 500,
        lastUpdated: FieldValue.serverTimestamp(),
      })
    }

    console.log("Database structure initialized successfully")
    return { success: true }
  } catch (error) {
    console.error("Error initializing database structure:", error)
    return { success: false, error }
  }
}

// Function to update the user counter
export async function updateUserCounter(increment = true) {
  try {
    const db = getAdminFirestore()
    const userCounterRef = db.collection("stats").doc("userCounter")

    // Use a transaction to safely update the counter
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userCounterRef)

      if (!doc.exists) {
        // Create the document if it doesn't exist
        transaction.set(userCounterRef, {
          count: increment ? 501 : 500, // Start with 500 or 501 based on increment flag
          lastUpdated: FieldValue.serverTimestamp(),
        })
      } else {
        // Update the existing document
        const newCount = increment ? doc.data().count + 1 : doc.data().count - 1
        transaction.update(userCounterRef, {
          count: newCount,
          lastUpdated: FieldValue.serverTimestamp(),
        })
      }
    })

    console.log("User counter updated successfully")
    return { success: true }
  } catch (error) {
    console.error("Error updating user counter:", error)
    return { success: false, error }
  }
}

// Function to update registration stats
export async function updateRegistrationStats(source: string, status: string) {
  try {
    const db = getAdminFirestore()
    const statsRef = db.collection("stats").doc("registrations")

    // Use a transaction to safely update the stats
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(statsRef)

      if (!doc.exists) {
        // Create the document if it doesn't exist
        const initialStats = {
          total: 1,
          bySource: {
            email: 0,
            google: 0,
            facebook: 0,
            other: 0,
          },
          byStatus: {
            pending: 0,
            verified: 0,
            completed: 0,
            rejected: 0,
          },
          lastUpdated: FieldValue.serverTimestamp(),
        }

        // Increment the appropriate source and status
        initialStats.bySource[source] = 1
        initialStats.byStatus[status] = 1

        transaction.set(statsRef, initialStats)
      } else {
        // Get current data
        const data = doc.data()

        // Update the stats
        transaction.update(statsRef, {
          total: FieldValue.increment(1),
          [`bySource.${source}`]: FieldValue.increment(1),
          [`byStatus.${status}`]: FieldValue.increment(1),
          lastUpdated: FieldValue.serverTimestamp(),
        })
      }
    })

    console.log("Registration stats updated successfully")
    return { success: true }
  } catch (error) {
    console.error("Error updating registration stats:", error)
    return { success: false, error }
  }
}
