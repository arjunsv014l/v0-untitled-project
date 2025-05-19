import { db } from "@/lib/firebase"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"

// Error handling wrapper
const handleFirestoreError = (error: any, operation: string) => {
  console.error(`Firestore ${operation} error:`, error)

  // Check for permission errors
  if (error.code === "permission-denied") {
    console.error("Permission denied. Check Firestore security rules.")
    return { error: "Permission denied. Please contact support." }
  }

  // Check for not found errors
  if (error.code === "not-found") {
    return { error: "Document not found." }
  }

  return { error: `An error occurred during ${operation}. Please try again.` }
}

// Get a document with error handling
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null }
    } else {
      return { data: null, error: "Document not found" }
    }
  } catch (error) {
    return handleFirestoreError(error, "get")
  }
}

// Create a document with error handling
export const createDocument = async (collectionName: string, docId: string | null, data: any) => {
  try {
    if (docId) {
      // Create with specific ID
      const docRef = doc(db, collectionName, docId)
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return { id: docId, error: null }
    } else {
      // Create with auto-generated ID
      const collectionRef = collection(db, collectionName)
      const newDoc = await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return { id: newDoc.id, error: null }
    }
  } catch (error) {
    return handleFirestoreError(error, "create")
  }
}

// Update a document with error handling
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return { success: true, error: null }
  } catch (error) {
    return handleFirestoreError(error, "update")
  }
}

// Delete a document with error handling
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await deleteDoc(docRef)
    return { success: true, error: null }
  } catch (error) {
    return handleFirestoreError(error, "delete")
  }
}

// Query documents with error handling
export const queryDocuments = async (collectionName: string, fieldPath: string, operator: any, value: any) => {
  try {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, where(fieldPath, operator, value))
    const querySnapshot = await getDocs(q)

    const results: any[] = []
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() })
    })

    return { data: results, error: null }
  } catch (error) {
    return handleFirestoreError(error, "query")
  }
}

// Create or update user profile
export const saveUserProfile = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      // Update existing user
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      })
    } else {
      // Create new user
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }

    return { success: true, error: null }
  } catch (error) {
    return handleFirestoreError(error, "save user profile")
  }
}
