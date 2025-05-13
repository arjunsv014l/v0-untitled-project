import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if user is authenticated via cookie
  const isAuthenticated = request.cookies.has("user_authenticated")

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/about",
    "/how-it-works",
    "/for-students",
    "/for-universities",
    "/for-companies",
    "/for-freshers",
  ]

  // Debug paths that should always be accessible
  const debugPaths = ["/debug", "/debug/profile", "/debug/profile-status", "/debug/firebase"]

  // API paths that should be accessible
  const apiPaths = ["/api/"]

  // Check if the current path is a debug path or starts with /debug/
  const isDebugPath = debugPaths.some((dp) => path === dp) || path.startsWith("/debug/")

  // Check if the current path is an API path
  const isApiPath = path.startsWith("/api/")

  // If it's a debug path, allow access
  if (isDebugPath) {
    console.log("[Middleware] Allowing access to debug path:", path)
    return NextResponse.next()
  }

  // If it's an API path, allow access
  if (isApiPath) {
    console.log("[Middleware] Allowing access to API path:", path)
    return NextResponse.next()
  }

  // If it's a public path, allow access
  if (publicPaths.includes(path)) {
    console.log("[Middleware] Allowing access to public path:", path)
    return NextResponse.next()
  }

  // If user is not authenticated and trying to access a protected route, redirect to home
  if (!isAuthenticated) {
    console.log("[Middleware] Unauthorized access to protected path:", path)
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Allow access to all other paths for authenticated users
  console.log("[Middleware] Authorized access to protected path:", path)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
