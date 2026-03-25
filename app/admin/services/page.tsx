"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin/admin-ui"
import { ChevronRight, Layers, RefreshCw, Search } from "lucide-react"

type ServiceAdmin = {
  slug: string
  title: string
  subtitle: string
  published: number
}

export default function AdminServicesPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<ServiceAdmin[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError(null)
      try {
        const json = await adminFetch<{ items: ServiceAdmin[] }>("/api/admin/services", { method: "GET" })
        setItems(json.items)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load services")
      } finally {
        setLoading(false)
      }
    }
    void run()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q)
    )
  }, [items, query])

  const publishedCount = items.filter((s) => s.published === 1).length

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Content for the public /services index and each /services/[slug] detail page. Changes go live on the next visitor request."
        actions={
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[#E9F8F8]"
          >
            <RefreshCw className="h-4 w-4" />
            Reload
          </button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Total services" value={items.length} accent="teal" />
        <AdminStatCard label="Published" value={publishedCount} hint="Visible on the website" accent="amber" />
        <AdminStatCard label="Hidden" value={items.length - publishedCount} hint="Unpublished rows" accent="slate" />
      </div>

      <AdminCard className="mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D1D1F]/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title, subtitle, or slug…"
            className="w-full rounded-xl border border-black/10 bg-[#FCFBF8] py-2.5 pl-10 pr-3 text-sm"
          />
        </div>
      </AdminCard>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </div>
      ) : null}

      {loading ? (
        <AdminCard className="p-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#67E8E9] border-t-transparent" />
        </AdminCard>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((s) => (
            <Link key={s.slug} href={`/admin/services/edit/${encodeURIComponent(s.slug)}`}>
              <AdminCard className="group h-full p-5 transition hover:border-[#67E8E9]/50 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9F8F8] text-[#0F766E]">
                      <Layers className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-bold text-[#1D1D1F]">{s.title}</p>
                      <p className="mt-1 text-sm leading-snug text-[#1D1D1F]/55">{s.subtitle}</p>
                      <p className="mt-2 font-mono text-[11px] text-[#1D1D1F]/40">/{s.slug}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-[#1D1D1F]/25 transition group-hover:text-[#0F766E]" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      s.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {s.published ? "Live" : "Hidden"}
                  </span>
                </div>
              </AdminCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
