import { FileText, Database, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

function GrowthSection() {
  const services = [
    {
      title: "Insurance Back Office",
      description:
        "Prospect entry, AMS updates, quoting support, policy servicing, binding assistance, and documentation management for P&C teams.",
      href: "/services/insurance-back-office-support",
      borderColor: "border-blue-100",
      iconColor: "bg-blue-500",
      icon: FileText,
      shadowColor: "shadow-blue-100/50",
    },
    {
      title: "Business Process Outsourcing",
      description:
        "Dedicated virtual operations support for calendar/email workflows, website tasks, ecommerce management, and administrative execution.",
      href: "/services/business-process-outsourcing",
      borderColor: "border-green-100",
      iconColor: "bg-green-500",
      icon: Shield,
      shadowColor: "shadow-green-100/50",
    },
    {
      title: "MCA Back-Office Support",
      description:
        "Support for MCA providers across lead flow, statement analysis, underwriting support, document handling, and communication operations.",
      href: "/services/mca-back-office-support",
      borderColor: "border-purple-100",
      iconColor: "bg-purple-500",
      icon: Database,
      shadowColor: "shadow-purple-100/50",
    },
    {
      title: "Accounting and Bookkeeping",
      description:
        "AP/AR support, reconciliations, expense tracking, reporting, and finance process support to keep records accurate and up to date.",
      href: "/services/accounting-and-bookkeeping",
      borderColor: "border-orange-100",
      iconColor: "bg-orange-500",
      icon: TrendingUp,
      shadowColor: "shadow-orange-100/50",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 bg-[#FCFBF8]">
      {/* Growth Section Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#1D1D1F] leading-tight tracking-tight host-grotesk-bold">
          + More Efficiency, Less Complexity
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed host-grotesk-regular">
          Focus on growing your insurance business while we handle the operational complexities that slow you down.
        </p>
      </div>

      {/* Service Cards */}
      <div className="container mx-auto relative max-w-7xl">
        {/* Subtle connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-20"
          viewBox="0 0 1000 400"
        >
          <path
            d="M250 80 Q500 40 750 80"
            stroke="#1D1D1F"
            strokeWidth="1"
            strokeDasharray="4,4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M250 320 Q500 360 750 320"
            stroke="#1D1D1F"
            strokeWidth="1"
            strokeDasharray="4,4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M250 120 L250 280"
            stroke="#1D1D1F"
            strokeWidth="1"
            strokeDasharray="4,4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M750 120 L750 280"
            stroke="#1D1D1F"
            strokeWidth="1"
            strokeDasharray="4,4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl border ${service.borderColor} text-left shadow-lg ${service.shadowColor} hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Clean icon design */}
                <div className="mb-8">
                  <div
                    className={`w-14 h-14 ${service.iconColor} rounded-xl flex items-center justify-center text-white shadow-sm`}
                  >
                    <IconComponent size={24} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-[#1D1D1F] leading-tight host-grotesk-bold">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm host-grotesk-regular">{service.description}</p>
                </div>

                {/* Professional button */}
                <div className="mt-8">
                  <Link
                    href={service.href}
                    className="block w-full bg-[#1D1D1F] text-center text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200 text-sm host-grotesk-semibold"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Professional stats section */}
      <div className="mt-20 pt-16 border-t border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#1D1D1F] mb-2 host-grotesk-bold">99.8%</div>
            <div className="text-sm text-gray-600 host-grotesk-regular">Service Accuracy Focus</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1D1D1F] mb-2 host-grotesk-bold">24/7</div>
            <div className="text-sm text-gray-600 host-grotesk-regular">Operational Availability</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1D1D1F] mb-2 host-grotesk-bold">50+</div>
            <div className="text-sm text-gray-600 host-grotesk-regular">Global Client Delivery</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1D1D1F] mb-2 host-grotesk-bold">1500+</div>
            <div className="text-sm text-gray-600 host-grotesk-regular">Daily Task Volume</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { GrowthSection }
