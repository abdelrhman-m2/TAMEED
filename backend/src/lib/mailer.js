import nodemailer from "nodemailer";

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return cachedTransporter;
}

export async function sendLeadEmail({ subject, html }) {
  const to = process.env.SALES_EMAIL || "mekkawy@tameed.com";
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const transporter = getTransporter();
  if (!transporter || !from) return { sent: false, reason: "mailer_not_configured" };
  try {
    await transporter.sendMail({ from, to, subject, html });
    return { sent: true };
  } catch (error) {
    console.error("Failed to send lead email:", error);
    return { sent: false, reason: "send_failed" };
  }
}

