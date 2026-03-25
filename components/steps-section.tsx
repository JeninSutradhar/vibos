"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import Link from "next/link"

export function StepsSection() {
  const [openStep, setOpenStep] = useState(0)

  const steps = [
    {
      title: "Initial consultation and business discovery.",
      content:
        "We understand your services, workload, target outcomes, and the support model you need from VIBOS.",
    },
    {
      title: "Process analysis and scope definition.",
      content:
        "We review your workflows and tools, then define clear roles, responsibilities, and deliverables for execution.",
    },
    {
      title: "Dedicated team assignment and setup.",
      content:
        "You get a dedicated specialist or team configured to your process with secure system and communication setup.",
    },
    {
      title: "Training and workflow alignment.",
      content:
        "We align with your SOPs, QA standards, SLAs, and escalation paths for predictable outcomes.",
    },
    {
      title: "Go live with ongoing optimization.",
      content:
        "Operations begin with regular check-ins, reporting, and continuous improvements to keep delivery on target.",
    },
  ]

  return (
    <section className="relative bg-[#FFF9E6] py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Top curved transition from integration section */}
      <div className="absolute top-0 left-0 w-full h-24">
        <svg viewBox="0 0 1440 96" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,64 C360,32 720,32 1080,64 C1200,72 1320,72 1440,64 L1440,0 L0,0 Z" fill="white"></path>
        </svg>
      </div>

      <div className="container mx-auto relative z-10 pt-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                stroke="#1D1D1F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1D1D1F] host-grotesk-bold">
              Launch in 5 proven steps
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed host-grotesk-regular">
            Our onboarding model is designed for clarity, speed, and accountability so your remote support team becomes
            productive quickly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Left: Steps Accordion */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  openStep === index ? "bg-[#FCD450]/40 shadow-md" : "bg-white shadow-sm hover:shadow-md"
                }`}
                onClick={() => setOpenStep(openStep === index ? -1 : index)}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[#1D1D1F] pr-4 host-grotesk-semibold">
                    {index + 1}. {step.title}
                  </span>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#1D1D1F] text-white rounded-full flex items-center justify-center">
                      {openStep === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
                {openStep === index && (
                  <p className="mt-4 text-gray-700 pr-8 leading-relaxed host-grotesk-regular">{step.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right: Steps Graphic */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-sm">
              <img
                src="/images/steps-graphic.png"
                alt="Process flow graphic showing the 5-step implementation methodology"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            {/* Decorative arrows around button */}
            <svg className="absolute -left-12 -top-4 w-8 h-8" viewBox="0 0 100 100">
              <path d="M20 50 Q40 30 60 50" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 40 L60 50 L50 60" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <svg className="absolute -right-12 -bottom-4 w-8 h-8" viewBox="0 0 100 100">
              <path d="M80 50 Q60 70 40 50" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 60 L40 50 L50 40" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <Link
              href="/book-consultation"
              className="bg-[#1D1D1F] text-white font-bold py-4 px-8 rounded-full inline-block hover:bg-gray-800 transition-colors host-grotesk-semibold"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave transition to SurgeProtect */}
      <div className="absolute bottom-0 left-0 w-full h-32">
        <svg viewBox="0 0 1440 128" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,64 C360,96 720,96 1080,64 C1200,56 1320,56 1440,64 L1440,128 L0,128 Z"
            fill="url(#surgeGradient)"
          ></path>
          <defs>
            <linearGradient id="surgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}
