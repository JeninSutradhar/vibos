/**
 * Canonical public site origin (no trailing slash), for sitemaps, metadata, etc.
 *
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://vibosglobal.com).
 * On Netlify, URL is available at build time if unset.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")

  const netlify = process.env.URL?.trim()
  if (netlify) return netlify.replace(/\/$/, "")

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`

  return "https://vibosglobal.com"
}
