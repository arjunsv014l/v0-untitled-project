import { auth } from "./firebase"
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import { incrementUserCount } from "@/components/counter"
import { createRegistration } from "@/lib/firestore-db"

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser

    console.log("Google auth successful, user:", user.uid, "isNewUser:", isNewUser)

    // If new user, create a profile in Firestore
    if (isNewUser) {
      try {
        console.log("Creating new user document in Firestore for:", user.uid)

        // Ensure we're explicitly storing name and timestamps
        const userData = {
          name: user.displayName, // Explicitly store name from Google profile
          email: user.email,
          avatar: user.photoURL,
          role: "student",
          dob: null, // Initialize DOB as null for social logins
          createdAt: new Date(), // Store as Date object
          lastLogin: new Date(),
          authProvider: "google",
          registrationDate: new Date().toISOString(), // Also store as ISO string for easier reading
        }

        // Create user document with explicit error handling
        await setDoc(doc(db, "users", user.uid), userData)
          .then(() => {
            console.log(
              "✅ User document successfully created in Firestore with fields:",
              Object.keys(userData).join(", "),
            )
          })
          .catch((error) => {
            console.error("❌ Error creating user document:", error)
            // Try to get more details about the error
            if (error.code === "permission-denied") {
              console.error("This appears to be a Firestore permissions issue. Check your security rules.")
            }
          })

        // Create a registration record in the registrations collection
        if (isNewUser) {
          try {
            await createRegistration({
              userId: user.uid,
              email: user.email || "",
              name: userData.name,
              source: "google",
            }).then((result) => {
              if (result.success) {
                console.log("✅ Google registration record created with ID:", result.id)
              } else {
                console.error("❌ Failed to create Google registration record:", result.error)
              }
            })
          } catch (regError) {
            console.error("❌ Exception creating Google registration record:", regError)
          }
        }

        // Increment user count for new Google sign-ups
        try {
          const newCount = await incrementUserCount()
          console.log("User count updated to:", newCount)
          // Dispatch a global event that all counter instances can listen for
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("userRegistered", {
                detail: { count: newCount },
              }),
            )
          }
        } catch (countError) {
          console.error("Failed to update user count:", countError)
        }
      } catch (firestoreError) {
        console.error("❌ Error in Firestore operations:", firestoreError)
        // Continue the auth flow even if Firestore fails
      }
    } else {
      // Update last login for existing users
      try {
        console.log("Updating last login for existing user:", user.uid)
        const userRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          await setDoc(
            userRef,
            {
              lastLogin: new Date(),
            },
            { merge: true },
          )
          console.log("✅ Last login updated successfully")
        } else {
          console.warn("⚠️ User document doesn't exist for existing user. Creating it now.")
          // Create the document for existing auth users who don't have a Firestore document
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
            role: "student",
            dob: null, // Initialize DOB as null
            createdAt: new Date(),
            lastLogin: new Date(),
            authProvider: "google",
            notes: "Document created during login for existing auth user",
            registrationDate: new Date().toISOString(),
          })
          console.log("✅ User document created for existing auth user")
        }
      } catch (updateError) {
        console.error("❌ Error updating last login:", updateError)
      }
    }

    return { success: true, user }
  } catch (error) {
    console.error("❌ Error signing in with Google:", error)
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

    console.log("Facebook auth successful, user:", user.uid, "isNewUser:", isNewUser)

    // If new user, create a profile in Firestore
    if (isNewUser) {
      try {
        console.log("Creating new user document in Firestore for:", user.uid)

        // Ensure we're explicitly storing name and timestamps
        const userData = {
          name: user.displayName, // Explicitly store name from Facebook profile
          email: user.email,
          avatar: user.photoURL,
          role: "student",
          dob: null, // Initialize DOB as null for social logins
          createdAt: new Date(), // Store as Date object
          lastLogin: new Date(),
          authProvider: "facebook",
          registrationDate: new Date().toISOString(), // Also store as ISO string for easier reading
        }

        // Create user document with explicit error handling
        await setDoc(doc(db, "users", user.uid), userData)
          .then(() => {
            console.log(
              "✅ User document successfully created in Firestore with fields:",
              Object.keys(userData).join(", "),
            )
          })
          .catch((error) => {
            console.error("❌ Error creating user document:", error)
            // Try to get more details about the error
            if (error.code === "permission-denied") {
              console.error("This appears to be a Firestore permissions issue. Check your security rules.")
            }
          })

        // Create a registration record in the registrations collection
        if (isNewUser) {
          try {
            await createRegistration({
              userId: user.uid,
              email: user.email || "",
              name: userData.name,
              source: "facebook",
            }).then((result) => {
              if (result.success) {
                console.log("✅ Facebook registration record created with ID:", result.id)
              } else {
                console.error("❌ Failed to create Facebook registration record:", result.error)
              }
            })
          } catch (regError) {
            console.error("❌ Exception creating Facebook registration record:", regError)
          }
        }

        // Increment user count for new Facebook sign-ups
        try {
          const newCount = await incrementUserCount()
          console.log("User count updated to:", newCount)
          // Dispatch a global event that all counter instances can listen for
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("userRegistered", {
                detail: { count: newCount },
              }),
            )
          }
        } catch (countError) {
          console.error("Failed to update user count:", countError)
        }
      } catch (firestoreError) {
        console.error("❌ Error in Firestore operations:", firestoreError)
        // Continue the auth flow even if Firestore fails
      }
    } else {
      // Update last login for existing users
      try {
        console.log("Updating last login for existing user:", user.uid)
        const userRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          await setDoc(
            userRef,
            {
              lastLogin: new Date(),
            },
            { merge: true },
          )
          console.log("✅ Last login updated successfully")
        } else {
          console.warn("⚠️ User document doesn't exist for existing user. Creating it now.")
          // Create the document for existing auth users who don't have a Firestore document
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
            role: "student",
            dob: null, // Initialize DOB as null
            createdAt: new Date(),
            lastLogin: new Date(),
            authProvider: "facebook",
            notes: "Document created during login for existing auth user",
            registrationDate: new Date().toISOString(),
          })
          console.log("✅ User document created for existing auth user")
        }
      } catch (updateError) {
        console.error("❌ Error updating last login:", updateError)
      }
    }

    return { success: true, user }
  } catch (error) {
    console.error("❌ Error signing in with Facebook:", error)
    return { success: false, error }
  }
}
