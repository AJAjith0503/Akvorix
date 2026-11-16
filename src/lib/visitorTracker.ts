// Comprehensive Visitor & Behavior Tracking System for Akvorix

export interface PageVisit {
  path: string;
  title: string;
  visitCount: number;
  totalDurationSeconds: number;
  firstVisited: string;
  lastVisited: string;
}

export interface ButtonClickEvent {
  text: string;
  elementId?: string;
  elementClass?: string;
  targetUrl?: string;
  page: string;
  timestamp: string;
}

export interface VisitorBehavior {
  visitorId: string;
  sessionStarted: string;
  lastActive: string;
  totalTimeOnSiteSeconds: number;
  pages: Record<string, PageVisit>;
  clicks: ButtonClickEvent[];
  inferredInterests: string[];
  email?: string;
  referrer?: string;
  device?: string;
}

const STORAGE_KEY = "akvorix_visitor_behavior";
const VID_KEY = "akvorix_vid";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let vid = localStorage.getItem(VID_KEY);
  if (!vid) {
    vid = "v_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem(VID_KEY, vid);
    document.cookie = `akvorix_vid=${vid}; path=/; max-age=31536000; SameSite=Lax`;
  }
  return vid;
}

export function getVisitorBehavior(): VisitorBehavior {
  if (typeof window === "undefined") {
    return {
      visitorId: "",
      sessionStarted: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      totalTimeOnSiteSeconds: 0,
      pages: {},
      clicks: [],
      inferredInterests: [],
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed;
    } catch {}
  }

  const initial: VisitorBehavior = {
    visitorId: getVisitorId(),
    sessionStarted: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    totalTimeOnSiteSeconds: 0,
    pages: {},
    clicks: [],
    inferredInterests: [],
    referrer: typeof document !== "undefined" ? document.referrer || "Direct" : "Direct",
    device: typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop") : "Unknown",
  };

  saveVisitorBehavior(initial);
  return initial;
}

export function saveVisitorBehavior(data: VisitorBehavior) {
  if (typeof window === "undefined") return;
  try {
    data.lastActive = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Also update a compact summary cookie so server / edge can read if needed
    const summary = {
      vid: data.visitorId,
      pages: Object.keys(data.pages).length,
      clicks: data.clicks.length,
      interests: data.inferredInterests.slice(0, 3),
    };
    document.cookie = `akvorix_summary=${encodeURIComponent(JSON.stringify(summary))}; path=/; max-age=2592000; SameSite=Lax`;
  } catch {}
}

export function recordPageView(path: string, title?: string): VisitorBehavior {
  const behavior = getVisitorBehavior();
  const now = new Date().toISOString();

  if (!behavior.pages[path]) {
    behavior.pages[path] = {
      path,
      title: title || path,
      visitCount: 1,
      totalDurationSeconds: 0,
      firstVisited: now,
      lastVisited: now,
    };
  } else {
    behavior.pages[path].visitCount += 1;
    behavior.pages[path].lastVisited = now;
    if (title) behavior.pages[path].title = title;
  }

  // Detect interest based on path
  detectInterest(behavior, path);
  saveVisitorBehavior(behavior);
  return behavior;
}

export function recordPageDuration(path: string, durationSeconds: number): VisitorBehavior {
  if (durationSeconds <= 0) return getVisitorBehavior();
  const behavior = getVisitorBehavior();

  if (behavior.pages[path]) {
    behavior.pages[path].totalDurationSeconds += Math.round(durationSeconds);
  }
  behavior.totalTimeOnSiteSeconds += Math.round(durationSeconds);

  saveVisitorBehavior(behavior);
  return behavior;
}

export function recordButtonClick(event: Omit<ButtonClickEvent, "timestamp">): VisitorBehavior {
  const behavior = getVisitorBehavior();
  const fullEvent: ButtonClickEvent = {
    ...event,
    timestamp: new Date().toLocaleTimeString(),
  };

  // Keep last 100 clicks to prevent unbounded growth
  behavior.clicks.push(fullEvent);
  if (behavior.clicks.length > 100) {
    behavior.clicks = behavior.clicks.slice(-100);
  }

  // Detect interest based on click text or link
  detectInterest(behavior, `${event.text} ${event.targetUrl || ""}`);
  saveVisitorBehavior(behavior);
  return behavior;
}

function detectInterest(behavior: VisitorBehavior, text: string) {
  const lower = text.toLowerCase();
  const keywords: Record<string, string> = {
    "real estate": "Real Estate Automation",
    "dental": "Dental Clinic Assistant",
    "medical": "Healthcare & Pharmacy AI",
    "pharmacy": "Healthcare & Pharmacy AI",
    "restaurant": "Restaurant Reservation AI",
    "interior": "Interior Design Lead Handler",
    "construction": "Construction Quotation Bot",
    "dealership": "Car Dealership AI",
    "web development": "Web & App Development",
    "website": "Web & App Development",
    "workflow": "AI Workflow Automation",
    "n8n": "n8n Workflow Automation",
    "pricing": "Pricing & Costs Investigation",
    "contact": "Ready to Contact / Consultation",
    "book-call": "Consultation Booking Intent",
  };

  for (const [key, category] of Object.entries(keywords)) {
    if (lower.includes(key) && !behavior.inferredInterests.includes(category)) {
      behavior.inferredInterests.push(category);
    }
  }
}

