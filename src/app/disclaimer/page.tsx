import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer — AKVORIX",
  description: "Read the official Disclaimer for the AKVORIX website, AI automation solutions, and digital platforms.",
};

export default function DisclaimerPage() {
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
            <AlertCircle className="w-3.5 h-3.5" />
            Legal Documentation
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Disclaimer
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted">
            <span><strong>Effective Date:</strong> November 2025</span>
            <span>•</span>
            <span><strong>Last Updated:</strong> February 2026</span>
          </div>
        </div>

        <div className="glass p-8 sm:p-10 rounded-2xl border border-border flex flex-col gap-8 text-text-secondary leading-relaxed text-sm sm:text-base">
          <div className="p-5 rounded-xl bg-surface/40 border border-border/80 text-text-muted">
            <p>
              Welcome to <strong className="text-text-primary">AKVORIX</strong>. This Disclaimer applies to our website{" "}
              <a href="https://akvorix.com" className="text-primary hover:underline font-medium">
                https://akvorix.com
              </a>
              , related digital platforms, and all communications or materials shared by our team.
            </p>
            <p className="mt-2">
              By accessing or using our website and services, you acknowledge and agree to the terms stated below.
            </p>
          </div>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">1. General Information</h2>
            <p>
              The information provided by AKVORIX (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is for general informational and promotional purposes only. While we strive to keep information accurate and up to date, we make no representations or warranties regarding completeness, reliability, or accuracy.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">2. Professional Advice Disclaimer</h2>
            <p className="mb-2">
              Content on our website — including guides, case studies, AI automation blueprints, marketing strategies, and articles — is provided for educational and informational purposes only.
            </p>
            <p>
              It should not be considered professional, legal, financial, or business advice. Users are encouraged to seek qualified professional consultation before acting on any information obtained from our platform.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">3. Service Disclaimer</h2>
            <p className="mb-2">
              Our services — including AI automation, AI agents, website development, app development, custom software, marketing, and branding — are provided on an &ldquo;as-is&rdquo; basis.
            </p>
            <p className="mb-2">
              Business outcomes such as operational cost reductions, workflow speedups, traffic growth, leads, or sales may vary depending on industry, organizational readiness, strategy, and external market conditions.
            </p>
            <p>
              AKVORIX does not guarantee specific results unless explicitly stated in a signed formal agreement.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">4. External Links Disclaimer</h2>
            <p className="mb-2">
              Our website may contain links to third-party websites or external resources for convenience.
            </p>
            <p>
              We are not responsible for the accuracy, content, or privacy practices of any external sites. Accessing third-party links is done at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">5. Limitation of Liability</h2>
            <p className="mb-2">AKVORIX shall not be liable for any damages resulting from:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1.5 text-text-muted mb-3">
              <li>Use of or inability to use our website or services</li>
              <li>Errors, omissions, or delays in website content</li>
              <li>Third-party actions or service interruptions (including API or hosting outages)</li>
              <li>Data breaches beyond our reasonable control</li>
            </ul>
            <p>Your use of our website and services is at your own discretion and risk.</p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">6. Testimonials &amp; Case Studies</h2>
            <p className="mb-2">
              Testimonials and case studies displayed represent individual client experiences and verified project results.
            </p>
            <p>
              Results may vary depending on market conditions, organizational systems, and strategic execution. We do not claim identical outcomes for all clients.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">7. Copyright &amp; Ownership</h2>
            <p className="mb-2">
              All website content, branding, logos, graphics, custom animations, and materials are owned or licensed by AKVORIX and are protected under applicable intellectual property laws.
            </p>
            <p>
              Unauthorized use, duplication, or distribution is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">8. Updates to This Disclaimer</h2>
            <p>
              We may revise this Disclaimer periodically to reflect updated regulations, technology integrations, or company policies. The latest version will always be available on this page.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or require clarifications regarding this Disclaimer, please contact us:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:akvorix.support@gmail.com" className="text-text-muted hover:text-text-primary transition-colors">
                  akvorix.support@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+916363753476" className="text-text-muted hover:text-text-primary transition-colors">
                  +91 6363753476
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border sm:col-span-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-text-muted">
                  Bengaluru, Karnataka, India
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
