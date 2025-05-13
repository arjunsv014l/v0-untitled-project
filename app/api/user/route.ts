import { type NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb, isFirebaseAdminInitialized } from "@/lib/firebase-admin"

// Mock data for when Firebase Admin is not initialized
const mockUserData = {
  name: "Test User",
  email: "test@example.com",
  role: "user",
  createdAt: new Date().toISOString(),
}

export async function POST(request: NextRequest) {
  // Check if Firebase Admin is initialized
  if (!isFirebaseAdminInitialized || !adminAuth || !adminDb) {
    console.warn("Firebase Admin is not initialized. Using mock data.")
    return NextResponse.json({ success: true, mock: true })
  }

  try {
    // Get the authorization token
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split("Bearer ")[1]

    // Verify the token
    const decodedToken = await adminAuth.verifyIdToken(token)
    const uid = decodedToken.uid

    // Get the request body
    const body = await request.json()
    console.log("Updating user profile:", uid, body)

    // Update the user document
    const userRef = adminDb.collection("users").doc(uid)
    await userRef.set(body, { merge: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Check if Firebase Admin is initialized
  if (!isFirebaseAdminInitialized || !adminAuth || !adminDb) {
    console.warn("Firebase Admin is not initialized. Using mock data.")
    return NextResponse.json(mockUserData)
  }

  try {
    // Get the authorization token
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split("Bearer ")[1]

    // Verify the token
    const decodedToken = await adminAuth.verifyIdToken(token)
    const uid = decodedToken.uid

    // Get the user document
    const userRef = adminDb.collection("users").doc(uid)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(userDoc.data())
  } catch (error) {
    console.error("Error getting user:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
