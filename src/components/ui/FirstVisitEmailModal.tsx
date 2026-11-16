"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Check, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { captureVisitorEmail } from "@/lib/visitorTracker";

export function FirstVisitEmailModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const alreadyCaptured = localStorage.getItem("akvorix_lead_captured");
    const dismissed = sessionStorage.getItem("akvorix_email_prompt_dismissed");

    if (!alreadyCaptured && !dismissed) {
      // Show gracefully after 7 seconds of browsing
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("akvorix_email_prompt_dismissed", "true");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    try {
      const success = await captureVisitorEmail(email);
      if (success) {
        setIsSubmitted(true);
        localStorage.setItem("akvorix_lead_captured", "true");
        setTimeout(() => {
          setIsOpen(false);
        }, 2800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[90] max-w-[360px] w-[calc(100%-2rem)] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto rounded-2xl bg-[#141416]/95 text-white border border-[#6B3F69]/40 shadow-2xl shadow-[#6B3F69]/20 backdrop-blur-xl p-4 sm:p-5 relative overflow-hidden"
          >
            {/* Ambient Purple Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#6B3F69]/30 blur-2xl pointer-events-none" />

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="py-4 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm text-white">You're on the list!</h4>
                <p className="text-xs text-gray-300 mt-1">
                  We've sent our AI Automation Guide to <span className="text-primary font-medium">{email}</span>.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    First-Time Visitor Offer
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-white tracking-tight mb-1">
                  Get our AI Workflow Blueprint
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  Enter your email to receive our curated enterprise automation templates and ROI framework.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#6B3F69] to-[#8B5F89] hover:from-[#5A3358] hover:to-[#5A3358] text-white font-medium text-xs shadow-md shadow-[#6B3F69]/25 flex items-center justify-center gap-1.5 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Capturing...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Blueprint</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-[10px] text-gray-400 text-center mt-2">
                  Instant access • No spam guaranteed
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
