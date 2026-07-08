"use server";

import nodemailer from "nodemailer";
import { request, detectBot, slidingWindow, validateEmail } from "@arcjet/next";
import { aj } from "@/lib/arcjet";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: campo nascosto che gli umani non compilano.
  if ((formData.get("company") as string)?.trim()) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const treatment = String(formData.get("treatment") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const privacy = formData.get("privacy");

  if (!name || !phone || !email) {
    return { status: "error", message: "Nome, telefono ed email sono obbligatori." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Controlla l'indirizzo email inserito." };
  }
  if (!privacy) {
    return { status: "error", message: "Devi accettare l'informativa sulla privacy." };
  }

  // Protezione Arcjet: bot + rate limit (5 invii / 10 min per IP) + validazione email.
  try {
    const req = await request();
    const decision = await aj
      .withRule(detectBot({ mode: "LIVE", allow: [] }))
      .withRule(slidingWindow({ mode: "LIVE", max: 5, interval: "10m" }))
      .withRule(
        validateEmail({ mode: "LIVE", deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"] }),
      )
      .protect(req, { email });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Hai inviato troppe richieste. Riprova tra qualche minuto o chiamaci.",
        };
      }
      if (decision.reason.isEmail()) {
        return { status: "error", message: "L'indirizzo email non sembra valido." };
      }
      return {
        status: "error",
        message: "Richiesta bloccata dai controlli di sicurezza. Chiamaci pure direttamente.",
      };
    }
  } catch (error) {
    // Arcjet non configurato/raggiungibile: log e prosegui (fail open).
    console.warn("Arcjet non disponibile:", error);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_FROM, CONTACT_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO) {
    console.error("SMTP non configurato: variabili d'ambiente mancanti.");
    return {
      status: "error",
      message: "Modulo non ancora configurato. Nel frattempo puoi chiamarci o scriverci.",
    };
  }

  const port = Number(SMTP_PORT ?? 587);

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, // 465 = SSL, 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    const lines = [
      `Nome: ${name}`,
      `Telefono: ${phone}`,
      `Email: ${email}`,
      treatment ? `Trattamento: ${treatment}` : null,
      "",
      "Messaggio:",
      message || "(nessun messaggio)",
    ].filter((l) => l !== null);

    await transport.sendMail({
      from: CONTACT_FROM ?? SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Nuova richiesta dal sito — ${name}`,
      text: lines.join("\n"),
    });

    return { status: "success" };
  } catch (error) {
    console.error("Invio email fallito:", error);
    return {
      status: "error",
      message: "Invio non riuscito. Riprova più tardi o contattaci per telefono.",
    };
  }
}
