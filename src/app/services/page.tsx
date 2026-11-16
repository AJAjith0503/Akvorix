import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "AI Automation Services — AKVORIX",
  description:
    "Explore custom AI automation services by AKVORIX: Real Estate AI Agent, Dental Receptionist, Pharmacy Assistant, Interior Design Lead Handler, and more.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
