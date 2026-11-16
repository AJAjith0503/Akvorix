import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { resend, NOTIFICATION_EMAIL } from "@/lib/resend";
import { VisitorBehavior, generateBehaviorHtml } from "@/lib/visitorTracker";

const statsFilePath = path.join(process.cwd(), "src", "data", "visitorStats.json");

interface VisitorData {
  totalVisits: number;
  uniqueVisitors: number;
  visitorIds: string[];
  capturedEmails: Array<{
    email: string;
    timestamp: string;
    visitorId?: string;
  }>;
  visitorJourneys?: Record<string, VisitorBehavior>;
  lastUpdated: string;
}

async function getStats(): Promise<VisitorData> {
  try {
    const raw = await fs.readFile(statsFilePath, "utf-8");
    const data = JSON.parse(raw);
    if (!data.visitorJourneys) {
      data.visitorJourneys = {};
    }
    return data;
  } catch {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      visitorIds: [],
      capturedEmails: [],
      visitorJourneys: {},
      lastUpdated: new Date().toISOString(),
    };
  }
}

async function saveStats(stats: VisitorData) {
  try {
    stats.lastUpdated = new Date().toISOString();
    await fs.writeFile(statsFilePath, JSON.stringify(stats, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save visitor stats:", err);
  }
}

export async function GET() {
  const stats = await getStats();
  return NextResponse.json({
    success: true,
    totalVisits: stats.totalVisits,
    uniqueVisitors: stats.uniqueVisitors,
    emailsCaptured: stats.capturedEmails.length,
    trackedJourneys: Object.keys(stats.visitorJourneys || {}).length,
    lastUpdated: stats.lastUpdated,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, visitorId, isFirstVisit, email, behavior } = body;
    const stats = await getStats();

    // 1. Sync Behavior Log (from background beacon or periodic sync)
    if (action === "sync_behavior" && behavior && behavior.visitorId) {
      if (!stats.visitorJourneys) stats.visitorJourneys = {};
      
      // Store/update journey in stats
      stats.visitorJourneys[behavior.visitorId] = behavior;
      
      // Cap stored journeys to 2,000 to keep file size healthy
      const keys = Object.keys(stats.visitorJourneys);
      if (keys.length > 2000) {
        delete stats.visitorJourneys[keys[0]];
      }

      await saveStats(stats);
      return NextResponse.json({ success: true, message: "Behavior synced" });
    }

    // 2. Capture Email with Full Behavior Dossier
    if (action === "capture_email" && email) {
      const cleanEmail = String(email).trim().toLowerCase();
      const currentBehavior: VisitorBehavior | undefined =
        behavior || (visitorId && stats.visitorJourneys ? stats.visitorJourneys[visitorId] : undefined);

      // Check if email was already recorded
      const alreadyExists = stats.capturedEmails.some(
        (entry) => entry.email.toLowerCase() === cleanEmail
      );

      if (!alreadyExists) {
        stats.capturedEmails.push({
          email: cleanEmail,
          timestamp: new Date().toISOString(),
          visitorId: visitorId || "anonymous",
        });

        if (currentBehavior && visitorId) {
          if (!stats.visitorJourneys) stats.visitorJourneys = {};
          stats.visitorJourneys[visitorId] = currentBehavior;
        }

        await saveStats(stats);

        // Generate behavior HTML report
        const behaviorReportHtml = generateBehaviorHtml(currentBehavior);

        // Send alert email to akvorix.support@gmail.com
        try {
          const resendRes = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: NOTIFICATION_EMAIL,
            subject: `🎯 Lead Captured with Behavior: ${cleanEmail}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                <div style="margin-bottom: 20px;">
                  <span style="background: linear-gradient(135deg, #6B3F69, #8B5F89); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Akvorix Lead Radar</span>
                </div>
                <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 20px;">Visitor Email & Behavior Dossier</h2>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
                  A visitor has submitted their email on the website. Here is their identity and complete browsing activity:
                </p>
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 13px; width: 130px;">Email Address:</td>
                      <td style="padding: 6px 0; color: #111827; font-size: 16px; font-weight: 700;">${cleanEmail}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Visitor ID:</td>
                      <td style="padding: 6px 0; color: #4b5563; font-size: 13px; font-family: monospace;">${visitorId || "First Visit"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Captured At:</td>
                      <td style="padding: 6px 0; color: #4b5563; font-size: 13px;">${new Date().toLocaleString()}</td>
                    </tr>
                  </table>
                </div>

                ${behaviorReportHtml}

                <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
                  Akvorix Automated Visitor Tracker & Lead Capture Intelligence
                </div>
              </div>
            `,
          });
          console.log("Resend lead delivery response:", resendRes);
        } catch (emailErr) {
          console.error("Failed to send lead alert email:", emailErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Email captured successfully with behavior report",
        totalCaptured: stats.capturedEmails.length,
      });
    }

    // 3. Default: Visit Counter
    stats.totalVisits += 1;

    if (visitorId && !stats.visitorIds.includes(visitorId)) {
      stats.visitorIds.push(visitorId);
      if (stats.visitorIds.length > 10000) {
        stats.visitorIds = stats.visitorIds.slice(-10000);
      }
      stats.uniqueVisitors += 1;
    } else if (isFirstVisit && !visitorId) {
      stats.uniqueVisitors += 1;
    }

    await saveStats(stats);

    return NextResponse.json({
      success: true,
      totalVisits: stats.totalVisits,
      uniqueVisitors: stats.uniqueVisitors,
    });
  } catch (error: any) {
    console.error("Visitor tracking error:", error);
    return NextResponse.json(
      { error: "Failed to record visitor" },
      { status: 500 }
    );
  }
}
