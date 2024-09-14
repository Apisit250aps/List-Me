import { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="min-w-md">{children}</div>
      </div>
    </div>
  )
}
