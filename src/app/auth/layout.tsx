import HeroLayout from "@/components/layouts/Hero"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <HeroLayout>{children}</HeroLayout>
}
