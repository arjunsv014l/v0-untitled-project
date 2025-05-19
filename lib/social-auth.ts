import { auth } from "./firebase"
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser

    // If new user, create a profile in Firestore
    if (isNewUser) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        role: "student",
        createdAt: new Date().toISOString(),
        authProvider: "google",
      })
    } else {
      // Update last login for existing users
      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        await setDoc(
          userRef,
          {
            lastLogin: new Date().toISOString(),
          },
          { merge: true },
        )
      }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Error signing in with Google:", error)
    return { success: false, error }
  }
}

// Facebook Authentication
export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser

    // If new user, create a profile in Firestore
    if (isNewUser) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        role: "student",
        createdAt: new Date().toISOString(),
        authProvider: "facebook",
      })
    } else {
      // Update last login for existing users
      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        await setDoc(
          userRef,
          {
            lastLogin: new Date().toISOString(),
          },
          { merge: true },
        )
      }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Error signing in with Facebook:", error)
    return { success: false, error }
  }
}
