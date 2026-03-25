import Link from "next/link"
import { services } from "@/lib/site-data"
import { NewsletterSubscribeForm } from "@/components/forms/newsletter-subscribe-form"

export function Footer() {
  return (
    <footer className="relative bg-[#FCFBF8] pt-24 pb-8">
      <div className="text-center py-6 border-y border-black/10 mb-16">
        <p className="text-[#1D1D1F] host-grotesk-regular">
          VIBOS is growing. Explore current opportunities and{" "}
          <Link href="/careers" className="font-bold underline hover:text-gray-600 host-grotesk-semibold">
            join our team
          </Link>
          .
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="relative text-center mb-20">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-[#1D1D1F] host-grotesk-bold leading-tight px-4">
              Your Global Partner <br />
              for Virtual Business Operations.
            </h2>
            <Link
              href="/book-consultation"
              className="bg-[#1D1D1F] text-white font-bold py-4 px-8 rounded-full inline-block hover:bg-gray-800 transition-colors host-grotesk-semibold"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="bg-[#FCFBF8] relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img src="/images/vibos-logo.png" alt="Vibos" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-gray-600 host-grotesk-regular max-w-xs">
                Founded in 2016, we support global clients with dedicated virtual business operations teams.
              </p>
              <div className="mt-5">
                <Link href="/contact" className="text-sm font-semibold underline hover:text-[#1D1D1F]">
                  Contact VIBOS
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#1D1D1F] host-grotesk-bold">Services</h4>
              <div className="space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#1D1D1F] host-grotesk-bold">Company</h4>
              <div className="space-y-2">
                <Link href="/team" className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular">
                  About VIBOS
                </Link>
                <Link
                  href="/careers"
                  className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular"
                >
                  Careers
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular"
                >
                  Contact Us
                </Link>
                <Link href="/team" className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular">
                  Leadership
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#1D1D1F] host-grotesk-bold">Resources</h4>
              <div className="space-y-2">
                <Link href="/blog" className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular">
                  Case Studies
                </Link>
                <Link href="/blog" className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular">
                  Insights
                </Link>
                <Link href="/contact" className="block text-sm text-gray-600 hover:text-[#1D1D1F] host-grotesk-regular">
                  FAQs
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#1D1D1F] host-grotesk-bold">Head Office</h4>
              <p className="text-sm text-gray-600 host-grotesk-regular mb-4">
                Vibos Technologies Pvt. Ltd.
                <br />
                Udaipur, Rajasthan, India
              </p>
              <p className="text-sm text-gray-600 host-grotesk-regular">
                Serving clients in the United States, Canada, Australia, and the United Kingdom.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded-full mb-12 border border-black/10 max-w-2xl mx-auto">
            <p className="font-bold mb-4 md:mb-0 md:ml-4 text-sm text-center md:text-left text-[#1D1D1F] host-grotesk-semibold">
              Get outsourcing and operations insights delivered monthly.
            </p>
            <NewsletterSubscribeForm />
          </div>

          <div className="text-center text-xs text-gray-500 host-grotesk-regular">
            <p className="mb-2">© 2025 Vibos Technologies Pvt. Ltd. | All Rights Reserved</p>
            <p className="mb-4">Proudly serving clients across the US, Canada, Australia, and the UK</p>
            <div className="flex justify-center space-x-4">
              <Link href="/privacy-policy" className="underline hover:text-[#1D1D1F]">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms-of-service" className="underline hover:text-[#1D1D1F]">
                Terms of Service
              </Link>
              <span>|</span>
              <Link href="/data-security" className="underline hover:text-[#1D1D1F]">
                Data Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
