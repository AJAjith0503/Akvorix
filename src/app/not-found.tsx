import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | AKVORIX",
  description: "The page you're looking for doesn't exist. Let's get you back on track.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow-primary" aria-hidden="true" />

      {/* Giant blurred number */}
      <span
        aria-hidden="true"
        className="absolute select-none font-display font-black text-[clamp(180px,40vw,380px)] leading-none text-text-primary opacity-[0.03] pointer-events-none"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        404
      </span>

      <div className="container-custom relative z-10 text-center px-4">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 glass border border-border rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-text-muted animate-pulse" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
            Error 404
          </span>
        </div>

        <h1 className="font-display font-black text-[clamp(48px,10vw,96px)] leading-none text-text-primary mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}>
          Page not found
        </h1>

        <p className="text-text-secondary text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for has been moved, deleted, or never existed.
          Our AI didn&apos;t automate it away — promise.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold w-full md:w-auto text-center justify-center"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-semibold w-full md:w-auto text-center justify-center"
          >
            Contact Support
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-text-muted text-xs uppercase tracking-widest">Quick links:</span>
          {[
            { label: "Services", href: "/services" },
            { label: "About", href: "/about" },
            { label: "Pricing", href: "/pricing" },
            { label: "Blog", href: "/blog" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200 underline underline-offset-4 decoration-border hover:decoration-text-secondary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
