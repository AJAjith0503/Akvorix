import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Not Found | AKVORIX",
  robots: { index: false, follow: false },
};

export default function ServiceNotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow-primary" aria-hidden="true" />

      <div className="container-custom relative z-10 text-center px-4">
        <div className="inline-flex items-center gap-2 glass border border-border rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-text-muted animate-pulse" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
            Service Not Found
          </span>
        </div>

        <h1
          className="font-display font-black text-[clamp(40px,7vw,72px)] leading-tight text-text-primary mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          This service doesn&apos;t exist
        </h1>

        <p className="text-text-secondary text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The automation service you&apos;re looking for couldn&apos;t be found. Browse all
          our services to find what you need.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link href="/services" className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold w-full md:w-auto text-center justify-center">
            View All Services
          </Link>
          <Link href="/" className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-semibold w-full md:w-auto text-center justify-center">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
