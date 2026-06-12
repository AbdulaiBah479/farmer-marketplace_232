import type Anthropic from "@anthropic-ai/sdk";

export const TOOL_DEFINITIONS: Anthropic.Tool[] = [
  {
    name: "searchKnowledgeBase",
    description: "Search the company knowledge base for relevant information. Always call this before answering specific company questions.",
    input_schema: { type: "object", properties: { query: { type: "string", description: "Search query" }, limit: { type: "number" } }, required: ["query"] },
  },
  {
    name: "readEmail",
    description: "Read recent emails from the company Gmail inbox.",
    input_schema: { type: "object", properties: { maxResults: { type: "number" }, query: { type: "string", description: "Gmail search query" } }, required: [] },
  },
  {
    name: "sendEmail",
    description: "Send an email on behalf of the company. Use only when explicitly requested.",
    input_schema: { type: "object", properties: { to: { type: "string" }, subject: { type: "string" }, body: { type: "string" }, cc: { type: "string" } }, required: ["to", "subject", "body"] },
  },
  {
    name: "checkCalendarAvailability",
    description: "Check free/busy times on the company Google Calendar.",
    input_schema: { type: "object", properties: { startDate: { type: "string" }, endDate: { type: "string" } }, required: ["startDate", "endDate"] },
  },
  {
    name: "createCalendarEvent",
    description: "Create a calendar event and send invitations. Confirm details with user first.",
    input_schema: { type: "object", properties: { title: { type: "string" }, startTime: { type: "string" }, endTime: { type: "string" }, attendees: { type: "array", items: { type: "string" } }, description: { type: "string" }, location: { type: "string" } }, required: ["title", "startTime", "endTime"] },
  },
  {
    name: "updateCalendarEvent",
    description: "Update or cancel an existing calendar event.",
    input_schema: { type: "object", properties: { eventId: { type: "string" }, title: { type: "string" }, startTime: { type: "string" }, endTime: { type: "string" }, description: { type: "string" }, status: { type: "string", enum: ["confirmed", "tentative", "cancelled"] } }, required: ["eventId"] },
  },
  {
    name: "createTask",
    description: "Create a task in the company task manager.",
    input_schema: { type: "object", properties: { title: { type: "string" }, description: { type: "string" }, priority: { type: "string", enum: ["low", "medium", "high", "urgent"] }, dueDate: { type: "string" } }, required: ["title"] },
  },
  {
    name: "updateTask",
    description: "Update an existing task status or details.",
    input_schema: { type: "object", properties: { taskId: { type: "string" }, status: { type: "string", enum: ["todo", "in_progress", "done", "cancelled"] }, title: { type: "string" }, description: { type: "string" }, priority: { type: "string", enum: ["low", "medium", "high", "urgent"] } }, required: ["taskId"] },
  },
  {
    name: "listTasks",
    description: "List current tasks filtered by status or priority.",
    input_schema: { type: "object", properties: { status: { type: "string", enum: ["todo", "in_progress", "done", "cancelled"] }, priority: { type: "string", enum: ["low", "medium", "high", "urgent"] } }, required: [] },
  },
  {
    name: "sendWhatsAppMessage",
    description: "Send a WhatsApp message via WhatsApp Business API.",
    input_schema: { type: "object", properties: { to: { type: "string", description: "Phone in E.164 format" }, message: { type: "string" } }, required: ["to", "message"] },
  },
];
