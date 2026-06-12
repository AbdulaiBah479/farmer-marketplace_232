export type Plan = "starter" | "professional" | "enterprise";
export type UserRole = "owner" | "admin" | "staff" | "viewer";
export type Channel = "web" | "whatsapp" | "email" | "slack";
export type ConversationStatus = "open" | "closed" | "escalated";
export type MessageRole = "user" | "assistant" | "system" | "tool";
export type AgentType = "orchestrator" | "receptionist" | "email" | "scheduler" | "support";
export type TaskStatus = "todo" | "in_progress" | "done" | "cancelled";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type IntegrationProvider = "google" | "whatsapp" | "slack" | "outlook";
export type DocumentStatus = "processing" | "ready" | "error";

export interface Tenant {
  id: string; name: string; slug: string; logo_url: string | null;
  industry: string | null; website: string | null; timezone: string;
  plan: Plan; stripe_customer_id: string | null; stripe_subscription_id: string | null;
  subscription_status: string; trial_ends_at: string | null;
  created_at: string; updated_at: string;
}

export interface User {
  id: string; tenant_id: string; email: string; full_name: string | null;
  avatar_url: string | null; role: UserRole; is_active: boolean;
  created_at: string; updated_at: string;
}

export interface Conversation {
  id: string; tenant_id: string; title: string | null; channel: Channel;
  status: ConversationStatus; external_id: string | null;
  metadata: Record<string, unknown>; created_at: string; updated_at: string;
  messages?: Message[];
}

export interface Message {
  id: string; conversation_id: string; tenant_id: string; role: MessageRole;
  content: string; agent_type: AgentType | null; tool_calls: ToolCall[] | null;
  tool_results: ToolResult[] | null; tokens_used: number; created_at: string;
}

export interface ToolCall { id: string; type: "tool_use"; name: string; input: Record<string, unknown>; }
export interface ToolResult { tool_use_id: string; content: string; is_error?: boolean; }

export interface KnowledgeDocument {
  id: string; tenant_id: string; title: string; file_url: string | null;
  file_type: string | null; content: string | null; status: DocumentStatus;
  chunk_count: number; uploaded_by: string | null; created_at: string; updated_at: string;
}

export interface Task {
  id: string; tenant_id: string; title: string; description: string | null;
  status: TaskStatus; priority: TaskPriority; assigned_to: string | null;
  due_date: string | null; source: string | null; conversation_id: string | null;
  created_at: string; updated_at: string;
}

export interface CalendarEvent {
  id: string; tenant_id: string; google_event_id: string | null; title: string;
  description: string | null; location: string | null; start_time: string;
  end_time: string; attendees: Attendee[]; organizer_id: string | null;
  status: "tentative" | "confirmed" | "cancelled"; created_at: string; updated_at: string;
}

export interface Attendee { email: string; name?: string; status?: "accepted" | "declined" | "tentative" | "needsAction"; }

export interface EmailThread {
  id: string; tenant_id: string; gmail_thread_id: string | null; subject: string | null;
  from_address: string | null; to_addresses: string[]; urgency: "low" | "normal" | "high" | "urgent";
  is_read: boolean; ai_summary: string | null; ai_draft: string | null;
  labels: string[]; created_at: string; updated_at: string;
}

export interface Integration {
  id: string; tenant_id: string; provider: IntegrationProvider; is_active: boolean;
  token_expires_at: string | null; scopes: string[]; metadata: Record<string, unknown>;
  created_at: string; updated_at: string;
}

export interface AgentRequest {
  tenantId: string; conversationId: string; userMessage: string; channel: Channel;
  history?: ConversationMessage[]; context?: AgentContext;
}

export interface AgentContext {
  tenantName: string; tenantSlug: string; timezone: string;
  userName?: string; userRole?: UserRole;
}

export interface ConversationMessage { role: "user" | "assistant"; content: string; }

export interface AgentResponse {
  content: string; agentType: AgentType; toolCallsMade: string[]; tokensUsed: number;
}

export interface AnalyticsSummary {
  totalMessages: number; totalConversations: number; totalTasksCreated: number;
  totalEmailsDrafted: number; avgResponseTime: number;
  agentBreakdown: Record<AgentType, number>; dailyActivity: DailyActivity[];
}

export interface DailyActivity { date: string; messages: number; tasks: number; }

export const PLANS: Record<Plan, PlanDetails> = {
  starter: {
    name: "Starter", price: 49, priceId: process.env.STRIPE_STARTER_PRICE_ID ?? "",
    limits: { messages: 1000, documents: 10, users: 3 },
    features: ["AI Receptionist", "Email Agent", "1,000 messages/mo", "10 knowledge docs", "3 team members"],
  },
  professional: {
    name: "Professional", price: 149, priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID ?? "",
    limits: { messages: 10000, documents: 100, users: 15 },
    features: ["All Starter features", "Scheduling Agent", "Support Agent", "WhatsApp integration", "10,000 messages/mo", "100 documents", "15 team members"],
  },
  enterprise: {
    name: "Enterprise", price: 499, priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? "",
    limits: { messages: -1, documents: -1, users: -1 },
    features: ["All Professional features", "Unlimited everything", "Custom agents", "Dedicated support", "SLA guarantee", "Custom integrations"],
  },
};

export interface PlanDetails {
  name: string; price: number; priceId: string;
  limits: { messages: number; documents: number; users: number };
  features: string[];
}
