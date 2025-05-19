import type React from "react"

export const SupabaseSetupGuide: React.FC = () => {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <h3 className="text-lg font-medium text-yellow-800">Firebase is being used instead of Supabase</h3>
      <p className="mt-2 text-sm text-yellow-700">
        This project is configured to use Firebase for authentication and database services. The Supabase references are
        placeholders and not functional.
      </p>
    </div>
  )
}
