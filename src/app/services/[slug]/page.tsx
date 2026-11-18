import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Users2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { services, getService } from "@/lib/services";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import WebProjectsSection from "@/components/sections/WebProjectsSection";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService(params.slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} — AKVORIX`,
    description: service.description,
    openGraph: {
      title: `${service.title} | AKVORIX AI Automation`,
      description: service.description,
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "AKVORIX", url: "https://akvorix.com" },
    areaServed: ["US", "GB", "IN"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-[114px] pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-24" aria-labelledby="service-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <FadeIn>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-text-muted">
                <li><Link href="/" className="hover:text-text-primary transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className="hover:text-text-primary transition-colors">Services</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-text-secondary">{service.title}</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              {service.timeline} · {service.roi}
            </div>

            <h1 id="service-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight max-w-4xl">
              {service.title}
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/contact#book-call" className="btn-primary px-8 py-4 w-full md:w-auto text-center justify-center">
                Get a Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={params.slug === "website-development" ? "#web_project" : "/services/website-development#web_project"}
                className="btn-secondary px-8 py-4 w-full md:w-auto text-center justify-center"
              >
                Web Project Demo
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="section" aria-label="Service details">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main column */}
            <div className="lg:col-span-2 flex flex-col gap-12">
              {/* The Challenge */}
              <FadeIn>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">The Challenge</h2>
                  <div className="glass border border-red-500/10 rounded-2xl p-6">
                    <p className="text-text-secondary leading-relaxed">{service.challenge}</p>
                  </div>
                </div>
              </FadeIn>

              {/* Our Solution */}
              <FadeIn>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">Our Solution</h2>
                  <div className="glass border border-primary/20 rounded-2xl p-6">
                    <p className="text-text-secondary leading-relaxed">{service.solution}</p>
                  </div>
                </div>
              </FadeIn>

              {/* Benefits */}
              <FadeIn>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">Key Benefits</h2>
                  <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.07}>
                    {service.benefits.map((benefit) => (
                      <StaggerItem key={benefit}>
                        <div className="flex items-start gap-3 glass border border-border rounded-xl p-4">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-text-primary">{benefit}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>

              {/* Process */}
              <FadeIn>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">Our Process</h2>
                  <div className="flex flex-col gap-3">
                    {service.process.map((step, i) => (
                      <div key={step} className="flex items-center gap-4 glass border border-border rounded-xl p-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-text-secondary">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Deliverables */}
              <FadeIn>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">What You Get</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-3 glass border border-border rounded-xl p-4">
                        <div className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        <span className="text-text-secondary text-sm">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Technologies */}
              <FadeIn>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 glass border border-border rounded-lg text-text-secondary text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* FAQs */}
              <FadeIn>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">Frequently Asked Questions</h2>
                  <div className="flex flex-col gap-3">
                    {service.faq.map((item, i) => (
                      <div key={i} className="glass border border-border rounded-2xl p-5">
                        <div className="font-semibold text-text-primary mb-2">{item.q}</div>
                        <p className="text-text-secondary text-sm">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar — Sticky in laptop view while content scrolls */}
            <div className="lg:col-span-1 relative">
              <div className="lg:sticky lg:top-28 space-y-5">
                <FadeIn delay={0.2} direction="none">
                  {/* Quick info card */}
                  <div className="glass border border-border rounded-2xl p-6 mb-5">
                    <h3 className="font-display font-semibold text-text-primary text-lg mb-5">Service Overview</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-text-muted" aria-hidden="true" />
                        <div>
                          <div className="text-text-muted text-xs">Timeline</div>
                          <div className="text-text-primary text-sm font-medium">{service.timeline}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-text-muted" aria-hidden="true" />
                        <div>
                          <div className="text-text-muted text-xs">Expected ROI</div>
                          <div className="text-text-primary text-sm font-medium">{service.roi}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users2 className="w-4 h-4 text-text-muted" aria-hidden="true" />
                        <div>
                          <div className="text-text-muted text-xs">Industries</div>
                          <div className="text-text-primary text-sm font-medium">{service.industries.slice(0, 2).join(", ")}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <Link href="/contact#book-call" className="btn-primary w-full justify-center py-3 text-sm">
                        Book Free Call
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link href="/pricing" className="btn-secondary w-full justify-center py-3 text-sm">
                        View Pricing
                      </Link>
                    </div>
                  </div>

                  {/* Industries */}
                  <div className="glass border border-border rounded-2xl p-6">
                    <h3 className="font-semibold text-text-primary text-sm mb-4">Best For</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.industries.map((ind) => (
                        <span key={ind} className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {params.slug === "website-development" && <WebProjectsSection />}

      <CTASection />
    </>
  );
}
