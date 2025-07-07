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
export async function sendResetEmail(email: string, type: string, token?: string) { // type: "signup" | "reset-password"

  let templatePath = "";
  let subject = "";
  let templateData: Record<string, any> = { email, time: getTimeInEDT() };

  switch (type) {
    case "signup":
      // Load the signup email template
      templatePath = path.join(process.cwd(), "templates", "welcome-to-fantasylife.html");
      subject = "Welcome to Fantasy Life!";
      break;

    case "reset-password":
      // Load the reset-password email template
      templatePath = path.join(process.cwd(), "templates", "reset-password.html");
      subject = "Forgot Password Instructions";

      // Add resetLink to the template data
      templateData.resetLink = `${process.env.FRONTEND_URL}/reset?token=${token}`;
      break;

    default:
      throw new Error("Invalid email type");
  }

  // Read the template file
  const source = await fs.readFile(templatePath, "utf-8");
  const template = Handlebars.compile(source);

  // Compile the HTML with the template data
  const html = template(templateData);

  // Send the email
  await transporter.sendMail({
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject,
    html,
  });
}
