import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Create a Supabase client with the service role key
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookies().set(name, value, options)
        },
        remove(name: string, options: any) {
          cookies().set(name, "", options)
        },
      },
    })

    // Create transaction functions
    const { error: beginError } = await supabase.rpc("create_begin_transaction_function")
    if (beginError) {
      console.error("Error creating begin_transaction function:", beginError)
    }

    const { error: commitError } = await supabase.rpc("create_commit_transaction_function")
    if (commitError) {
      console.error("Error creating commit_transaction function:", commitError)
    }

    const { error: rollbackError } = await supabase.rpc("create_rollback_transaction_function")
    if (rollbackError) {
      console.error("Error creating rollback_transaction function:", rollbackError)
    }

    return NextResponse.json({ success: true, message: "Database functions created successfully" })
  } catch (error) {
    console.error("Error setting up database functions:", error)
    return NextResponse.json({ error: "Failed to set up database functions" }, { status: 500 })
  }
}

// Helper function to create transaction functions
async function createTransactionFunctions(supabase: any) {
  // Create begin_transaction function
  await supabase.rpc("create_function", {
    function_name: "begin_transaction",
    function_definition: `
      BEGIN;
      RETURN TRUE;
    `,
  })

  // Create commit_transaction function
  await supabase.rpc("create_function", {
    function_name: "commit_transaction",
    function_definition: `
      COMMIT;
      RETURN TRUE;
    `,
  })

  // Create rollback_transaction function
  await supabase.rpc("create_function", {
    function_name: "rollback_transaction",
    function_definition: `
      ROLLBACK;
      RETURN TRUE;
    `,
  })
}
