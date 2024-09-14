import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { ObjectId } from "mongodb"
declare module "next/server" {
  interface NextRequest {
    user?: {
      _id: ObjectId | string
    }
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  if (token && token.sub) {
    request.user = {
      _id: token.sub as string
    }
    if (path === "/auth" && token) {
      return NextResponse.redirect("/")
    }

    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/auth", "/:path*"]
}
