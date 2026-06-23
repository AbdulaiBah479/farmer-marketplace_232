# Agents

AI agents that run the company OS. Each agent has access to relevant sections of company-os/.

## Available Agents

| Agent | File | Scope |
|-------|------|-------|
| CEO | `.claude/agents/company-os-ceo.md` | vision/, strategy/, all domains |
| CTO | `.claude/agents/company-os-cto.md` | products/, operations/, knowledge/ |
| Product | `.claude/agents/company-os-product.md` | products/, knowledge/ |
| Marketing | `.claude/agents/company-os-marketing.md` | marketing/, knowledge/ |
| Sales | `.claude/agents/company-os-sales.md` | sales/, knowledge/ |
| Research | `.claude/agents/company-os-research.md` | knowledge/, strategy/ |
| Support | `.claude/agents/company-os-support.md` | sops/, knowledge/ |
| Finance | `.claude/agents/company-os-finance.md` | finance/, strategy/ |

## Agent Conventions
- Agents read from company-os/ to get context
- Agents write outputs back to the relevant directory
- All agent outputs are versioned via git
