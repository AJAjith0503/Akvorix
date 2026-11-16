import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Preloader } from "@/components/ui/Preloader";
import { ExpertEnquiryModal } from "@/components/ui/ExpertEnquiryModal";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { FirstVisitEmailModal } from "@/components/ui/FirstVisitEmailModal";
import { VisitorBehaviorTracker } from "@/components/analytics/VisitorBehaviorTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://akvorix.com"),
  title: {
    default: "AKVORIX — AI Automation Agency | Save Time, Cut Costs, Scale Business",
    template: "%s | AKVORIX",
  },
  description:
    "AKVORIX helps businesses automate operations with AI. Custom AI agents, workflow automation, and intelligent solutions that save hundreds of hours, reduce costs, and scale your business.",
  keywords: [
    "AI automation agency",
    "AI workflow automation",
    "custom AI agents",
    "business automation",
    "n8n automation",
    "AI chatbots",
    "CRM automation",
    "healthcare automation",
    "restaurant automation",
    "real estate automation",
    "lead generation AI",
    "customer support automation",
  ],
  authors: [{ name: "AKVORIX" }],
  creator: "AKVORIX",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akvorix.com",
    siteName: "AKVORIX",
    title: "AKVORIX — AI Automation Agency | Save Time, Cut Costs, Scale Business",
    description:
      "Automate your business with AI. Custom agents, workflow automation, and intelligent solutions built for growth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AKVORIX — AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKVORIX — AI Automation Agency",
    description: "Automate your business with AI. Save time, cut costs, scale faster.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Brand Water Fill Preloader on site load / refresh */}
          <Preloader />

          {/* Expert Enquiry Popup on website open */}
          <ExpertEnquiryModal />

          {/* Cookie Consent Banner */}
          <CookieConsent />

          {/* First-Time Visitor Email Lead Capture */}
          <FirstVisitEmailModal />

          {/* Intelligent Visitor Behavior Tracker */}
          <VisitorBehaviorTracker />

          {/* Global purple glow background */}
          <div className="fixed inset-0 pointer-events-none radial-glow-primary z-[-1]" aria-hidden="true" />
          
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
