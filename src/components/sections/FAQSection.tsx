"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const faqs = [
  {
    q: "How quickly can you implement automation for my business?",
    a: "Most automation projects are live in under 2 weeks. Whether it's simple automations (chatbots, email sequences) or complex multi-system integrations, we deliver rapidly without compromising quality.",
  },
  {
    q: "Do I need to have technical knowledge to use your automations?",
    a: "Not at all. We handle all the technical work from design to deployment. You'll receive a simple dashboard to monitor your automations, and our team provides full training so your staff can manage day-to-day operations without technical expertise.",
  },
  {
    q: "What's the typical ROI on automation projects?",
    a: "Our clients average 8× ROI within the first 6 months. This includes direct cost savings (reduced staff hours, lower error rates, fewer missed opportunities) and revenue gains (faster lead response, better conversion, more capacity). We provide ROI projections before any project begins.",
  },
  {
    q: "How do you handle data security and privacy?",
    a: "We take security seriously. All automations use encrypted connections, data is never stored longer than necessary, and we sign NDAs before beginning any project. For healthcare clients, we operate under full HIPAA compliance with Business Associate Agreements.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "Yes! We serve clients across the USA, Europe, and India. Our team operates across multiple time zones, and we're experienced with GDPR compliance for European clients and local regulations for Indian businesses.",
  },
  {
    q: "What if I'm not satisfied with the results?",
    a: "We stand behind our work. Every project includes a 30-day post-launch support period. If the automation isn't performing as specified, we fix it at no additional cost. Our 98% client retention rate speaks to how well we deliver on our promises.",
  },
  {
    q: "Can you integrate with the tools we already use?",
    a: "Almost certainly yes. We integrate with 500+ business tools including Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, Shopify, Stripe, QuickBooks, and hundreds more. If you use a tool with an API, we can connect it.",
  },
  {
    q: "What's the difference between you and using something like Zapier?",
    a: "Zapier handles simple, linear triggers. We build intelligent automation with AI reasoning, complex conditional logic, error handling, and custom business rules. We also design, build, and maintain everything for you — you're not left trying to figure out a tool.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="absolute inset-0 bg-surface/40" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <FadeIn className="mb-14 text-center">
          <h2 id="faq-heading" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4 sm:mb-6">
            Questions we get
            <span className="gradient-text"> all the time</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Everything you need to know before booking your discovery call.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <dl className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="glass border border-border rounded-2xl overflow-hidden"
                >
                  <dt>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                      aria-expanded={open === i}
                      id={`faq-question-${i}`}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span className="font-medium text-text-primary text-sm md:text-base">{faq.q}</span>
                      <motion.div
                        animate={{ rotate: open === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />
                      </motion.div>
                    </button>
                  </dt>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.dd
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                          <div className="h-px bg-border mb-4" aria-hidden="true" />
                          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </dl>

            <div className="mt-10 text-center">
              <p className="text-text-muted text-sm mb-4">
                Still have questions?
              </p>
              <a
                href="/contact"
                className="text-primary hover:text-accent transition-colors font-medium text-sm"
              >
                Send us a message →
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
