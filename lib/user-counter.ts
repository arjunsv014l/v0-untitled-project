import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp, onSnapshot } from "firebase/firestore"

// Constants
const COUNTER_DOC_ID = "userCounter"
const COUNTER_COLLECTION = "stats"
const INITIAL_COUNT = 500

/**
 * Interface for the counter document in Firestore
 */
interface CounterDoc {
  baseCount: number
  incrementalCount: number
  totalCount: number
  lastUpdated: any
}

/**
 * Initialize the counter in Firestore if it doesn't exist
 */
export async function initializeCounter(): Promise<number> {
  try {
    const counterRef = doc(db, COUNTER_COLLECTION, COUNTER_DOC_ID)
    const counterDoc = await getDoc(counterRef)

    if (!counterDoc.exists()) {
      // Create the counter document with initial values
      const initialData: Partial<CounterDoc> = {
        baseCount: INITIAL_COUNT,
        incrementalCount: 0,
        totalCount: INITIAL_COUNT,
        lastUpdated: serverTimestamp(),
      }

      await setDoc(counterRef, initialData)
      console.log("User counter initialized with base count:", INITIAL_COUNT)
      return INITIAL_COUNT
    } else {
      // Return the existing total count
      const data = counterDoc.data() as CounterDoc
      return data.totalCount
    }
  } catch (error) {
    console.error("Error initializing user counter:", error)
    return INITIAL_COUNT
  }
}

/**
 * Increment the user count when a new user registers
 */
export async function incrementUserCount(): Promise<number> {
  try {
    // First, ensure the counter exists
    await initializeCounter()

    // Update the counter
    const counterRef = doc(db, COUNTER_COLLECTION, COUNTER_DOC_ID)

    // Use atomic operations to update the counter
    await updateDoc(counterRef, {
      incrementalCount: increment(1),
      totalCount: increment(1),
      lastUpdated: serverTimestamp(),
    })

    // Get the updated count
    const updatedDoc = await getDoc(counterRef)
    const data = updatedDoc.data() as CounterDoc
    const newCount = data.totalCount

    // Dispatch a custom event to notify all counter instances
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userCountUpdated", { detail: { count: newCount } }))
    }

    console.log("User count incremented to:", newCount)
    return newCount
  } catch (error) {
    console.error("Error incrementing user count:", error)

    // If there's an error, we'll try to get the current count as a fallback
    try {
      const counterRef = doc(db, COUNTER_COLLECTION, COUNTER_DOC_ID)
      const counterDoc = await getDoc(counterRef)

      if (counterDoc.exists()) {
        const data = counterDoc.data() as CounterDoc
        return data.totalCount
      }
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
    }

    // If all else fails, return the initial count
    return INITIAL_COUNT
  }
}

/**
 * Get the current user count
 */
export async function getCurrentUserCount(): Promise<number> {
  try {
    // First, ensure the counter exists
    await initializeCounter()

    // Get the current count
    const counterRef = doc(db, COUNTER_COLLECTION, COUNTER_DOC_ID)
    const counterDoc = await getDoc(counterRef)

    if (counterDoc.exists()) {
      const data = counterDoc.data() as CounterDoc
      return data.totalCount
    } else {
      return INITIAL_COUNT
    }
  } catch (error) {
    console.error("Error getting user count:", error)
    return INITIAL_COUNT
  }
}

/**
 * Set up a real-time listener for the user count
 */
export function subscribeToUserCount(callback: (count: number) => void): () => void {
  // First, ensure the counter exists (fire and forget)
  initializeCounter().catch((error) => console.error("Error initializing counter:", error))

  // Set up the listener
  const counterRef = doc(db, COUNTER_COLLECTION, COUNTER_DOC_ID)
  const unsubscribe = onSnapshot(
    counterRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as CounterDoc
        callback(data.totalCount)
      } else {
        callback(INITIAL_COUNT)
      }
    },
    (error) => {
      console.error("Error in user count subscription:", error)
      callback(INITIAL_COUNT)
    },
  )

  return unsubscribe
}
