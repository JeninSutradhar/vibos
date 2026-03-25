"use client"

import { useEffect, useMemo, useState } from "react"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin/admin-ui"
import { Download, Mail, RefreshCw, Search } from "lucide-react"

type NewsletterRow = {
  id: number
  email: string
  status: string
  createdAt: string
}

export default function AdminNewsletterPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<NewsletterRow[]>([])
  const [query, setQuery] = useState("")

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const json = await adminFetch<{ items: NewsletterRow[] }>("/api/admin/newsletter", { method: "GET" })
      setItems(json.items)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load newsletter subscribers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((s) => s.email.toLowerCase().includes(q) || s.status.toLowerCase().includes(q))
  }, [items, query])

  const subscribed = items.filter((s) => s.status === "subscribed").length

  function exportCsv() {
    const headers = ["id", "email", "status", "createdAt"]
    const rows = filtered.map((s) =>
      headers.map((h) => `"${String(s[h as keyof NewsletterRow]).replace(/"/g, '""')}"`).join(",")
    )
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vibos-newsletter-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <AdminPageHeader
        title="Newsletter"
        description="Emails captured from the site footer subscribe form. Export for your ESP or CRM."
        actions={
          <>
            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[#E9F8F8] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={!filtered.length}
              className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Total rows" value={items.length} accent="teal" />
        <AdminStatCard label="Subscribed" value={subscribed} accent="amber" />
        <AdminStatCard label="In view" value={filtered.length} hint="After search filter" accent="slate" />
      </div>

      <AdminCard className="mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D1D1F]/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search email or status…"
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
        <AdminCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#FCFBF8] text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/50">
                  <th className="px-4 py-3">Subscriber</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-black/[0.04] hover:bg-[#E9F8F8]/35">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#1D1D1F]/35" />
                        <span className="font-semibold text-[#1D1D1F]">{s.email}</span>
                      </div>
                      <p className="mt-0.5 pl-6 font-mono text-[11px] text-[#1D1D1F]/40">id:{s.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          s.status === "subscribed" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[#1D1D1F]/55">{s.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </div>
  )
}
