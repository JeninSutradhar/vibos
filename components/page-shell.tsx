import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Props = {
  children: ReactNode
}

export function PageShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#FCFBF8]">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
