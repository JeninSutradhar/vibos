import Link from "next/link"

export function MissionSection() {
  return (
    <section className="relative bg-[#FCD450] pt-40 pb-32 overflow-hidden">
      {/* Custom curved top transition */}
      <div className="absolute top-0 left-0 w-full h-32">
        <svg viewBox="0 0 1440 128" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,96 C480,32 960,32 1440,96 L1440,0 L0,0 Z" fill="#FCFBF8"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center relative z-10">
        <h2 className="text-5xl lg:text-7xl font-bold mb-24 relative inline-block text-[#1D1D1F] leading-tight host-grotesk-bold">
          {/* Decorative hand-drawn arrows */}
          <svg className="absolute -top-12 -left-20 w-16 h-16 hidden lg:block" viewBox="0 0 100 100">
            <path d="M75 25 Q60 50 70 75" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 70 L70 75 L75 65" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <svg className="absolute -top-8 -right-20 w-16 h-16 hidden lg:block" viewBox="0 0 100 100">
            <path d="M25 75 Q40 50 30 25" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
            <path d="M40 30 L30 25 L25 35" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <span className="relative">
            <span className="relative inline-block">
              Your growth is
              <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 280 12">
                <path
                  d="M 0 6 Q 70 10, 140 6 T 280 6"
                  stroke="#1D1D1F"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <span className="relative inline-block">
              our priority
              <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 240 12">
                <path
                  d="M 0 6 Q 60 10, 120 6 T 240 6"
                  stroke="#1D1D1F"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h2>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center px-4 sm:px-8 lg:px-16 max-w-7xl">
        <div className="text-center lg:text-left space-y-6">
          <h3 className="text-4xl lg:text-5xl font-bold text-[#1D1D1F] host-grotesk-bold">You deserve reliable operations.</h3>
          <p className="text-lg text-[#1D1D1F] leading-relaxed host-grotesk-regular">
            We exist to remove manual workload, reduce operational costs, and improve execution quality for businesses
            that need dependable outsourcing support.
          </p>
          <p className="text-lg text-[#1D1D1F] leading-relaxed host-grotesk-regular">
            From insurance agencies and financial service teams to ecommerce and growth-stage companies, VIBOS deploys
            dedicated professionals tailored to your process.
          </p>
          <Link
            href="/services"
            className="bg-[#1D1D1F] text-white font-bold py-4 px-8 rounded-full inline-block hover:bg-gray-800 transition-colors mt-8 host-grotesk-semibold"
          >
            Explore Services
          </Link>
        </div>

        {/* Enhanced Dashboard mockup for Insurance Operations */}
        <div className="relative">
          <div className="bg-white p-8 rounded-3xl shadow-xl relative">
            {/* Timeline header */}
            <div className="text-center font-bold text-xl mb-6 text-[#1D1D1F] host-grotesk-bold">
              - CLAIMS PROCESSING -
            </div>

            {/* Process flow */}
            <div className="flex justify-between items-center text-center font-bold text-xs mb-10">
              <div className="bg-[#FCD450] py-2 px-3 rounded-full text-[#1D1D1F] shadow-md host-grotesk-semibold">
                INTAKE
              </div>
              <div className="flex-grow border-t-2 border-dashed border-black/30 mx-2"></div>
              <div className="bg-[#FCD450] py-2 px-3 rounded-full text-[#1D1D1F] shadow-md host-grotesk-semibold">
                REVIEW
              </div>
              <div className="flex-grow border-t-2 border-dashed border-black/30 mx-2"></div>
              <div className="bg-[#FCD450] py-2 px-3 rounded-full text-[#1D1D1F] shadow-md host-grotesk-semibold">
                SETTLE
              </div>
            </div>

            {/* Profile and metrics */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-4">
                <span className="text-sm font-bold text-white">VIBOS</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-green-600">Claims Processed: 1,247</span>
                </div>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="space-y-4">
              <div className="bg-[#C9F4F4] bg-opacity-60 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-[#1D1D1F] host-grotesk-semibold">Processing Accuracy</p>
                  <div className="bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full host-grotesk-semibold">
                    99.8%
                  </div>
                </div>
                <div className="w-full bg-black/10 rounded-full h-3 mb-2">
                  <div className="bg-green-500 h-3 rounded-full w-[99%]"></div>
                </div>
                <p className="text-xs text-gray-500 host-grotesk-regular">QUALITY SCORE</p>
              </div>

              <div className="bg-[#C9F4F4] bg-opacity-60 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-[#1D1D1F] host-grotesk-semibold">Average Turnaround</p>
                  <div className="bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-full host-grotesk-semibold">
                    2.4 DAYS
                  </div>
                </div>
                <p className="text-xs mb-2 text-gray-500 host-grotesk-regular">INDUSTRY STANDARD: 5-7 DAYS</p>
                <div className="w-full bg-black/10 rounded-full h-3 mb-2">
                  <div className="bg-blue-500 h-3 rounded-full w-[75%]"></div>
                </div>
                <p className="text-xs text-gray-500 host-grotesk-regular">EFFICIENCY METRIC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
