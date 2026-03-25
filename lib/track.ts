"use client"

import { apiUrl } from "@/lib/api-client"

export function trackEvent(eventName: string, metadata: Record<string, string> = {}) {
  try {
    void fetch(apiUrl("/api/analytics/events"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName,
        page: window.location.pathname,
        metadata,
      }),
    })
  } catch (_error) {
    // no-op to keep UX uninterrupted
  }
}
