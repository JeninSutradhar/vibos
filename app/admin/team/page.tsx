"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin/admin-ui"
import { LayoutGrid, Save, Search } from "lucide-react"

type TeamProfileAdmin = {
  id: number
  title: string
  description: string
  sortOrder: number
}

export default function AdminTeamPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<TeamProfileAdmin[]>([])
  const [savingId, setSavingId] = useState<number | null>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError(null)
      try {
        const json = await adminFetch<{ items: TeamProfileAdmin[] }>("/api/admin/team-profiles", { method: "GET" })
        setItems(json.items)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load team profiles")
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
      (x) => x.title.toLowerCase().includes(q) || x.description.toLowerCase().includes(q)
    )
  }, [items, query])

  async function save(item: TeamProfileAdmin) {
    setSavingId(item.id)
    setError(null)
    try {
      await adminFetch(`/api/admin/team-profiles/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: item.title,
          description: item.description,
          sortOrder: item.sortOrder,
        }),
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Team"
        description="Highlight cards on /team. Lower sort order appears first on the public page."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <AdminStatCard label="Profiles" value={items.length} accent="teal" />
        <AdminStatCard label="Tip" value="—" hint="Use sort order to control display sequence (e.g. 10, 20, 30)." accent="slate" />
      </div>

      <AdminCard className="mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D1D1F]/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title or description…"
            className="w-full rounded-xl border border-black/10 bg-[#FCFBF8] py-2.5 pl-10 pr-3 text-sm"
          />
        </div>
      </AdminCard>

      <p className="mb-4 text-sm text-[#1D1D1F]/50">
        Public page:{" "}
        <Link href="/team" target="_blank" className="font-semibold text-teal-700 underline">
          /team
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
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF9E6] text-[#B45309]">
                  <LayoutGrid className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Profile #{item.id}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_120px]">
                <label className="block">
                  <span className="text-xs font-semibold text-[#1D1D1F]/45">Title</span>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, title: e.target.value } : x)))
                    }
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm font-semibold"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-[#1D1D1F]/45">Sort</span>
                  <input
                    type="number"
                    value={item.sortOrder}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((x) => (x.id === item.id ? { ...x, sortOrder: Number(e.target.value) } : x))
                      )
                    }
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-xs font-semibold text-[#1D1D1F]/45">Description</span>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) => (x.id === item.id ? { ...x, description: e.target.value } : x))
                    )
                  }
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
                />
              </label>
              <button
                type="button"
                disabled={savingId === item.id}
                onClick={() => void save(item)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {savingId === item.id ? "Saving…" : "Save profile"}
              </button>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}
