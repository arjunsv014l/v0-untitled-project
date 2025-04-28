import DoodleBackground from "@/components/ui-elements/doodle-background"
import DoodleButton from "@/components/ui-elements/doodle-button"
import Link from "next/link"
import { SupabaseSetupGuide } from "@/components/supabase-setup-guide"
import { AuthStatus } from "@/components/auth-status"
import { SupabaseCredentialsUpdater } from "@/components/supabase-credentials-updater"

export default function DebugPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <DoodleBackground className="pt-24 pb-16" density="low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Supabase Setup Guide</h1>
          <p className="text-lg text-gray-700 mb-8">
            Follow these steps to set up Supabase authentication for your project
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/">
              <DoodleButton>Back to Home</DoodleButton>
            </Link>
          </div>
        </div>
      </DoodleBackground>

      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <AuthStatus />
          <SupabaseCredentialsUpdater />
          <SupabaseSetupGuide />
        </div>
      </section>
    </main>
  )
}
