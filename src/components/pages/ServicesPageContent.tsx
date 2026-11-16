"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Stethoscope,
  Pill,
  Layers,
  HardHat,
  Car,
  UtensilsCrossed,
  Globe,
  Check,
  Sparkles,
  Clock,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/lib/services";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Stethoscope,
  Pill,
  Layers,
  HardHat,
  Car,
  UtensilsCrossed,
  Globe,
};

const CATEGORIES = [
  { id: "all", label: "All Services", count: 8 },
  { id: "ai-agents", label: "AI Agents for Business", count: 3, slugs: ["real-estate-ai-agent", "dental-clinic-receptionist", "pharmacy-medical-store-assistant"] },
  { id: "sales-automation", label: "Customer & Sales", count: 2, slugs: ["interior-design-lead-handler", "construction-quotation-scheduler"] },
  { id: "industry-bots", label: "Industry-Specific Bots", count: 2, slugs: ["car-dealership-service-reminder-bot", "restaurant-reservation-assistant"] },
  { id: "technology", label: "Technology", count: 1, slugs: ["website-development"] },
];

export function ServicesPageContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") return true;
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    return cat?.slugs?.includes(service.slug);
  });

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-14 md:pb-20"
        aria-labelledby="services-page-heading"
      >
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Full-Stack AI Automation Solutions</span>
            </div>

            <h1
              id="services-page-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary mb-6 leading-tight"
            >
              Every automation your business needs,
              <br />
              <span className="gradient-text">built and run for you</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              We don&apos;t just sell software. We deliver measurable business outcomes &mdash; hours saved, operating costs reduced by up to 60%, and revenue captured 24/7.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact#book-call"
                className="btn-primary px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base whitespace-nowrap w-full sm:w-auto text-center justify-center shadow-lg shadow-primary/25"
              >
                Book Free Discovery Call <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 ml-1.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="sticky top-20 z-30 py-3 bg-background/80 backdrop-blur-lg border-y border-border/50">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-text-muted hover:text-text-primary hover:bg-surface/60 border border-border/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6B3F69] via-[#8B5F89] to-[#6B3F69] shadow-md shadow-[#6B3F69]/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat.label}
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-surface text-text-muted border border-border"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parallax Staggered Services Grid Section */}
      <section className="section relative overflow-hidden" aria-label="AKVORIX Automation Services">
        {/* Floating Companion Robot in the central spine on desktop (matching homepage parallax) */}
        <div className="hidden lg:flex sticky top-1/2 -translate-y-1/2 justify-center pointer-events-none z-20 h-0">
          <div className="relative -translate-y-1/2">
            <div
              className="absolute inset-0 rounded-full blur-xl scale-125 bg-primary/30 pointer-events-none"
              aria-hidden="true"
            />
            <Image
              src="/robot1.png"
              alt="AKVORIX AI Agent"
              width={76}
              height={88}
              className="relative z-10 w-16 h-auto drop-shadow-xl animate-float"
              priority
            />
          </div>
        </div>

        <div className="container-custom">
          <AnimatePresence mode="wait">
            <StaggerContainer
              key={activeCategory}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-8 lg:gap-y-[300px] justify-items-center pb-8 lg:pb-[460px]"
              staggerDelay={0.06}
            >
              {filteredServices.map((service, i) => {
                const Icon = iconMap[service.icon] || Globe;
                const isRightColumn = i % 2 === 1;

                return (
                  <StaggerItem key={service.slug} className="w-full flex justify-center">
                    <div
                      className={`w-full flex justify-center ${
                        isRightColumn ? "lg:translate-y-[calc(50%+150px)]" : ""
                      }`}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex flex-col h-full w-full max-w-lg lg:max-w-[75%] glass border border-border rounded-2xl p-5 sm:p-6 card-hover group relative overflow-hidden"
                        aria-label={`Learn about ${service.title}`}
                      >
                        {/* Top Accent Light Glow */}
                        <div
                          className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none"
                          aria-hidden="true"
                        />

                        {/* Top Header: Icon + Metric Pills */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25">
                            <Icon
                              className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                              aria-hidden="true"
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-end gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[11px] font-medium">
                              <Clock className="w-3 h-3" />
                              {service.timeline}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-display font-semibold text-text-primary text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-text-muted text-xs md:text-sm leading-relaxed mb-4">
                          {service.shortDesc}
                        </p>

                        {/* ROI Highlight Pill */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/80 border border-border text-xs text-text-secondary mb-4">
                          <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="font-medium text-text-primary truncate">{service.roi}</span>
                        </div>

                        {/* 5 Key Solution Capabilities */}
                        <ul className="space-y-1.5 my-3 text-xs sm:text-sm text-text-secondary">
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

                        {/* Link Footer */}
                        <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
                          <span>Explore Service</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                      </Link>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </AnimatePresence>
        </div>
      </section>

      {/* Global CTA Section */}
      <CTASection />
    </>
  );
}
