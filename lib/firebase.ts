// Create mock implementations that don't actually connect to Firebase
// This prevents the app from requiring Firebase environment variables

const mockDb = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => ({}) }),
      set: async () => ({}),
      update: async () => ({}),
    }),
    add: async () => ({}),
    where: () => ({
      get: async () => ({ empty: true, docs: [] }),
    }),
  }),
}

const mockStorage = {
  ref: () => ({
    put: async () => ({}),
    getDownloadURL: async () => "",
  }),
}

// Export mock implementations
export const db = mockDb
export const storage = mockStorage

// Export a dummy app
export default { name: "supabase-only-app" }
