import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore"
import { getAuth, signInAnonymously } from "firebase/auth"
import { db } from "./firebase"

/**
 * Comprehensive Firebase diagnostic tool
 */
export const runFirebaseDiagnostics = async (): Promise<{
  status: "success" | "partial" | "failure"
  details: Record<string, any>
  error?: any
}> => {
  const results = {
    firebaseInitialized: false,
    authAvailable: false,
    firestoreAvailable: false,
    writeOperationSuccess: false,
    readOperationSuccess: false,
    updateOperationSuccess: false,
    configDetails: {},
    error: null,
  }

  try {
    // Step 1: Check if Firebase is initialized
    console.log("🔍 Checking Firebase initialization...")
    results.configDetails = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Set" : "❌ Missing",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "✅ Set" : "❌ Missing",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "✅ Set" : "❌ Missing",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "✅ Set" : "❌ Missing",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "✅ Set" : "❌ Missing",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "✅ Set" : "❌ Missing",
    }

    if (!db) {
      throw new Error("Firebase Firestore is not initialized")
    }
    results.firebaseInitialized = true
    console.log("✅ Firebase is initialized")

    // Step 2: Check Auth
    console.log("🔍 Checking Firebase Auth...")
    const auth = getAuth()
    if (!auth) {
      throw new Error("Firebase Auth is not initialized")
    }
    results.authAvailable = true
    console.log("✅ Firebase Auth is available")

    // Step 3: Try anonymous sign-in
    try {
      await signInAnonymously(auth)
      console.log("✅ Anonymous sign-in successful")
    } catch (authError) {
      console.error("❌ Anonymous sign-in failed:", authError)
      // Continue with diagnostics even if auth fails
    }

    // Step 4: Check Firestore
    console.log("🔍 Checking Firestore...")
    const diagnosticCollection = collection(db, "diagnostics")
    if (!diagnosticCollection) {
      throw new Error("Cannot access Firestore collections")
    }
    results.firestoreAvailable = true
    console.log("✅ Firestore is available")

    // Step 5: Try a write operation
    console.log("🔍 Testing write operation...")
    const testDocRef = doc(db, "diagnostics", "test-" + Date.now())
    await setDoc(testDocRef, {
      timestamp: new Date().toISOString(),
      test: "Firebase diagnostic test",
    })
    results.writeOperationSuccess = true
    console.log("✅ Write operation successful")

    // Step 6: Try a read operation
    console.log("🔍 Testing read operation...")
    const docSnap = await getDoc(testDocRef)
    if (docSnap.exists()) {
      results.readOperationSuccess = true
      console.log("✅ Read operation successful")
    } else {
      throw new Error("Document was written but cannot be read")
    }

    // Step 7: Try an update operation
    console.log("🔍 Testing update operation...")
    await updateDoc(testDocRef, {
      updated: true,
      updateTimestamp: new Date().toISOString(),
    })
    results.updateOperationSuccess = true
    console.log("✅ Update operation successful")

    // Step 8: Check for existing user profiles
    console.log("🔍 Checking for user profiles...")
    try {
      const usersCollection = collection(db, "users")
      const userDocs = await getDocs(usersCollection)
      results.userProfilesCount = userDocs.size
      console.log(`✅ Found ${userDocs.size} user profiles`)

      // Check a sample of profiles for profileCompleted field
      const sampleProfiles = []
      let i = 0
      userDocs.forEach((doc) => {
        if (i < 5) {
          // Limit to 5 samples
          const data = doc.data()
          sampleProfiles.push({
            id: doc.id,
            profileCompleted: data.profileCompleted,
            hasProfileCompletedField: "profileCompleted" in data,
          })
          i++
        }
      })
      results.sampleProfiles = sampleProfiles
    } catch (error) {
      console.error("❌ Error checking user profiles:", error)
      results.userProfilesError = String(error)
    }

    return {
      status: Object.values(results).some((val) => val === false) ? "partial" : "success",
      details: results,
    }
  } catch (error) {
    console.error("❌ Firebase diagnostic failed:", error)
    results.error = String(error)
    return {
      status: "failure",
      details: results,
      error,
    }
  }
}

/**
 * Check a specific user's profile in Firebase
 */
export const checkUserProfile = async (
  userId: string,
): Promise<{
  exists: boolean
  data: any | null
  profileCompleted: boolean | null
  error?: any
}> => {
  try {
    console.log(`🔍 Checking profile for user: ${userId}`)
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      console.log(`✅ User profile found:`, userData)
      return {
        exists: true,
        data: userData,
        profileCompleted: userData.profileCompleted === true,
      }
    } else {
      console.log(`❌ User profile not found for ID: ${userId}`)
      return {
        exists: false,
        data: null,
        profileCompleted: null,
      }
    }
  } catch (error) {
    console.error(`❌ Error checking user profile:`, error)
    return {
      exists: false,
      data: null,
      profileCompleted: null,
      error: String(error),
    }
  }
}

/**
 * Force update a user's profile completion status
 */
export const forceProfileCompletion = async (
  userId: string,
): Promise<{
  success: boolean
  error?: any
}> => {
  try {
    console.log(`🔧 Forcing profile completion for user: ${userId}`)
    const userRef = doc(db, "users", userId)

    // First check if the user document exists
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      // Update existing document
      await updateDoc(userRef, {
        profileCompleted: true,
        profile_completed_at: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        _force_updated: true,
      })
      console.log(`✅ Successfully forced profile completion`)
    } else {
      // Create a new document if it doesn't exist
      await setDoc(userRef, {
        profileCompleted: true,
        profile_completed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        _force_created: true,
      })
      console.log(`✅ Created new user document with completed profile`)
    }

    // Verify the update
    const updatedDoc = await getDoc(userRef)
    if (updatedDoc.exists() && updatedDoc.data().profileCompleted === true) {
      return { success: true }
    } else {
      throw new Error("Profile was updated but verification failed")
    }
  } catch (error) {
    console.error(`❌ Error forcing profile completion:`, error)
    return {
      success: false,
      error: String(error),
    }
  }
}
