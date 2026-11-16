"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target, ClipboardList, Settings, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import SpecularButton from "@/components/ui/SpecularButton";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    desc: "15-minute strategy session to understand your business, pain points, and automation opportunities.",
    icon: <Target className="w-10 h-10 text-primary" />,
    duration: "30 minutes",
  },
  {
    number: "02",
    title: "Automation Blueprint",
    desc: "We audit your processes and deliver a detailed automation roadmap with ROI projections.",
    icon: <ClipboardList className="w-10 h-10 text-accent" />,
    duration: "3–5 days",
  },
  {
    number: "03",
    title: "Build & Deploy",
    desc: "Our team designs, builds, tests, and deploys your automation — fully managed.",
    icon: <Settings className="w-10 h-10 text-violet-400" />,
    duration: "Under 2 weeks",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    desc: "Ongoing monitoring, optimization, and support to maximize ROI as your business grows.",
    icon: <TrendingUp className="w-10 h-10 text-green-400" />,
    duration: "Ongoing",
  },
];

// ─── SVG Path (S-curve winding between 4 card positions) ─────────────────────

const SVG_PATH =
  "M 700,150 C 520,280 300,320 300,500 C 300,680 720,710 700,890 C 680,1070 300,1100 300,1280";

// Dot anchors [cx, cy] that sit on the path at each card position
const DOT_ANCHORS: [number, number][] = [
  [700, 150],
  [300, 500],
  [700, 890],
  [300, 1280],
];

// ─── Hook: activate when robot touches this element's page-Y ─────────────────

