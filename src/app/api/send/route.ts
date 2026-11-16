import { NextResponse } from "next/server";
import { resend, NOTIFICATION_EMAIL } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      to = NOTIFICATION_EMAIL,
      subject = "Hello World — AKVORIX Test",
      html = "<p>Congrats on sending your <strong>first email</strong> via AKVORIX & Resend!</p>",
    } = body;

    const { data, error } = await resend.emails.send({
      from: "AKVORIX <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to send email" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "AKVORIX <onboarding@resend.dev>",
      to: NOTIFICATION_EMAIL,
      subject: "AKVORIX Resend Integration Active",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2>AKVORIX Email System is Live</h2>
          <p>Congrats! Your Resend integration is active and working properly.</p>
          <p>Recipient: <strong>${NOTIFICATION_EMAIL}</strong></p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Test email sent successfully", data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to send email" }, { status: 500 });
  }
}
