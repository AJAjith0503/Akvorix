"use client";

import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import SpecularButton from "@/components/ui/SpecularButton";
import { FadeIn } from "@/components/animations/FadeIn";

const benefits = [
  "Free, no-obligation 15-minute call",
  "Honest assessment — no sales pressure",
  "Custom automation roadmap for your business",
  "ROI projections before any commitment",
];

export function CTASection() {
  return (
    <section className="section" aria-labelledby="cta-heading">
      <div className="container-custom">
        <FadeIn>
          <div className="relative rounded-4xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-accent/10" />
            <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

            <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book Your Free Discovery Call
              </div>

              <h2
                id="cta-heading"
                className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-primary mb-4 sm:mb-6 leading-tight"
              >
                Your business deserves to run
                <br />
                <span className="gradient-text">without you doing everything.</span>
              </h2>

              <p className="text-text-secondary text-base md:text-lg xl:text-xl max-w-2xl mx-auto mb-8 sm:mb-10">
                In one call, we'll identify your top automation opportunities and tell you exactly how much time and money you'll save. No fluff, no pressure.
              </p>

              {/* Benefits */}
              <div className="flex flex-col md:flex-row md:flex-wrap items-start justify-center gap-4 md:gap-8 mb-10 mx-auto w-fit text-left">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start md:items-center gap-2 text-text-secondary text-sm">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 className="w-3.5 h-3.5 text-white" aria-hidden="true" /></div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <SpecularButton
                  href="/contact#book-call"
                  variant="primary"
                  className="px-4 sm:px-10 py-3 sm:py-4 text-[15px] sm:text-lg rounded-2xl w-full sm:w-auto whitespace-nowrap"
                >
                  Book Your Free Call
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </SpecularButton>
                <SpecularButton
                  href="/pricing"
                  variant="secondary"
                  className="px-10 py-4 text-lg rounded-2xl w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  View Pricing
                </SpecularButton>
              </div>

              <p className="text-text-muted text-sm mt-6">
                100% free · No credit card · 30 minutes · Cancel anytime
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
