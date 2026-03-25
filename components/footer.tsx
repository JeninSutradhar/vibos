import Link from "next/link"
import { services } from "@/lib/site-data"
import { NewsletterSubscribeForm } from "@/components/forms/newsletter-subscribe-form"

export function Footer() {
  return (
    <footer className="relative bg-[#FCFBF8] pt-24 pb-8">
      <div className="mb-16 border-y border-black/10 py-6 text-center">
        <p className="host-grotesk-regular text-[#1D1D1F]">
          VIBOS is growing. Explore current opportunities and{" "}
          <Link href="/careers" className="host-grotesk-semibold font-bold underline hover:text-gray-600">
            join our team
          </Link>
          .
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="relative mb-20 text-center">
          <div className="relative z-10">
            <h2 className="host-grotesk-bold mb-8 px-4 text-4xl font-bold leading-tight text-[#1D1D1F] md:text-5xl lg:text-7xl">
              Your Global Partner <br />
              for Virtual Business Operations.
            </h2>
            <Link
              href="/book-consultation"
              className="host-grotesk-semibold inline-block rounded-full bg-[#1D1D1F] px-8 py-4 font-bold text-white transition-colors hover:bg-gray-800"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="relative z-10 bg-[#FCFBF8]">
          <div className="mb-16 grid gap-10 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img src="/images/vibos-logo.png" alt="Vibos" className="h-8 w-auto" />
              </div>
              <p className="host-grotesk-regular max-w-xs text-sm text-gray-600">
                Founded in 2016, we support global clients with dedicated virtual business operations teams.
              </p>
              <div className="mt-5">
                <Link href="/contact" className="text-sm font-semibold underline hover:text-[#1D1D1F]">
                  Contact VIBOS
                </Link>
              </div>
            </div>

            <div>
              <h4 className="host-grotesk-bold mb-4 font-bold text-[#1D1D1F]">Services</h4>
              <div className="space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="host-grotesk-bold mb-4 font-bold text-[#1D1D1F]">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  About VIBOS
                </Link>
                <Link href="/team" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Our team
                </Link>
                <Link href="/industries" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Industries
                </Link>
                <Link href="/careers" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Careers
                </Link>
                <Link href="/contact" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Contact us
                </Link>
                <Link href="/how-we-work" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  How we work
                </Link>
              </div>
            </div>

            <div>
              <h4 className="host-grotesk-bold mb-4 font-bold text-[#1D1D1F]">Resources</h4>
              <div className="space-y-2">
                <Link href="/blog" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Blog and insights
                </Link>
                <Link href="/case-studies" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Case studies
                </Link>
                <Link href="/faq" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  FAQs
                </Link>
                <Link href="/pricing" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Pricing
                </Link>
                <Link
                  href="/book-consultation"
                  className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]"
                >
                  Book a consultation
                </Link>
              </div>
            </div>

            <div>
              <h4 className="host-grotesk-bold mb-4 font-bold text-[#1D1D1F]">Trust</h4>
              <div className="space-y-2">
                <Link href="/privacy-policy" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Privacy policy
                </Link>
                <Link href="/terms-of-service" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Terms of service
                </Link>
                <Link href="/data-security" className="host-grotesk-regular block text-sm text-gray-600 hover:text-[#1D1D1F]">
                  Data security
                </Link>
              </div>
            </div>

            <div>
              <h4 className="host-grotesk-bold mb-4 font-bold text-[#1D1D1F]">Head office</h4>
              <p className="host-grotesk-regular mb-4 text-sm text-gray-600">
                Vibos Technologies Pvt. Ltd.
                <br />
                Udaipur, Rajasthan, India
              </p>
              <p className="host-grotesk-regular text-sm text-gray-600">
                Serving clients in the United States, Canada, Australia, and the United Kingdom.
              </p>
            </div>
          </div>

          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center rounded-full border border-black/10 bg-white p-3 md:flex-row md:justify-between">
            <p className="host-grotesk-semibold mb-4 text-center text-sm font-bold text-[#1D1D1F] md:mb-0 md:ml-4 md:text-left">
              Get outsourcing and operations insights delivered monthly.
            </p>
            <NewsletterSubscribeForm />
          </div>

          <div className="host-grotesk-regular text-center text-xs text-gray-500">
            <p className="mb-2">© 2025 Vibos Technologies Pvt. Ltd. | All Rights Reserved</p>
            <p className="mb-4">Proudly serving clients across the US, Canada, Australia, and the UK</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link href="/privacy-policy" className="underline hover:text-[#1D1D1F]">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/terms-of-service" className="underline hover:text-[#1D1D1F]">
                Terms of Service
              </Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/data-security" className="underline hover:text-[#1D1D1F]">
                Data Security
              </Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/faq" className="underline hover:text-[#1D1D1F]">
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
