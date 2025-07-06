// lib/mailer.ts
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import { getTimeInEDT } from "./utils";

// ① configure transport via env vars
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: !!process.env.SMTP_SECURE, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ② helper to send a reset email
export async function sendResetEmail(email: string, token: string) {
  // load template file (HTML with Handlebars placeholders)
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "reset-password.html"
  );
  const source = await fs.readFile(templatePath, "utf-8");
  const template = Handlebars.compile(source);
  console.log(`${process.env.FRONTEND_URL}/reset?token=${token}`);
  // inject the reset link (could also pass user.name, etc.)
  const html = template({
    resetLink: `${process.env.FRONTEND_URL}/reset?token=${token}`,
    email,
    time: getTimeInEDT(),
  });

  // ③ send mail
  await transporter.sendMail({
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: "Forgot Password Instructions",
    html,
  });
}
