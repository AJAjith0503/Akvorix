import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — AKVORIX",
  description: "Learn how AKVORIX collects, uses, and safeguards your personal information and data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-primary opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="container-custom max-w-4xl relative z-10 px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            Legal Documentation
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Privacy Policy
          </h1>
          <p className="text-text-muted text-sm">Last updated: November 2026</p>
        </div>

        <div className="glass p-8 sm:p-10 rounded-2xl border border-border flex flex-col gap-8 text-text-secondary leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">1. Introduction</h2>
            <p>
              At AKVORIX (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), your privacy and data security are of utmost importance. This Privacy Policy outlines how we collect, store, protect, and use your personal information when you use our website, AI automation services, and products.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information that you directly provide to us, including:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1.5 text-text-muted">
              <li>Contact details such as name, email address, phone number, and company name.</li>
              <li>Information provided during discovery calls, consultations, and onboarding questionnaires.</li>
              <li>Operational workflow details and API credentials required to configure custom automations.</li>
              <li>Technical analytics and usage data when browsing our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">3. How We Use Your Data</h2>
            <p className="mb-3">We use your data solely for legitimate business purposes:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1.5 text-text-muted">
              <li>Designing, implementing, and maintaining custom AI automation pipelines for your organization.</li>
              <li>Communicating project updates, system monitoring alerts, and customer support.</li>
              <li>Improving website performance, service security, and user experience.</li>
              <li>We never sell or monetize your proprietary business data or customer records.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">4. Data Security</h2>
            <p>
              We implement industry-standard encryption, strict access control, and zero-trust security practices for all client systems. Any credentials or API keys provided for workflow automations are encrypted at rest and in transit.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">5. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact us at{" "}
              <a href="mailto:akvorix.support@gmail.com" className="text-primary hover:underline font-medium">
                akvorix.support@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

