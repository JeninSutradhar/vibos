"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { adminFetch } from "@/lib/admin-client"
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin/admin-ui"
import { BookOpen, Calendar, ChevronRight, Search } from "lucide-react"

type BlogAdmin = {
  slug: string
  title: string
  excerpt: string
  category: string
  tag: string
  image: string | null
  published: number
  publishedAt: string | null
}

export default function AdminBlogPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<BlogAdmin[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError(null)
      try {
        const json = await adminFetch<{ items: BlogAdmin[] }>("/api/admin/blog-posts", { method: "GET" })
        setItems(json.items)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load blog posts")
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
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    )
  }, [items, query])

  const live = items.filter((p) => p.published === 1).length

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        description="Manage posts shown on /blog and individual article pages. Set publish state and dates to control ordering."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Posts" value={items.length} accent="teal" />
        <AdminStatCard label="Published" value={live} accent="amber" />
        <AdminStatCard label="Drafts" value={items.length - live} accent="slate" />
      </div>

      <AdminCard className="mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D1D1F]/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, excerpt, category, slug…"
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
          {filtered.map((p) => (
            <Link key={p.slug} href={`/admin/blog/edit/${encodeURIComponent(p.slug)}`}>
              <AdminCard className="group h-full overflow-hidden transition hover:border-[#67E8E9]/50 hover:shadow-md">
                {p.image ? (
                  <div className="aspect-[2/1] w-full overflow-hidden bg-[#F0EDE6]">
                    <img src={p.image} alt="" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
                  </div>
                ) : (
                  <div className="flex aspect-[2/1] items-center justify-center bg-gradient-to-br from-[#E9F8F8] to-[#F0EDE6]">
                    <BookOpen className="h-10 w-10 text-[#1D1D1F]/20" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#0F766E]">{p.category}</p>
                      <p className="mt-1 font-bold text-[#1D1D1F]">{p.title}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-[#1D1D1F]/55">{p.excerpt}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-[#1D1D1F]/25" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#1D1D1F]/45">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-2 py-0.5 font-medium">
                      <Calendar className="h-3 w-3" />
                      {p.publishedAt || "No date"}
                    </span>
                    <span className="rounded-full bg-black/[0.04] px-2 py-0.5 font-medium">{p.tag}</span>
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 font-bold ${
                        p.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {p.published ? "Live" : "Hidden"}
                    </span>
                  </div>
                </div>
              </AdminCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
