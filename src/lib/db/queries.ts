import { supabaseAdmin } from "./client";
import type { Tenant, User, Conversation, Message, Task, CalendarEvent, EmailThread, KnowledgeDocument, Integration, AnalyticsSummary, AgentType } from "@/types";

export async function getTenantById(id: string): Promise<Tenant | null> {
  const { data } = await supabaseAdmin.from("tenants").select("*").eq("id", id).single();
  return data;
}

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const { data } = await supabaseAdmin.from("tenants").select("*").eq("slug", slug).single();
  return data;
}

export async function createTenant(data: Pick<Tenant, "name" | "slug"> & Partial<Tenant>): Promise<Tenant> {
  const { data: tenant, error } = await supabaseAdmin.from("tenants").insert(data).select().single();
  if (error) throw error;
  return tenant;
}

export async function updateTenant(id: string, data: Partial<Tenant>): Promise<void> {
  const { error } = await supabaseAdmin.from("tenants").update(data).eq("id", id);
  if (error) throw error;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data } = await supabaseAdmin.from("users").select("*").eq("id", id).single();
  return data;
}

export async function upsertUser(data: Partial<User> & { id: string }): Promise<void> {
  const { error } = await supabaseAdmin.from("users").upsert(data);
  if (error) throw error;
}

export async function getTenantUsers(tenantId: string): Promise<User[]> {
  const { data } = await supabaseAdmin.from("users").select("*").eq("tenant_id", tenantId).order("created_at");
  return data ?? [];
}

export async function createConversation(data: Partial<Conversation> & { tenant_id: string }): Promise<Conversation> {
  const { data: conv, error } = await supabaseAdmin.from("conversations").insert(data).select().single();
  if (error) throw error;
  return conv;
}

export async function listConversations(tenantId: string, limit = 20): Promise<Conversation[]> {
  const { data } = await supabaseAdmin.from("conversations").select("*").eq("tenant_id", tenantId).order("updated_at", { ascending: false }).limit(limit);
  return data ?? [];
}

export async function saveMessage(data: Omit<Message, "id" | "created_at">): Promise<Message> {
  const { data: msg, error } = await supabaseAdmin.from("messages").insert(data).select().single();
  if (error) throw error;
  return msg;
}

export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  const { data } = await supabaseAdmin.from("messages").select("*").eq("conversation_id", conversationId).order("created_at");
  return data ?? [];
}

export async function createTask(data: Omit<Task, "id" | "created_at" | "updated_at">): Promise<Task> {
  const { data: task, error } = await supabaseAdmin.from("tasks").insert(data).select().single();
  if (error) throw error;
  return task;
}

export async function listTasks(tenantId: string): Promise<Task[]> {
  const { data } = await supabaseAdmin.from("tasks").select("*").eq("tenant_id", tenantId).order("created_at", { ascending: false });
  return data ?? [];
}

export async function updateTask(id: string, data: Partial<Task>): Promise<void> {
  const { error } = await supabaseAdmin.from("tasks").update(data).eq("id", id);
  if (error) throw error;
}

export async function createCalendarEvent(data: Omit<CalendarEvent, "id" | "created_at" | "updated_at">): Promise<CalendarEvent> {
  const { data: event, error } = await supabaseAdmin.from("calendar_events").insert(data).select().single();
  if (error) throw error;
  return event;
}

export async function listUpcomingEvents(tenantId: string, limit = 10): Promise<CalendarEvent[]> {
  const { data } = await supabaseAdmin.from("calendar_events").select("*").eq("tenant_id", tenantId).gte("start_time", new Date().toISOString()).order("start_time").limit(limit);
  return data ?? [];
}

export async function createKnowledgeDocument(data: Omit<KnowledgeDocument, "id" | "created_at" | "updated_at">): Promise<KnowledgeDocument> {
  const { data: doc, error } = await supabaseAdmin.from("knowledge_documents").insert(data).select().single();
  if (error) throw error;
  return doc;
}

export async function listKnowledgeDocuments(tenantId: string): Promise<KnowledgeDocument[]> {
  const { data } = await supabaseAdmin.from("knowledge_documents").select("*").eq("tenant_id", tenantId).order("created_at", { ascending: false });
  return data ?? [];
}

export async function saveKnowledgeChunks(chunks: Array<{ document_id: string; tenant_id: string; content: string; chunk_index: number; embedding: number[]; metadata: Record<string, unknown> }>): Promise<void> {
  const { error } = await supabaseAdmin.from("knowledge_chunks").insert(chunks);
  if (error) throw error;
}

export async function searchKnowledge(tenantId: string, queryEmbedding: number[], threshold = 0.7, limit = 5): Promise<Array<{ content: string; similarity: number }>> {
  const { data, error } = await supabaseAdmin.rpc("search_knowledge", { query_embedding: queryEmbedding, match_tenant_id: tenantId, match_threshold: threshold, match_count: limit });
  if (error) throw error;
  return data ?? [];
}

export async function getIntegration(tenantId: string, provider: string): Promise<Integration | null> {
  const { data } = await supabaseAdmin.from("integrations").select("*").eq("tenant_id", tenantId).eq("provider", provider).single();
  return data;
}

export async function upsertIntegration(data: Partial<Integration> & { tenant_id: string; provider: string }): Promise<void> {
  const { error } = await supabaseAdmin.from("integrations").upsert(data, { onConflict: "tenant_id,provider" });
  if (error) throw error;
}

export async function trackEvent(tenantId: string, eventType: string, agentType?: AgentType, metadata?: Record<string, unknown>): Promise<void> {
  await supabaseAdmin.from("analytics_events").insert({ tenant_id: tenantId, event_type: eventType, agent_type: agentType, metadata: metadata ?? {} });
}

export async function getAnalyticsSummary(tenantId: string, days = 30): Promise<AnalyticsSummary> {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const [msgResult, convResult, taskResult, agentResult] = await Promise.all([
    supabaseAdmin.from("messages").select("id", { count: "exact" }).eq("tenant_id", tenantId).gte("created_at", since),
    supabaseAdmin.from("conversations").select("id", { count: "exact" }).eq("tenant_id", tenantId).gte("created_at", since),
    supabaseAdmin.from("tasks").select("id", { count: "exact" }).eq("tenant_id", tenantId).gte("created_at", since),
    supabaseAdmin.from("analytics_events").select("agent_type, created_at").eq("tenant_id", tenantId).gte("created_at", since),
  ]);
  const agentBreakdown: Record<string, number> = {};
  (agentResult.data ?? []).forEach((e) => { if (e.agent_type) agentBreakdown[e.agent_type] = (agentBreakdown[e.agent_type] ?? 0) + 1; });
  const dailyActivity = Array.from({ length: 7 }, (_, i) => { const d = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000); return { date: d.toISOString().split("T")[0], messages: 0, tasks: 0 }; });
  return { totalMessages: msgResult.count ?? 0, totalConversations: convResult.count ?? 0, totalTasksCreated: taskResult.count ?? 0, totalEmailsDrafted: agentBreakdown["email"] ?? 0, avgResponseTime: 2.3, agentBreakdown: agentBreakdown as AnalyticsSummary["agentBreakdown"], dailyActivity };
}
