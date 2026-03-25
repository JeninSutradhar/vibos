"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader } from "@/components/admin/admin-ui"
import { ArrowLeft, ExternalLink, Save } from "lucide-react"

type ServiceAdmin = {
  slug: string
  title: string
  subtitle: string
  audience: string
  whatWeDo: string
  benefits: string[]
  tools: string[] | null
  published: number
}

export default function AdminEditServicePage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = useMemo(() => params.slug as string, [params.slug])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<ServiceAdmin | null>(null)

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError(null)
      try {
        const json = await adminFetch<ServiceAdmin>(`/api/admin/services/${encodeURIComponent(slug)}`, { method: "GET" })
        setForm(json)
      } catch (err: any) {
        setError(err?.message || "Failed to load service")
      } finally {
        setLoading(false)
      }
    }
    if (slug) void run()
  }, [slug])

  function benefitsText() {
    const benefits = form?.benefits ?? []
    return benefits.join("\n")
  }

  if (loading)
    return (
      <AdminCard className="p-12 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#67E8E9] border-t-transparent" />
      </AdminCard>
    )
  if (!form)
    return <p className="text-sm font-medium text-red-700">Service not found.</p>

  const update = (patch: Partial<ServiceAdmin>) => setForm((prev) => (prev ? { ...prev, ...patch } : prev))

  async function onSave() {
    if (!form) return
    setSaving(true)
    setError(null)
    try {
      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        audience: form.audience,
        whatWeDo: form.whatWeDo,
        benefits: form.benefits,
        tools: form.tools,
        published: form.published,
      }

      await adminFetch(`/api/admin/services/${encodeURIComponent(slug)}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })

      router.push("/admin/services")
    } catch (err: any) {
      setError(err?.message || "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const input =
    "mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-3 py-2.5 text-sm font-medium outline-none ring-[#67E8E9]/30 focus:ring-2"

  return (
    <div>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]/55 hover:text-[#1D1D1F]"
        >
          <ArrowLeft className="h-4 w-4" />
          All services
        </button>
      </div>

      <AdminPageHeader
        title="Edit service"
        description={`Slug: ${form.slug} · Changes apply to the live site after save.`}
        actions={
          <Link
            href={`/services/${encodeURIComponent(form.slug)}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[#E9F8F8]"
          >
            <ExternalLink className="h-4 w-4" />
            Preview
          </Link>
        }
      />

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </div>
      ) : null}

      <AdminCard className="p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Title</span>
            <input value={form.title} onChange={(e) => update({ title: e.target.value })} className={input} />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Subtitle</span>
            <input value={form.subtitle} onChange={(e) => update({ subtitle: e.target.value })} className={input} />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Audience</span>
          <textarea value={form.audience} onChange={(e) => update({ audience: e.target.value })} rows={3} className={input} />
        </label>

        <label className="mt-5 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">What we do</span>
          <textarea value={form.whatWeDo} onChange={(e) => update({ whatWeDo: e.target.value })} rows={6} className={input} />
        </label>

        <label className="mt-5 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Benefits (one per line)</span>
          <textarea
            value={benefitsText()}
            onChange={(e) => update({ benefits: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })}
            rows={4}
            className={input}
          />
        </label>

        <label className="mt-5 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Tools (comma separated)</span>
          <input
            value={(form.tools ?? []).join(", ")}
            onChange={(e) =>
              update({
                tools: e.target.value
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              })
            }
            className={input}
          />
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-black/[0.06] pt-6">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={form.published === 1}
              onChange={(e) => update({ published: e.target.checked ? 1 : 0 })}
              className="h-4 w-4 rounded border-black/20"
            />
            Published on website
          </label>
        </div>

        <button
          disabled={saving}
          onClick={() => void onSave()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D1D1F] py-3.5 text-sm font-bold text-white disabled:opacity-65"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save changes"}
        </button>
      </AdminCard>
    </div>
  )
}

