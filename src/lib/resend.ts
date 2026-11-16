import { Resend } from "resend";

export const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_build_placeholder") {
    throw new Error(
      "RESEND_API_KEY is missing. Please add it to your Vercel Environment Variables."
    );
  }
  return new Resend(apiKey);
};

export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    const client = getResend();
    return (client as any)[prop];
  },
});

export const NOTIFICATION_EMAIL =
  process.env.CONTACT_NOTIFICATION_EMAIL || "akvorix.support@gmail.com";

