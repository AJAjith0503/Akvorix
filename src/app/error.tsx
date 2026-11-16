"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error monitoring service in production
    console.error("[AKVORIX] Runtime error:", error);
  }, [error]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow-primary" aria-hidden="true" />

      {/* Giant blurred number */}
      <span
        aria-hidden="true"
        className="absolute select-none font-display font-black text-[clamp(180px,40vw,380px)] leading-none text-text-primary opacity-[0.03] pointer-events-none"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        500
      </span>

      <div className="container-custom relative z-10 text-center px-4">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 glass border border-border rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-text-muted animate-pulse" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
            Error 500
          </span>
        </div>

        <h1
          className="font-display font-black text-[clamp(40px,8vw,80px)] leading-tight text-text-primary mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Something went wrong
        </h1>

        <p className="text-text-secondary text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          An unexpected error occurred on our end. Our team has been notified
          and is working to fix it — faster than you can automate it.
        </p>

        {/* Error digest for support */}
        {error.digest && (
          <p className="text-text-muted text-xs font-mono mb-8">
            Error ID:{" "}
            <code className="glass border border-border rounded px-2 py-0.5 text-text-secondary">
              {error.digest}
            </code>
          </p>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            id="error-retry-btn"
            className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold w-full md:w-auto text-center justify-center"
          >
            ↺ Try Again
          </button>
          <Link
            href="/"
            className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-semibold w-full md:w-auto text-center justify-center"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-text-muted text-xs uppercase tracking-widest">Need help?</span>
          <Link
            href="/contact"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200 underline underline-offset-4 decoration-border hover:decoration-text-secondary"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
