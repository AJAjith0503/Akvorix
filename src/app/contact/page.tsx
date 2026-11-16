"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { Mail, Phone, MapPin, Send, Loader2, Linkedin, Instagram } from "lucide-react";
import { RobotHoverIndicator } from "@/components/ui/RobotHoverIndicator";
import { getVisitorBehavior, captureVisitorEmail } from "@/lib/visitorTracker";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "AI Workflow Automation",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          type: "contact",
          ...formData,
          behavior: currentBehavior,
        }),
      });

      let result: any = {};
      try {
        result = await res.json();
      } catch {
        result = { error: `Server error (${res.status} ${res.statusText})` };
      }

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      // Record email & behavior in visitor lead database
      captureVisitorEmail(formData.email, currentBehavior);

      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-14 md:pb-24" aria-labelledby="contact-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h1 id="contact-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary mb-8 leading-tight">
              Let's build your
              <br />
              <span className="gradient-text">automated future</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              Whether you want to book a discovery call or just ask a question, our team is ready to help.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" id="book-call">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Contact Info */}
            <FadeIn>
              <div className="flex flex-col gap-10">
                <div>
                   <h2 className="font-display font-bold text-3xl text-text-primary mb-4">Get in touch</h2>
                   <p className="text-text-secondary text-lg">Have a specific project in mind? Fill out the form or use our direct contact details below.</p>
                </div>

                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25 flex items-center justify-center shrink-0">
                         <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                         <div className="text-sm text-text-muted mb-1">Email us</div>
                         <a href="mailto:akvorix.support@gmail.com" className="text-lg font-medium text-text-primary hover:text-primary transition-colors">akvorix.support@gmail.com</a>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25 flex items-center justify-center shrink-0">
                         <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                         <div className="text-sm text-text-muted mb-1">Call us</div>
                         <a href="tel:+916363753476" className="text-lg font-medium text-text-primary hover:text-accent transition-colors">+91 6363753476</a>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-md shadow-[#6B3F69]/25 flex items-center justify-center shrink-0">
                         <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                         <div className="text-sm text-text-muted mb-1">Global HQ</div>
                         <div className="text-lg font-medium text-text-primary">San Francisco, CA<br/><span className="text-sm font-normal text-text-secondary">Offices in London & Bangalore</span></div>
                      </div>
                   </div>

                   <div className="flex flex-col gap-2 pt-2">
                      <div className="text-sm text-text-muted">Connect on Social</div>
                      <div className="flex items-center gap-3">
                         <a
                            href="https://www.linkedin.com/company/akvorix"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-[#6B3F69]/10 via-[#8B5F89]/10 to-[#A97EA7]/10 hover:from-[#6B3F69] hover:via-[#8B5F89] hover:to-[#A97EA7] text-text-primary hover:text-white border border-[#6B3F69]/20 hover:border-transparent transition-all duration-300 text-sm font-medium shadow-sm"
                         >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                         </a>
                         <a
                            href="https://www.instagram.com/akvorix/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-[#6B3F69]/10 via-[#8B5F89]/10 to-[#A97EA7]/10 hover:from-[#6B3F69] hover:via-[#8B5F89] hover:to-[#A97EA7] text-text-primary hover:text-white border border-[#6B3F69]/20 hover:border-transparent transition-all duration-300 text-sm font-medium shadow-sm"
                         >
                            <Instagram className="w-4 h-4" />
                            Instagram
                         </a>
                      </div>
                   </div>
                </div>

                <div className="glass border border-primary/20 rounded-3xl p-8 bg-gradient-to-br from-primary/5 to-transparent mt-4">
                   <h3 className="font-display font-bold text-xl text-text-primary mb-2">Book directly on Calendly</h3>
                   <p className="text-text-secondary text-sm mb-6">Skip the form and pick a time that works for you directly on our calendar.</p>
                   {/* Placeholder for Calendly embed - in real app, use react-calendly */}
                   <a href="#" className="btn-secondary w-full justify-center py-3">Open Calendar</a>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.2} direction="left">
               <div className="glass border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  {isSubmitted ? (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-16 h-full relative z-10"
                     >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-lg shadow-[#6B3F69]/30 flex items-center justify-center mb-6">
                           <Send className="w-8 h-8 ml-1" />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-text-primary mb-3">Message sent!</h3>
                        <p className="text-text-secondary mb-8 max-w-sm">Thanks for reaching out. A member of our strategy team will get back to you within 24 hours.</p>
                        <button onClick={() => setIsSubmitted(false)} className="btn-secondary px-6 py-2 text-sm">Send another message</button>
                     </motion.div>
                  ) : (
                     <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                        {/* Name & Phone Number */}
                        <div className="grid md:grid-cols-2 gap-6">
                           <div className="flex flex-col gap-2">
                              <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                              <input
                                 type="text"
                                 id="name"
                                 name="name"
                                 value={formData.name}
                                 onChange={handleChange}
                                 required
                                 className="bg-surface/50 border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                                 placeholder="Your full name"
                              />
                           </div>
                           <div className="flex flex-col gap-2">
                              <label htmlFor="phone" className="text-sm font-medium text-text-secondary">Phone Number</label>
                              <input
                                 type="tel"
                                 id="phone"
                                 name="phone"
                                 value={formData.phone}
                                 onChange={handleChange}
                                 required
                                 className="bg-surface/50 border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                                 placeholder="+91 / +1 (555) 000-0000"
                              />
                           </div>
                        </div>

                        {/* Sender User Email */}
                        <div className="flex flex-col gap-2">
                           <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                           <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="bg-surface/50 border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                              placeholder="you@company.com"
                           />
                        </div>

                        {/* Selection */}
                        <div className="flex flex-col gap-2">
                           <label htmlFor="interest" className="text-sm font-medium text-text-secondary">Selection (I'm interested in...)</label>
                           <select id="interest" name="interest" value={formData.interest} onChange={handleChange} className="bg-surface/50 border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                              <option value="General Inquiry">General Inquiry</option>
                              <option value="AI Workflow Automation">AI Workflow Automation</option>
                              <option value="Custom AI Agents">Custom AI Agents</option>
                              <option value="AI Chatbots">AI Chatbots</option>
                              <option value="Other Services">Other Services</option>
                           </select>
                        </div>

                        <div className="flex flex-col gap-2">
                           <label htmlFor="message" className="text-sm font-medium text-text-secondary">How can we help?</label>
                           <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required className="bg-surface/50 border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Tell us a bit about your current workflows and what you'd like to automate..." />
                        </div>

                        {errorMessage && (
                           <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                              {errorMessage}
                           </div>
                        )}

                        <button type="submit" disabled={isSubmitting} className="relative group btn-primary w-full justify-center py-4 text-base mt-2">
                           <RobotHoverIndicator align="center" />
                           {isSubmitting ? (
                              <>
                                 <Loader2 className="w-5 h-5 animate-spin" />
                                 Sending...
                              </>
                           ) : (
                              <>
                                 Send Message
                                 <Send className="w-4 h-4 ml-1" />
                              </>
                           )}
                        </button>
                        
                        <p className="text-xs text-text-muted text-center">By submitting this form, you agree to our Privacy Policy.</p>
                     </form>
                  )}
               </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
