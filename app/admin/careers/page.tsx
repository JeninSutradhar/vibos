"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin/admin-ui"
import { Briefcase, Save, Search } from "lucide-react"

type CareerAdmin = {
  id: number
  title: string
  type: string
  mode: string
  description: string
  published: number
  sortOrder: number
}

export default function AdminCareersPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<CareerAdmin[]>([])
  const [savingId, setSavingId] = useState<number | null>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError(null)
      try {
        const json = await adminFetch<{ items: CareerAdmin[] }>("/api/admin/careers-openings", { method: "GET" })
        setItems(json.items)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load careers")
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
      (x) =>
        x.title.toLowerCase().includes(q) ||
        x.description.toLowerCase().includes(q) ||
        x.type.toLowerCase().includes(q)
    )
  }, [items, query])

  async function save(item: CareerAdmin) {
    setSavingId(item.id)
    setError(null)
    try {
      await adminFetch(`/api/admin/careers-openings/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: item.title,
          type: item.type,
          mode: item.mode,
          description: item.description,
          published: item.published,
        }),
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSavingId(null)
    }
  }

  const published = items.filter((x) => x.published === 1).length

  return (
    <div>
      <AdminPageHeader
        title="Careers"
        description="Job cards on the public /careers page. Toggle visibility without deleting rows."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Openings" value={items.length} accent="teal" />
        <AdminStatCard label="Visible on site" value={published} accent="amber" />
        <AdminStatCard label="Hidden" value={items.length - published} accent="slate" />
      </div>

      <AdminCard className="mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D1D1F]/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter roles…"
            className="w-full rounded-xl border border-black/10 bg-[#FCFBF8] py-2.5 pl-10 pr-3 text-sm"
          />
        </div>
      </AdminCard>

      <p className="mb-4 text-sm text-[#1D1D1F]/50">
        Public page:{" "}
        <Link href="/careers" target="_blank" className="font-semibold text-teal-700 underline">
          /careers
        </Link>
      </p>

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
        <div className="space-y-5">
          {filtered.map((item) => (
            <AdminCard key={item.id} className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F8F8] text-[#0F766E]">
                  <Briefcase className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Role #{item.id}</p>
                  <p className="font-mono text-[11px] text-[#1D1D1F]/40">sort_order: {item.sortOrder}</p>
                </div>
                <span
                  className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    item.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.published ? "Live" : "Hidden"}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold text-[#1D1D1F]/45">Title</span>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, title: e.target.value } : x)))
                    }
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm font-medium"
                  />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-[#1D1D1F]/45">Type</span>
                    <input
                      value={item.type}
                      onChange={(e) =>
                        setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, type: e.target.value } : x)))
                      }
                      className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[#1D1D1F]/45">Mode</span>
                    <input
                      value={item.mode}
                      onChange={(e) =>
                        setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, mode: e.target.value } : x)))
                      }
                      className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              </div>

              <label className="mt-4 block">
                <span className="text-xs font-semibold text-[#1D1D1F]/45">Description</span>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, description: e.target.value } : x)))
                  }
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={item.published === 1}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((x) => (x.id === item.id ? { ...x, published: e.target.checked ? 1 : 0 } : x))
                      )
                    }
                    className="h-4 w-4 rounded border-black/20"
                  />
                  Published on website
                </label>
                <button
                  type="button"
                  disabled={savingId === item.id}
                  onClick={() => void save(item)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {savingId === item.id ? "Saving…" : "Save role"}
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}
