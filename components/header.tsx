"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { mainNavLinks } from "@/lib/site-data"
import { TrackableLink } from "@/components/trackable-link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FCFBF8]/95 px-4 py-5 backdrop-blur sm:px-8 lg:px-16">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/vibos-logo.png" alt="VIBOS" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#1D1D1F] lg:flex">
          {mainNavLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-black/65">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <TrackableLink
            href="/book-consultation"
            eventName="cta_click"
            metadata={{ location: "header_desktop", cta: "book_consultation" }}
            className="hidden rounded-full bg-[#1D1D1F] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 md:inline-block"
          >
            Book Consultation
          </TrackableLink>
          <button
            className="rounded-md p-2 text-[#1D1D1F] lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="container mx-auto mt-4 space-y-3 rounded-xl border border-black/10 bg-white p-4 lg:hidden">
          {mainNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-2 py-2 text-sm font-medium text-[#1D1D1F] hover:bg-[#FCFBF8]"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book-consultation"
            className="mt-2 block rounded-full bg-[#1D1D1F] px-4 py-3 text-center text-sm font-semibold text-white"
            onClick={() => setIsOpen(false)}
          >
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  )
}
