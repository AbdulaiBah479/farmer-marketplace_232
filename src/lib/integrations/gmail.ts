import { google } from "googleapis";
import { getIntegration } from "../db/queries";

async function getGmailClient(tenantId: string) {
  const integration = await getIntegration(tenantId, "google");
  if (!integration?.is_active || !integration.access_token) throw new Error("Google integration not connected. Please connect Gmail in Settings.");
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
  oauth2Client.setCredentials({ access_token: integration.access_token, refresh_token: integration.refresh_token ?? undefined, expiry_date: integration.token_expires_at ? new Date(integration.token_expires_at).getTime() : undefined });
  return google.gmail({ version: "v1", auth: oauth2Client });
}

export async function gmailReadEmails(tenantId: string, opts: { maxResults?: number; query?: string }) {
  const gmail = await getGmailClient(tenantId);
  const listRes = await gmail.users.messages.list({ userId: "me", maxResults: opts.maxResults ?? 10, q: opts.query ?? "in:inbox" });
  const messages = listRes.data.messages ?? [];
  const threadDetails = await Promise.all(messages.slice(0, 10).map(async (m) => {
    const msg = await gmail.users.messages.get({ userId: "me", id: m.id!, format: "metadata", metadataHeaders: ["From", "To", "Subject", "Date"] });
    const headers = msg.data.payload?.headers ?? [];
    const get = (name: string) => headers.find((h) => h.name === name)?.value ?? "";
    return { id: m.id, threadId: m.threadId, from: get("From"), to: get("To"), subject: get("Subject"), date: get("Date"), snippet: msg.data.snippet ?? "", labelIds: msg.data.labelIds ?? [] };
  }));
  return { emails: threadDetails };
}

export async function gmailSendEmail(tenantId: string, opts: { to: string; subject: string; body: string; cc?: string }) {
  const gmail = await getGmailClient(tenantId);
  const headers = [`To: ${opts.to}`, opts.cc ? `Cc: ${opts.cc}` : null, `Subject: ${opts.subject}`, "MIME-Version: 1.0", "Content-Type: text/html; charset=utf-8", "", opts.body].filter(Boolean).join("\r\n");
  const encoded = Buffer.from(headers).toString("base64url");
  await gmail.users.messages.send({ userId: "me", requestBody: { raw: encoded } });
  return { success: true, to: opts.to, subject: opts.subject };
}

export function getGoogleAuthUrl(state: string): string {
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
  return oauth2Client.generateAuthUrl({ access_type: "offline", prompt: "consent", scope: ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.send", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/userinfo.email"], state });
}

export async function exchangeGoogleCode(code: string) {
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}
