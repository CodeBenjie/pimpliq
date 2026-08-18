import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Endpoint to persist director photo uploads to disk
app.post("/api/save-director-photo", (req, res) => {
  const { directorId, base64Data } = req.body;
  if (!directorId || !base64Data) {
    return res.status(400).json({ error: "directorId and base64Data required" });
  }

  try {
    const filename =
      directorId === "nakate" || directorId === "dir-2"
        ? "sarah_nakate.jpg"
        : "nabasa_moreen.jpg";
    const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Image, "base64");

    const pathsToSave = [
      path.join(process.cwd(), "public", "assets", filename),
      path.join(process.cwd(), "src", "assets", "images", filename),
      path.join(process.cwd(), "dist", "assets", filename)
    ];

    pathsToSave.forEach((p) => {
      try {
        const dir = path.dirname(p);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(p, buffer);
        console.log(`[Photo Saved] Successfully wrote photo to ${p}`);
      } catch (e) {
        // ignore if dist not built yet
      }
    });

    return res.json({ success: true, filename });
  } catch (err: any) {
    console.error("[Photo Save Error]", err);
    return res.status(500).json({ error: err.message });
  }
});

// Initialize Lazy Transporter for Email Dispatch
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
        auth: {
          user,
          pass,
        },
      });
      console.log(`[Email Dispatch] SMTP configured for ${host}`);
    } catch (err) {
      console.warn("[Email Dispatch] Warning initializing SMTP transporter:", err);
    }
  }
  return mailTransporter;
}

// Helper to format service names cleanly
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

