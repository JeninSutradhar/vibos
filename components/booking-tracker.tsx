"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/track"

export function BookingTracker() {
  useEffect(() => {
    trackEvent("booking_page_view")

    const handler = (event: MessageEvent) => {
      const eventName = (event.data as { event?: string } | undefined)?.event
      if (eventName === "calendly.event_scheduled") {
        trackEvent("booking_completed")
      }
    }

    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  return null
}
