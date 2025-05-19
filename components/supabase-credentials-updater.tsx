import type React from "react"

export const SupabaseCredentialsUpdater: React.FC = () => {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <h3 className="text-lg font-medium text-yellow-800">Firebase Credentials</h3>
      <p className="mt-2 text-sm text-yellow-700">
        This project uses Firebase for authentication and database services. Please ensure your Firebase credentials are
        correctly configured in your environment variables.
      </p>
    </div>
  )
}
