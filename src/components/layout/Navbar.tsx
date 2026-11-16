"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoBlack from "@/images/AKVORIX_black_text.png";
import {
  Menu, X, ChevronDown, ArrowRight, Zap,
  Building2, Stethoscope, Pill,
  Layers, HardHat, Car, UtensilsCrossed, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import SpecularButton from "@/components/ui/SpecularButton";
import { preloaderState } from "@/lib/preloaderState";
import { openExpertModal } from "@/components/ui/ExpertEnquiryModal";

const servicesMenu = [
  { icon: Building2, label: "Real Estate AI Agent", href: "/services/real-estate-ai-agent", desc: "Respond to leads in 60 seconds" },
  { icon: Stethoscope, label: "Dental Clinic Receptionist", href: "/services/dental-clinic-receptionist", desc: "Book appointments 24/7" },
  { icon: Pill, label: "Pharmacy Store Assistant", href: "/services/pharmacy-medical-store-assistant", desc: "Check stock, take orders" },
  { icon: Layers, label: "Interior Design Lead Handler", href: "/services/interior-design-lead-handler", desc: "Qualify & book consultations" },
  { icon: HardHat, label: "Construction Quotation Bot", href: "/services/construction-quotation-scheduler", desc: "Automate quotes & site visits" },
  { icon: Car, label: "Car Dealership Reminder Bot", href: "/services/car-dealership-service-reminder-bot", desc: "Service reminders & test drives" },
  { icon: UtensilsCrossed, label: "Restaurant Reservation Bot", href: "/services/restaurant-reservation-assistant", desc: "Take reservations 24/7" },
  { icon: Globe, label: "Website & Web App Development", href: "/services/website-development", desc: "Premium conversion-focused sites" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-primary/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                preloaderState.markDone();
                openExpertModal();
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center group relative h-[38px] md:h-[43px] w-[144px] md:w-[168px] cursor-pointer"
              aria-label="AKVORIX Home"
            >
              <Image
                src={logoBlack}
                alt="AKVORIX Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <SimpleNavLink href="/">Home</SimpleNavLink>
              <SimpleNavLink href="/about">About</SimpleNavLink>
              <NavItem label="Services" hasDropdown onHover={setActiveDropdown} active={activeDropdown === "Services"}>
                <MegaMenuServices />
              </NavItem>
              <SimpleNavLink href="/process">How We Work</SimpleNavLink>
              <SimpleNavLink href="/contact">Contact</SimpleNavLink>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+916363753476" className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">+91 6363753476</a>
              <SpecularButton
                href="/contact#book-call"
                variant="primary"
                className="text-sm px-5 py-2.5 rounded-xl"
              >
                Book Free Call
                <ArrowRight className="w-4 h-4" />
              </SpecularButton>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-primary/5 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden glass-strong overflow-y-auto"
            style={{ paddingTop: "80px" }}
          >
            <div className="container-custom py-8 flex flex-col gap-1">
              <Link
                href="/"
                onClick={(e) => {
                  setMobileOpen(false);
                  preloaderState.markDone();
                  if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "py-3 px-4 rounded-xl transition-colors text-sm font-medium",
                  pathname === "/"
                    ? "text-text-primary bg-primary/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-primary/5"
                )}
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-3 px-4 rounded-xl transition-colors text-sm font-medium",
                  pathname === "/about"
                    ? "text-text-primary bg-primary/5 font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-primary/5"
                )}
              >
                About
              </Link>

              <MobileSection label="Services">
                {servicesMenu.slice(0, 6).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-primary/5 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-text-primary text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
                <Link href="/services" className="flex items-center gap-2 py-3 px-4 text-primary text-sm font-medium">
                  View all services <ArrowRight className="w-4 h-4" />
                </Link>
              </MobileSection>

              <div className="flex flex-col gap-1 mt-4">
                {[
                  { href: "/process", label: "How We Work" },
                  { href: "/contact", label: "Contact" },
                  { href: "tel:+916363753476", label: "+91 6363753476" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "py-3 px-4 rounded-xl transition-colors text-sm font-medium",
                      pathname === item.href
                        ? "text-text-primary bg-primary/5 font-semibold"
                        : "text-text-secondary hover:text-text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <SpecularButton
                  href="/contact#book-call"
                  variant="primary"
                  className="w-full justify-center text-[13px] sm:text-sm py-3 sm:py-3.5 whitespace-nowrap"
                >
                  Book Your Free Discovery Call
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </SpecularButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({
  label,
  hasDropdown,
  children,
  onHover,
  active,
}: {
  label: string;
  hasDropdown?: boolean;
  children?: React.ReactNode;
  onHover?: (label: string | null) => void;
  active?: boolean;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onHover?.(label)}
      onMouseLeave={() => onHover?.(null)}
    >
      <button
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
          active
            ? "text-text-primary bg-primary/5"
            : "text-text-secondary hover:text-text-primary hover:bg-primary/5"
        )}
      >
        {label}
        {hasDropdown && (
          <ChevronDown
            className={cn("w-4 h-4 transition-transform duration-200", active && "rotate-180")}
          />
        )}
      </button>

      <AnimatePresence>
        {active && children && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass-strong border border-primary/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SimpleNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "/") {
      preloaderState.markDone();
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "text-text-primary bg-primary/5"
          : "text-text-secondary hover:text-text-primary hover:bg-primary/5"
      )}
    >
      {children}
    </Link>
  );
}

function MegaMenuServices() {
  return (
    <div className="w-[700px] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">All Services</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {servicesMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group"
          >
            <div className="mt-0.5 p-2 rounded-lg bg-gradient-to-br from-[#6B3F69] via-[#8B5F89] to-[#A97EA7] text-white shadow-sm transition-transform group-hover:scale-105">
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary group-hover:text-text-primary transition-colors">{item.label}</div>
              <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link
          href="/services"
          className="flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-200"
        >
          View all services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 px-4 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium rounded-xl hover:bg-primary/5"
      >
        {label}
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
