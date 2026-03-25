import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { blogPosts } from "@/lib/blog-posts"
import { phpApiBaseUrl } from "@/lib/api-client"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!phpApiBaseUrl) {
    const post = blogPosts.find((item) => item.slug === slug)
    if (!post) return { title: "Article Not Found | VIBOS" }
    return { title: `${post.title} | VIBOS`, description: post.excerpt }
  }

  const res = await fetch(`${phpApiBaseUrl}/api/blog/${encodeURIComponent(slug)}`, { cache: "no-store" })
  if (!res.ok) return { title: "Article Not Found | VIBOS" }
  const json = (await res.json()) as any
  const post = json?.data
  if (!post) return { title: "Article Not Found | VIBOS" }

  return {
    title: `${post.title} | VIBOS`,
    description: post.excerpt,
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  if (!phpApiBaseUrl) {
    const post = blogPosts.find((item) => item.slug === slug)
    if (!post) notFound()
    return (
      <PageShell>
        <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
          <article className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
            <p className="text-xs font-semibold uppercase text-gray-500">
              {post.category} · {post.date}
            </p>
            <h1 className="mt-4 text-4xl font-bold text-[#1D1D1F]">{post.title}</h1>
            <img src={post.image} alt={post.title} className="mt-6 h-72 w-full rounded-xl object-cover" />
            <p className="mt-8 text-lg leading-relaxed text-gray-700">{post.excerpt}</p>
            <p className="mt-5 leading-relaxed text-gray-700">
              This article template is ready for full client-provided content. You can now expand each post into complete
              long-form insights as part of your publishing workflow.
            </p>
          </article>
        </main>
      </PageShell>
    )
  }

  const res = await fetch(`${phpApiBaseUrl}/api/blog/${encodeURIComponent(slug)}`, { cache: "no-store" })
  if (!res.ok) notFound()
  const json = (await res.json()) as any
  const post = json?.data
  if (!post) notFound()

  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <article className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
          <p className="text-xs font-semibold uppercase text-gray-500">
            {post.category} · {post.date}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#1D1D1F]">{post.title}</h1>
          <img src={post.image} alt={post.title} className="mt-6 h-72 w-full rounded-xl object-cover" />
          <p className="mt-8 text-lg leading-relaxed text-gray-700">{post.excerpt}</p>
          <p className="mt-5 leading-relaxed text-gray-700">
            This article template is ready for full client-provided content. You can now expand each post into complete
            long-form insights as part of your publishing workflow.
          </p>
        </article>
      </main>
    </PageShell>
  )
}
