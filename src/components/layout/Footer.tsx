"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import Image from "next/image";
import logoWhite from "@/images/AKVORIX_white_text.png";
import logoBlack from "@/images/AKVORIX_black_text.png";
import SpecularButton from "@/components/ui/SpecularButton";
import { openExpertModal } from "@/components/ui/ExpertEnquiryModal";
import { openCookiePreferences } from "@/components/ui/CookieConsent";

const footerLinks = {
  services: [
    { label: "Real Estate AI Agent", href: "/services/real-estate-ai-agent" },
    { label: "Dental Clinic Receptionist", href: "/services/dental-clinic-receptionist" },
    { label: "Pharmacy Store Assistant", href: "/services/pharmacy-medical-store-assistant" },
    { label: "Interior Design Lead Handler", href: "/services/interior-design-lead-handler" },
    { label: "Construction Quotation Bot", href: "/services/construction-quotation-scheduler" },
    { label: "Car Dealership Reminder Bot", href: "/services/car-dealership-service-reminder-bot" },
    { label: "Restaurant Reservation Bot", href: "/services/restaurant-reservation-assistant" },
    { label: "Website Development", href: "/services/website-development" },
  ],
  industries: [
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Restaurants", href: "/industries/restaurants" },
    { label: "Professional Services", href: "/industries/professional-services" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "How We Work", href: "/process" },
    { label: "Technology", href: "/technology" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden" aria-label="Site footer">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container-custom py-16 md:py-20 relative z-10">
        {/* Top CTA Banner */}
        <div className="mb-10 sm:mb-16 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl glass border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Ready to Automate Your Business?
              </h2>
              <p className="text-text-secondary">
                Book a free 15-minute discovery call. No sales pitch — just honest advice.
              </p>
            </div>
            <SpecularButton
              href="/contact#book-call"
              variant="primary"
              className="shrink-0 px-4 sm:px-8 py-3 sm:py-4 text-[13px] sm:text-base whitespace-nowrap"
            >
              Book Free Discovery Call
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </SpecularButton>
          </div>
        </div>

        {/* Footer Grid / Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-row lg:justify-between lg:items-start gap-x-6 sm:gap-x-8 gap-y-10 lg:gap-y-0 lg:gap-x-6 xl:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:w-[240px] xl:w-[260px] lg:shrink-0">
            <Link
              href="/"
              id="footer-logo-anchor"
              onClick={(e) => {
                openExpertModal();
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center group relative h-[38px] md:h-[48px] w-[144px] md:w-[180px] mb-4 cursor-pointer"
              aria-label="AKVORIX Home"
            >
              <Image 
                src={logoWhite} 
                alt="AKVORIX Logo" 
                fill 
                className="object-contain hidden dark:block"
              />
              <Image 
                src={logoBlack} 
                alt="AKVORIX Logo" 
                fill 
                className="object-contain block dark:hidden"
              />
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              We help businesses automate operations using AI — saving time, reducing costs, and scaling without limits.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:akvorix.support@gmail.com" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                akvorix.support@gmail.com
              </a>
              <a href="tel:+916363753476" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +91 6363753476
              </a>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/akvorix", label: "LinkedIn" },
                { Icon: Instagram, href: "https://www.instagram.com/akvorix/", label: "Instagram" },
                { Icon: Twitter, href: "https://twitter.com/akvorix", label: "Twitter" },
                { Icon: Youtube, href: "https://youtube.com/@akvorix", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6B3F69]/10 via-[#8B5F89]/10 to-[#A97EA7]/10 hover:from-[#6B3F69] hover:via-[#8B5F89] hover:to-[#A97EA7] text-text-muted hover:text-white border border-[#6B3F69]/20 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1 lg:shrink-0">
            <h3 className="text-text-primary font-semibold text-sm mb-4">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm animated-underline block leading-snug xl:whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="col-span-1 lg:shrink-0">
            <h3 className="text-text-primary font-semibold text-sm mb-4">Industries</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.industries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm animated-underline block leading-snug xl:whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 lg:shrink-0">
            <h3 className="text-text-primary font-semibold text-sm mb-4">Company</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm animated-underline block leading-snug xl:whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1 lg:shrink-0">
            <h3 className="text-text-primary font-semibold text-sm mb-4">Legal</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm animated-underline block leading-snug xl:whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:w-[230px] xl:w-[260px] lg:shrink-0">
            <h3 className="text-text-primary font-semibold text-sm mb-4">Stay Ahead</h3>
            <p className="text-text-muted text-sm mb-4">
              Get weekly AI automation insights. No spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl glass border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                aria-label="Email address for newsletter"
              />
              <SpecularButton
                type="submit"
                variant="primary"
                className="w-full justify-center py-3 text-sm"
              >
                Subscribe
              </SpecularButton>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} AKVORIX. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openCookiePreferences}
              className="text-text-muted hover:text-primary transition-colors text-sm underline decoration-dotted"
            >
              Cookie Preferences
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="text-text-muted text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
