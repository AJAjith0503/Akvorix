"use client";

import Link from "next/link";
import {
  ArrowRight, Building2, Stethoscope, Pill,
  Layers, HardHat, Car, UtensilsCrossed, Globe, Check
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SpecularButton from "@/components/ui/SpecularButton";
import { services } from "@/lib/services";

const iconMap: Record<string, React.ElementType> = {
  Building2, Stethoscope, Pill,
  Layers, HardHat, Car, UtensilsCrossed, Globe,
};

export function ServicesSection() {
  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            What We Build
          </div>
          <h2
            id="services-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4 sm:mb-6"
          >
            Every automation your business needs,
            <br />
            <span className="gradient-text">built and deployed for you</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            From simple task automation to complex AI agents — we handle the entire stack so you can focus on growth.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-8 lg:gap-y-[300px] justify-items-center pb-8 lg:pb-[460px]"
          staggerDelay={0.05}
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            const isRightColumn = i % 2 === 1;
            return (
              <StaggerItem
                key={service.slug}
                className="w-full flex justify-center"
              >
                <div
                  className={`w-full flex justify-center ${
                    isRightColumn ? "lg:translate-y-[calc(50%+150px)]" : ""
                  }`}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex flex-col h-full w-full max-w-lg lg:max-w-[75%] glass border border-border rounded-2xl p-5 sm:p-6 card-hover group"
                    aria-label={`Learn about ${service.title}`}
                  >
                  <div
                    className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25"
                  >
                    <Icon className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-xs md:text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* 5 Key Solution Points */}
                  <ul className="space-y-1.5 my-4 text-xs sm:text-sm text-text-secondary">
                    {service.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="pt-3 border-t border-border/60 mt-auto">
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 4 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium text-text-muted bg-surface/80 border border-border">
                          +{service.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
                    Learn more <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </Link>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-10">
          <SpecularButton href="/services" variant="secondary">
            Explore All Services
          </SpecularButton>
        </FadeIn>
      </div>
    </section>
  );
}
