"use client"

import { FormEvent, useState } from "react"
import { trackEvent } from "@/lib/track"
import { apiUrl } from "@/lib/api-client"

type ContactFormProps = {
  endpoint: "/api/leads/contact" | "/api/leads/quote" | "/api/leads/callback"
  sourcePage: string
  submitLabel: string
  includeQuoteFields?: boolean
  includeCallbackFields?: boolean
}

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm({
  endpoint,
  sourcePage,
  submitLabel,
  includeQuoteFields = false,
  includeCallbackFields = false,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setMessage("")

    const form = new FormData(event.currentTarget)
    const params = new URLSearchParams(window.location.search)
    form.set("sourcePage", sourcePage)
    form.set("utmSource", params.get("utm_source") || "")
    form.set("utmMedium", params.get("utm_medium") || "")
    form.set("utmCampaign", params.get("utm_campaign") || "")

    const payload = Object.fromEntries(form.entries())

    try {
      const response = await fetch(apiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Request failed")
      }

      trackEvent("form_submit", { endpoint, sourcePage })
      setStatus("success")
      setMessage("Thanks. Your request has been submitted successfully.")
      event.currentTarget.reset()
      return
    } catch (_error) {
      setStatus("error")
      setMessage("Submission failed. Please try again or email us directly.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-black/10 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-[#1D1D1F]">
          Name
          <input name="name" required className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-[#1D1D1F]">
          Work Email
          <input type="email" name="email" required className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-[#1D1D1F]">
          Company
          <input name="company" required className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-[#1D1D1F]">
          Country
          <input name="country" required className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
      </div>

      <label className="text-sm font-medium text-[#1D1D1F]">
        Service Interest
        <input name="serviceInterest" required className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
      </label>

      {includeCallbackFields ? (
        <label className="text-sm font-medium text-[#1D1D1F]">
          Preferred Time
          <input name="preferredTime" required className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>
      ) : null}

      {includeQuoteFields ? (
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-[#1D1D1F]">
            Monthly Volume
            <input name="monthlyVolume" className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-[#1D1D1F]">
            Team Size Needed
            <input name="teamSizeNeeded" className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-[#1D1D1F]">
            Preferred Start Date
            <input name="preferredStartDate" className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2" />
          </label>
        </div>
      ) : null}

      <label className="text-sm font-medium text-[#1D1D1F]">
        Message
        <textarea
          name="message"
          rows={4}
          required={!includeCallbackFields}
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <input
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      <input name="sourcePage" readOnly hidden />
      <input name="utmSource" readOnly hidden />
      <input name="utmMedium" readOnly hidden />
      <input name="utmCampaign" readOnly hidden />

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-[#1D1D1F] px-6 py-3 font-semibold text-white disabled:opacity-65"
      >
        {status === "loading" ? "Submitting..." : submitLabel}
      </button>
      {message ? (
        <p className={`text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  )
}
