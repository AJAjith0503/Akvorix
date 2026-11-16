import { NextResponse } from "next/server";
import { resend, NOTIFICATION_EMAIL } from "@/lib/resend";
import { generateBehaviorHtml } from "@/lib/visitorTracker";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type = "contact", behavior, ...data } = body;

    let subject = "New AKVORIX Inquiry";
    let htmlContent = "";

    if (type === "expert-modal") {
      const { name, mobile, email, service, requirement } = data;
      subject = `🔥 Expert Consultation Request: ${name || "New Lead"}`;
      htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0910; color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid rgba(107, 63, 105, 0.4);">
          <div style="background: linear-gradient(135deg, #6B3F69 0%, #8B5F89 50%, #A97EA7 100%); padding: 28px 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: #FFFFFF; letter-spacing: -0.5px;">AKVORIX AI Specialists</h1>
            <p style="margin: 6px 0 0 0; color: rgba(255, 255, 255, 0.85); font-size: 14px;">New Expert Consultation Enquiry</p>
          </div>
          <div style="padding: 28px 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0; width: 140px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;">${name || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0;">Mobile</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;"><a href="tel:${mobile}" style="color: #A97EA7; text-decoration: none;">${mobile || "N/A"}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;"><a href="mailto:${email}" style="color: #A97EA7; text-decoration: none;">${email || "N/A"}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0;">Service</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;">${service || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #A0A0A0; vertical-align: top;">Requirement</td>
                <td style="padding: 10px 0; color: #E0E0E0; line-height: 1.6;">${requirement || "No specific requirement provided."}</td>
              </tr>
            </table>
          </div>
          <div style="background: rgba(255, 255, 255, 0.03); padding: 14px 24px; text-align: center; font-size: 12px; color: #707070;">
            Sent automatically from AKVORIX website
          </div>
        </div>
      `;
    } else {
      // Standard Contact Form
      const { name, firstName, lastName, phone, mobile, email, company, interest, message } = data;
      const clientName = name || `${firstName || ""} ${lastName || ""}`.trim() || "New Lead";
      const clientPhone = phone || mobile || "Not provided";
      subject = `📬 Contact Form: ${clientName} (${interest || "New Inquiry"})`;
      htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0910; color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid rgba(107, 63, 105, 0.4);">
          <div style="background: linear-gradient(135deg, #6B3F69 0%, #8B5F89 50%, #A97EA7 100%); padding: 28px 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: #FFFFFF; letter-spacing: -0.5px;">AKVORIX Contact</h1>
            <p style="margin: 6px 0 0 0; color: rgba(255, 255, 255, 0.85); font-size: 14px;">New message submitted via contact form</p>
          </div>
          <div style="padding: 28px 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0; width: 150px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;">${clientName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0;">Phone Number</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;"><a href="tel:${clientPhone}" style="color: #A97EA7; text-decoration: none;">${clientPhone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0;">Sender User Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;"><a href="mailto:${email}" style="color: #A97EA7; text-decoration: none;">${email || "N/A"}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #A0A0A0;">Selection</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-weight: 600; color: #FFFFFF;">${interest || "General Inquiry"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #A0A0A0; vertical-align: top;">How can we help?</td>
                <td style="padding: 10px 0; color: #E0E0E0; line-height: 1.6;">${message || "No message content."}</td>
              </tr>
            </table>
          </div>
          <div style="background: rgba(255, 255, 255, 0.03); padding: 14px 24px; text-align: center; font-size: 12px; color: #707070;">
            Sent automatically from AKVORIX website
          </div>
        </div>
      `;
    }

    if (behavior) {
      htmlContent += `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 16px auto 0 auto; background: #ffffff; color: #111827; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; padding: 20px;">
          <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #111827;">🔍 Visitor Journey & Activity Log</h2>
          ${generateBehaviorHtml(behavior)}
        </div>
      `;
    }

    const result = await resend.emails.send({
      from: "AKVORIX <onboarding@resend.dev>",
      to: NOTIFICATION_EMAIL,
      subject,
      html: htmlContent,
    });

    if (result.error) {
      console.error("Resend API Error:", result.error);
      return NextResponse.json({ error: result.error.message }, { status: 400, headers: corsHeaders });
    }

    return NextResponse.json({ success: true, id: result.data?.id }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Contact API Exception:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
