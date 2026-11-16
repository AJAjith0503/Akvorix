import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || "re_build_placeholder";
export const resend = new Resend(apiKey);

export const NOTIFICATION_EMAIL =
  process.env.CONTACT_NOTIFICATION_EMAIL || "akvorix.support@gmail.com";

