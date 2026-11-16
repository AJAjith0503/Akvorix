import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { industries, getIndustry } from "@/lib/industries";
import { CTASection } from "@/components/sections/CTASection";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustry(params.slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `AI Automation for ${industry.title} — AKVORIX`,
    description: industry.description,
  };
}

export default function IndustryPage({ params }: Props) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[114px] pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-24" aria-labelledby="industry-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-text-muted">
                <li><Link href="/" className="hover:text-text-primary transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/industries" className="hover:text-text-primary transition-colors">Industries</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-text-secondary">{industry.title}</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
                {industry.title} Automation
              </div>
              <h1 id="industry-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight">
                {industry.subtitle}
              </h1>
              <p className="text-text-secondary text-xl leading-relaxed mb-8">{industry.description}</p>
              <Link href="/contact#book-call" className="btn-primary px-8 py-4">
                Get Your Free Industry Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm" aria-label="Industry statistics">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industry.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="glass border border-border rounded-2xl p-5 text-center">
                  <div className="font-display font-black text-3xl text-text-primary mb-1">{stat.value}</div>
                  <div className="text-text-muted text-xs">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points & Automation */}
      <section className="section" aria-label="Pain points and automation opportunities">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            <FadeIn>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-6">
                Common Pain Points in {industry.title}
              </h2>
              <ul className="flex flex-col gap-3" role="list">
                {industry.painPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 glass border border-red-500/10 rounded-xl p-4">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-6">
                What We Automate for You
              </h2>
              <ul className="flex flex-col gap-3" role="list">
                {industry.automationOpportunities.map((opp) => (
                  <li key={opp} className="flex items-start gap-3 glass border border-primary/10 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary text-sm">{opp}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Workflows */}
      {industry.workflows.length > 0 && (
        <section className="section-sm relative overflow-hidden" aria-labelledby="workflows-heading">
          <div className="absolute inset-0 bg-surface/40" aria-hidden="true" />
          <div className="container-custom relative z-10">
            <FadeIn className="mb-10">
              <h2 id="workflows-heading" className="font-display font-bold text-2xl md:text-3xl text-text-primary">
                Example Automation Workflows
              </h2>
            </FadeIn>
            <StaggerContainer className="flex flex-col gap-5" staggerDelay={0.1}>
              {industry.workflows.map((wf) => (
                <StaggerItem key={wf.title}>
                  <div className="glass border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h3 className="font-display font-semibold text-text-primary text-lg">{wf.title}</h3>
                      <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold shrink-0">
                        {wf.impact}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-text-muted text-sm">
                      {wf.steps[0].split("→").map((step, i, arr) => (
                        <>
                          <span key={`step-${i}`} className="px-3 py-1.5 bg-primary/5 rounded-lg text-xs">{step.trim()}</span>
                          {i < arr.length - 1 && (
                            <ArrowRight key={`arrow-${i}`} className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Recommended Solutions */}
      <section className="section-sm" aria-labelledby="solutions-heading">
        <div className="container-custom">
          <FadeIn>
            <h2 id="solutions-heading" className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-6">
              Recommended Solutions for {industry.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {industry.solutions.map((solution) => (
                <Link
                  key={solution}
                  href={`/services/${solution.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-5 py-3 glass border border-primary/20 rounded-xl text-text-primary text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 flex items-center gap-2"
                >
                  {solution}
                  <ArrowRight className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
