"use client";

import React, { useState } from "react";
import { Search, Filter, ShieldCheck, BarChart3, Target } from "lucide-react";

interface CookieItem {
  name: string;
  category: "Essential" | "Analytics" | "Marketing";
  provider: string;
  duration: string;
  type: "Cookie" | "LocalStorage" | "Cookie & LocalStorage";
  purpose: string;
}

const COOKIE_DATA: CookieItem[] = [
  {
    name: "akvorix_cookie_consent",
    category: "Essential",
    provider: "akvorix.com (First-Party)",
    duration: "12 Months",
    type: "Cookie & LocalStorage",
    purpose: "Stores user's cookie consent choices, category toggles, and compliance timestamp.",
  },
  {
    name: "theme",
    category: "Essential",
    provider: "akvorix.com (First-Party)",
    duration: "Persistent",
    type: "LocalStorage",
    purpose: "Preserves user's dark/light UI mode selection across sessions and page navigation.",
  },
  {
    name: "akvorix_preloader_done",
    category: "Essential",
    provider: "akvorix.com (First-Party)",
    duration: "Session",
    type: "LocalStorage",
    purpose: "Ensures the 3D water fill brand intro animation is not shown repeatedly during the same browsing session.",
  },
  {
    name: "_ga",
    category: "Analytics",
    provider: "Google Analytics (First-Party)",
    duration: "2 Years",
    type: "Cookie",
    purpose: "Used to distinguish unique visitors and measure overall website telemetry.",
  },
  {
    name: "_ga_<container-id>",
    category: "Analytics",
    provider: "Google Analytics (First-Party)",
    duration: "2 Years",
    type: "Cookie",
    purpose: "Persists session state and interaction events across page views.",
  },
  {
    name: "_li_dcdm_c / li_sugr",
    category: "Marketing",
    provider: "LinkedIn Corporation",
    duration: "90 Days",
    type: "Cookie",
    purpose: "Tracks B2B conversion metrics for visitors engaging with AKVORIX automation ads on LinkedIn.",
  },
];

export function CookieInventoryTable() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCookies = COOKIE_DATA.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Controls: Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {["All", "Essential", "Analytics", "Marketing"].map((cat) => {
            const count =
              cat === "All"
                ? COOKIE_DATA.length
                : COOKIE_DATA.filter((c) => c.category === cat).length;
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary text-white shadow-sm shadow-[#6B3F69]/30"
                    : "bg-surface/80 hover:bg-surface border border-border text-text-secondary hover:text-text-primary"
                }`}
              >
                {cat === "Essential" && <ShieldCheck className="w-3.5 h-3.5" />}
                {cat === "Analytics" && <BarChart3 className="w-3.5 h-3.5" />}
                {cat === "Marketing" && <Target className="w-3.5 h-3.5" />}
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cookies or purpose..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface/80 border border-border text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-surface/40">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-surface/80 text-text-primary font-semibold">
              <th className="py-3 px-4">Identifier</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Provider / Domain</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-4">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-text-secondary">
            {filteredCookies.length > 0 ? (
              filteredCookies.map((cookie) => (
                <tr key={cookie.name} className="hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-text-primary text-xs whitespace-nowrap">
                    <div>{cookie.name}</div>
                    <span className="text-[10px] text-text-muted font-sans block">{cookie.type}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        cookie.category === "Essential"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : cookie.category === "Analytics"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      }`}
                    >
                      {cookie.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs text-text-muted whitespace-nowrap">{cookie.provider}</td>
                  <td className="py-3 px-3 text-xs font-medium text-text-primary whitespace-nowrap">{cookie.duration}</td>
                  <td className="py-3 px-4 text-xs leading-relaxed text-text-muted">{cookie.purpose}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text-muted text-xs">
                  No cookies match your filter or search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
