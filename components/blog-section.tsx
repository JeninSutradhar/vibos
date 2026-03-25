import Link from "next/link"
import { blogPosts } from "@/lib/blog-posts"

export function BlogSection() {
  return (
    <section className="bg-[#FCD450]/20 py-24 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto text-center max-w-6xl">
        {/* Header */}
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#1D1D1F] host-grotesk-bold">
          Insights for smarter operations.
        </h2>
        <p className="text-lg text-gray-600 mb-16 host-grotesk-regular">
          Actionable guidance for outsourcing, back-office execution, and business process optimization.
        </p>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-[#FCFBF8] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-64 object-cover" />

                <div className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                  {post.tag}
                </div>
              </div>

              <div className="p-8">
                <p className="text-xs font-bold text-gray-500 mb-3 host-grotesk-semibold">{post.date.toUpperCase()}</p>

                <div className="flex gap-2 mb-4">
                  <span className="bg-gray-200 px-3 py-1 rounded text-xs font-bold host-grotesk-semibold">
                    {post.category}
                  </span>
                  <span className="bg-gray-200 px-3 py-1 rounded text-xs font-bold host-grotesk-semibold">
                    {post.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#1D1D1F] leading-tight host-grotesk-bold">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/blog"
          className="bg-[#1D1D1F] text-white font-bold py-4 px-8 rounded-full inline-block hover:bg-gray-800 transition-colors host-grotesk-semibold"
        >
          Explore All Insights
        </Link>
      </div>
    </section>
  )
}
