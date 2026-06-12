import { createTask, updateTask, listTasks, searchKnowledge } from "../db/queries";
import { getEmbedding } from "../vector/embeddings";
import { gmailReadEmails, gmailSendEmail } from "../integrations/gmail";
import { googleCalendarCheckAvailability, googleCalendarCreateEvent, googleCalendarUpdateEvent } from "../integrations/google-calendar";
import { sendWhatsAppMessage } from "../integrations/whatsapp";

export interface ToolContext { tenantId: string; conversationId: string; channel: string; }

export async function executeTool(name: string, input: Record<string, unknown>, ctx: ToolContext): Promise<unknown> {
  switch (name) {
    case "searchKnowledgeBase": {
      const embedding = await getEmbedding(input.query as string);
      const results = await searchKnowledge(ctx.tenantId, embedding, 0.65, (input.limit as number) ?? 5);
      return { found: results.length, results: results.map((r) => ({ content: r.content, relevance: Math.round(r.similarity * 100) + "%" })) };
    }
    case "readEmail": return gmailReadEmails(ctx.tenantId, { maxResults: (input.maxResults as number) ?? 10, query: input.query as string | undefined });
    case "sendEmail": return gmailSendEmail(ctx.tenantId, { to: input.to as string, subject: input.subject as string, body: input.body as string, cc: input.cc as string | undefined });
    case "checkCalendarAvailability": return googleCalendarCheckAvailability(ctx.tenantId, { startDate: input.startDate as string, endDate: input.endDate as string });
    case "createCalendarEvent": return googleCalendarCreateEvent(ctx.tenantId, { title: input.title as string, startTime: input.startTime as string, endTime: input.endTime as string, attendees: (input.attendees as string[]) ?? [], description: input.description as string | undefined, location: input.location as string | undefined });
    case "updateCalendarEvent": return googleCalendarUpdateEvent(ctx.tenantId, input.eventId as string, { title: input.title as string | undefined, startTime: input.startTime as string | undefined, endTime: input.endTime as string | undefined, description: input.description as string | undefined, status: input.status as string | undefined });
    case "createTask": {
      const task = await createTask({ tenant_id: ctx.tenantId, title: input.title as string, description: (input.description as string) ?? null, priority: (input.priority as "low" | "medium" | "high" | "urgent") ?? "medium", status: "todo", due_date: (input.dueDate as string) ?? null, assigned_to: null, source: "ai", conversation_id: ctx.conversationId });
      return { success: true, taskId: task.id, title: task.title };
    }
    case "updateTask": {
      await updateTask(input.taskId as string, { status: input.status as "todo" | "in_progress" | "done" | "cancelled" | undefined, title: input.title as string | undefined, description: input.description as string | undefined, priority: input.priority as "low" | "medium" | "high" | "urgent" | undefined });
      return { success: true, taskId: input.taskId };
    }
    case "listTasks": {
      const tasks = await listTasks(ctx.tenantId);
      return { tasks: tasks.filter((t) => !input.status || t.status === input.status).filter((t) => !input.priority || t.priority === input.priority).slice(0, 20) };
    }
    case "sendWhatsAppMessage": return sendWhatsAppMessage({ to: input.to as string, message: input.message as string });
    default: throw new Error(`Unknown tool: ${name}`);
  }
}