// Send Email Dispatch Notification
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
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0F172A 0%, #10474D 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(212,175,55,0.2); color: #E8C860; font-size: 11px; font-weight: bold; border-radius: 9999px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
          .title { margin: 0; font-size: 20px; font-weight: 800; color: #D4AF37; }
          .content { padding: 32px 24px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
          .row { display: flex; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
          .row:last-child { border-bottom: none; }
          .label { font-weight: bold; width: 140px; color: #64748b; flex-shrink: 0; }
          .value { color: #0f172a; word-break: break-word; }
          .message-box { background: #ffffff; border-left: 4px solid #1A6B74; padding: 16px; border-radius: 0 8px 8px 0; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #334155; }
          .footer { background: #0f172a; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; }
          .cta-btn { display: inline-block; margin-top: 16px; padding: 10px 24px; background: #1A6B74; color: #ffffff !important; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">PIMPLIQ CONSULTANCY LTD</div>
            <h1 class="title">New Client Advisory Consultation Request</h1>
            <p style="margin: 6px 0 0 0; font-size: 12px; color: #cbd5e1;">People • Potential • Progress</p>
          </div>
          
          <div class="content">
            <p style="margin-top: 0; font-size: 15px; line-height: 1.5; color: #334155;">
              A new prospective client has scheduled an advisory consultation via the Pimpliq Consultancy web portal.
            </p>

            <div class="card">
              <div class="row">
                <div class="label">Client Name:</div>
                <div class="value" style="font-weight: bold; font-size: 15px;">${submission.name}</div>
              </div>
              <div class="row">
                <div class="label">Business Email:</div>
                <div class="value"><a href="mailto:${submission.email}" style="color: #1A6B74; text-decoration: underline;">${submission.email}</a></div>
              </div>
              <div class="row">
                <div class="label">Phone / WhatsApp:</div>
                <div class="value">${submission.phone ? `<a href="tel:${submission.phone}" style="color: #1A6B74; text-decoration: underline;">${submission.phone}</a>` : '<em style="color:#94a3b8">Not provided</em>'}</div>
              </div>
              <div class="row">
                <div class="label">Practice Area:</div>
                <div class="value"><span style="color: #10474D; font-weight: bold;">${serviceLabel}</span></div>
              </div>
              <div class="row">
                <div class="label">Submitted At:</div>
                <div class="value">${formattedDate} (East Africa Time)</div>
              </div>
            </div>

            <div style="font-size: 13px; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
              Project Scope & Client Requirements:
            </div>
            <div class="message-box">
              ${submission.message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${submission.email}?subject=RE:%20Advisory%20Consultation%20-%20Pimpliq%20Consultancy%20Ltd" class="cta-btn">
                Reply Directly to ${submission.name}
              </a>
            </div>
          </div>

          <div class="footer">
            <div>Pimpliq Consultancy Ltd • Along Bunga-Ggaba Road, Kampala, Uganda</div>
            <div style="margin-top: 4px;">Direct Phone / WhatsApp: +256 702 932 901 • Email: pimpliq@pimpliqconsultancy.com</div>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
NEW ADVISORY INQUIRY - PIMPLIQ CONSULTANCY LTD
=================================================
Client Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone || 'N/A'}
Practice Area: ${serviceLabel}
Submitted: ${formattedDate}

Project Scope:
${submission.message}

Reply to: ${submission.email}
  `.trim();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        replyTo: submission.email,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[Email Dispatch SUCCESS] Sent consultation inquiry to ${recipient} (Message ID: ${info.messageId})`);
      return { success: true, method: "smtp", messageId: info.messageId };
    } catch (err: any) {
      console.error("[Email Dispatch FAILED] Error dispatching email via SMTP:", err.message);
      return { success: false, method: "smtp", error: err.message };
    }
  } else {
    // Log dispatch payload ready for delivery
    console.log(`[Email Dispatch SIMULATED] Recipient: ${recipient}`);
    console.log(`[Inquiry Details] Name: ${submission.name} | Email: ${submission.email} | Service: ${serviceLabel}`);
    return { success: true, method: "logged", note: "SMTP credentials not configured, logged on server." };
  }
}

// Initialize Gemini Client safely with Lazy Getter
function getGeminiClient(): { client: GoogleGenAI; keySource: string } | null {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }

  try {
    const client = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    return { client, keySource: "GEMINI_API_KEY" };
  } catch (err: any) {
    console.warn("[Gemini AI] Initialization error:", err.message);
    return null;
  }
}

const SYSTEM_INSTRUCTION = `You are Milo, the official AI Virtual Assistant for Pimpliq Consultancy Ltd (Slogan: "People, Potential, Progress"), based in Nakasero, Kampala, Uganda.

CORE BEHAVIOR:
- Respond naturally, conversationally, and concisely as an executive Ugandan business advisor.
- ANSWER THE USER'S SPECIFIC QUESTION DIRECTLY.
- DO NOT dump generic boilerplate, contact lists, or long company intros repeatedly. If the user says "hello" or "hi", reply in 1-2 friendly sentences.
- When asked about branding, explain the relevant modules among Pimpliq's 8 Brand Management Modules (Strategy, Identity Design, Launch, Digital Presence, Marketing Communication, Performance Audits, Repositioning, Corporate/Executive Branding).
- When asked about recruitment, reference our Executive Search & Talent Sourcing practice led by Director Sarah Nakate.
- When asked about brand strategy or business growth, reference Director Nabasa Moreen.
- When asked about tax/statutory compliance, reference URA tax planning, audits, and statutory governance.
- When asked about corporate events, reference high-profile corporate galas, product launches, and VIP activations.
- When asked about pricing, quote standard advisory engagements in Ugandan Shillings (typically ranging from UGX 3,800,000 to UGX 15,000,000+ depending on scope).
- ONLY provide direct contact info (Phone/WhatsApp: +256 756 812707 / +256 777 983195, Email: pimpliqconsultancyltd@gmail.com, Office: Plot 14 Lumumba Ave, Nakasero) when relevant to booking, consulting, or when the user asks how to get in touch.
- Use clean formatting with short paragraphs and bullet points for readability.`;

// API Routes
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A valid message parameter is required." });
  }

  // Fallback response helper if API key is not yet set
  const getFallbackReply = (userQuery: string): string => {
    const q = userQuery.toLowerCase().trim();
    if (q === "hi" || q === "hello" || q === "hey" || q === "good morning" || q === "good afternoon") {
      return "Hello! I'm Milo, your Pimpliq advisor. How can I help you today with Brand Management, Talent Recruitment, Tax Compliance, or Corporate Events?";
    } else if (q.includes("brand") || q.includes("module") || q.includes("identity") || q.includes("rebrand")) {
      return "Pimpliq delivers comprehensive Brand Management across 8 specialized modules: Strategy Development, Identity Design, Launch Planning, Digital Presence, Marketing Communication, Performance Audits, Repositioning, and Executive Branding. What stage is your brand currently at?";
    } else if (q.includes("tax") || q.includes("compliance") || q.includes("audit") || q.includes("ura")) {
      return "Our Taxation & Statutory Compliance practice provides corporate tax planning, URA compliance reviews, audit readiness, and governance risk mitigation. Would you like to schedule an assessment with our compliance partners?";
    } else if (q.includes("recruit") || q.includes("talent") || q.includes("hiring") || q.includes("staff")) {
      return "Pimpliq connects high-growth enterprises with top-tier executive talent through targeted C-suite headhunting, competency mapping, and background vetting led by Sarah Nakate.";
    } else if (q.includes("event") || q.includes("launch") || q.includes("activation") || q.includes("gala")) {
      return "We conceptualize and execute landmark corporate galas, VIP brand activations, conferences, and experiential launches with end-to-end production management.";
    } else if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("office") || q.includes("location") || q.includes("call")) {
      return "You can reach Pimpliq Consultancy Ltd at Plot 14, Lumumba Avenue, Nakasero, Kampala. Call or WhatsApp us at +256 756 812707 / +256 777 983195, or email pimpliqconsultancyltd@gmail.com.";
    } else {
      return "Thank you for your message! Pimpliq specializes in Brand Management, Talent Recruitment, Event Activation, Tax Advisory, and Strategic Growth. How can our advisors assist your organization today?";
    }
  };

  try {
    const geminiObj = getGeminiClient();
    if (geminiObj) {
      // Build conversation contents with history if available
      let contentsPayload: any = message;
      if (Array.isArray(history) && history.length > 0) {
        const formattedHistory = history
          .filter((h: any) => h && h.text && (h.sender === "user" || h.sender === "bot"))
          .slice(-6)
          .map((h: any) => ({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: String(h.text) }]
          }));

        if (formattedHistory.length > 0) {
          formattedHistory.push({
            role: "user",
            parts: [{ text: message }]
          });
          contentsPayload = formattedHistory;
        }
      }

      // Cascade through Gemini models: ultra-fast gemini-3.1-flash-lite first
      const candidateModels = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.7-flash"];
      let generatedText: string | null = null;
      let usedModel: string = "gemini-3.1-flash-lite";

      for (const modelName of candidateModels) {
        try {
          const response = await geminiObj.client.models.generateContent({
            model: modelName,
            contents: contentsPayload,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });

          if (response && response.text) {
            generatedText = response.text;
            usedModel = modelName;
            break;
          }
        } catch (modelErr: any) {
          console.warn(`[Milo Chat] Model ${modelName} notice (${modelErr?.message?.substring(0, 60)}), trying next...`);
        }
      }

      const replyText = generatedText || getFallbackReply(message);
      return res.json({ reply: replyText, model: usedModel });
    } else {
      console.log("[Milo Chat] No Gemini API key detected in environment, using strategic fallback.");
      return res.json({ reply: getFallbackReply(message), model: "pimpliq-milo-advisor" });
    }
  } catch (error: any) {
    console.error("[Milo Chat] Gemini API error:", error?.message || error);
    return res.json({ reply: getFallbackReply(message), model: "pimpliq-milo-advisor", error: error?.message });
  }
});

