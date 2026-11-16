"use client";

import React, { useState, useEffect } from "react";
import { Check, ShieldCheck, Sparkles, Sliders, RefreshCw, CheckCircle2 } from "lucide-react";

export function CookiePreferenceCenter() {
  const [mounted, setMounted] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("akvorix_cookie_consent");
    if (consent) {
      try {
        const parsed = JSON.parse(consent);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
        setSavedStatus(parsed.status);
      } catch {}
    }
  }, []);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const savePreferences = (type: "custom" | "all" | "minimal") => {
    let nextAnalytics = analytics;
    let nextMarketing = marketing;

    if (type === "all") {
      nextAnalytics = true;
      nextMarketing = true;
      setAnalytics(true);
      setMarketing(true);
    } else if (type === "minimal") {
      nextAnalytics = false;
      nextMarketing = false;
      setAnalytics(false);
      setMarketing(false);
    }

    const payload = {
      status: type === "all" ? "accepted" : type === "minimal" ? "rejected" : "custom",
      analytics: nextAnalytics,
      marketing: nextMarketing,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("akvorix_cookie_consent", JSON.stringify(payload));
    document.cookie = `akvorix_cookie_consent=${payload.status}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: payload }));

    setSavedStatus(payload.status);
    setToastMessage(
      type === "all"
        ? "All cookies accepted successfully!"
        : type === "minimal"
        ? "Essential cookies only enabled."
        : "Your customized cookie preferences have been saved."
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  if (!mounted) {
    return (
      <div className="p-6 rounded-2xl bg-surface/50 border border-border animate-pulse">
        <div className="h-6 w-48 bg-primary/20 rounded mb-4" />
        <div className="h-20 bg-surface rounded mb-4" />
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-primary/25 bg-gradient-to-br from-[#6B3F69]/10 via-surface/80 to-surface/95 dark:from-[#6B3F69]/20 dark:via-[#130E16]/90 dark:to-[#130E16]/95 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-[#6B3F69]/15">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Privacy Console</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-text-primary">
            Manage Your Cookie Preferences
          </h2>
          <p className="text-text-muted text-sm mt-1">
            Toggle your preferences below. Changes take effect immediately across all sessions.
          </p>
        </div>

        {savedStatus && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface/90 border border-border text-xs text-text-secondary self-start sm:self-auto shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Status: <strong className="capitalize text-text-primary">{savedStatus}</strong></span>
          </div>
        )}
      </div>

      {/* Toggle Cards */}
      <div className="grid gap-4 py-6 relative z-10">
        {/* Strictly Necessary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface/70 border border-border/70 hover:border-border transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary text-base">Strictly Necessary Cookies</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Required
                </span>
              </div>
              <p className="text-text-muted text-xs sm:text-sm mt-1 leading-relaxed">
                Critical for website routing, dark/light theme persistence, CSRF security, and preloader session tracking. Cannot be disabled.
              </p>
            </div>
          </div>
          <div className="sm:self-center shrink-0 pl-13 sm:pl-0">
            <span className="text-xs font-semibold text-text-muted italic">Always Active</span>
          </div>
        </div>

        {/* Analytics & Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface/70 border border-border/70 hover:border-primary/30 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary text-base">Analytics & Performance</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface border border-border text-text-muted">
                  Telemetry
                </span>
              </div>
              <p className="text-text-muted text-xs sm:text-sm mt-1 leading-relaxed">
                Aggregates anonymous user interaction metrics, page latency, and workflow demo engagement to help us optimize UI performance.
              </p>
            </div>
          </div>
          <div className="sm:self-center shrink-0 pl-13 sm:pl-0">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="sr-only peer"
                aria-label="Toggle Analytics & Performance Cookies"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* Marketing & Attribution */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface/70 border border-border/70 hover:border-primary/30 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary text-base">Marketing & Campaign Attribution</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface border border-border text-text-muted">
                  Ad Tracking
                </span>
              </div>
              <p className="text-text-muted text-xs sm:text-sm mt-1 leading-relaxed">
                Helps measure the conversion rate of AI agency advertisements on professional platforms like LinkedIn and Google Ads.
              </p>
            </div>
          </div>
          <div className="sm:self-center shrink-0 pl-13 sm:pl-0">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="sr-only peer"
                aria-label="Toggle Marketing & Campaign Attribution Cookies"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons & Feedback */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-border/80 relative z-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => savePreferences("custom")}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#6B3F69] via-[#8B5F89] to-[#6B3F69] hover:from-[#5A3358] hover:to-[#5A3358] text-white font-medium text-sm shadow-md shadow-[#6B3F69]/30 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save My Preferences
          </button>

          <button
            type="button"
            onClick={() => savePreferences("all")}
            className="py-2.5 px-4 rounded-xl border border-primary/30 hover:border-primary/60 bg-primary/10 text-primary font-medium text-sm transition-all"
          >
            Accept All
          </button>

          <button
            type="button"
            onClick={() => savePreferences("minimal")}
            className="py-2.5 px-4 rounded-xl border border-border bg-surface/80 hover:bg-surface text-text-secondary hover:text-text-primary text-sm transition-all"
          >
            Reject Non-Essential
          </button>
        </div>

        {toastMessage && (
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
