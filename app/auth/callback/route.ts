import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)

  // Firebase handles most of the OAuth flow client-side
  // This route is mainly for redirecting back to the app after authentication

  // URL to redirect to after sign in process completes
  // You can customize this based on query parameters if needed
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard"

  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
}
