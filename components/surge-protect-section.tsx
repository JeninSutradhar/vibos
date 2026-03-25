import { Shield } from "lucide-react"
import Link from "next/link"

export function SurgeProtectSection() {
  const supportModels = [
    "Dedicated staff model",
    "Monthly outsourcing model",
    "Per-task or project pricing",
    "Virtual assistant model",
    "Flexible scaling for seasonal workload",
    "Role-specific specialist allocation",
    "Regular reporting and progress tracking",
    "Secure remote collaboration setup",
  ]

  return (
    <section className="relative py-32 px-4 sm:px-8 lg:px-16 text-white overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-green-400 z-0"></div>

      {/* Top curved transition from steps section */}
      <div className="absolute top-0 left-0 w-full h-32 z-10">
        <svg viewBox="0 0 1440 128" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,64 C360,32 720,32 1080,64 C1200,72 1320,72 1440,64 L1440,0 L0,0 Z" fill="#FDEAE6"></path>
        </svg>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-20 max-w-6xl pt-16">
        {/* Left: Content */}
        <div className="text-[#1D1D1F] space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="border-2 border-[#1D1D1F] p-4 rounded-xl bg-white/20 backdrop-blur-sm">
              <Shield className="w-10 h-10" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold host-grotesk-bold">FlexibleDelivery</h2>
          </div>

          <p className="text-2xl font-semibold host-grotesk-semibold">Engagement models built around your operations</p>

          <p className="text-lg leading-relaxed host-grotesk-regular max-w-md">
            Whether you need one dedicated assistant or full back-office support, VIBOS provides flexible team models
            that fit your timelines, budget, and workload.
          </p>

          <Link
            href="/contact"
            className="bg-[#1D1D1F] text-white font-bold py-4 px-8 rounded-full inline-block hover:bg-gray-800 transition-colors host-grotesk-semibold"
          >
            Request a Custom Plan
          </Link>
        </div>

        {/* Right: Feature List */}
        <div className="bg-white/30 backdrop-blur-sm text-[#1D1D1F] p-8 rounded-2xl">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-6">
            {supportModels.map((type, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-[#1D1D1F] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="host-grotesk-medium">{type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-10">
        <svg viewBox="0 0 1440 96" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 720,64 1080,32 C1200,24 1320,24 1440,32 L1440,96 L0,96 Z" fill="#FCFBF8"></path>
        </svg>
      </div>
    </section>
  )
}
