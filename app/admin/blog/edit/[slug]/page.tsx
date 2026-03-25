"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader } from "@/components/admin/admin-ui"
import { ArrowLeft, ExternalLink, Save } from "lucide-react"

type BlogAdmin = {
  slug: string
  title: string
  excerpt: string
  category: string
  tag: string
  image: string | null
  content: any
  published: number
  publishedAt: string | null
}

export default function AdminEditBlogPostPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = useMemo(() => params.slug as string, [params.slug])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<BlogAdmin | null>(null)

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError(null)
      try {
        const json = await adminFetch<BlogAdmin>(`/api/admin/blog-posts/${encodeURIComponent(slug)}`, { method: "GET" })
        setForm(json)
      } catch (err: any) {
        setError(err?.message || "Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }
    if (slug) void run()
  }, [slug])

  if (loading)
    return (
      <AdminCard className="p-12 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#67E8E9] border-t-transparent" />
      </AdminCard>
    )
  if (!form) return <p className="text-sm font-medium text-red-700">Post not found.</p>

  const update = (patch: Partial<BlogAdmin>) => setForm((prev) => (prev ? { ...prev, ...patch } : prev))

  async function onSave() {
    if (!form) return
    setSaving(true)
    setError(null)
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        tag: form.tag,
        image: form.image,
        content: form.content ?? null,
        published: form.published,
        publishedAt: form.publishedAt ?? "",
      }
      await adminFetch(`/api/admin/blog-posts/${encodeURIComponent(slug)}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })
      router.push("/admin/blog")
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
          onClick={() => router.push("/admin/blog")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]/55 hover:text-[#1D1D1F]"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </button>
      </div>

      <AdminPageHeader
        title="Edit blog post"
        description={`Slug: ${form.slug} · Hero image, taxonomy, and publish schedule.`}
        actions={
          <Link
            href={`/blog/${encodeURIComponent(form.slug)}`}
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

      <AdminCard className="overflow-hidden">
        {form.image ? (
          <div className="aspect-[21/9] max-h-48 w-full overflow-hidden bg-[#F0EDE6]">
            <img src={form.image} alt="" className="h-full w-full object-cover" />
          </div>
        ) : null}
        <div className="p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Title</span>
              <input value={form.title} onChange={(e) => update({ title: e.target.value })} className={input} />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Image URL</span>
              <input
                value={form.image ?? ""}
                onChange={(e) => update({ image: e.target.value })}
                className={input}
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Excerpt</span>
            <textarea value={form.excerpt} onChange={(e) => update({ excerpt: e.target.value })} rows={4} className={input} />
          </label>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Category</span>
              <input value={form.category} onChange={(e) => update({ category: e.target.value })} className={input} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Tag</span>
              <input value={form.tag} onChange={(e) => update({ tag: e.target.value })} className={input} />
            </label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Published</span>
              <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={form.published === 1}
                  onChange={(e) => update({ published: e.target.checked ? 1 : 0 })}
                  className="h-4 w-4 rounded border-black/20"
                />
                Visible on /blog
              </label>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">
                Published at (YYYY-MM-DD HH:mm:ss)
              </span>
              <input
                value={form.publishedAt ?? ""}
                onChange={(e) => update({ publishedAt: e.target.value })}
                placeholder="2026-01-10 00:00:00"
                className={input}
              />
            </label>
          </div>

          <button
            disabled={saving}
            onClick={() => void onSave()}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D1D1F] py-3.5 text-sm font-bold text-white disabled:opacity-65"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </AdminCard>
    </div>
  )
}

