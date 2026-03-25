export const phpApiBaseUrl = process.env.NEXT_PUBLIC_PHP_API_BASE_URL || ""

export function apiUrl(path: string) {
  if (!phpApiBaseUrl) return path
  const base = phpApiBaseUrl.endsWith("/") ? phpApiBaseUrl.slice(0, -1) : phpApiBaseUrl
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
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

