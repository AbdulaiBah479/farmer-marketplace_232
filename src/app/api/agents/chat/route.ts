import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById, createConversation, saveMessage, getConversationMessages } from "@/lib/db/queries";
import { runOrchestrator } from "@/lib/agents/orchestrator";
import type { Channel } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const dbUser = await getUserById(user.id);
    if (!dbUser?.tenant_id) return NextResponse.json({ error: "No tenant" }, { status: 403 });
    const tenant = await getTenantById(dbUser.tenant_id);
    if (!tenant) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });

    const body = await req.json();
    const { message, conversationId: existingConvId, channel = "web" } = body as { message: string; conversationId?: string; channel?: Channel };
    if (!message?.trim()) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    let conversationId = existingConvId;
    if (!conversationId) {
      const conv = await createConversation({ tenant_id: dbUser.tenant_id, channel, status: "open", title: message.slice(0, 60) });
      conversationId = conv.id;
    }

    await saveMessage({ conversation_id: conversationId, tenant_id: dbUser.tenant_id, role: "user", content: message, agent_type: null, tool_calls: null, tool_results: null, tokens_used: 0 });

    const history = await getConversationMessages(conversationId);
    const conversationHistory = history.slice(-20).filter((m) => m.role === "user" || m.role === "assistant").map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const response = await runOrchestrator({ tenantId: dbUser.tenant_id, conversationId, userMessage: message, channel, history: conversationHistory, context: { tenantName: tenant.name, tenantSlug: tenant.slug, timezone: tenant.timezone, userName: dbUser.full_name ?? undefined, userRole: dbUser.role } });

    const savedMsg = await saveMessage({ conversation_id: conversationId, tenant_id: dbUser.tenant_id, role: "assistant", content: response.content, agent_type: response.agentType, tool_calls: null, tool_results: null, tokens_used: response.tokensUsed });

    return NextResponse.json({ message: savedMsg, conversationId, agentType: response.agentType, toolsUsed: response.toolCallsMade });
  } catch (err) {
    console.error("[chat/route] Error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
