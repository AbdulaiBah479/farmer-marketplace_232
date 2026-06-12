# NexusAI — AI Company Operating System

## Architecture
- **Frontend + API**: Next.js 15 App Router (Vercel)
- **Database**: Supabase (PostgreSQL + pgvector + Auth + Storage)
- **AI**: Anthropic Claude claude-sonnet-4-6 with agentic tool use
- **Email**: Gmail API via Google OAuth2
- **Calendar**: Google Calendar API
- **Messaging**: WhatsApp Business Cloud API
- **Billing**: Stripe

## Key Directories
- `src/lib/agents/` — Orchestrator + 4 specialized agents
- `src/lib/tools/` — Tool registry + executor (8 tools)
- `src/lib/integrations/` — Gmail, Google Calendar, WhatsApp, Stripe
- `src/lib/vector/` — Embedding + chunking for RAG
- `src/lib/db/` — Supabase client and typed queries
- `supabase/migrations/` — Full SQL schema with RLS

## Dev Setup
1. `cp .env.example .env.local` and fill all keys
2. `npm install`
3. `supabase db push`
4. `npm run dev`

## Multi-Tenant
All data scoped to `tenant_id`. RLS enforced at DB level.
`get_user_tenant_id()` SQL function resolves current user tenant.
