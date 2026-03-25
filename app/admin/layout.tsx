"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === "/admin/login"

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FCFBF8] via-[#E9F8F8]/35 to-[#F0EDE6]">{children}</div>
    )
  }

  return <AdminShell>{children}</AdminShell>
}
