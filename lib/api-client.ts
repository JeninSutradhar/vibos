const rawPhpApiBaseUrl = process.env.NEXT_PUBLIC_PHP_API_BASE_URL || ""

/**
 * Base URL for the PHP API (no trailing slash).
 * If the page is served over HTTPS but the env still uses `http://`, we upgrade to
 * `https://` in the browser so fetches are not blocked as mixed active content.
 */
export function getPhpApiBaseUrl(): string {
  if (!rawPhpApiBaseUrl) return ""
  let base = rawPhpApiBaseUrl.endsWith("/") ? rawPhpApiBaseUrl.slice(0, -1) : rawPhpApiBaseUrl
  if (typeof window !== "undefined" && window.location.protocol === "https:" && base.startsWith("http://")) {
    base = `https://${base.slice(7)}`
  }
  return base
}

/** When PHP base URL is unset, lead forms still target these Next.js API routes. */
const LEAD_PATH_TO_NEXT: Record<string, string> = {
  "/api/leads/contact": "/api/contact",
  "/api/leads/quote": "/api/quote",
  "/api/leads/callback": "/api/callback",
}

export function apiUrl(path: string) {
  const base = getPhpApiBaseUrl()
  const p = path.startsWith("/") ? path : `/${path}`
  if (base) return `${base}${p}`
  return LEAD_PATH_TO_NEXT[p] ?? p
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const json = (await res.json()) as any
  if (!res.ok || json?.success !== true) {
    const message = json?.error?.message || "Request failed"
    throw new Error(message)
  }

  return json.data as T
}
