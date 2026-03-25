import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-posts"
import { getSiteUrl } from "@/lib/site-url"
import { services } from "@/lib/site-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

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
