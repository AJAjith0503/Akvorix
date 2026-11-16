"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { XCircle, CheckCircle2 } from "lucide-react";

const problems = [
  {
    problem: "Your team wastes hours on repetitive tasks that AI could handle in seconds",
    cost: "40% of workday lost to manual work",
  },
  {
    problem: "Leads contact you after hours and convert with faster-responding competitors",
    cost: "60% of leads lost to slow follow-up",
  },
  {
    problem: "You're drowning in data but can't get useful insights without hours of analysis",
    cost: "20+ hours/week on manual reporting",
  },
  {
    problem: "Scaling means hiring more people — which multiplies your costs and management overhead",
    cost: "$50,000+ per new hire annually",
  },
];

const solutions = [
  "Automate repetitive processes end-to-end",
  "AI responds to every lead in under 60 seconds",
  "Instant insights from all your data automatically",
  "Scale output 3× without increasing headcount",
];

export function ProblemSection() {
  return (
    <section className="section" aria-labelledby="problem-heading">
      <div className="container-custom">
        <FadeIn>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium mb-6">
              <XCircle className="w-4 h-4" aria-hidden="true" />
              The Real Cost of Manual Operations
            </div>
            <h2
              id="problem-heading"
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4 sm:mb-6"
            >
              Every day without automation is
              <br />
              <span className="gradient-text">money left on the table</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl">
              Most businesses are unknowingly bleeding time and revenue through manual processes that should have been automated years ago.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          {/* Problems */}
          <StaggerContainer staggerDelay={0.1}>
            <div className="flex flex-col gap-4">
              {problems.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="glass border border-red-500/10 hover:border-red-500/20 rounded-2xl p-5 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                        <XCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-text-primary text-sm md:text-base mb-2">{item.problem}</p>
                        <span className="text-red-400 text-xs font-semibold uppercase tracking-wide">
                          Cost: {item.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Solution */}
          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl" />
              <div className="relative glass border border-primary/20 rounded-3xl p-6 sm:p-8 md:p-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  The AKVORIX Solution
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-6">
                  What your business looks like
                  <span className="gradient-text"> after automation</span>
                </h3>
                <ul className="flex flex-col gap-4" role="list">
                  {solutions.map((solution, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-sm flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                      </div>
                      <span className="text-text-primary text-sm md:text-base">{solution}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/10">
                  <p className="text-text-secondary text-sm leading-relaxed">
                    <strong className="text-text-primary">The result?</strong> Our clients average{" "}
                    <strong className="text-primary">8× ROI</strong> within the first 6 months and{" "}
                    <strong className="text-accent">never look back.</strong>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
