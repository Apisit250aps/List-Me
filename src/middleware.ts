import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// ประกาศ type เพื่อขยาย NextRequest
declare module "next/server" {
  interface NextRequest {
    user?: {
      _id: string
    }
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // ตรวจสอบ token เฉพาะเมื่อจำเป็น
  if (path === "/auth" || path.startsWith("/")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (token?.sub) {
      request.user = {
        _id: token.sub
      }

      // Redirect จากหน้า auth ไปหน้าหลักถ้ามีการล็อกอินแล้ว
      if (path === "/auth") {
        return NextResponse.redirect("/")
      }
    } 
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth", "/:path*"]
}