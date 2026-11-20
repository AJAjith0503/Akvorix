import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use — AKVORIX",
  description: "Read the Terms of Use governing your use of our website and digital AI automation services.",
};

export default function TermsOfUsePage() {
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
            <FileText className="w-3.5 h-3.5" />
            Legal Documentation
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Terms of Use
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted">
            <span><strong>Effective Date:</strong> November 2025</span>
            <span>•</span>
            <span><strong>Last Updated:</strong> February 2026</span>
          </div>
        </div>

        <div className="glass p-8 sm:p-10 rounded-2xl border border-border flex flex-col gap-8 text-text-secondary leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using{" "}
              <a
                href="https://akvorix.com"
                className="text-primary hover:underline font-medium"
              >
                https://akvorix.com
              </a>{" "}
              and our services, you agree to comply with these Terms of Use. If you do not agree, please refrain from using our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">2. Services</h2>
            <p>
              AKVORIX provides digital solutions including AI automation, AI agents, website &amp; web app development, custom software, marketing, branding, and IT consulting. Service scope, pricing, and deliverables are governed by individual agreements.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">3. User Responsibilities</h2>
            <p className="mb-2">Users agree to:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1.5 text-text-muted">
              <li>Provide accurate information</li>
              <li>Use services lawfully</li>
              <li>Not attempt to disrupt website functionality</li>
              <li>Not misuse intellectual property</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">4. Intellectual Property</h2>
            <p>
              All content, branding, logos, graphics, and website materials are owned or licensed by AKVORIX. Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">5. Payments &amp; Billing</h2>
            <p>
              Payments made via Razorpay or other gateways must comply with agreed payment terms. Delays or failures in payment may result in suspension of services.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">6. Limitation of Liability</h2>
            <p>
              AKVORIX shall not be liable for indirect, incidental, or consequential damages arising from the use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate services if users violate these Terms or engage in unlawful conduct.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">8. Governing Law</h2>
            <p>
              These Terms shall be governed under the laws of India. Any disputes shall be subject to the jurisdiction of courts located in Bengaluru, Karnataka.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">9. Changes to Terms</h2>
            <p>
              We may update these Terms periodically. Continued use of our services constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">10. Contact Information</h2>
            <p className="mb-4">
              If you have any questions or inquiries regarding these Terms of Use, please reach out to us:
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
                  Hoskote, Bengaluru, Karnataka 562114, India
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
