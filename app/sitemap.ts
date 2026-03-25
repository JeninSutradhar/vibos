import type { MetadataRoute } from "next"
import { services } from "@/lib/site-data"
import { blogPosts } from "@/lib/blog-posts"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/industries",
    "/how-we-work",
    "/pricing",
    "/case-studies",
    "/faq",
    "/book-consultation",
    "/contact",
    "/blog",
    "/careers",
    "/team",
    "/privacy-policy",
    "/terms-of-service",
    "/data-security",
  ]

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))

  const serviceEntries = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }))

  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }))

  return [...staticEntries, ...serviceEntries, ...blogEntries]
}