export async function syncBehaviorWithServer(): Promise<void> {
  if (typeof window === "undefined") return;

  const behavior = getVisitorBehavior();
  const payload = JSON.stringify({
    action: "sync_behavior",
    behavior,
  });

  // Use sendBeacon for reliable delivery during page unload
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/visitors", blob);
  } else {
    try {
      await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    } catch {}
  }
}

export async function captureVisitorEmail(email: string, customBehavior?: VisitorBehavior): Promise<boolean> {
  if (typeof window === "undefined" || !email) return false;

  try {
    const behavior = customBehavior || getVisitorBehavior();
    behavior.email = email;
    saveVisitorBehavior(behavior);

    const res = await fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "capture_email",
        email,
        visitorId: behavior.visitorId,
        behavior,
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function recordVisit(analyticsAllowed = true) {
  if (typeof window === "undefined" || !analyticsAllowed) return;

  try {
    const isFirstVisit = !localStorage.getItem("akvorix_visited_before");
    const visitorId = getVisitorId();
    localStorage.setItem("akvorix_visited_before", "true");

    await fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "track_visit",
        visitorId,
        isFirstVisit,
      }),
    });
  } catch {
    // Silently ignore telemetry network failures
  }
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "< 5s";
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  return `${mins}m ${remainingSecs}s`;
}

export function generateBehaviorHtml(behavior?: VisitorBehavior): string {
  if (!behavior) {
    return `<p style="color: #6b7280; font-size: 13px;">No behavior details recorded yet.</p>`;
  }

  const pagesArray = Object.values(behavior.pages || {});
  const clicksArray = behavior.clicks || [];
  const interests = behavior.inferredInterests || [];

  return `
    <div style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
      <h3 style="color: #111827; font-size: 16px; margin: 0 0 12px 0;">🎯 Detected Interests & Focus</h3>
      ${
        interests.length > 0
          ? interests
              .map(
                (item) =>
                  `<span style="display: inline-block; background-color: #f3e8ff; color: #6b21a8; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-right: 6px; margin-bottom: 6px;">${item}</span>`
              )
              .join("")
          : `<span style="color: #6b7280; font-size: 13px;">General exploration (no specific industry narrowed yet)</span>`
      }

      <div style="margin-top: 16px;">
        <span style="font-size: 13px; color: #4b5563;">
          <strong>Total Active Time on Site:</strong> ${formatDuration(behavior.totalTimeOnSiteSeconds)} | 
          <strong>Device:</strong> ${behavior.device || "Unknown"} | 
          <strong>Referrer:</strong> ${behavior.referrer || "Direct"}
        </span>
      </div>

      <h3 style="color: #111827; font-size: 15px; margin: 20px 0 10px 0;">📄 Pages Visited & Time Spent</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; background-color: #fafafa; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background-color: #f3f4f6; text-align: left;">
            <th style="padding: 8px 12px; color: #374151;">Page Path</th>
            <th style="padding: 8px 12px; color: #374151; width: 80px; text-align: center;">Visits</th>
            <th style="padding: 8px 12px; color: #374151; width: 110px; text-align: right;">Time Spent</th>
          </tr>
        </thead>
        <tbody>
          ${
            pagesArray.length > 0
              ? pagesArray
                  .map(
                    (p) => `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 12px; color: #111827; font-family: monospace;">${p.path}</td>
                  <td style="padding: 8px 12px; color: #4b5563; text-align: center; font-weight: 600;">${p.visitCount}x</td>
                  <td style="padding: 8px 12px; color: #059669; text-align: right; font-weight: 600;">${formatDuration(p.totalDurationSeconds)}</td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="3" style="padding: 8px 12px; color: #9ca3af;">No pages recorded</td></tr>`
          }
        </tbody>
      </table>

      <h3 style="color: #111827; font-size: 15px; margin: 20px 0 10px 0;">🖱️ Buttons & Links Clicked (${clicksArray.length})</h3>
      <div style="max-height: 240px; overflow-y: auto; background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px;">
        ${
          clicksArray.length > 0
            ? clicksArray
                .slice(-15) // Show last 15 actions
                .reverse()
                .map(
                  (c) => `
              <div style="font-size: 12px; padding: 6px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">
                <span style="color: #9ca3af; margin-right: 8px;">${c.timestamp}</span>
                <span style="background-color: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-weight: 600; color: #1f2937;">${c.text}</span>
                <span style="color: #6b7280;"> on <code>${c.page}</code></span>
                ${c.targetUrl ? `<span style="color: #2563eb;"> &rarr; ${c.targetUrl}</span>` : ""}
              </div>
            `
                )
                .join("")
            : `<span style="color: #9ca3af; font-size: 13px;">No button clicks logged</span>`
        }
      </div>
    </div>
  `;
}
