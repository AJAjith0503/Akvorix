"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cookie,
  X,
  Check,
  ShieldCheck,
  Sliders,
  ChevronRight,
  Sparkles,
  BarChart3,
  Target,
  Lock,
} from "lucide-react";
import { preloaderState } from "@/lib/preloaderState";
import { recordVisit } from "@/lib/visitorTracker";

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
  }
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("akvorix_cookie_consent");

    if (!consent) {
      // Delay so it appears gracefully after site presentation
      preloaderState.onDone(() => {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1400);
        return () => clearTimeout(timer);
      });

      // Fallback timer if preloader was already completed or skipped
      const fallback = setTimeout(() => {
        if (!localStorage.getItem("akvorix_cookie_consent")) {
          setIsOpen(true);
        }
      }, 4500);

      return () => clearTimeout(fallback);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
        if (parsed.analytics) {
          recordVisit(true);
        }
      } catch {}
    }

    // Reopen event from footer or button
    const handleReopen = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-cookie-preferences", handleReopen);
    return () => window.removeEventListener("open-cookie-preferences", handleReopen);
  }, []);

  const saveConsent = (status: "accepted" | "rejected" | "custom", ana = false, mkt = false) => {
    const payload = {
      status,
      analytics: ana,
      marketing: mkt,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("akvorix_cookie_consent", JSON.stringify(payload));
    document.cookie = `akvorix_cookie_consent=${status}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: payload }));
    setIsOpen(false);
    setShowCustomModal(false);

    if (ana) {
      recordVisit(true);
    }
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    saveConsent("accepted", true, true);
  };

  const handleRejectNonEssential = () => {
    setAnalytics(false);
    setMarketing(false);
    saveConsent("rejected", false, false);
  };

  const handleSaveCustom = () => {
    saveConsent("custom", analytics, marketing);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── Discreet Floating Cookie Trigger Pill (Allows user to reopen anytime) ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Cookie Preferences"
            className="fixed bottom-4 left-4 z-40 p-2.5 rounded-full bg-surface/90 hover:bg-surface text-text-muted hover:text-primary border border-border/80 shadow-lg shadow-black/20 backdrop-blur-md transition-all hover:scale-105 group"
            title="Cookie Preferences"
          >
            <Cookie className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Main Permission Popup Window (Direct Match to User Specification) ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-x-0 bottom-3 sm:bottom-6 z-[100] flex justify-center px-3 sm:px-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-[420px] pointer-events-auto rounded-2xl bg-[#141416]/95 text-white border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden p-4 sm:p-5"
              role="dialog"
              aria-modal="true"
              aria-label="Cookie & Analytics Consent"
            >
              {!showCustomModal ? (
                /* ── Card Specification matching Screenshot ── */
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm sm:text-base text-white tracking-tight">
                      May we count your visit?
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowCustomModal(true)}
                      className="text-xs sm:text-sm text-[#38bdf8] hover:text-[#60a5fa] underline underline-offset-2 transition-colors font-normal"
                    >
                      Preferences
                    </button>
                  </div>

                  <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed mb-4">
                    Google Analytics and Cloudflare Web Analytics show us which pages get used. They stay off unless you accept. Google Analytics sets cookies.
                  </p>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 py-2 px-3 sm:px-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-medium text-xs sm:text-sm transition-all text-center"
                    >
                      Accept analytics
                    </button>
                    <button
                      type="button"
                      onClick={handleRejectNonEssential}
                      className="flex-1 py-2 px-3 sm:px-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-medium text-xs sm:text-sm transition-all text-center"
                    >
                      Reject analytics
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Detailed Granular Preference Controls View ── */
                <div>
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#38bdf8]" />
                      <h3 className="font-semibold text-xs sm:text-sm text-white">
                        Analytics &amp; Cookie Preferences
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowCustomModal(false)}
                      className="text-[11px] sm:text-xs text-gray-400 hover:text-white transition-colors py-0.5 px-2 rounded border border-white/10"
                    >
                      Back
                    </button>
                  </div>

                  <div className="flex flex-col gap-2.5 mb-4 max-h-[220px] overflow-y-auto pr-1">
                    {/* Strictly Necessary */}
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-xs text-white">Strictly Necessary</span>
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                            Required
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                          Essential navigation and security cookies. Cannot be disabled.
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium italic pt-0.5">
                        Always On
                      </span>
                    </div>

                    {/* Analytics */}
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-xs text-white">Analytics &amp; Performance</span>
                          <span className="px-1.5 py-0.2 rounded text-[8px] text-gray-400 bg-white/5">
                            Telemetry
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                          Counts visits and tracks anonymous page performance.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-0.5">
                        <input
                          type="checkbox"
                          checked={analytics}
                          onChange={(e) => setAnalytics(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4.5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#38bdf8]"></div>
                      </label>
                    </div>

                    {/* Marketing */}
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-xs text-white">Marketing &amp; Attribution</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                          Evaluates marketing and partner campaign referrals.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-0.5">
                        <input
                          type="checkbox"
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4.5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#38bdf8]"></div>
                      </label>
                    </div>
                  </div>

                  {/* Save Choices Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveCustom}
                      className="flex-1 py-1.5 px-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs transition-all text-center"
                    >
                      Save choices
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 py-1.5 px-3 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#0f172a] font-semibold text-xs transition-all text-center"
                    >
                      Accept all
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
