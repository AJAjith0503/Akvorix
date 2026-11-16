"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <h2 id="testimonials-heading" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4 sm:mb-6">
            Businesses that trusted AI
            <br />
            <span className="gradient-text">never looked back</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">
            Hear directly from the founders, directors, and operators who transformed their businesses with AKVORIX.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Main testimonial */}
            <div className="relative glass border border-border rounded-3xl p-8 md:p-12 mb-6 overflow-hidden">
              <div className="absolute top-6 right-6 md:top-10 md:right-10" aria-hidden="true">
                <Quote className="w-12 h-12 md:w-16 md:h-16 text-primary/10" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <blockquote className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-primary font-medium leading-relaxed mb-6 sm:mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary">{testimonial.name}</div>
                        <div className="text-text-muted text-sm">{testimonial.title} · {testimonial.company}</div>
                        <div className="text-primary text-xs font-medium mt-0.5">{testimonial.industry}</div>
                      </div>
                    </div>

                    <div className="glass border border-primary/20 rounded-2xl px-5 py-3 text-center">
                      <div className="font-display font-bold text-2xl text-text-primary">{testimonial.metrics.value}</div>
                      <div className="text-text-muted text-xs">{testimonial.metrics.label}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === current ? "true" : undefined}
                    className={`transition-all duration-300 rounded-full ${
                      i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-text-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-primary/40 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-primary/40 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
