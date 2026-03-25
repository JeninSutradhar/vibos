import Link from "next/link"

export function IntegrationSection() {
  const technologies = [
    
  ]

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Top Wave Layers - Exact positioning */}
      <div className="absolute top-0 left-0 w-full h-32">
        {/* Green wave (top layer) */}
        <svg viewBox="0 0 1440 128" className="absolute w-full h-full" preserveAspectRatio="none">
          <path d="M0,64 C360,32 720,32 1080,64 C1200,72 1320,72 1440,64 L1440,0 L0,0 Z" fill="#E3F5E1"></path>
        </svg>

        {/* Light blue wave (bottom layer) */}
        <svg viewBox="0 0 1440 128" className="absolute w-full h-full" preserveAspectRatio="none">
          <path d="M0,96 C360,64 720,64 1080,96 C1200,104 1320,104 1440,96 L1440,0 L0,0 Z" fill="#C9F4F4"></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-40 pb-24 px-4 sm:px-8 lg:px-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold max-w-4xl mb-12 leading-tight mx-auto text-[#1D1D1F] host-grotesk-bold">
            We work inside your existing tools and workflows.
          </h2>

          <Link
            href="/contact"
            className="bg-[#1D1D1F] text-white font-bold py-4 px-8 rounded-full inline-block hover:bg-gray-800 transition-colors mb-16 host-grotesk-semibold"
          >
            Discuss Your Tech Stack
          </Link>


          {/* Additional Integration Info */}
          <div className="mt-16 max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed host-grotesk-regular">
              Our team adapts to your AMS, CRM, accounting, communication, and document systems to ensure a smooth
              handoff with minimal operational disruption.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Pink Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full h-24">
        <svg viewBox="0 0 1440 96" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 720,64 1080,32 C1200,24 1320,24 1440,32 L1440,96 L0,96 Z" fill="#FDEAE6"></path>
        </svg>
      </div>
    </section>
  )
}
