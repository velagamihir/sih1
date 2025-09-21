import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = ["/profile", "/bookings", "/dashboard", "/admin"]

// Define auth routes that should redirect to home if already logged in
const authRoutes = ["/login", "/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user has authentication token (in a real app, verify JWT)
  const hasAuthToken = request.cookies.get("swadeshi-auth-token")

  // For protected routes, redirect to login if not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!hasAuthToken) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // For auth routes, redirect to home if already authenticated
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (hasAuthToken) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
