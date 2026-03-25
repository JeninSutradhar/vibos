"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ExternalLink, Menu, RefreshCw, X } from "lucide-react"
import Link from "next/link"

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  function logout() {
    window.localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  return (
    <div className="flex h-[100dvh] min-h-0 bg-[#F0EDE6]">
      {/* Desktop sidebar: fill full viewport height (main column scrolls inside) */}
      <div className="hidden h-full shrink-0 lg:flex">
        <AdminSidebar onLogout={logout} />
      </div>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 max-w-[85vw] shadow-xl">
            <AdminSidebar
              onLogout={() => {
                setMobileOpen(false)
                logout()
              }}
            />
            <button
              type="button"
              className="absolute right-2 top-4 rounded-lg bg-white/10 p-2 text-white lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-black/[0.06] bg-[#FCFBF8]/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-black/10 bg-white p-2 text-[#1D1D1F] shadow-sm lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden text-sm text-[#1D1D1F]/60 sm:block">
              <span className="rounded-full bg-[#E9F8F8] px-3 py-1 text-xs font-semibold text-[#1D1D1F]">
                VIBOS Admin
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-sm transition hover:bg-[#E9F8F8]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <button
              type="button"
              onClick={() => router.refresh()}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-sm transition hover:bg-black/[0.03]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
