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

  // Protect dashboard route
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Check if user has admin role
    const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (error || profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // Redirect profile completion to dashboard for logged-in users
  if (req.nextUrl.pathname.startsWith("/profile") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
}
