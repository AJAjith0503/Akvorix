import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, Building2, UtensilsCrossed, Briefcase, Factory } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { industries } from "@/lib/industries";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Industries We Serve — AKVORIX AI Automation",
  description: "AKVORIX provides specialized AI automation for healthcare, real estate, restaurants, professional services, and manufacturing. Industry-specific solutions built for your unique workflows.",
};

const iconMap: Record<string, React.ElementType> = {
  Activity, Building2, UtensilsCrossed, Briefcase, Factory,
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-14 md:pb-24" aria-labelledby="industries-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h1 id="industries-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary mb-8 leading-tight">
              AI automation built for
              <br />
              <span className="gradient-text">your industry</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
              Generic automation doesn't work. We've built specialized solutions for 5 industries — understanding the unique workflows, compliance requirements, and outcomes that matter to you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" aria-label="Industry cards">
        <div className="container-custom">
          <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.1}>
            {industries.map((industry) => {
              const Icon = iconMap[industry.icon] || Building2;
              return (
                <StaggerItem key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="block glass border border-border rounded-3xl p-6 md:p-8 card-hover group"
                    aria-label={`${industry.title}: ${industry.subtitle}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25 transition-all duration-300 group-hover:scale-105"
                      >
                        <Icon className="w-7 h-7 text-white transition-colors duration-300" aria-hidden="true" />
                      </div>

                      <div className="flex-1">
                        <h2 className="font-display font-bold text-2xl text-text-primary mb-1 group-hover:text-primary transition-colors">
                          {industry.title}
                        </h2>
                        <p className="text-primary text-sm font-medium mb-2">{industry.subtitle}</p>
                        <p className="text-text-secondary text-sm">{industry.description}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap md:flex-nowrap gap-3 shrink-0">
                        {industry.stats.slice(0, 2).map((stat) => (
                          <div key={stat.label} className="bg-primary/5 border border-border rounded-xl p-3 text-center min-w-[80px]">
                            <div className="font-display font-bold text-lg text-text-primary">{stat.value}</div>
                            <div className="text-text-muted text-xs mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-primary font-medium text-sm shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0">
                        Explore <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
