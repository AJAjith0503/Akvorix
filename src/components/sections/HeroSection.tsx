"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, CheckCircle2, Shield, Bot, RefreshCw } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import SpecularButton from "@/components/ui/SpecularButton";
import { PerspectiveGrid } from "@/components/ui/PerspectiveGrid";

const stats = [
  { value: "90s", label: "Lead response time" },
  { value: "24/7", label: "Always running" },
  { value: "0", label: "Manual clicks" },
  { value: "6×", label: "More deals closed" },
];

const highlights = [
  "No credit card required",
  "15-min discovery strategy",
  "Tailored automation roadmap",
];

export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[100dvh] lg:min-h-screen flex items-center justify-center overflow-x-hidden pt-[62px] sm:pt-[94px] md:pt-[110px] lg:pt-[126px] pb-[98px] sm:pb-[114px] lg:pb-[130px] bg-background"
      aria-label="Hero section"
    >
      {/* ── Background overlays (matching all other pages) ── */}
      <div className="absolute inset-0 radial-glow-primary opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Perspective Grid (React Bits Pro - Scrolling toward horizon) ── */}
      <PerspectiveGrid />

      <div className="container-custom relative z-10 w-full overflow-x-hidden">
        {/* ── Side-by-Side Grid (Desktop: 12-col side-by-side; Mobile: balanced compact flow) ── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* ── Text & Primary Content (Span 7 on Desktop) ── */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
            <FadeIn className="w-full">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI Automation Agency
              </div>

              {/* Main Headline (Perfect fit on Mobile S: 320px, M: 375px, L: 425px) */}
              <h1 className="font-display font-extrabold text-3xl sm:text-[34px] min-[400px]:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary tracking-tight leading-[1.08] mb-2.5 sm:mb-4 w-full">
                BUILT <span className="gradient-text">DIFFERENT</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-text-secondary text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-3 sm:mb-5 px-1 sm:px-0"
                style={{ fontFamily: "var(--font-body)" }}
              >
                We replace entire workflows with intelligent agents that work 24/7 — so
                your team can focus on what actually matters.
              </p>

              {/* ── Mobile-Only Robot Showcase (Featured with 4 compact floating service cards) ── */}
              <div className="lg:hidden w-full my-2 sm:my-4 relative flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[310px] xs:max-w-[330px] sm:max-w-[340px] md:max-w-[380px] mx-auto py-3 sm:py-5 flex justify-center items-center">
                  {/* Subtle ambient glow pedestal */}
                  <div className="absolute inset-0 bg-primary/20 blur-2xl scale-125 rounded-full pointer-events-none" />

                  {/* Floating 3D Robot anchor */}
                  <div
                    id="robot-scroll-start-mobile"
                    className="relative z-10 opacity-0 pointer-events-none flex justify-center items-center"
                  >
                    <Image
                      src="/robot1.png"
                      alt="AKVORIX AI Robot Agent"
                      width={220}
                      height={260}
                      className="w-36 xs:w-40 sm:w-44 md:w-52 h-auto object-contain drop-shadow-2xl mx-auto"
                      priority
                    />
                  </div>

                  {/* 1. Mobile Top-Left: 60s Lead Reply */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute left-0 top-1 sm:top-2 glass-strong border border-border/80 rounded-xl px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-md flex items-center gap-1.5 sm:gap-2 z-20 text-left bg-surface/95 backdrop-blur-md"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center text-yellow-600 shrink-0">
                      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-text-primary whitespace-nowrap leading-tight">60s Lead Reply</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted whitespace-nowrap leading-tight">24/7, zero downtime</div>
                    </div>
                  </motion.div>

                  {/* 2. Mobile Top-Right: Custom AI Agents */}
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute right-0 top-1 sm:top-2 glass-strong border border-border/80 rounded-xl px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-md flex items-center gap-1.5 sm:gap-2 z-20 text-left bg-surface/95 backdrop-blur-md"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-purple-400/15 border border-purple-400/25 flex items-center justify-center text-purple-600 shrink-0">
                      <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-text-primary whitespace-nowrap leading-tight">Custom AI Agents</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted whitespace-nowrap leading-tight">Trained on your data</div>
                    </div>
                  </motion.div>

                  {/* 3. Mobile Bottom-Left: 100% CRM Sync */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="absolute left-0 bottom-1 sm:bottom-2 glass-strong border border-border/80 rounded-xl px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-md flex items-center gap-1.5 sm:gap-2 z-20 text-left bg-surface/95 backdrop-blur-md"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-blue-400/15 border border-blue-400/25 flex items-center justify-center text-blue-600 shrink-0">
                      <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-text-primary whitespace-nowrap leading-tight">100% CRM Sync</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted whitespace-nowrap leading-tight">Zero manual entry</div>
                    </div>
                  </motion.div>

                  {/* 4. Mobile Bottom-Right: 60% Cost Cut */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                    className="absolute right-0 bottom-1 sm:bottom-2 glass-strong border border-border/80 rounded-xl px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-md flex items-center gap-1.5 sm:gap-2 z-20 text-left bg-surface/95 backdrop-blur-md"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-green-400/15 border border-green-400/25 flex items-center justify-center text-green-600 shrink-0">
                      <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-text-primary whitespace-nowrap leading-tight">60% Cost Cut</div>
                      <div className="text-[8px] sm:text-[9px] text-text-muted whitespace-nowrap leading-tight">Zero manual tasks</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full max-w-[280px] sm:max-w-xs md:max-w-none mx-auto lg:mx-0 mb-4 sm:mb-6">
                <SpecularButton
                  href="/contact#book-call"
                  variant="primary"
                  className="px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base rounded-2xl w-full md:w-auto font-semibold justify-center"
                >
                  Book Free Discovery Call
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </SpecularButton>
                <SpecularButton
                  href="/services"
                  variant="secondary"
                  className="px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base rounded-2xl w-full md:w-auto font-semibold justify-center"
                >
                  Explore Services
                </SpecularButton>
              </div>

              {/* Trust checkpoints */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 text-[11px] sm:text-xs md:text-sm text-text-muted">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Desktop-Only Robot Showcase (Span 5 on Desktop with 4 floating service cards) ── */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center relative">
            <FadeIn delay={0.2} className="w-full max-w-md mx-auto">
              <div className="relative flex justify-center items-center py-6">
                {/* Ambient glow pedestal */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl scale-125 rounded-full pointer-events-none" />

                {/* Floating 3D Robot anchor */}
                <div
                  id="robot-scroll-start"
                  className="relative z-10 opacity-0 pointer-events-none flex justify-center items-center"
                >
                  <Image
                    src="/robot1.png"
                    alt="AKVORIX AI Robot Agent"
                    width={320}
                    height={380}
                    className="w-72 md:w-80 lg:w-[320px] h-auto object-contain drop-shadow-2xl mx-auto"
                    priority
                  />
                </div>

                {/* 1. Desktop Top-Left: 60s Lead Reply */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute -left-6 lg:-left-10 top-6 glass border border-border/80 rounded-xl px-2.5 py-2 shadow-xl flex items-center gap-2.5 z-20 text-left bg-surface/90 backdrop-blur-md"
                >
                  <div className="w-7 h-7 rounded-lg bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center text-yellow-600 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-text-primary whitespace-nowrap leading-tight">60s Lead Reply</div>
                    <div className="text-[9.5px] text-text-muted whitespace-nowrap leading-tight">24/7, zero downtime</div>
                  </div>
                </motion.div>

                {/* 2. Desktop Top-Right: Custom AI Agents */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-6 lg:-right-10 top-6 glass border border-border/80 rounded-xl px-2.5 py-2 shadow-xl flex items-center gap-2.5 z-20 text-left bg-surface/90 backdrop-blur-md"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-400/15 border border-purple-400/25 flex items-center justify-center text-purple-600 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-text-primary whitespace-nowrap leading-tight">Custom AI Agents</div>
                    <div className="text-[9.5px] text-text-muted whitespace-nowrap leading-tight">Trained on your data</div>
                  </div>
                </motion.div>

                {/* 3. Desktop Bottom-Left: 100% CRM Sync */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute -left-6 lg:-left-10 bottom-8 glass border border-border/80 rounded-xl px-2.5 py-2 shadow-xl flex items-center gap-2.5 z-20 text-left bg-surface/90 backdrop-blur-md"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-400/15 border border-blue-400/25 flex items-center justify-center text-blue-600 shrink-0">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-text-primary whitespace-nowrap leading-tight">100% CRM Sync</div>
                    <div className="text-[9.5px] text-text-muted whitespace-nowrap leading-tight">Zero manual entry</div>
                  </div>
                </motion.div>

                {/* 4. Desktop Bottom-Right: 60% Cost Cut */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                  className="absolute -right-4 lg:-right-8 bottom-8 glass border border-border/80 rounded-xl px-2.5 py-2 shadow-xl flex items-center gap-2.5 z-20 text-left bg-surface/90 backdrop-blur-md"
                >
                  <div className="w-7 h-7 rounded-lg bg-green-400/15 border border-green-400/25 flex items-center justify-center text-green-600 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-text-primary whitespace-nowrap leading-tight">60% Cost Cut</div>
                    <div className="text-[9.5px] text-text-muted whitespace-nowrap leading-tight">Zero manual tasks</div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>

        </div>

        {/* ── Bottom Metrics Bar ── */}
        <FadeIn delay={0.3} className="mt-8 sm:mt-12 lg:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-5 sm:pt-8 border-t border-border/60">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass border border-border/80 rounded-2xl p-3 sm:p-5 text-center hover:border-primary/30 transition-colors"
              >
                <div className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-text-primary mb-0.5 sm:mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Bottom subtle border */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{ borderBottom: "1px solid rgba(107, 63, 105, 0.2)" }}
      />
    </section>
  );
}
