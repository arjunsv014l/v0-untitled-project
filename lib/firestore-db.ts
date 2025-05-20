import { db } from "@/lib/firebase"
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  limit,
  serverTimestamp,
  type Timestamp,
  addDoc,
} from "firebase/firestore"

// Define types for our registration data
export interface RegistrationData {
  id?: string
  userId: string
  email: string
  name: string
  dob?: string
  registeredAt: Timestamp | Date
  status: "pending" | "verified" | "completed" | "rejected"
  completedProfile: boolean
  source: "email" | "google" | "facebook" | "other"
  referrer?: string
  notes?: string
  metadata?: Record<string, any>
}

// Collection names
const COLLECTIONS = {
  REGISTRATIONS: "registrations",
  USERS: "users",
  STATS: "stats",
}

// Create a new registration record
export async function createRegistration(data: Omit<RegistrationData, "id" | "registeredAt" | "status">) {
  try {
    console.log("Creating new registration record in Firestore...")

    // Prepare the data with default values
    const registrationData: Omit<RegistrationData, "id"> = {
      ...data,
      registeredAt: serverTimestamp(),
      status: "pending",
      completedProfile: false,
    }

    // Add document to registrations collection
    const registrationRef = collection(db, COLLECTIONS.REGISTRATIONS)
    const docRef = await addDoc(registrationRef, registrationData)

    console.log("✅ Registration record created with ID:", docRef.id)
    return { id: docRef.id, success: true, error: null }
  } catch (error) {
    console.error("❌ Error creating registration record:", error)
    return { id: null, success: false, error }
  }
}

// Get a registration by user ID
export async function getRegistrationByUserId(userId: string) {
  try {
    console.log("Fetching registration for user:", userId)

    // Query the registrations collection for the user's registration
    const registrationsRef = collection(db, COLLECTIONS.REGISTRATIONS)
    const q = query(registrationsRef, where("userId", "==", userId), limit(1))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log("No registration found for user:", userId)
      return { data: null, success: true, error: null }
    }

    const registrationDoc = querySnapshot.docs[0]
    const registrationData = registrationDoc.data() as RegistrationData
    registrationData.id = registrationDoc.id

    console.log("✅ Registration found:", registrationData.id)
    return { data: registrationData, success: true, error: null }
  } catch (error) {
    console.error("❌ Error fetching registration:", error)
    return { data: null, success: false, error }
  }
}

// Update registration status
export async function updateRegistrationStatus(
  registrationId: string,
  status: RegistrationData["status"],
  notes?: string,
) {
  try {
    console.log(`Updating registration ${registrationId} status to ${status}`)

    const registrationRef = doc(db, COLLECTIONS.REGISTRATIONS, registrationId)
    await updateDoc(registrationRef, {
      status,
      ...(notes && { notes }),
      updatedAt: serverTimestamp(),
    })

    console.log("✅ Registration status updated successfully")
    return { success: true, error: null }
  } catch (error) {
    console.error("❌ Error updating registration status:", error)
    return { success: false, error }
  }
}

// Mark registration as complete profile
export async function markProfileComplete(registrationId: string) {
  try {
    console.log(`Marking registration ${registrationId} profile as complete`)

    const registrationRef = doc(db, COLLECTIONS.REGISTRATIONS, registrationId)
    await updateDoc(registrationRef, {
      completedProfile: true,
      status: "completed",
      updatedAt: serverTimestamp(),
    })

    console.log("✅ Registration profile marked as complete")
    return { success: true, error: null }
  } catch (error) {
    console.error("❌ Error marking profile as complete:", error)
    return { success: false, error }
  }
}

// Get registration statistics
export async function getRegistrationStats() {
  try {
    console.log("Fetching registration statistics")

    const registrationsRef = collection(db, COLLECTIONS.REGISTRATIONS)
    const allRegistrationsQuery = await getDocs(registrationsRef)

    // Count registrations by status and source
    const stats = {
      total: allRegistrationsQuery.size,
      byStatus: {
        pending: 0,
        verified: 0,
        completed: 0,
        rejected: 0,
      },
      bySource: {
        email: 0,
        google: 0,
        facebook: 0,
        other: 0,
      },
    }

    allRegistrationsQuery.forEach((doc) => {
      const data = doc.data() as RegistrationData
      stats.byStatus[data.status] += 1
      stats.bySource[data.source] += 1
    })

    console.log("✅ Registration statistics fetched:", stats)
    return { data: stats, success: true, error: null }
  } catch (error) {
    console.error("❌ Error fetching registration statistics:", error)
    return { data: null, success: false, error }
  }
}
