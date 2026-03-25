import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { getPhpApiBaseUrl } from "@/lib/api-client"
import { blogPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Blog and Insights | VIBOS",
  description: "VIBOS insights on outsourcing, operations, and growth support.",
}

export default async function BlogPage() {
  const base = getPhpApiBaseUrl()
  const posts = base
    ? (((await (await fetch(`${base}/api/blog`, { cache: "no-store" })).json()).data ?? []) as Array<{
        slug: string
        title: string
        excerpt: string
        category: string
        tag: string
        image: string
        date: string
      }>)
    : blogPosts
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Blog and Insights</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-700">
              Practical perspectives on outsourcing, insurance operations, and support team performance.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                <img src={post.image} alt={post.title} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    {post.category} · {post.date}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-[#1D1D1F]">{post.title}</h2>
                  <p className="mt-3 text-gray-700">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-block font-semibold underline">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  )
}
