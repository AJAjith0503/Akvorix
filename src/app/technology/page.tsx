import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Server, Database, Bot, BrainCircuit, Globe, Blocks } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Technology Stack — How We Build AI Automation | AKVORIX",
  description: "Explore the enterprise-grade technology stack behind AKVORIX automations. We use OpenAI, Claude, n8n, LangChain, Next.js, and Pinecone to build robust systems.",
};

const techCategories = [
  {
    title: "Large Language Models (LLMs)",
    icon: BrainCircuit,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10 border-violet-500/20",
    description: "The brains behind our custom AI agents and chatbots. We remain model-agnostic, choosing the best AI for your specific use case.",
    items: [
      { name: "OpenAI (GPT-4o)", use: "Complex reasoning, general text generation, and function calling." },
      { name: "Anthropic (Claude 3.5)", use: "Long-context tasks, safe enterprise deployments, and nuanced writing." },
      { name: "Google (Gemini 1.5)", use: "Multimodal tasks combining text, video, and audio analysis." },
    ]
  },
  {
    title: "Automation & Orchestration",
    icon: Blocks,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10 border-orange-500/20",
    description: "The engines that connect your apps and execute complex, multi-step workflows flawlessly.",
    items: [
      { name: "n8n", use: "Our primary tool. Open-source, node-based automation that we can self-host for complete data control and complex logic." },
      { name: "LangChain & LangGraph", use: "Frameworks we use to build multi-agent systems and give LLMs memory and tools." },
      { name: "MCP (Model Context Protocol)", use: "Standardized secure connections between our AI models and your local/cloud data sources." },
    ]
  },
  {
    title: "Data & Memory",
    icon: Database,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
    description: "Where we store embeddings (for AI search) and application data securely.",
    items: [
      { name: "Pinecone", use: "High-performance vector database used for Retrieval-Augmented Generation (RAG) in our chatbots." },
      { name: "Supabase", use: "Scalable Postgres database for storing user data, workflow states, and analytics." },
      { name: "Redis", use: "In-memory caching to ensure our agents respond instantly." },
    ]
  },
  {
    title: "Frontend & Infrastructure",
    icon: Globe,
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20",
    description: "How we build the interfaces you interact with and host the code that runs your business.",
    items: [
      { name: "Next.js & React", use: "Frameworks for building lightning-fast, conversion-optimized web applications and dashboards." },
      { name: "Node.js", use: "Robust backend runtime for our custom API integrations and webhook receivers." },
      { name: "Docker & AWS", use: "Containerized deployment ensuring high availability, scalable infrastructure, and enterprise security." },
    ]
  }
];

export default function TechnologyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-14 md:pb-24" aria-labelledby="tech-heading">
        <div className="absolute inset-0 radial-glow-primary opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Server className="w-4 h-4" aria-hidden="true" />
              Enterprise-Grade Stack
            </div>
            <h1 id="tech-heading" className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary mb-8 leading-tight">
              We don't compromise on
              <br />
              <span className="gradient-text">reliability or security</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              When automation runs your business, it can't fail. We build exclusively on battle-tested, scalable technologies trusted by Fortune 500 companies.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" aria-label="Technology details">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {techCategories.map((category, i) => {
              const Icon = category.icon;
              return (
                <FadeIn key={category.title} delay={i * 0.1}>
                  <div className="glass border border-border rounded-3xl p-8 h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${category.bgColor}`}>
                        <Icon className={`w-6 h-6 ${category.color}`} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-2xl text-text-primary mb-2">{category.title}</h2>
                        <p className="text-text-secondary text-sm">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <div key={item.name} className="bg-primary/5 border border-border rounded-xl p-4">
                          <h3 className="font-semibold text-text-primary mb-1">{item.name}</h3>
                          <p className="text-text-muted text-sm">{item.use}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="why-it-matters">
        <div className="container-custom">
          <FadeIn className="glass border border-primary/20 rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-transparent">
             <h2 id="why-it-matters" className="font-display font-bold text-3xl text-text-primary mb-6">Why does the tech stack matter to you?</h2>
             <div className="grid md:grid-cols-3 gap-8 text-left mt-10">
                <div>
                   <h3 className="font-bold text-text-primary mb-2">1. Data Ownership</h3>
                   <p className="text-text-secondary text-sm">By utilizing self-hosted instances of n8n and open-source tooling where possible, we ensure you own your data and aren't locked into expensive SaaS subscriptions.</p>
                </div>
                <div>
                   <h3 className="font-bold text-text-primary mb-2">2. Security & Compliance</h3>
                   <p className="text-text-secondary text-sm">Our stack allows us to build SOC2 and HIPAA compliant workflows, crucial for healthcare and finance clients. We use models that don't train on your proprietary data.</p>
                </div>
                <div>
                   <h3 className="font-bold text-text-primary mb-2">3. Infinite Scalability</h3>
                   <p className="text-text-secondary text-sm">Whether you're processing 100 leads a month or 100,000, our cloud-native infrastructure scales automatically without breaking a sweat.</p>
                </div>
             </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
