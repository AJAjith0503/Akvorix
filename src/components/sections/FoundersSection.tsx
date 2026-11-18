'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Github, Mail, ExternalLink, Check, Code2, Briefcase, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

interface TimelineItem {
  period: string;
  role: string;
  org?: string;
  description: string;
}

interface ProjectLink {
  label: string;
  url: string;
  tag?: string;
}

interface FounderProfile {
  name: string;
  role: string;
  subtitle: string;
  image?: string;
  initials: string;
  linkedin: string;
  github?: string;
  email?: string;
  category: string;
  headline: string;
  bio: string[];
  projects?: ProjectLink[];
  whatTheyBuildTitle: string;
  whatTheyBuild: string[];
  atAkvorixTitle: string;
  atAkvorix: string[];
  timeline: TimelineItem[];
}

const FOUNDERS: FounderProfile[] = [
  {
    name: 'Ajith K V',
    role: 'Founder',
    subtitle: 'Founder · Leads AKVORIX and builds its products',
    image: '/images/founders/ajith-k-v.jpg',
    initials: 'AK',
    linkedin: 'https://www.linkedin.com/in/ajith-k-v-aj1484/',
    github: 'https://github.com/AJAjith0503',
    email: 'mailto:contact@akvorix.com',
    category: 'Full-stack and AI engineering',
    headline: 'Ajith K V is the founder who leads AKVORIX and builds its products, from the database and APIs to the interface and AI features.',
    bio: [
      'Ajith started with backend architecture and systems programming, transitioning into high-performance full-stack and AI engineering. He specializes in designing autonomous multi-agent pipelines, resilient n8n workflow systems, custom LLM integrations, and reactive web applications built for speed and conversion.',
      'Ajith engineered the AKVORIX platform and architected our client solutions across healthcare, e-commerce, real estate, and consumer tech. Where we link to our web and AI products below, you can inspect the live builds and source code directly.',
    ],
    projects: [
      { label: 'fitusion.app', url: 'https://gym-seven-chi-61.vercel.app/', tag: 'React · Biometrics' },
      { label: 'elitemart.store', url: 'https://kaleidoscopic-mooncake-c210e2.netlify.app/', tag: 'E-commerce' },
      { label: 'srivishnupark.com', url: 'https://restaurant-seven-jade.vercel.app/', tag: 'Full-stack' },
      { label: 'furnexa.store', url: 'https://ecommercefurniture-steel.vercel.app/', tag: 'Luxury SPA' },
      { label: 'akvorix.com', url: 'https://github.com/AJAjith0503/Akvorix', tag: 'Next.js 14' },
    ],
    whatTheyBuildTitle: 'What they build',
    whatTheyBuild: [
      'Full-stack architecture and delivery',
      'LLM integration, AI features and automation workflows',
      'API and database schema design',
      'Web and mobile applications',
    ],
    atAkvorixTitle: 'At AKVORIX',
    atAkvorix: [
      'Leading AKVORIX and building its products',
      'Interfaces and full-stack delivery',
      'AI features and automation',
      'Scoping projects with clients, and support after launch',
    ],
    timeline: [
      {
        period: '2023 – 2024',
        role: 'Backend & Automation Developer',
        org: 'Client projects',
        description: 'Engineered custom automation workflows, API microservices, database schemas, and data pipelines for growing businesses.',
      },
      {
        period: '2024 – Present',
        role: 'Full-Stack & AI Systems Engineer',
        org: 'Independent & product builds',
        description: 'Engineered reactive web applications, LLM orchestration frameworks, and autonomous multi-agent operational tools.',
      },
      {
        period: '2025 – Present',
        role: 'Founder & Chief Architect',
        org: 'AKVORIX',
        description: 'Leading product development, technology strategy, client system engineering, and end-to-end automation delivery.',
      },
    ],
  },
];

