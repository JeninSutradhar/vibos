export function TestimonialSection() {
  return (
    <section className="relative bg-[#FCFBF8] py-24 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-8 h-8 flex items-center justify-center">
          <div className="bg-gray-800 text-white px-4 py-2 rounded font-bold text-sm">VIBOS Client</div>
        </div>

        <div className="relative">
          <span className="absolute -top-4 left-0 text-8xl font-serif text-gray-200">"</span>
          <span className="absolute -bottom-8 right-0 text-8xl font-serif text-gray-200">"</span>
          <p className="text-2xl font-medium leading-relaxed text-[#1D1D1F] px-8">
            VIBOS gave us a dedicated support team that adapted quickly to our workflow, improved turnaround, and stayed
            consistent on quality from week one.
          </p>
        </div>

        <div className="flex items-center justify-center mt-12">
          <div className="relative mr-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">CM</span>
            </div>
            <div className="absolute -right-4 bottom-0 w-10 h-10 rounded-full bg-[#FCD450] border-4 border-[#FCFBF8]"></div>
          </div>
          <div className="text-left">
            <p className="font-bold text-[#1D1D1F]">Chris M.</p>
            <p className="text-sm text-gray-600">Chief Operating Officer</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mt-12 w-3/4 mx-auto">
          <div className="h-2 rounded-full bg-[#1D1D1F] w-1/5"></div>
          <div className="h-2 rounded-full bg-[#FCD450] w-2/5"></div>
          <div className="h-2 rounded-full bg-[#FCD450] w-1/5 opacity-50"></div>
          <div className="h-2 rounded-full bg-[#FCD450] w-1/5 opacity-50"></div>
        </div>
      </div>
    </section>
  )
}
