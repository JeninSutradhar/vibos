export function ReviewsSection() {
  const reviews = [
    {
      title: "Operational Relief for Insurance Teams",
      content:
        "Dedicated support for quoting, renewals, documentation, and AMS updates helps agencies focus on growth and client retention.",
      companySize: "Mid-size",
      role: "Insurance Agencies and Brokers",
      industry: "P&C Insurance Operations",
    },
    {
      title: "Reliable Back-Office Coverage for Growth Teams",
      content:
        "Businesses use VIBOS to offload repetitive admin tasks, improve team productivity, and keep daily operations moving without bottlenecks.",
      companySize: "SMB to Mid-size",
      role: "Founders and Operations Leaders",
      industry: "BPO and Virtual Operations",
    },
    {
      title: "Scalable Support for Financial Workflows",
      content:
        "From MCA back-office to bookkeeping support, VIBOS enables high-volume execution with process discipline and clear communication.",
      companySize: "Mid-size",
      role: "Finance and Lending Operations",
      industry: "MCA and Accounting Support",
    },
  ]

  return (
    <section className="bg-[#FCFBF8] py-24 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto text-center max-w-7xl">
        {/* Header with Award Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
          <div className="w-20 h-24 bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg flex items-center justify-center shadow-md">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-1"></div>
              <div className="text-xs font-bold text-blue-800">ISO</div>
              <div className="text-xs text-blue-600">27001</div>
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold max-w-lg text-[#1D1D1F] host-grotesk-bold leading-tight">
            Trusted by insurers, validated by results
          </h2>

          <div className="w-20 h-24 bg-gradient-to-b from-green-200 to-green-300 rounded-lg flex items-center justify-center shadow-md">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-1"></div>
              <div className="text-xs font-bold text-green-800">SOX</div>
              <div className="text-xs text-green-600">COMPLIANT</div>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-12">
          {reviews.map((review, index) => (
            <div key={index} className="bg-[#E9F8F8] p-8 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <div className="flex text-[#FCD450] text-xl">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span className="text-6xl font-serif text-black/20 leading-none">"</span>
              </div>

              <h3 className="font-bold text-lg mb-4 text-[#1D1D1F] host-grotesk-bold">{review.title}</h3>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed host-grotesk-regular">{review.content}</p>

              <div className="border-t border-black/20 pt-4">
                <p className="text-xs text-gray-500 host-grotesk-regular">Company Size: {review.companySize}</p>
                <p className="font-bold text-[#1D1D1F] host-grotesk-semibold">{review.role}</p>
                <p className="text-xs text-gray-500 host-grotesk-regular">Industry: {review.industry}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/services"
            className="bg-[#1D1D1F] text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors host-grotesk-semibold"
          >
            Explore Services
          </a>
          <a
            href="/book-consultation"
            className="bg-[#1D1D1F] text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors host-grotesk-semibold"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
