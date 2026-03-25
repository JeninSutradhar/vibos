"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader, LeadStatusBadge, LeadTypeBadge } from "@/components/admin/admin-ui"
import { ArrowLeft, Copy, Mail, Save } from "lucide-react"

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
  internalNotes: string | null
  createdAt: string
}

const statusOptions = ["new", "reviewed", "qualified", "contacted", "closed"] as const

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    /* ignore */
  }
}

export default function AdminLeadDetailPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notesDraft, setNotesDraft] = useState("")
  const [savingNotes, setSavingNotes] = useState(false)
  const [savingStatus, setSavingStatus] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminFetch<Lead>(`/api/admin/leads/${id}`, { method: "GET" })
      setLead(data)
      setNotesDraft(data.internalNotes ?? "")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load lead")
      setLead(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  async function saveNotes() {
    if (!lead) return
    setSavingNotes(true)
    setError(null)
    try {
      await adminFetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        body: JSON.stringify({ internalNotes: notesDraft }),
      })
      setLead((prev) => (prev ? { ...prev, internalNotes: notesDraft } : prev))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save notes")
    } finally {
      setSavingNotes(false)
    }
  }

  async function updateStatus(nextStatus: string) {
    if (!lead) return
    setSavingStatus(true)
    setError(null)
    try {
      await adminFetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus, internalNotes: notesDraft }),
      })
      setLead((prev) => (prev ? { ...prev, status: nextStatus, internalNotes: notesDraft } : prev))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setSavingStatus(false)
    }
  }

  if (loading) {
    return (
      <AdminCard className="p-12 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#67E8E9] border-t-transparent" />
        <p className="mt-4 text-sm text-[#1D1D1F]/55">Loading lead…</p>
      </AdminCard>
    )
  }

  if (!lead) {
    return (
      <div>
        <AdminPageHeader title="Lead not found" description="This ID may have been removed or you may need to sign in again." />
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to leads
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]/55 transition hover:text-[#1D1D1F]"
        >
          <ArrowLeft className="h-4 w-4" />
          All leads
        </Link>
      </div>

      <AdminPageHeader
        title={lead.name}
        description={`Lead #${lead.id} · ${lead.company} · Submitted ${lead.createdAt}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1D1D1F] shadow-sm hover:bg-[#E9F8F8]"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <button
              type="button"
              onClick={() => void copyText(lead.email)}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black/[0.03]"
            >
              <Copy className="h-4 w-4" />
              Copy email
            </button>
          </div>
        }
      />

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AdminCard className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#1D1D1F]/45">Pipeline</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <LeadTypeBadge type={lead.leadType} />
              <LeadStatusBadge status={lead.status} />
              <select
                value={lead.status}
                disabled={savingStatus}
                onChange={(e) => void updateStatus(e.target.value)}
                className="rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm font-semibold"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    Set to: {s}
                  </option>
                ))}
              </select>
            </div>
          </AdminCard>

          <AdminCard className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#1D1D1F]/45">Contact & company</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-[#1D1D1F]/45">Email</dt>
                <dd className="mt-1 font-semibold text-[#1D1D1F]">{lead.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#1D1D1F]/45">Country</dt>
                <dd className="mt-1 font-semibold text-[#1D1D1F]">{lead.country}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-[#1D1D1F]/45">Company</dt>
                <dd className="mt-1 font-semibold text-[#1D1D1F]">{lead.company}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-[#1D1D1F]/45">Service interest</dt>
                <dd className="mt-1 text-[#1D1D1F]">{lead.serviceInterest}</dd>
              </div>
            </dl>
          </AdminCard>

          <AdminCard className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#1D1D1F]/45">Message & quote details</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium text-[#1D1D1F]/45">Message</p>
                <p className="mt-2 whitespace-pre-wrap rounded-xl bg-[#FCFBF8] p-4 text-sm leading-relaxed text-[#1D1D1F]/85">
                  {lead.message || "—"}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium text-[#1D1D1F]/45">Preferred time</p>
                  <p className="mt-1 text-sm font-medium">{lead.preferredTime || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#1D1D1F]/45">Monthly volume</p>
                  <p className="mt-1 text-sm font-medium">{lead.monthlyVolume || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#1D1D1F]/45">Team size / start</p>
                  <p className="mt-1 text-sm font-medium">
                    {lead.teamSizeNeeded || "—"} {lead.preferredStartDate ? `· ${lead.preferredStartDate}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#1D1D1F]/45">Attribution</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-[#1D1D1F]/45">Source page</dt>
                <dd className="mt-1 break-all font-mono text-xs text-[#1D1D1F]">{lead.sourcePage}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#1D1D1F]/45">utm_source</dt>
                <dd className="mt-1">{lead.utmSource || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#1D1D1F]/45">utm_medium</dt>
                <dd className="mt-1">{lead.utmMedium || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#1D1D1F]/45">utm_campaign</dt>
                <dd className="mt-1">{lead.utmCampaign || "—"}</dd>
              </div>
            </dl>
          </AdminCard>

          <AdminCard className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#1D1D1F]/45">Internal notes</h2>
            <p className="mt-2 text-xs text-[#1D1D1F]/50">Only visible in admin. Not sent to the lead.</p>
            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              rows={8}
              className="mt-4 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2 text-sm"
              placeholder="Call outcomes, qualification notes, next steps…"
            />
            <button
              type="button"
              disabled={savingNotes}
              onClick={() => void saveNotes()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D1D1F] py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {savingNotes ? "Saving…" : "Save notes"}
            </button>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
