import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, Code, Settings, CheckCircle2, HeadphonesIcon, TrendingUp, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Process — How We Automate Your Business | AKVORIX",
  description: "Explore the complete client journey with AKVORIX. From discovery call and automation blueprint to deployment, training, and ongoing optimization.",
};

const timeline = [
  {
    phase: "Phase 1: Discovery & Strategy",
    duration: "Days 1–3",
    icon: MessageSquare,
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20",
    steps: [
      {
        title: "Discovery Call",
        desc: "A 15-minute no-obligation call to understand your business, current workflows, pain points, and goals. We determine if automation is the right fit.",
      },
      {
        title: "Business Audit",
        desc: "Deep dive into your specific processes, tools, and data flows. We map out exactly how your team works today.",
      },
      {
        title: "Requirement Gathering",
        desc: "We define exactly what the automation needs to achieve, required integrations, and compliance needs (e.g., HIPAA, GDPR).",
      },
      {
        title: "Automation Blueprint",
        desc: "You receive a comprehensive proposal detailing the architecture, expected ROI, exact timeline, and fixed cost. No surprises.",
      },
    ],
  },
  {
    phase: "Phase 2: Build & Test",
    duration: "Days 4–10",
    icon: Code,
    color: "text-accent",
    bgColor: "bg-accent/10 border-accent/20",
    steps: [
      {
        title: "Architecture Design",
        desc: "We design the technical architecture, data models, and prompt strategies (for AI agents) required to execute the blueprint.",
      },
      {
        title: "Development",
        desc: "Our engineers build the automation using enterprise-grade tools (n8n, LangChain, OpenAI) and connect your platforms via APIs.",
      },
      {
        title: "Staging Testing",
        desc: "We test the automation in a sandboxed environment using edge cases and historical data to ensure 100% accuracy.",
      },
      {
        title: "UAT (User Acceptance Testing)",
        desc: "Your team tests the automation in a controlled setting to verify it meets all requirements before going live.",
      },
    ],
  },
  {
    phase: "Phase 3: Launch & Optimize",
    duration: "Days 11–14",
    icon: Zap,
    color: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
    steps: [
      {
        title: "Deployment",
        desc: "We carefully push the automation to production, often in phases, to ensure zero disruption to your daily operations.",
      },
      {
        title: "Team Training",
        desc: "We provide documentation and training sessions so your team knows exactly how to interact with and manage the new system.",
      },
      {
        title: "Optimization",
        desc: "During the first 30 days, we closely monitor performance and fine-tune AI prompts or logic based on real-world usage.",
      },
      {
        title: "Ongoing Support",
        desc: "We provide continuous monitoring, maintenance, and support to ensure your automation runs flawlessly 24/7.",
      },
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-14 md:pb-24" aria-labelledby="process-page-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              How We Work
            </div>
            <h1 id="process-page-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary mb-8 leading-tight">
              A proven process for
              <br />
              <span className="gradient-text">predictable results</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              We don't just write code and disappear. We act as your strategic automation partner, guiding you from the first idea to long-term scaling.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" aria-label="Timeline">
        <div className="container-custom max-w-4xl">
          <div className="relative">
            {/* Main vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" aria-hidden="true" />

            <div className="flex flex-col gap-16 md:gap-24">
              {timeline.map((phase, i) => {
                const Icon = phase.icon;
                const isEven = i % 2 === 0;

                return (
                  <div key={phase.phase} className="relative z-10">
                    {/* Phase Header */}
                    <FadeIn>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 md:mb-16 relative pl-16 md:pl-0">
                        <div className={`md:w-1/2 flex flex-col w-full ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} order-2 md:order-1`}>
                          <div className={`px-4 py-1.5 rounded-full border text-sm font-semibold mb-3 self-start ${isEven ? 'md:self-end' : 'md:self-start'} ${phase.bgColor} ${phase.color}`}>
                            {phase.duration}
                          </div>
                          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary text-left md:text-inherit">
                            {phase.phase}
                          </h2>
                        </div>

                        {/* Center Icon */}
                        <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass border border-border flex items-center justify-center bg-surface shrink-0 z-20">
                          <Icon className={`w-5 h-5 ${phase.color}`} aria-hidden="true" />
                        </div>

                        <div className="md:w-1/2 order-3 hidden md:block" />
                      </div>
                    </FadeIn>

                    {/* Phase Steps */}
                    <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.1}>
                      {phase.steps.map((step, stepIndex) => (
                        <StaggerItem key={step.title}>
                          <div className={`flex flex-col md:flex-row gap-6 relative pl-16 md:pl-0`}>
                            {/* Connector line to step */}
                            <div className={`absolute left-6 top-6 w-10 h-px bg-border md:hidden`} aria-hidden="true" />
                            <div className={`absolute top-6 w-12 h-px bg-border hidden md:block ${isEven ? 'right-1/2' : 'left-1/2'}`} aria-hidden="true" />

                            <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right ml-auto md:ml-0' : 'md:pl-12 md:ml-auto'}`}>
                              <div className="glass border border-border rounded-2xl p-6 card-hover">
                                <h3 className="font-display font-semibold text-lg text-text-primary mb-2 flex items-center gap-2 justify-start md:justify-start">
                                  <div className={`w-2 h-2 rounded-full ${phase.bgColor.split(' ')[0].replace('/10', '')}`} aria-hidden="true" />
                                  {step.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed text-left">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="commitment-heading">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <h2 id="commitment-heading" className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">Our Post-Launch Commitment</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">We measure our success by your ROI. That requires long-term alignment.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="glass border border-border rounded-2xl p-6 h-full">
                <Settings className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-text-primary mb-2">Proactive Maintenance</h3>
                <p className="text-text-secondary text-sm">APIs change. Models update. We proactively monitor and maintain your systems so they never break.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="glass border border-border rounded-2xl p-6 h-full">
                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold text-text-primary mb-2">Quarterly Reviews</h3>
                <p className="text-text-secondary text-sm">We meet quarterly to review performance metrics, ROI, and identify new automation opportunities.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="glass border border-border rounded-2xl p-6 h-full">
                <HeadphonesIcon className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="font-bold text-text-primary mb-2">Priority Support</h3>
                <p className="text-text-secondary text-sm">Direct access to our engineering team via a dedicated Slack/Teams channel for any questions or tweaks.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
