"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { preloaderState } from "@/lib/preloaderState";
import { RobotHoverIndicator } from "./RobotHoverIndicator";
import { captureVisitorEmail, getVisitorBehavior } from "@/lib/visitorTracker";

const SERVICES_OPTIONS = [
  "Real Estate AI Agent",
  "Dental Clinic Receptionist",
  "Pharmacy & Medical Store Assistant",
  "Interior Design Lead Handler",
  "Construction Quotation Scheduler",
  "Car Dealership Reminder Bot",
  "Restaurant Reservation Assistant",
  "Website & Web App Development",
  "Custom AI Workflow Automation",
];

// Clear any stale sessionStorage dismissal flags so every reload triggers the modal
if (typeof window !== "undefined") {
  try {
    sessionStorage.removeItem("akvorix_expert_modal_dismissed");
    sessionStorage.removeItem("agnitix_expert_modal_dismissed");
  } catch {}
}

export function openExpertModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-expert-modal"));
  }
}

export function ExpertEnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    requirement: "",
  });

  // Open modal automatically every time the website reloads
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    // Wait until preloader is done so the popup doesn't appear under the loader
    preloaderState.onDone(() => {
      // Small 700ms delay after preloader fades so the user first sees the site
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
    });

    // Also listen to custom preloader-complete event as backup
    const onPreloaderComplete = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
    };
    window.addEventListener("preloader-complete", onPreloaderComplete);

    // Fallback: If preloader doesn't fire for any reason within 6s, open anyway
    const fallbackTimer = setTimeout(() => {
      setIsOpen((prev) => (prev ? prev : true));
    }, 6000);

    // Listen to custom event to open modal whenever user clicks on the logo
    const handleOpenModal = () => {
      setIsSubmitted(false);
      setIsOpen(true);
    };
    window.addEventListener("open-expert-modal", handleOpenModal);

    return () => {
      if (timer) clearTimeout(timer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("preloader-complete", onPreloaderComplete);
      window.removeEventListener("open-expert-modal", handleOpenModal);
    };
  }, []);

  // Close handler (does not persist in sessionStorage so reload always shows it again)
  const handleClose = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  // Lock scroll when open, ensure body scroll is ALWAYS restored when closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const currentBehavior = getVisitorBehavior();
      const apiUrl =
        typeof window !== "undefined" && window.location.hostname === "akvorix.com"
          ? "https://www.akvorix.com/api/contact"
          : "/api/contact";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "expert-modal",
          ...formData,
          behavior: currentBehavior,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = { error: `Server error (${res.status} ${res.statusText})` };
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      // Record in visitor database as captured lead
      captureVisitorEmail(formData.email, currentBehavior);

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Enquiry submission failed:", err);
      setErrorMessage(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          {/* Backdrop blur & overlay with AKVORIX purple tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#080808]/75 backdrop-blur-md"
          />

          {/* Modal Container — AKVORIX Glass Card with Ambient Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] sm:max-w-[470px] bg-white/95 dark:bg-[#130E16]/95 text-text-primary rounded-3xl shadow-2xl shadow-[#6B3F69]/25 border border-primary/20 p-5 sm:p-7 z-10 my-auto overflow-hidden backdrop-blur-2xl"
          >
            {/* Ambient Purple Theme Glows */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#6B3F69]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#8B5F89]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Header: Brand Badge, Title, and Close Button */}
            <div className="relative z-10 flex items-start justify-between mb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold mb-2">
                  <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  <span>AKVORIX AI Specialists</span>
                </div>
                <h2
                  id="modal-title"
                  className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight leading-tight"
                >
                  Talk to Our <span className="gradient-text">Experts</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="w-9 h-9 rounded-full border border-border hover:border-primary/50 flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-200 focus:outline-none shrink-0 ml-3"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              /* Success Message */
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-xl shadow-[#6B3F69]/35 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-text-primary mb-2">
                  Enquiry Received!
                </h3>
                <p className="text-sm text-text-secondary max-w-xs mb-6 leading-relaxed">
                  Thank you, <span className="font-semibold text-text-primary">{formData.name}</span>. One of our AI specialists will reach out to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-primary px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-md shadow-[#6B3F69]/30"
                >
                  Close Window
                </button>
              </div>
            ) : (
              /* Enquiry Form */
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                {/* Inner Border Container with Theme Accent */}
                <div className="rounded-2xl border border-primary/15 p-3.5 sm:p-4 bg-gradient-to-b from-primary/[0.04] to-transparent space-y-3">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name *"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-border bg-surface/90 text-text-primary placeholder:text-text-muted/70 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Mobile No */}
                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile No *"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-border bg-surface/90 text-text-primary placeholder:text-text-muted/70 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Email Id */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Id *"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-border bg-surface/90 text-text-primary placeholder:text-text-muted/70 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Service Interested In */}
                  <div>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-primary/50 hover:border-primary bg-surface/90 text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer font-medium"
                    >
                      <option value="" disabled className="text-text-muted">
                        Service Interested In *
                      </option>
                      {SERVICES_OPTIONS.map((srv) => (
                        <option key={srv} value={srv} className="text-text-primary bg-surface">
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Requirement */}
                  <div>
                    <textarea
                      name="requirement"
                      required
                      rows={3}
                      value={formData.requirement}
                      onChange={handleChange}
                      placeholder="Tell us about your requirement *"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-border bg-surface/90 text-text-primary placeholder:text-text-muted/70 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center my-2">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button — Signature AKVORIX Primary Gradient + Robot Hover Indicator */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative group w-full bg-gradient-to-r from-[#6B3F69] via-[#8B5F89] to-[#6B3F69] hover:from-[#5A3358] hover:via-[#7A4F78] hover:to-[#5A3358] active:scale-[0.99] text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#6B3F69]/35 hover:shadow-xl hover:shadow-[#6B3F69]/50 transition-all duration-300 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  <RobotHoverIndicator align="center" size="sm" />
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Subtext */}
                <p className="text-[11px] sm:text-xs text-center text-text-muted leading-relaxed flex items-center justify-center gap-1.5 px-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Your enquiry is verified before WhatsApp hand-off or direct team follow-up.</span>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
