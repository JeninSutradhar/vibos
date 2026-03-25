"use client"

import Link, { type LinkProps } from "next/link"
import type { ReactNode } from "react"
import { trackEvent } from "@/lib/track"

type Props = LinkProps & {
  className?: string
  children: ReactNode
  eventName: string
  metadata?: Record<string, string>
}

export function TrackableLink({ children, eventName, metadata, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={() => {
        trackEvent(eventName, metadata)
      }}
    >
      {children}
    </Link>
  )
}
