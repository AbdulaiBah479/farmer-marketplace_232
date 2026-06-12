const BASE_URL = "https://graph.facebook.com/v18.0";

export interface WhatsAppMessage { to: string; message: string; type?: "text" | "template"; templateName?: string; templateParams?: string[]; }

export async function sendWhatsAppMessage(opts: WhatsAppMessage) {
  const body = opts.type === "template"
    ? { messaging_product: "whatsapp", to: opts.to, type: "template", template: { name: opts.templateName, language: { code: "en" }, components: opts.templateParams?.length ? [{ type: "body", parameters: opts.templateParams.map((p) => ({ type: "text", text: p })) }] : [] } }
    : { messaging_product: "whatsapp", to: opts.to, type: "text", text: { body: opts.message, preview_url: false } };
  const res = await fetch(`${BASE_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}` }, body: JSON.stringify(body) });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(`WhatsApp API error: ${JSON.stringify(err)}`); }
  const data = (await res.json()) as { messages: Array<{ id: string }> };
  return { success: true, messageId: data.messages?.[0]?.id };
}

export interface WhatsAppWebhookPayload { object: string; entry: Array<{ id: string; changes: Array<{ value: { messaging_product: string; metadata: { phone_number_id: string; display_phone_number: string }; messages?: Array<{ from: string; id: string; timestamp: string; type: string; text?: { body: string } }>; statuses?: Array<{ id: string; status: string; timestamp: string; recipient_id: string }> }; field: string }> }> }

export function extractIncomingMessages(payload: WhatsAppWebhookPayload) {
  const msgs: Array<{ from: string; text: string; messageId: string }> = [];
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const msg of change.value.messages ?? []) {
        if (msg.type === "text" && msg.text?.body) msgs.push({ from: msg.from, text: msg.text.body, messageId: msg.id });
      }
    }
  }
  return msgs;
}
