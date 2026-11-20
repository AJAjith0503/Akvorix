import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { FullPageScrollRobot } from "@/components/ui/FullPageScrollRobot";

export const metadata: Metadata = {
  title: "AKVORIX — AI Automation Agency | Save Time, Cut Costs, Scale Business",
  description:
    "AKVORIX helps businesses automate operations using AI Agents, Workflow Automation, and Custom Software. Save hundreds of hours, reduce costs by 60%, and scale without limits.",
  alternates: {
    canonical: "https://akvorix.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AKVORIX",
  url: "https://akvorix.com",
  logo: "https://akvorix.com/logo.png",
  description: "AI Automation Agency helping businesses automate operations, reduce costs, and scale using artificial intelligence.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+916363753476",
    contactType: "sales",
    areaServed: ["US", "GB", "IN"],
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/akvorix",
    "https://www.instagram.com/akvorix/",
    "https://twitter.com/akvorix",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hoskote, Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "562114",
    addressCountry: "IN",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Unified full-page dotted line & tracking robot from Hero to Footer logo */}
      <FullPageScrollRobot />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <WorkflowSection />
      <ProcessPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
