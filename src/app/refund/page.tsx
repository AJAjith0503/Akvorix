import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Mail, Phone, MapPin, AlertCircle, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Return & Refund Policy — AKVORIX",
  description: "Read the Return & Refund Policy for AKVORIX AI automation, web development, and digital services.",
};

export default function RefundPolicyPage() {
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
            <RefreshCw className="w-3.5 h-3.5" />
            Legal Documentation
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Return &amp; Refund Policy
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
              Thank you for choosing <strong className="text-text-primary">AKVORIX</strong>. We are committed to delivering high-quality digital services including AI automation, AI agents, website development, app development, marketing, custom software solutions, and workflow automation systems.
            </p>
            <p className="mt-2">
              This Return and Refund Policy outlines the conditions under which refunds may be issued for our services.
            </p>
          </div>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">1. General Policy</h2>
            <p className="mb-2">
              As AKVORIX provides customized digital services tailored to each client&apos;s business goals, services are generally non-refundable once project work has started or deliverables have been shared.
            </p>
            <p>
              Each engagement involves strategic planning, creative execution, and technical implementation which cannot be reversed once initiated.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">2. Eligibility for Refunds</h2>
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-surface/30 border border-border">
                <h3 className="font-medium text-text-primary mb-1">Duplicate Payment</h3>
                <p className="text-text-muted text-sm">
                  If a customer makes a duplicate payment for the same service, the excess amount will be refunded within 7–10 business days after verification.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface/30 border border-border">
                <h3 className="font-medium text-text-primary mb-1">Service Non-Delivery</h3>
                <p className="text-text-muted text-sm">
                  If a service cannot be initiated due to reasons solely attributable to AKVORIX, and no work has been delivered, a refund may be approved after internal review.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface/30 border border-border">
                <h3 className="font-medium text-text-primary mb-1">Project Cancellation (Before Work Begins)</h3>
                <p className="text-text-muted text-sm">
                  If cancellation occurs before any work has started, a partial refund may be considered after deducting administrative and consultation charges.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">3. Non-Refundable Situations</h2>
            <p className="mb-2">Refunds are not applicable under the following circumstances:</p>
            <ul className="list-disc pl-6 flex flex-col gap-2 text-text-muted">
              <li>Approval of initial designs, architectures, wireframes, or mockups.</li>
              <li>Client-side delays (content, approvals, communication).</li>
              <li>SEO, Marketing, Hosting, or Maintenance services after commencement.</li>
              <li>Digital products, AI agents, or software licenses once access is shared.</li>
              <li>Change-of-mind or dissatisfaction without valid performance issues.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">4. Project Delivery &amp; Revisions</h2>
            <p>
              All projects are delivered as per mutually agreed timelines and scope. Clients are entitled to revisions within the agreed scope. However, full refunds are not applicable after project components are delivered.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              5. Refund Processing Time
            </h2>
            <p>
              Approved refunds will be processed within <strong>7–10 business days</strong> and credited to the original payment method, subject to payment gateway and banking timelines.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              6. Payment Gateway Disclaimer
            </h2>
            <p>
              Payments processed via Razorpay or other third-party gateways are subject to their respective terms. AKVORIX does not store payment credentials or sensitive financial data.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              7. Cancellation Requests
            </h2>
            <p className="mb-3">
              Cancellation requests must be submitted in writing within <strong>48 hours of payment</strong> and before project initiation.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface/50 border border-border text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:akvorix.support@gmail.com" className="text-text-primary hover:underline font-medium">
                akvorix.support@gmail.com
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-text-primary font-semibold text-lg sm:text-xl mb-3">8. Contact for Refund Requests</h2>
            <p className="mb-4">
              For any questions, refund inquiries, or disputes, please reach out to our legal and billing team:
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
