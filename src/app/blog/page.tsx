import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Search } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Blog & Insights — AI Automation Resources | AKVORIX",
  description: "Learn how to automate your business. Read our latest guides, tutorials, and case studies on AI automation, n8n, custom agents, and more.",
};

const posts = [
  {
    slug: "ai-automation-roi-guide",
    category: "Guide",
    readTime: "8 min read",
    title: "How to Calculate the ROI of AI Automation (With Real Examples)",
    excerpt: "Most businesses underestimate how much manual processes cost them. This guide walks through a framework to calculate exact ROI from automation investments.",
    date: "Jul 15, 2026",
    categoryColor: "text-primary bg-primary/10 border-primary/20",
  },
  {
    slug: "n8n-vs-zapier-2026",
    category: "Comparison",
    readTime: "6 min read",
    title: "n8n vs Zapier in 2026: Which Automation Platform Is Right for Your Business?",
    excerpt: "Both tools automate workflows, but they're built for very different needs. Here's an honest breakdown of when to use each — and when to use neither.",
    date: "Jul 10, 2026",
    categoryColor: "text-accent bg-accent/10 border-accent/20",
  },
  {
    slug: "ai-agents-business-guide",
    category: "Deep Dive",
    readTime: "12 min read",
    title: "AI Agents Explained: The Plain-English Guide for Business Owners",
    excerpt: "You keep hearing about 'AI agents.' But what actually are they, what can they do for your business, and how are they different from chatbots?",
    date: "Jul 5, 2026",
    categoryColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    slug: "automate-customer-support",
    category: "Tutorial",
    readTime: "10 min read",
    title: "How We Automate 80% of Customer Support Without Annoying Users",
    excerpt: "The secret to AI customer support isn't better AI—it's better handoffs to humans. Learn our framework for deploying support agents that actually help.",
    date: "Jun 28, 2026",
    categoryColor: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  {
    slug: "healthcare-hipaa-ai",
    category: "Industry",
    readTime: "7 min read",
    title: "HIPAA Compliant AI: What Healthcare Practices Need to Know",
    excerpt: "A breakdown of what makes an AI system HIPAA compliant, what tools you can and can't use, and how to safely automate patient intake.",
    date: "Jun 15, 2026",
    categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    slug: "real-estate-lead-routing",
    category: "Case Study",
    readTime: "5 min read",
    title: "How to Route Real Estate Leads in Under 5 Seconds with n8n",
    excerpt: "Speed to lead is everything in real estate. Here is the exact architecture we use to capture, enrich, and route Zillow leads to agents instantly.",
    date: "Jun 02, 2026",
    categoryColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-14 md:pb-24" aria-labelledby="blog-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h1 id="blog-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-8 leading-tight">
              Insights for the
              <br />
              <span className="gradient-text">automated enterprise</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Guides, case studies, and tutorials to help you understand what's possible with AI and automation.
            </p>
            
            {/* Search Bar Placeholder */}
            <div className="max-w-md mx-auto relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
               </div>
               <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full bg-surface/80 border border-border rounded-full py-3.5 pl-12 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-lg"
               />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" aria-label="Blog posts">
        <div className="container-custom">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col glass border border-border rounded-3xl p-6 md:p-8 card-hover group h-full"
                  aria-label={`Read: ${post.title}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-text-muted text-xs">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readTime}
                    </div>
                  </div>

                  <h2 className="font-display font-semibold text-text-primary text-xl mb-4 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  
                  <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-1">
                     {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-border">
                    <span className="text-text-muted text-sm">{post.date}</span>
                    <span className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <FadeIn delay={0.3} className="text-center mt-16">
             <button className="btn-secondary px-8 py-3">Load More Articles</button>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
