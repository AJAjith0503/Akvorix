"use client";

import { useEffect } from "react";

// global-error.tsx must include its own <html> and <body> tags
// because it replaces the root layout when the root layout itself errors.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AKVORIX] Global layout error:", error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Critical Error — AKVORIX</title>
        <meta name="robots" content="noindex,nofollow" />
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{
            background:#000;
            color:#fff;
            font-family:'Inter',system-ui,sans-serif;
            display:flex;
            align-items:center;
            justify-content:center;
            min-height:100vh;
            text-align:center;
            padding:2rem;
          }
          .badge{
            display:inline-flex;
            align-items:center;
            gap:8px;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.1);
            border-radius:999px;
            padding:6px 16px;
            margin-bottom:2rem;
          }
          .dot{
            width:8px;height:8px;border-radius:50%;
            background:#737373;
            animation:pulse 2s ease-in-out infinite;
          }
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
          .label{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#737373}
          h1{font-size:clamp(36px,8vw,72px);font-weight:900;line-height:1.1;margin-bottom:1rem;letter-spacing:-.02em}
          p{color:#a3a3a3;font-size:1rem;line-height:1.7;max-width:460px;margin:0 auto 2.5rem}
          .mono{font-family:'JetBrains Mono',monospace;font-size:11px;color:#737373;margin-bottom:2rem}
          code{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px 8px;color:#a3a3a3}
          .actions{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .btn-p{
            background:#fff;color:#000;
            border:none;border-radius:12px;
            padding:14px 32px;font-size:14px;font-weight:600;
            cursor:pointer;transition:opacity .2s;
          }
          .btn-p:hover{opacity:.85}
          .btn-s{
            background:rgba(255,255,255,0.05);color:#fff;
            border:1px solid rgba(255,255,255,0.15);border-radius:12px;
            padding:14px 32px;font-size:14px;font-weight:600;
            cursor:pointer;transition:background .2s;
            text-decoration:none;display:inline-block;
          }
          .btn-s:hover{background:rgba(255,255,255,0.1)}
          .bg-num{
            position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
            font-size:clamp(200px,40vw,400px);font-weight:900;
            color:#fff;opacity:.02;pointer-events:none;user-select:none;letter-spacing:-.05em;
          }
        `}</style>
      </head>
      <body>
        <div className="bg-num" aria-hidden="true">!</div>
        <div>
          <div className="badge">
            <div className="dot" />
            <span className="label">Critical Error</span>
          </div>
          <h1>A critical error<br />occurred</h1>
          <p>
            Something went wrong at the core of the application. Our team has been
            automatically notified and will resolve this shortly.
          </p>
          {error.digest && (
            <p className="mono">
              Error ID: <code>{error.digest}</code>
            </p>
          )}
          <div className="actions">
            <button onClick={reset} className="btn-p">↺ Reload Page</button>
            <a href="/" className="btn-s">← Go Home</a>
          </div>
        </div>
      </body>
    </html>
  );
}
