import type { AgentType } from "@/types";
import type { TenantContext } from "./prompts";
import { getOrchestratorPrompt, getReceptionistPrompt, getEmailAgentPrompt, getSchedulerPrompt, getSupportAgentPrompt } from "./prompts";

export function getAgentPrompt(agentType: AgentType, ctx: TenantContext): string {
  switch (agentType) {
    case "receptionist": return getReceptionistPrompt(ctx);
    case "email": return getEmailAgentPrompt(ctx);
    case "scheduler": return getSchedulerPrompt(ctx);
    case "support": return getSupportAgentPrompt(ctx);
    case "orchestrator":
    default: return getOrchestratorPrompt(ctx);
  }
}