// Diagnostics route for Milo AI Key status
app.get("/api/milo-status", (req, res) => {
  const geminiObj = getGeminiClient();
  const rawKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  res.json({
    aiActive: !!geminiObj,
    keyConfigured: !!rawKey && rawKey.trim().length > 10,
    keyPrefix: rawKey ? `${rawKey.substring(0, 4)}...${rawKey.substring(rawKey.length - 4)}` : null,
    model: "gemini-3.7-flash"
  });
});

// Robots.txt & Sitemap.xml SEO routes
app.get("/robots.txt", (req, res) => {
  const robotsPath = path.join(process.cwd(), "public", "robots.txt");
  if (fs.existsSync(robotsPath)) {
    res.type("text/plain").sendFile(robotsPath);
  } else {
    res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: https://pimpliq.com/sitemap.xml");
  }
});

app.get("/sitemap.xml", (req, res) => {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    res.type("application/xml").sendFile(sitemapPath);
  } else {
    res.status(404).send("Sitemap not found");
  }
});

// Google Search Console HTML Verification File
app.get("/googled36ca9bb03dfb9ec.html", (req, res) => {
  const filePath = path.join(process.cwd(), "public", "googled36ca9bb03dfb9ec.html");
  if (fs.existsSync(filePath)) {
    res.type("text/html").sendFile(filePath);
  } else {
    res.type("text/html").send("google-site-verification: googled36ca9bb03dfb9ec.html");
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Pimpliq Consultancy Ltd", timestamp: new Date().toISOString() });
});

// Consultation & Proposal submissions endpoint
interface ConsultationSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  createdAt: string;
}

const submissions: ConsultationSubmission[] = [];

app.post("/api/consultation", (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and project message are required." });
  }

  const newSubmission: ConsultationSubmission = {
    id: `sub_${Date.now()}`,
    name: String(name).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : "",
    service: service ? String(service).trim() : "brand-management",
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  submissions.unshift(newSubmission);
  console.log(`[New Consultation Request] ${newSubmission.name} (${newSubmission.email}) - Service: ${newSubmission.service}`);

  // Dispatch email notification asynchronously (non-blocking)
  dispatchConsultationEmail(newSubmission).catch((err) => {
    console.error("[Email Dispatch Error]", err);
  });

  return res.status(201).json({
    success: true,
    message: "Your consultation request has been received. Our executive advisors will contact you shortly.",
    submissionId: newSubmission.id,
  });
});

app.get("/api/consultation", (req, res) => {
  return res.json({
    total: submissions.length,
    submissions: submissions.slice(0, 50),
  });
});

async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProduction =
    process.env.NODE_ENV === "production" ||
    (process.env.NODE_ENV !== "development" && fs.existsSync(path.join(distPath, "index.html")));

  if (isProduction) {
    console.log("Starting server in PRODUCTION mode...");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
