"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader, AdminStatCard, LeadStatusBadge, LeadTypeBadge } from "@/components/admin/admin-ui"
import { Download, Filter, RefreshCw, Search } from "lucide-react"

type Lead = {
  id: number
  leadType: string
  name: string
  email: string
  company: string
  country: string
  serviceInterest: string
  message: string | null
  preferredTime: string | null
  monthlyVolume: string | null
  teamSizeNeeded: string | null
  preferredStartDate: string | null
  sourcePage: string
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  status: string
  createdAt: string
}

const statusOptions = ["new", "reviewed", "qualified", "contacted", "closed"] as const
const PAGE_SIZE = 10

export default function AdminLeadsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<Lead[]>([])
  const [page, setPage] = useState(1)

  const [filterType, setFilterType] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [searchQ, setSearchQ] = useState("")
  const [appliedQ, setAppliedQ] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const buildQuery = useCallback(() => {
    const p = new URLSearchParams()
    if (filterType) p.set("lead_type", filterType)
    if (filterStatus) p.set("status", filterStatus)
    if (appliedQ.trim()) p.set("q", appliedQ.trim())
    if (dateFrom) p.set("from", dateFrom)
    if (dateTo) p.set("to", dateTo)
    const qs = p.toString()
    return qs ? `?${qs}` : ""
  }, [filterType, filterStatus, appliedQ, dateFrom, dateTo])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await adminFetch<{ items: Lead[] }>(`/api/admin/leads${buildQuery()}`, {
        method: "GET",
      })
      setItems(json.items)
      setPage(1)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load leads")
    } finally {
      setLoading(false)
    }
  }, [buildQuery])

  useEffect(() => {
    void load()
  }, [load])

  const [updatingId, setUpdatingId] = useState<number | null>(null)

  async function updateStatus(id: number, nextStatus: string) {
    setUpdatingId(id)
    try {
      await adminFetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      } as RequestInit)
      setItems((prev) => prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l)))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setUpdatingId(null)
    }
  }

  const stats = useMemo(() => {
    const total = items.length
    const newCount = items.filter((l) => l.status === "new").length
    const callback = items.filter((l) => l.leadType === "callback").length
    const quote = items.filter((l) => l.leadType === "quote").length
    return { total, newCount, callback, quote }
  }, [items])

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return items.slice(start, start + PAGE_SIZE)
  }, [items, currentPage])

  function exportCsv() {
    const headers = [
      "id",
      "leadType",
      "name",
      "email",
      "company",
      "country",
      "serviceInterest",
      "status",
      "sourcePage",
      "utmSource",
      "utmMedium",
      "utmCampaign",
      "createdAt",
    ]
    const rows = items.map((l) =>
      headers.map((h) => {
        const v = l[h as keyof Lead]
        const s = v == null ? "" : String(v)
        return `"${s.replace(/"/g, '""')}"`
      }).join(",")
    )
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vibos-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function applyFilters() {
    setAppliedQ(searchQ)
  }

  return (
    <div>
      <AdminPageHeader
        title="Leads"
        description="Contact, quote, and callback requests from your site. Filter by pipeline stage, type, or keyword. Data is stored in MySQL."
        actions={
          <>
            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1D1D1F] shadow-sm transition hover:bg-[#E9F8F8] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Sync
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={!items.length}
              className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/85 disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="In this view" value={stats.total} hint="Rows after filters (max 500 from API)" accent="teal" />
        <AdminStatCard label="New" value={stats.newCount} hint="Needs first touch" accent="amber" />
        <AdminStatCard label="Callbacks" value={stats.callback} hint="From booking page" accent="teal" />
        <AdminStatCard label="Quotes" value={stats.quote} hint="From contact / quote form" accent="slate" />
      </div>

      <AdminCard className="mb-6 p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-[#1D1D1F]/40" />
          <span className="text-sm font-semibold text-[#1D1D1F]">Filters</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm font-medium text-[#1D1D1F]"
            >
              <option value="">All types</option>
              <option value="contact">Contact</option>
              <option value="quote">Quote</option>
              <option value="callback">Callback</option>
            </select>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm font-medium text-[#1D1D1F]"
            >
              <option value="">All statuses</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Created from</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Created to</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
            />
          </div>
          <div className="lg:col-span-8">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Search</label>
            <div className="mt-1.5 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D1D1F]/35" />
                <input
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  placeholder="Name, email, company, or interest…"
                  className="w-full rounded-xl border border-black/10 bg-[#FCFBF8] py-2 pl-10 pr-3 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={applyFilters}
                className="shrink-0 rounded-xl bg-[#1D1D1F] px-4 py-2 text-sm font-semibold text-white"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="flex items-end lg:col-span-4">
            <button
              type="button"
              onClick={() => {
                setFilterType("")
                setFilterStatus("")
                setSearchQ("")
                setAppliedQ("")
                setDateFrom("")
                setDateTo("")
              }}
              className="w-full rounded-xl border border-black/10 bg-white py-2 text-sm font-semibold text-[#1D1D1F] hover:bg-black/[0.03]"
            >
              Clear all
            </button>
          </div>
        </div>
        <p className="mt-4 text-xs text-[#1D1D1F]/45">
          Changing type, status, or dates reloads from the server. Search uses the Apply button (or Enter).
        </p>
      </AdminCard>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </div>
      ) : null}

      {loading ? (
        <AdminCard className="p-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#67E8E9] border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-[#1D1D1F]/55">Loading leads…</p>
        </AdminCard>
      ) : items.length === 0 ? (
        <AdminCard className="p-12 text-center">
          <p className="text-sm font-medium text-[#1D1D1F]/55">No leads match these filters.</p>
        </AdminCard>
      ) : (
        <>
          <AdminCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[1040px] w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-black/[0.06] bg-[#FCFBF8] text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/50">
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Interest</th>
                    <th className="px-4 py-3">Preview</th>
                    <th className="px-4 py-3">Source / UTM</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-black/[0.04] transition-colors hover:bg-[#E9F8F8]/40"
                    >
                      <td className="px-4 py-3 align-top">
                        <LeadTypeBadge type={lead.leadType} />
                      </td>
                      <td className="px-4 py-3 align-top">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="font-semibold text-[#1D1D1F] hover:text-teal-700 hover:underline"
                        >
                          {lead.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-[#1D1D1F]/50">{lead.email}</p>
                        <p className="text-xs text-[#1D1D1F]/40">{lead.country}</p>
                      </td>
                      <td className="px-4 py-3 align-top font-medium text-[#1D1D1F]">{lead.company}</td>
                      <td className="px-4 py-3 align-top text-[#1D1D1F]/80">{lead.serviceInterest}</td>
                      <td className="max-w-[200px] px-4 py-3 align-top text-xs text-[#1D1D1F]/55 line-clamp-2">
                        {lead.message || lead.preferredTime || "—"}
                      </td>
                      <td className="px-4 py-3 align-top text-xs text-[#1D1D1F]/50">
                        <span className="font-mono text-[11px]">{lead.sourcePage}</span>
                        {(lead.utmSource || lead.utmMedium || lead.utmCampaign) && (
                          <p className="mt-1 line-clamp-2">
                            {[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" · ") || "—"}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-col gap-2">
                          <LeadStatusBadge status={lead.status} />
                          <select
                            className="max-w-[140px] rounded-lg border border-black/10 bg-white px-2 py-1 text-xs font-medium"
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                            disabled={updatingId === lead.id}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-top text-xs text-[#1D1D1F]/55">{lead.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] bg-[#FCFBF8] px-4 py-3 text-sm text-[#1D1D1F]/60">
              <span>
                Page {currentPage} of {totalPages} · Showing {pageItems.length} of {items.length}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </AdminCard>
        </>
      )}
    </div>
  )
}
