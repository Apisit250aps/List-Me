import { ReactNode } from "react"

export default function HeroLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center min-w-96">{children}</div>
    </div>
  )
}
