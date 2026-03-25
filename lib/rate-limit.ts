const requests = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 12

export function checkRateLimit(key: string) {
  const now = Date.now()
  const existing = requests.get(key)

  if (!existing || existing.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true as const }
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false as const }
  }

  existing.count += 1
  return { allowed: true as const }
}
