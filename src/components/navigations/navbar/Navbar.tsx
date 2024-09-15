"use client"
import { ReactNode } from "react"
import { signOut, useSession } from "next-auth/react"
interface NavbarProp {
  actions?: ReactNode[]
}
import Image from "next/image"

export default function Navbar(prop: NavbarProp) {
  const { data: session, status } = useSession()
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth" }) // ออกจากระบบแล้ว redirect ไปที่หน้าแรก
  }
  return (
    <div className="navbar bg-base-100 w-100 rounded-2xl">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">LISTME</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src={
                  (session?.user.image as string) ||
                  "/mockup/user/user.webp"
                }
                width={64}
                height={64}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu w-auto menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">
                  <small className="text-clip text-nowrap">{session?.user.name}</small>
                </span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
