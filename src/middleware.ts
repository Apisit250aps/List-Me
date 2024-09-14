import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path === "/auth") {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (session) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth", "/:path*"]
}
