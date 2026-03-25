"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BookOpen,
  Mail,
  LogOut,
  Layers,
} from "lucide-react"

const nav = [
  { href: "/admin/leads", label: "Leads", icon: Users, description: "Inquiries & callbacks" },
  { href: "/admin/services", label: "Services", icon: Layers, description: "Service pages" },
  { href: "/admin/blog", label: "Blog", icon: BookOpen, description: "Articles" },
  { href: "/admin/careers", label: "Careers", icon: Briefcase, description: "Open roles" },
  { href: "/admin/team", label: "Team", icon: LayoutDashboard, description: "Team highlights" },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail, description: "Subscribers" },
] as const

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full min-h-0 w-64 shrink-0 flex-col border-r border-white/10 bg-[#1D1D1F] text-white">
      <div className="border-b border-white/10 px-5 py-6">
        <Link href="/admin/leads" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#67E8E9]/20 text-[#67E8E9]">
            <LayoutDashboard className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold tracking-tight">VIBOS</p>
            <p className="text-[11px] font-medium text-white/50">Admin Console</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">Menu</p>
        {nav.map(({ href, label, icon: Icon, description }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                active
                  ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-[#67E8E9]" : "text-white/45"}`} />
              <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="mt-0.5 block text-[11px] font-normal text-white/45">{description}</span>
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
