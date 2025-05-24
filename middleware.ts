import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the request is for the dashboard or any of its subpages
  if (
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/social") ||
    req.nextUrl.pathname.startsWith("/resume") ||
    req.nextUrl.pathname.startsWith("/journal") ||
    req.nextUrl.pathname.startsWith("/notes")
  ) {
    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Check if profile is complete for the social feed
    if (req.nextUrl.pathname.startsWith("/social")) {
      // Fetch user profile to check completion status
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_profile_complete")
        .eq("id", session.user.id)
        .single()

      // If profile is not complete, redirect to profile completion page
      if (!profile || !profile.is_profile_complete) {
        return NextResponse.redirect(new URL("/profile/complete", req.url))
      }
    }
  }

  // Redirect profile completion to dashboard for users who have already completed their profile
  if (req.nextUrl.pathname.startsWith("/profile/complete")) {
    if (session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_profile_complete")
        .eq("id", session.user.id)
        .single()

      // If profile is already complete, redirect to dashboard
      if (profile && profile.is_profile_complete) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/social/:path*",
    "/resume/:path*",
    "/journal/:path*",
    "/notes/:path*",
    "/profile/complete",
  ],
}
