import express from "express";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Email Transporter
let mailTransporter: nodemailer.Transporter | null = null;
function getMailTransporter(): nodemailer.Transporter | null {
  if (mailTransporter) return mailTransporter;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    try {
      mailTransporter = nodemailer.createTransport({
        host,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
        auth: { user, pass },
      });
    } catch (err) {
      console.warn("Error initializing SMTP transporter:", err);
    }
  }
  return mailTransporter;
}

function getServiceLabel(serviceId: string): string {
  const map: Record<string, string> = {
    "brand-management": "1. Brand Management Practice (8 Modules)",
    recruitment: "2. Recruitment & Talent Sourcing",
    events: "3. Event Management & Production",
    taxation: "4. Taxation & Regulatory Compliance",
    consultancy: "5. Strategic Business Consultancy",
  };
  return map[serviceId] || serviceId;
}

interface ConsultationSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  createdAt: string;
}

const memorySubmissions: ConsultationSubmission[] = [];

async function dispatchConsultationEmail(submission: ConsultationSubmission) {
  const recipient = process.env.NOTIFICATION_EMAIL || "pimpliq@pimpliqconsultancy.com";
  const fromAddress = process.env.SMTP_FROM || `"Pimpliq Website" <${process.env.SMTP_USER || "notifications@pimpliqconsultancy.com"}>`;
  const transporter = getMailTransporter();
  const serviceLabel = getServiceLabel(submission.service);
  const formattedDate = new Date(submission.createdAt).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Kampala",
  });

  const subject = `[New Advisory Inquiry] ${submission.name} — ${serviceLabel}`;
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="font-family: sans-serif; background-color: #f4f6f8; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #10474D; padding: 24px; text-align: center; color: #fff;">
            <h2 style="margin: 0; color: #D4AF37;">PIMPLIQ CONSULTANCY LTD</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px;">New Consultation Request</p>
          </div>
          <div style="padding: 24px;">
            <p><strong>Client:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Phone:</strong> ${submission.phone || 'N/A'}</p>
            <p><strong>Practice Area:</strong> ${serviceLabel}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p><strong>Message / Project Scope:</strong></p>
            <p style="background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #1A6B74;">
              ${submission.message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        replyTo: submission.email,
        subject,
        html: htmlContent,
      });
    } catch (e: any) {
      console.error("Email send error:", e);
    }
  }
}

// Gemini setup
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (err) {
    console.warn("Gemini AI initialization warning:", err);
  }
}

const SYSTEM_INSTRUCTION = `You are Milo, the official virtual assistant for Pimpliq Consultancy Ltd (Slogan: "People, Potential, Progress"), based in Kampala, Uganda. 
You provide friendly, executive, articulate, and strategic advice to corporate clients, startups, and business leaders across Uganda and East Africa.
Location: Along Bunga-Ggaba Road, Kampala, Uganda. Direct WhatsApp/Phone: +256 702 932 901. Email: pimpliq@pimpliqconsultancy.com.`;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Pimpliq Consultancy Ltd", timestamp: new Date().toISOString() });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A valid message parameter is required." });
  }

  const fallback = "Welcome to Pimpliq Consultancy Ltd ('People, Potential, Progress'). We specialize in Brand Management (8 modules), Talent Recruitment, Event Activation, Tax Advisory, and Strategic Business Consultancy. Contact us on WhatsApp at +256 702 932 901 or pimpliq@pimpliqconsultancy.com.";

  try {
    if (ai && process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
      });
      return res.json({ reply: response.text || fallback, model: "gemini-2.5-flash" });
    }
    return res.json({ reply: fallback, model: "pimpliq-fallback" });
  } catch (err) {
    return res.json({ reply: fallback, model: "pimpliq-fallback" });
  }
});

app.post("/api/consultation", (req, res) => {
  const { name, email, phone, service, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and project message are required." });
  }

  const newSub: ConsultationSubmission = {
    id: `sub_${Date.now()}`,
    name: String(name).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : "",
    service: service ? String(service).trim() : "brand-management",
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  memorySubmissions.unshift(newSub);
  dispatchConsultationEmail(newSub).catch(() => {});

  return res.status(201).json({
    success: true,
    message: "Your consultation request has been received. Our executive advisors will contact you shortly.",
    submissionId: newSub.id,
  });
});

app.get("/api/consultation", (req, res) => {
  res.json({ total: memorySubmissions.length, submissions: memorySubmissions.slice(0, 50) });
});

export default app;
