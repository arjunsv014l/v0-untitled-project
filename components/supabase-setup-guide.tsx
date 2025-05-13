"use client"

import { useState } from "react"
import DoodleCard from "./ui-elements/doodle-card"
import DoodleButton from "./ui-elements/doodle-button"
import { Copy, Check, ExternalLink } from "lucide-react"

export function SupabaseSetupGuide() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <DoodleCard className="p-6">
      <h2 className="text-2xl font-bold mb-4">Supabase Setup Guide</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Step 1: Create a Supabase Project</h3>
          <p className="mb-2">
            Go to{" "}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Supabase
            </a>{" "}
            and create a new project.
          </p>
          <a
            href="https://supabase.com/dashboard/new/_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:underline"
          >
            Create New Project <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Step 2: Get Your API Keys</h3>
          <p className="mb-2">Once your project is created, go to the project settings and find your API keys.</p>
          <div className="bg-gray-50 p-3 rounded-md mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Project URL</span>
              <button
                onClick={() => copyToClipboard("URL: [Your Supabase Project URL]", "url")}
                className="text-gray-500 hover:text-black"
              >
                {copied === "url" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <code className="text-xs bg-white p-2 rounded border block overflow-x-auto">
              URL: [Your Supabase Project URL]
            </code>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Anon Key</span>
              <button
                onClick={() => copyToClipboard("ANON KEY: [Your Supabase Anon Key]", "key")}
                className="text-gray-500 hover:text-black"
              >
                {copied === "key" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <code className="text-xs bg-white p-2 rounded border block overflow-x-auto">
              ANON KEY: [Your Supabase Anon Key]
            </code>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Step 3: Set Up Your Database Schema</h3>
          <p className="mb-2">
            Run the SQL from the <code className="bg-gray-100 px-1 py-0.5 rounded">database-schema.sql</code> file in
            the Supabase SQL editor.
          </p>
          <a
            href="https://supabase.com/dashboard/project/_/sql"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:underline"
          >
            Open SQL Editor <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Step 4: Configure Environment Variables</h3>
          <p className="mb-2">Add the URL and Anon Key as environment variables to your project.</p>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Environment Variables</span>
              <button
                onClick={() =>
                  copyToClipboard(
                    `# Add your Supabase URL and Anon Key here\n# URL: [Your Supabase Project URL]\n# ANON KEY: [Your Supabase Anon Key]`,
                    "env",
                  )
                }
                className="text-gray-500 hover:text-black"
              >
                {copied === "env" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <code className="text-xs bg-white p-2 rounded border block overflow-x-auto whitespace-pre">
              # Add your Supabase URL and Anon Key here # URL: [Your Supabase Project URL] # ANON KEY: [Your Supabase
              Anon Key]
            </code>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Step 5: Enable Email Authentication</h3>
          <p className="mb-2">Go to Authentication → Providers and make sure Email is enabled.</p>
          <a
            href="https://supabase.com/dashboard/project/_/auth/providers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:underline"
          >
            Configure Auth Providers <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Step 6: Set Up OAuth (Optional)</h3>
          <p className="mb-2">If you want to enable Google login, configure it in the Auth providers section.</p>
          <p className="text-sm text-gray-600">
            Redirect URL:{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">
              {typeof window !== "undefined"
                ? `${window.location.origin}/auth/callback`
                : "https://your-domain.com/auth/callback"}
            </code>
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Testing Your Setup</h3>
          <p className="mb-4">
            After completing the setup, try registering a new user to test if everything is working correctly.
          </p>
          <DoodleButton onClick={() => window.location.reload()}>Refresh Page</DoodleButton>
        </div>
      </div>
    </DoodleCard>
  )
}
