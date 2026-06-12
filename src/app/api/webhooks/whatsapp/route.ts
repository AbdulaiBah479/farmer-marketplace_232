import { NextRequest, NextResponse } from "next/server";
import { extractIncomingMessages, sendWhatsAppMessage } from "@/lib/integrations/whatsapp";
import { supabaseAdmin } from "@/lib/db/client";
import { createConversation, saveMessage } from "@/lib/db/queries";
import { runOrchestrator } from "@/lib/agents/orchestrator";
import type { WhatsAppWebhookPayload } from "@/lib/integrations/whatsapp";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) return new Response(challenge, { status: 200 });
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as WhatsAppWebhookPayload;
    const incoming = extractIncomingMessages(payload);
    for (const msg of incoming) {
      const { data: integration } = await supabaseAdmin.from("integrations").select("tenant_id").eq("provider", "whatsapp").eq("is_active", true).single();
      if (!integration) continue;
      const tenantId = integration.tenant_id;
      const { data: existingConv } = await supabaseAdmin.from("conversations").select("id").eq("tenant_id", tenantId).eq("channel", "whatsapp").eq("external_id", msg.from).eq("status", "open").single();
      let conversationId: string;
      if (existingConv) { conversationId = existingConv.id; }
      else { const conv = await createConversation({ tenant_id: tenantId, channel: "whatsapp", external_id: msg.from, status: "open", title: `WhatsApp: ${msg.from}` }); conversationId = conv.id; }
      await saveMessage({ conversation_id: conversationId, tenant_id: tenantId, role: "user", content: msg.text, agent_type: null, tool_calls: null, tool_results: null, tokens_used: 0 });
      const { data: tenant } = await supabaseAdmin.from("tenants").select("name, slug, timezone").eq("id", tenantId).single();
      const aiResponse = await runOrchestrator({ tenantId, conversationId, userMessage: msg.text, channel: "whatsapp", context: tenant ? { tenantName: tenant.name, tenantSlug: tenant.slug, timezone: tenant.timezone } : undefined });
      await saveMessage({ conversation_id: conversationId, tenant_id: tenantId, role: "assistant", content: aiResponse.content, agent_type: aiResponse.agentType, tool_calls: null, tool_results: null, tokens_used: aiResponse.tokensUsed });
      await sendWhatsAppMessage({ to: msg.from, message: aiResponse.content });
    }
    return NextResponse.json({ status: "ok" });
  } catch (err) { console.error("[whatsapp webhook] Error:", err); return NextResponse.json({ error: "Processing failed" }, { status: 500 }); }
}
