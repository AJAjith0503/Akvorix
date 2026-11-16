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
    <section className="relative min-h-screen pt-36 pb-20 flex items-center justify-center overflow-hidden">
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

      <div className="container-custom relative z-10 text-center px-4 max-w-xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 glass border border-border rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
            Error 500
          </span>
        </div>

        <h1
          className="font-display font-black text-[clamp(36px,6vw,64px)] leading-tight text-text-primary mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Something went wrong
        </h1>

        <p className="text-text-secondary text-base md:text-lg mx-auto mb-6 leading-relaxed">
          An unexpected error occurred. Click below to try reloading the page, or return home.
        </p>

        {/* Display actionable error message */}
        {error?.message && (
          <div className="text-left bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono p-3 rounded-xl mb-6 break-words max-h-36 overflow-y-auto">
            {error.message}
          </div>
        )}

        {/* Error digest for support */}
        {error?.digest && (
          <p className="text-text-muted text-xs font-mono mb-6">
            Error ID:{" "}
            <code className="glass border border-border rounded px-2 py-0.5 text-text-secondary">
              {error.digest}
            </code>
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              } else {
                reset();
              }
            }}
            id="error-retry-btn"
            className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold w-full sm:w-auto text-center justify-center"
          >
            ↺ Reload Page
          </button>
          <Link
            href="/"
            onClick={() => reset()}
            className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-semibold w-full sm:w-auto text-center justify-center"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