function useRobotReached(elId: string, tolerance = 60) {
  const [isActive, setIsActive] = useState(false);
  const latestRobotYRef = useRef(0);

  useEffect(() => {
    const checkEl = () => {
      const el = document.getElementById(elId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const elPageY = rect.top + scrollY + rect.height / 2;
      setIsActive(latestRobotYRef.current >= elPageY - tolerance);
    };

    const handler = (e: Event) => {
      const robotY = (e as CustomEvent<{ y: number }>).detail.y;
      latestRobotYRef.current = robotY;
      checkEl();
    };

    window.addEventListener("robot-y", handler);
    return () => window.removeEventListener("robot-y", handler);
  }, [elId, tolerance]);

  return isActive;
}

// ─── Desktop ProcessDot ───────────────────────────────────────────────────────

interface ProcessDotProps {
  index: number;
  cx: number;
  cy: number;
}

function ProcessDot({ index, cx, cy }: ProcessDotProps) {
  const isActive = useRobotReached(`process-step-icon-${index}`, 80);

  return (
    <div
      className={`absolute w-3.5 h-3.5 rounded-full border-2 z-20 transition-colors duration-500 ${
        isActive ? "border-primary bg-primary" : "border-border bg-background"
      }`}
      style={{
        left: `${(cx / 1000) * 100}%`,
        top: `${(cy / 1350) * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

// ─── Mobile ProcessDot ────────────────────────────────────────────────────────

interface ProcessMobileDotProps {
  index: number;
  topPx: number;
}

function ProcessMobileDot({ index, topPx }: ProcessMobileDotProps) {
  const isActive = useRobotReached(`process-step-icon-${index}`, 80);

  return (
    <div
      className={`absolute w-3.5 h-3.5 rounded-full border-2 z-20 transition-colors duration-500 ${
        isActive ? "border-primary bg-primary" : "border-border bg-background"
      }`}
      style={{
        left: "18px",
        top: `${topPx}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

// ─── StepCard ────────────────────────────────────────────────────────────────

interface StepCardProps {
  step: (typeof steps)[0];
  index: number;
}

function StepCard({ step, index }: StepCardProps) {
  const isActive = useRobotReached(`process-step-icon-${index}`, 80);
  const isRight = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      className={`flex ${isRight ? "lg:justify-end" : "lg:justify-start"} justify-center`}
    >
      <div
        className={`
          w-full lg:w-[300px] p-8 lg:p-10 rounded-2xl border flex flex-col items-center text-center
          transition-all duration-700
          ${isRight ? "lg:rotate-[1.5deg]" : "lg:-rotate-[1.5deg]"}
          hover:rotate-0
          ${isActive
            ? "bg-primary border-primary shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            : "bg-card border-border hover:border-primary/30"
          }
        `}
      >
        {/* Step number badge */}
        <div
          className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-700 mb-4
            ${isActive ? "bg-white/10 text-white/70" : "bg-primary text-text-primary"}`}
        >
          {step.number}
        </div>

        <div
          id={`process-step-icon-${index}`}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-lg shadow-[#6B3F69]/25 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <div className="text-white [&>svg]:w-8 [&>svg]:h-8 [&>svg]:text-white">
            {step.icon}
          </div>
        </div>

        <div
          className={`font-display font-bold text-xl mb-3 transition-colors duration-700
            ${isActive ? "text-white" : "text-text-primary"}`}
        >
          {step.title}
        </div>

        <p
          className={`text-sm leading-relaxed mb-6 transition-colors duration-700
            ${isActive ? "text-white/80" : "text-text-secondary"}`}
        >
          {step.desc}
        </p>

        <div
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-700
            ${isActive ? "bg-white/10 text-white border border-white/20" : "bg-primary/10 border border-primary/20 text-primary"}`}
        >
          {step.duration}
        </div>

        {/* Active indicator bar */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-t-full transition-all duration-700 origin-bottom
            ${isActive ? "bg-white/30 w-1/3 opacity-100" : "bg-border w-0 opacity-0"}`}
        />
      </div>
    </motion.div>
  );
}

export function ProcessPreview() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [mobileDotTops, setMobileDotTops] = useState<number[]>([]);

  const updateMobileDots = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth >= 821) return;
    if (!timelineRef.current) return;

    const tlRect = timelineRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const tlTop = tlRect.top + scrollY;

    const tops: number[] = [];
    for (let i = 0; i < steps.length; i++) {
      const el = document.getElementById(`process-step-icon-${i}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        const iconCenterY = rect.top + scrollY + rect.height / 2;
        tops.push(iconCenterY - tlTop);
      }
    }

    if (tops.length === steps.length) {
      setMobileDotTops(tops);
    }
  }, []);

  useEffect(() => {
    updateMobileDots();
    const timer1 = setTimeout(updateMobileDots, 100);
    const timer2 = setTimeout(updateMobileDots, 600);
    window.addEventListener("resize", updateMobileDots);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", updateMobileDots);
    };
  }, [updateMobileDots]);

  return (
    <section
      className="section relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="container-custom relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.28, 0.84, 0.42, 1],
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-text-secondary text-sm font-medium mb-6"
          >
            How We Work
          </motion.div>

          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6"
          >
            From idea to automation
            <br />
            <span className="gradient-text">in 4 simple steps</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            We handle everything. You just approve the blueprint and watch the results roll in.
          </motion.p>
        </div>

        {/* ── Steps + SVG Line ── */}
        <div className="relative" ref={timelineRef} id="process-timeline">
          {/* Dot anchors — desktop */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            {DOT_ANCHORS.map(([cx, cy], i) => (
              <ProcessDot key={i} index={i} cx={cx} cy={cy} />
            ))}
          </div>

          {/* Dot anchors — mobile, positioned at each card's icon center */}
          <div
            className="lg:hidden absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            {mobileDotTops.length === steps.length
              ? mobileDotTops.map((topPx, i) => (
                  <ProcessMobileDot key={i} index={i} topPx={topPx} />
                ))
              : DOT_ANCHORS.map(([cx, cy], i) => (
                  <ProcessDot key={i} index={i} cx={cx} cy={cy} />
                ))}
          </div>

          {/* Cards */}
          <div className="space-y-14 lg:space-y-24 py-4 pl-12 lg:pl-0">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        <FadeIn delay={0.6} className="mt-16 text-center relative z-20">
          <SpecularButton href="/process" variant="secondary" className="px-8 py-3.5 inline-flex items-center gap-2">
            See the Full Process
            <ArrowRight className="w-4 h-4" />
          </SpecularButton>
        </FadeIn>
      </div>
    </section>
  );
}
