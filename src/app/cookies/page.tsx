import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Cookie,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Globe,
  Lock,
  Calendar,
  HelpCircle,
  FileCheck,
  Smartphone,
  Laptop,
  Target,
  Sparkles,
} from "lucide-react";
import { CookiePreferenceCenter } from "@/components/ui/CookiePreferenceCenter";
import { CookieInventoryTable } from "@/components/ui/CookieInventoryTable";

export const metadata: Metadata = {
  title: "Cookie Policy — AKVORIX | AI Automation Agency",
  description:
    "Explore how AKVORIX uses cookies, local storage, and tracking technologies. Review our complete cookie inventory and configure your privacy preferences.",
  alternates: {
    canonical: "https://akvorix.com/cookies",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 radial-glow-primary opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="container-custom max-w-5xl relative z-10 px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              <Cookie className="w-3.5 h-3.5" />
              <span>Compliance & Transparency</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GDPR, CCPA & ePrivacy Compliant</span>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight mb-4">
            Cookie Policy &amp; <span className="gradient-text">Tracking Technologies</span>
          </h1>

          <p className="text-text-secondary text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            At AKVORIX, we prioritize user trust and transparency. This policy provides detailed disclosures regarding how, when, and why we utilize cookies, local storage, and telemetry identifiers across our automation platforms.
          </p>

          {/* Metadata Card Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-surface/50 border border-border text-xs sm:text-sm">
            <div>
              <span className="text-text-muted text-[11px] block">Effective Date</span>
              <span className="font-semibold text-text-primary flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Nov 15, 2026
              </span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Policy Version</span>
              <span className="font-semibold text-text-primary flex items-center gap-1 mt-0.5">
                <FileCheck className="w-3.5 h-3.5 text-primary" />
                v2.4 (Enterprise)
              </span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Applies To</span>
              <span className="font-semibold text-text-primary flex items-center gap-1 mt-0.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                akvorix.com
              </span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Privacy Contact</span>
              <a
                href="mailto:akvorix.support@gmail.com"
                className="font-semibold text-primary hover:underline truncate block mt-0.5"
              >
                akvorix.support
              </a>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: Interactive Preference Center ── */}
        <section className="mb-14" aria-label="Interactive Cookie Preference Center">
          <CookiePreferenceCenter />
        </section>

        {/* ── Table of Contents Quick Jump ── */}
        <div className="mb-12 p-4 rounded-2xl bg-surface/40 border border-border/80">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2.5">
            Quick Navigation
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <a href="#overview" className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              1. Overview &amp; Definitions
            </a>
            <a href="#categories" className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              2. Categories of Cookies
            </a>
            <a href="#inventory" className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              3. Complete Cookie Inventory
            </a>
            <a href="#third-parties" className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              4. Third-Party Partners
            </a>
            <a href="#browser-controls" className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              5. Browser Configuration
            </a>
            <a href="#legal-basis" className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              6. GDPR &amp; CCPA Rights
            </a>
            <a href="#contact" className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              7. Contact Our Privacy Team
            </a>
          </div>
        </div>

        {/* ── Main Policy Content Glass Card ── */}
        <div className="glass p-8 sm:p-12 rounded-3xl border border-border flex flex-col gap-12 text-text-secondary leading-relaxed text-sm sm:text-base">
          
          {/* Section 1: Overview */}
          <section id="overview" className="scroll-mt-32">
            <div className="flex items-center gap-2.5 text-text-primary font-bold text-xl sm:text-2xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                01
              </span>
              <h2>Overview &amp; What Are Cookies?</h2>
            </div>
            <p className="mb-4">
              Cookies are compact text packets stored on your terminal device (desktop computer, laptop, tablet, or smartphone) when you navigate web pages. In conjunction with web technologies like <strong>HTML5 LocalStorage</strong> and <strong>SessionStorage</strong>, they empower modern web applications to retain essential operational state, preserve your browsing configurations, and optimize system speed.
            </p>
            <p>
              Under global data protection standards (including the <strong>General Data Protection Regulation (GDPR)</strong>, the <strong>ePrivacy Directive 2002/58/EC</strong>, and the <strong>California Consumer Privacy Act (CCPA/CPRA)</strong>), identifiers that can differentiate a unique device or user session are treated as personal data when combined with additional telemetry.
            </p>
          </section>

          {/* Section 2: Categories */}
          <section id="categories" className="scroll-mt-32">
            <div className="flex items-center gap-2.5 text-text-primary font-bold text-xl sm:text-2xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                02
              </span>
              <h2>Categories of Cookies We Deploy</h2>
            </div>
            <p className="mb-6">
              AKVORIX groups all tracking instruments into three distinct functional classifications:
            </p>

            <div className="grid gap-4">
              {/* Category 1 */}
              <div className="p-5 rounded-2xl bg-surface/60 border border-border flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-text-primary text-base sm:text-lg">1. Strictly Necessary Cookies</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Exempt from Prior Consent
                    </span>
                  </div>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-2">
                    These mechanisms are technically indispensable for delivering the core requested web services. They secure transmission protocols, guard against Cross-Site Request Forgery (CSRF), sustain client theme choices (`next-themes`), and ensure user session continuity.
                  </p>
                  <span className="text-[11px] font-medium text-text-secondary">
                    Legal Basis: Art. 6(1)(f) GDPR (Legitimate Interest in secure web operations).
                  </span>
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-5 rounded-2xl bg-surface/60 border border-border flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-text-primary text-base sm:text-lg">2. Analytics &amp; Telemetry Cookies</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/15 text-primary">
                      Requires Opt-In Consent
                    </span>
                  </div>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-2">
                    These tools aggregate anonymized interaction telemetry (such as page scroll depths, robot trail interactions, service card clicks, and viewport responsiveness). This aggregated data enables our engineering team to rectify layout stalls and improve rendering speeds.
                  </p>
                  <span className="text-[11px] font-medium text-text-secondary">
                    Legal Basis: Art. 6(1)(a) GDPR &amp; ePrivacy (Freely given, revocable consent).
                  </span>
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-5 rounded-2xl bg-surface/60 border border-border flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-text-primary text-base sm:text-lg">3. Marketing &amp; Conversion Attribution</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/15 text-purple-400">
                      Requires Opt-In Consent
                    </span>
                  </div>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-2">
                    These cookies measure whether visitors arrived through specific corporate marketing initiatives (such as LinkedIn campaigns or Google partner ads) and evaluate consultation booking effectiveness. They do not store direct identifiers like bank data or phone numbers.
                  </p>
                  <span className="text-[11px] font-medium text-text-secondary">
                    Legal Basis: Art. 6(1)(a) GDPR (Explicit consent).
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Interactive Table */}
          <section id="inventory" className="scroll-mt-32">
            <div className="flex items-center gap-2.5 text-text-primary font-bold text-xl sm:text-2xl mb-2">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                03
              </span>
              <h2>Complete Cookie Inventory</h2>
            </div>
            <p className="text-text-muted text-sm mb-6">
              Below is an itemized breakdown of each persistent key, duration, host domain, and specific functional objective deployed across akvorix.com:
            </p>

            <CookieInventoryTable />
          </section>

          {/* Section 4: Third Parties */}
          <section id="third-parties" className="scroll-mt-32">
            <div className="flex items-center gap-2.5 text-text-primary font-bold text-xl sm:text-2xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                04
              </span>
              <h2>Third-Party Processors &amp; Sub-Processors</h2>
            </div>
            <p className="mb-4">
              To support our infrastructure and client communications, we partner with specialized, SOC 2 / ISO 27001 compliant enterprise service providers:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-text-primary">Google Analytics (Alphabet)</span>
                  <span className="text-[11px] text-text-muted">Analytics</span>
                </div>
                <p className="text-text-muted text-xs leading-relaxed mb-3">
                  Provides anonymized site traffic aggregation, bounce rates, and browser demographic metrics. IP anonymization is enforced.
                </p>
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <span>Google Privacy Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-surface/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-text-primary">Resend Inc.</span>
                  <span className="text-[11px] text-text-muted">Transactional Routing</span>
                </div>
                <p className="text-text-muted text-xs leading-relaxed mb-3">
                  Transmits transactional enquiry forms directly to our operations inbox (`akvorix.support@gmail.com`) over TLS encryption.
                </p>
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <span>Resend Privacy Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          {/* Section 5: Browser Guides */}
          <section id="browser-controls" className="scroll-mt-32">
            <div className="flex items-center gap-2.5 text-text-primary font-bold text-xl sm:text-2xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                05
              </span>
              <h2>How to Manage Cookies via Web Browsers</h2>
            </div>
            <p className="mb-4">
              In addition to our interactive preference console above, you have full native control over cookies directly within your browser settings. You can delete existing cookies, block third-party trackers, or configure automatic cache clearing upon closing:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                { name: "Apple Safari", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
                { name: "Mozilla Firefox", url: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" },
                { name: "Microsoft Edge", url: "https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" },
              ].map((browser) => (
                <a
                  key={browser.name}
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-surface/60 border border-border hover:border-primary/40 flex items-center justify-between text-xs font-medium text-text-primary transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-primary" />
                    <span>{browser.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </section>

          {/* Section 6: Legal Rights */}
          <section id="legal-basis" className="scroll-mt-32">
            <div className="flex items-center gap-2.5 text-text-primary font-bold text-xl sm:text-2xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                06
              </span>
              <h2>International Compliance (GDPR, UK GDPR &amp; CCPA/CPRA)</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-surface/50 border border-border">
                <h3 className="font-semibold text-text-primary text-base mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  European Union &amp; UK Rights
                </h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-3">
                  Under the General Data Protection Regulation, visitors located in the European Economic Area (EEA) and the United Kingdom enjoy rights to:
                </p>
                <ul className="list-disc pl-5 text-xs text-text-muted space-y-1">
                  <li>Consent or refuse non-essential cookies prior to their placement.</li>
                  <li>Withdraw previously granted consent at any time without detriment.</li>
                  <li>Request erasure, restriction of processing, or access to stored telemetry.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-surface/50 border border-border">
                <h3 className="font-semibold text-text-primary text-base mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  California Consumer Privacy (CCPA)
                </h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-3">
                  Under the California Consumer Privacy Act and CPRA:
                </p>
                <ul className="list-disc pl-5 text-xs text-text-muted space-y-1">
                  <li><strong>Notice at Collection:</strong> We delineate all cookie identifiers gathered above.</li>
                  <li><strong>No Sale of Data:</strong> AKVORIX does not sell personal information for monetary or valuable consideration.</li>
                  <li><strong>Opt-Out of Sharing:</strong> You may toggle Marketing cookies off to restrict third-party cross-contextual advertising.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Contact */}
          <section id="contact" className="scroll-mt-32 pt-4 border-t border-border/80">
            <div className="flex items-center gap-2.5 text-text-primary font-bold text-xl sm:text-2xl mb-4">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                07
              </span>
              <h2>Contact Our Data Protection Team</h2>
            </div>
            <p className="mb-4">
              If you have any questions regarding our cookie practices, technical implementations, or compliance mechanisms, our dedicated privacy officers are available to assist:
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="mailto:akvorix.support@gmail.com"
                className="py-3 px-5 rounded-xl bg-primary text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-[#6B3F69]/25 hover:bg-primary/90 transition-all"
              >
                <span>Email Privacy Officer: akvorix.support@gmail.com</span>
              </a>
              <Link
                href="/privacy"
                className="py-3 px-5 rounded-xl border border-border bg-surface hover:bg-surface/80 text-text-secondary hover:text-text-primary font-medium text-sm text-center transition-all"
              >
                Read Full Privacy Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
