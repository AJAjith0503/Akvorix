import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Globe2, Award, Users2, TrendingUp, Calendar } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About AKVORIX — Our Story, Mission & Team",
  description: "Learn about AKVORIX, our mission to democratize AI automation, our team, and why businesses across USA, Europe, and India trust us to transform their operations.",
};

const values = [
  { icon: Target, title: "Outcome-Driven", desc: "We measure success by your business results, not by the complexity of what we build. Every automation has a clear ROI target.", color: "text-violet-400" },
  { icon: Heart, title: "Human-Centered", desc: "AI should amplify human potential, not replace it. We free your team from tedious work so they can do what they do best.", color: "text-pink-400" },
  { icon: Eye, title: "Radical Transparency", desc: "No black boxes. No hidden fees. We explain exactly how your automation works and what it costs before you commit.", color: "text-cyan-400" },
  { icon: Globe2, title: "Global Thinking", desc: "We work with businesses across three continents, understanding diverse markets, regulations, and operational contexts.", color: "text-green-400" },
  { icon: Award, title: "Enterprise Quality", desc: "Every automation is built to enterprise standards: documented, monitored, secured, and supported long-term.", color: "text-yellow-400" },
  { icon: TrendingUp, title: "Continuous Improvement", desc: "We don't just build and leave. We monitor, optimize, and evolve your automation as your business grows.", color: "text-orange-400" },
];

const milestones = [
  { year: "2021", title: "Founded", desc: "AKVORIX founded with a mission to make AI automation accessible to mid-market businesses." },
  { year: "2022", title: "First 10 Clients", desc: "Launched our first major automation projects across healthcare and real estate." },
  { year: "2023", title: "Expanded Services", desc: "Added custom AI agents and n8n automation. Grew to serve clients in Europe and India." },
  { year: "2024", title: "100+ Automations", desc: "Deployed over 100 automation systems. Launched AI chatbot and lead generation solutions." },
  { year: "2025", title: "Global Recognition", desc: "Recognized as a top AI automation agency. Clients across 12 countries." },
  { year: "2026", title: "Today", desc: "Serving 50+ active clients, automating millions of tasks monthly, and expanding our team." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-14 md:pb-24" aria-labelledby="about-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Users2 className="w-4 h-4" aria-hidden="true" />
              About AKVORIX
            </div>
            <h1 id="about-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary mb-8 leading-tight">
              We believe every business
              <br />
              <span className="gradient-text">deserves to run on AI</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
              AKVORIX was built because we saw too many brilliant entrepreneurs and operators drowning in manual work that AI could handle — if they only had access to it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-text-secondary text-sm font-medium mb-6">
                Our Story
              </div>
              <h2 id="story-heading" className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-6">
                Born from frustration,
                <span className="gradient-text"> built to scale</span>
              </h2>
              <div className="flex flex-col gap-5 text-text-secondary leading-relaxed">
                <p>
                  We started AKVORIX after watching countless business owners work 70-hour weeks doing tasks that software should handle. Sales managers manually copying data between systems. Healthcare staff spending 3 hours a day on scheduling. Restaurant owners responding to Google reviews one by one at midnight.
                </p>
                <p>
                  The tools existed to fix all of it. But nobody was putting them together in a way that actually worked for non-technical businesses. Enterprise companies could afford teams of engineers to build custom solutions. Everyone else was stuck.
                </p>
                <p>
                  We built AKVORIX to change that. We're a team of AI engineers, automation specialists, and business strategists who translate cutting-edge AI technology into practical, measurable business outcomes — for companies of all sizes.
                </p>
                <p className="text-text-primary font-medium">
                  Today, we've helped 50+ businesses across 12 countries automate millions of tasks, save hundreds of thousands of dollars, and build operations that scale without burning out their teams.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              {/* Founder card */}
              <div className="glass border border-border rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-text-primary font-bold text-2xl">
                    A
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-text-primary">Founder's Note</div>
                    <div className="text-text-muted text-sm">AKVORIX Leadership</div>
                  </div>
                </div>
                <blockquote className="text-text-secondary leading-relaxed italic mb-6">
                  "I started AKVORIX because I believe AI is the greatest business equalizer of our generation. Large enterprises have had AI advantages for years. We're giving those same advantages to ambitious businesses everywhere — from a medical practice in Texas to a real estate firm in London to a restaurant group in Mumbai."
                </blockquote>
                <div className="flex items-center gap-3 pt-6 border-t border-border">
                  <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                  <span className="text-text-muted text-sm">Building the future of work, one automation at a time</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-sm" aria-labelledby="mission-heading">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="glass border border-primary/20 rounded-3xl p-8 h-full bg-gradient-to-br from-primary/5 to-transparent">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h2 id="mission-heading" className="font-display font-bold text-2xl text-text-primary mb-4">Our Mission</h2>
                <p className="text-text-secondary leading-relaxed">
                  To democratize AI automation — making enterprise-grade intelligent systems accessible to every business, regardless of size or technical capability. We build automation that creates real, measurable business outcomes.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="glass border border-accent/20 rounded-3xl p-8 h-full bg-gradient-to-br from-accent/5 to-transparent">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-2xl text-text-primary mb-4">Our Vision</h3>
                <p className="text-text-secondary leading-relaxed">
                  A world where every business — from a two-person startup to a global enterprise — has the full power of AI working for it. Where no one wastes time on repetitive tasks, and human potential is applied only where it truly matters.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" aria-labelledby="values-heading">
        <div className="container-custom">
          <FadeIn className="text-center mb-14">
            <h2 id="values-heading" className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
              The values that guide us
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              These aren't words on a wall. They're how we make every decision.
            </p>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="glass border border-border rounded-2xl p-6 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/20 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary text-lg mb-2">{v.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="section relative overflow-hidden" aria-labelledby="timeline-heading">
        <div className="absolute inset-0 bg-surface/40" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <FadeIn className="text-center mb-14">
            <h2 id="timeline-heading" className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
              Our journey so far
            </h2>
          </FadeIn>
          <div className="relative max-w-3xl mx-auto">
            <div className="timeline-line" aria-hidden="true" />
            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.08}>
                  <div className={`flex gap-8 items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} md:flex-row`}>
                    <div className="flex-1 md:text-right">
                      <div className="glass border border-border rounded-2xl p-5">
                        <div className="text-primary font-bold text-sm mb-1">{m.year}</div>
                        <div className="font-display font-semibold text-text-primary mb-1">{m.title}</div>
                        <p className="text-text-muted text-sm">{m.desc}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shrink-0 relative z-10 hidden md:block" aria-hidden="true" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-sm" aria-labelledby="global-heading">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 id="global-heading" className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-6">
              Serving businesses across
              <span className="gradient-text"> 3 continents</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              Whether you're in New York, London, or Bangalore — our team is in your timezone and understands your market.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["🇺🇸 United States", "🇬🇧 United Kingdom", "🇩🇪 Germany", "🇳🇱 Netherlands", "🇦🇪 UAE", "🇮🇳 India", "🇦🇺 Australia", "🇨🇦 Canada"].map((country) => (
                <div key={country} className="px-4 py-2.5 glass border border-border rounded-xl text-text-secondary text-sm hover:text-text-primary hover:border-primary/30 transition-colors">
                  {country}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
