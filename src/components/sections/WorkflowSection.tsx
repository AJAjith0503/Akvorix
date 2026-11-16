"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { RobotHoverIndicator } from "@/components/ui/RobotHoverIndicator";

const metrics = [
  { value: "90s", label: "Lead response time" },
  { value: "0", label: "Manual clicks" },
  { value: "24/7", label: "Always running" },
  { value: "6×", label: "More deals closed" },
];

export function WorkflowSection() {
  return (
    <section
      id="workflow-section"
      className="section relative overflow-hidden"
      aria-labelledby="workflow-heading"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-surface/30" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />

      <div className="container-custom relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.28, 0.84, 0.42, 1],
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium mb-6"
          >
            ⚙️ How We Work — Live Automation Demo
          </motion.div>

          <motion.h2
            id="workflow-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6"
          >
            Watch AI work while
            <span className="gradient-text"> you sleep</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
          >
            This is a real automation we built. A lead comes in at midnight — and
            by the time your team wakes up, the meeting is already booked.
          </motion.p>
        </div>

        {/* ── Video Showcase (replacing the cards) ── */}
        <FadeIn delay={0.2}>
          <div className="relative max-w-5xl mx-auto" id="workflow-timeline">
            {/* Ambient Purple Background Glow */}
            <div
              className="absolute -inset-4 bg-gradient-to-r from-primary/25 via-accent/20 to-primary/25 rounded-3xl blur-3xl opacity-60 pointer-events-none"
              aria-hidden="true"
            />

            {/* Glass Container Frame */}
            <div className="relative glass border border-primary/20 rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 shadow-2xl shadow-[#6B3F69]/20 overflow-hidden">
              {/* App / Player Titlebar */}
              <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 mb-2 rounded-xl bg-surface/60 border border-border/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-text-muted font-mono text-[11px] ml-2 hidden sm:inline">
                    live-automation-demo.mp4
                  </span>
                </div>
                <div className="flex items-center gap-2 text-text-muted text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span className="font-medium text-text-primary">Live Automation Demo</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative rounded-xl overflow-hidden bg-black/95 aspect-video flex items-center justify-center shadow-inner">
                <video
                  src="/video/brandvideo.mp4"
                  playsInline
                  autoPlay
                  muted
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Metrics Bar ── */}
        <FadeIn delay={0.2} className="mt-14 sm:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="glass border border-border rounded-2xl p-5 text-center"
              >
                <div className="font-display font-bold text-3xl text-text-primary mb-1">
                  {m.value}
                </div>
                <div className="text-text-muted text-sm">{m.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Result Banner + CTA ── */}
        <FadeIn delay={0.3}>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="w-5 h-5 text-primary shrink-0"
                aria-hidden="true"
              />
              <p className="text-text-primary text-sm md:text-base">
                <strong>The result:</strong> Your prospect goes from &ldquo;just
                browsing&rdquo; to &ldquo;meeting scheduled&rdquo; — completely
                automatically, even at 3 AM.
              </p>
            </div>
            <a
              href="/contact#book-call"
              className="relative group flex items-center gap-2 btn-primary text-sm px-5 py-2.5 shrink-0"
            >
              <RobotHoverIndicator align="center" />
              Get This Built For Me <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
