import { initializeFirebase } from "./firebase-init"
import { checkNetworkConnectivity } from "./firebase-init" // Fixed import path

// Initialize Firebase and export the services
const { app, auth, db, storage } = initializeFirebase()

export { app, auth, db, storage, checkNetworkConnectivity }
