import Anthropic from "@anthropic-ai/sdk";
import { TOOL_DEFINITIONS } from "../tools/registry";
import { executeTool } from "../tools/executor";
import { searchKnowledge, trackEvent } from "../db/queries";
import { getEmbedding } from "../vector/embeddings";
import type { AgentRequest, AgentResponse, AgentType } from "@/types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const AGENT_ROUTING_KEYWORDS: Record<string, string[]> = {
  email: ["email", "inbox", "draft", "reply", "send email", "mail", "message to", "write to"],
  scheduler: ["schedule", "meeting", "calendar", "book", "availability", "appointment", "event", "reschedule"],
  support: ["problem", "issue", "broken", "error", "complaint", "help", "not working", "bug", "refund"],
  receptionist: ["hello", "hi", "who are you", "about", "company", "hours", "location", "contact"],
};

function detectAgent(message: string): AgentType {
  const lower = message.toLowerCase();
  for (const [agent, keywords] of Object.entries(AGENT_ROUTING_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return agent as AgentType;
  }
  return "orchestrator";
}

export async function runOrchestrator(req: AgentRequest): Promise<AgentResponse> {
  const { tenantId, userMessage, channel, history = [], context } = req;

  let knowledgeContext = "";
  try {
    const embedding = await getEmbedding(userMessage);
    const chunks = await searchKnowledge(tenantId, embedding, 0.65, 5);
    if (chunks.length > 0) {
      knowledgeContext = "Relevant company knowledge:\n\n" + chunks.map((c, i) => `[${i + 1}] ${c.content}`).join("\n\n");
    }
  } catch {}

  const agentType = detectAgent(userMessage);
  const tenantCtx = {
    tenantName: context?.tenantName ?? "Your Company",
    tenantSlug: context?.tenantSlug ?? "",
    timezone: context?.timezone ?? "UTC",
    currentDate: new Date().toLocaleString("en-US", { timeZone: context?.timezone ?? "UTC", dateStyle: "full", timeStyle: "short" }),
    userName: context?.userName,
    knowledgeContext,
  };

  const { getAgentPrompt } = await import("./router");
  const systemPrompt = getAgentPrompt(agentType, tenantCtx);

  const messages: Anthropic.MessageParam[] = [
    ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    { role: "user", content: userMessage },
  ];

  const toolCallsMade: string[] = [];
  let totalTokens = 0;
  let finalContent = "";
  let currentMessages = messages;

  while (true) {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      tools: TOOL_DEFINITIONS,
      messages: currentMessages,
    });

    totalTokens += response.usage.input_tokens + response.usage.output_tokens;

    if (response.stop_reason === "end_turn") {
      const textBlock = response.content.find((b) => b.type === "text");
      finalContent = textBlock ? textBlock.text : "";
      break;
    }

    if (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter((b) => b.type === "tool_use");
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of toolUseBlocks) {
        if (block.type !== "tool_use") continue;
        toolCallsMade.push(block.name);
        try {
          const result = await executeTool(block.name, block.input as Record<string, unknown>, {
            tenantId, conversationId: req.conversationId, channel,
          });
          toolResults.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(result) });
        } catch (err) {
          toolResults.push({ type: "tool_result", tool_use_id: block.id, content: `Error: ${err instanceof Error ? err.message : "Tool failed"}`, is_error: true });
        }
      }

      currentMessages = [
        ...currentMessages,
        { role: "assistant", content: response.content },
        { role: "user", content: toolResults },
      ];
      continue;
    }

    const textBlock = response.content.find((b) => b.type === "text");
    finalContent = textBlock ? textBlock.text : "I was unable to process that request.";
    break;
  }

  await trackEvent(tenantId, "message_processed", agentType, { channel, toolsUsed: toolCallsMade, tokens: totalTokens }).catch(() => {});

  return { content: finalContent, agentType, toolCallsMade, tokensUsed: totalTokens };
}