export function FoundersSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-x-clip border-t border-border/40" id="founders">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#6B3F69]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#A97EA7]/10 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <FadeIn className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Leadership
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-5">
            Meet the founder
          </h2>
          <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed">
            What he does, what he works with and what he has built. Where we link to work, you can read the code yourself.
          </p>
        </FadeIn>

        {/* Founders Profiles */}
        <div className="space-y-20 md:space-y-32">
          {FOUNDERS.map((founder, index) => (
            <div
              key={founder.name}
              className={`grid lg:grid-cols-12 gap-10 lg:gap-16 relative ${
                index < FOUNDERS.length - 1 ? 'pb-20 md:pb-28 border-b border-border/50' : ''
              }`}
            >
              {/* Left Column: Sticky Profile Card */}
              <div className="lg:col-span-4 self-stretch relative">
                <div className="lg:sticky lg:top-28 z-20">
                  <FadeIn direction="none" delay={0.1}>
                  {/* Squircle Avatar */}
                  <div className="relative group w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-[28px] p-[2.5px] bg-gradient-to-tr from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] shadow-xl shadow-[#6B3F69]/20">
                    <div className="w-full h-full rounded-[25.5px] bg-surface relative overflow-hidden flex flex-col items-center justify-center">
                      {founder.image ? (
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          fill
                          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                          priority={index === 0}
                          className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-surface via-surface/95 to-surface/90">
                          {/* Ambient glow in avatar */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#6B3F69]/20 to-transparent pointer-events-none" />
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg shadow-[#6B3F69]/30 mb-3 group-hover:scale-105 transition-transform">
                            {founder.initials}
                          </div>
                          <span className="text-text-muted text-xs tracking-wider uppercase font-medium">
                            {founder.role}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name and Subtitle */}
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mt-6 mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5 max-w-sm">
                    {founder.subtitle}
                  </p>

                  {/* Social Pill Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface/80 hover:bg-surface hover:border-[#6B3F69]/60 text-text-secondary hover:text-text-primary text-xs font-medium transition-all shadow-sm"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                        LinkedIn
                      </a>
                    )}
                    {founder.github && (
                      <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface/80 hover:bg-surface hover:border-[#6B3F69]/60 text-text-secondary hover:text-text-primary text-xs font-medium transition-all shadow-sm"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    )}
                    {founder.email && (
                      <a
                        href={founder.email}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface/80 hover:bg-surface hover:border-[#6B3F69]/60 text-text-secondary hover:text-text-primary text-xs font-medium transition-all shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#A97EA7]" />
                        Contact
                      </a>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>

              {/* Right Column: Bio, Projects, Skills & Path */}
              <div className="lg:col-span-8">
                <FadeIn direction="left" delay={0.2}>
                  {/* Category Eyebrow */}
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#A97EA7] mb-4">
                    <span className="w-5 h-[1.5px] bg-[#A97EA7]" />
                    {founder.category}
                  </div>

                  {/* Headline Statement */}
                  <h4 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-text-primary leading-snug mb-6">
                    {founder.headline}
                  </h4>

                  {/* Narrative Bio */}
                  <div className="space-y-4 text-text-secondary text-base leading-relaxed mb-6">
                    {founder.bio.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Project Links (if any) */}
                  {founder.projects && founder.projects.length > 0 && (
                    <div className="mb-10 pt-2">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {founder.projects.map((proj) => (
                          <a
                            key={proj.label}
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-surface/60 hover:bg-surface hover:border-primary/50 text-text-primary text-xs font-medium transition-all group"
                          >
                            <span>{proj.label}</span>
                            <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-primary transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Two Column Section: What they build / drive & At AKVORIX */}
                  <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-border/40">
                    {/* What they build / drive */}
                    <div>
                      <h5 className="font-display font-semibold text-text-primary text-base mb-4 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#A97EA7]" />
                        {founder.whatTheyBuildTitle}
                      </h5>
                      <ul className="space-y-3">
                        {founder.whatTheyBuild.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* At AKVORIX */}
                    <div>
                      <h5 className="font-display font-semibold text-text-primary text-base mb-4 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#A97EA7]" />
                        {founder.atAkvorixTitle}
                      </h5>
                      <ul className="space-y-3">
                        {founder.atAkvorix.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* The path so far (Timeline) */}
                  <div className="pt-10 mt-10 border-t border-border/40">
                    <h5 className="font-display font-semibold text-text-primary text-base mb-6">
                      The path so far
                    </h5>
                    <div className="relative pl-6 space-y-7 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#6B3F69] before:via-[#8B5F89] before:to-border">
                      {founder.timeline.map((milestone, mIdx) => (
                        <div key={mIdx} className="relative group">
                          {/* Dot */}
                          <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface bg-[#6B3F69] group-hover:bg-[#A97EA7] transition-colors shadow-sm shadow-[#6B3F69]/40" />

                          {/* Period */}
                          <span className="inline-block text-xs font-mono font-medium text-[#A97EA7] uppercase tracking-wider mb-1">
                            {milestone.period}
                          </span>

                          {/* Role & Org */}
                          <div className="font-display font-bold text-base text-text-primary leading-tight">
                            {milestone.role}
                            {milestone.org && (
                              <span className="text-text-muted font-normal text-sm ml-2">
                                · {milestone.org}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-text-secondary leading-relaxed mt-1.5">
                            {milestone.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
