-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- TENANTS
create table public.tenants (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  slug          text not null unique,
  logo_url      text,
  industry      text,
  website       text,
  timezone      text not null default 'UTC',
  plan          text not null default 'starter' check (plan in ('starter','professional','enterprise')),
  stripe_customer_id    text unique,
  stripe_subscription_id text unique,
  subscription_status   text not null default 'trialing',
  trial_ends_at         timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- USERS
create table public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  tenant_id     uuid references public.tenants(id) on delete cascade,
  email         text not null,
  full_name     text,
  avatar_url    text,
  role          text not null default 'staff' check (role in ('owner','admin','staff','viewer')),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- CONVERSATIONS
create table public.conversations (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  title         text,
  channel       text not null default 'web' check (channel in ('web','whatsapp','email','slack')),
  status        text not null default 'open' check (status in ('open','closed','escalated')),
  external_id   text,
  metadata      jsonb default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- MESSAGES
create table public.messages (
  id            uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  role          text not null check (role in ('user','assistant','system','tool')),
  content       text not null,
  agent_type    text,
  tool_calls    jsonb,
  tool_results  jsonb,
  tokens_used   integer default 0,
  created_at    timestamptz not null default now()
);

-- KNOWLEDGE BASE
create table public.knowledge_documents (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  title         text not null,
  file_url      text,
  file_type     text,
  content       text,
  status        text not null default 'processing' check (status in ('processing','ready','error')),
  chunk_count   integer default 0,
  uploaded_by   uuid references public.users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table public.knowledge_chunks (
  id            uuid primary key default uuid_generate_v4(),
  document_id   uuid not null references public.knowledge_documents(id) on delete cascade,
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  content       text not null,
  chunk_index   integer not null,
  embedding     vector(1536),
  metadata      jsonb default '{}',
  created_at    timestamptz not null default now()
);

-- TASKS
create table public.tasks (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  title         text not null,
  description   text,
  status        text not null default 'todo' check (status in ('todo','in_progress','done','cancelled')),
  priority      text not null default 'medium' check (priority in ('low','medium','high','urgent')),
  assigned_to   uuid references public.users(id),
  due_date      timestamptz,
  source        text,
  conversation_id uuid references public.conversations(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- CALENDAR EVENTS
create table public.calendar_events (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  google_event_id text,
  title         text not null,
  description   text,
  location      text,
  start_time    timestamptz not null,
  end_time      timestamptz not null,
  attendees     jsonb default '[]',
  organizer_id  uuid references public.users(id),
  status        text not null default 'confirmed' check (status in ('tentative','confirmed','cancelled')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- EMAIL THREADS
create table public.email_threads (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  gmail_thread_id text,
  subject       text,
  from_address  text,
  to_addresses  jsonb default '[]',
  urgency       text default 'normal' check (urgency in ('low','normal','high','urgent')),
  is_read       boolean default false,
  ai_summary    text,
  ai_draft      text,
  labels        jsonb default '[]',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- AGENT MEMORY
create table public.agent_memory (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  agent_type    text not null,
  key           text not null,
  value         jsonb not null,
  expires_at    timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (tenant_id, agent_type, key)
);

-- INTEGRATIONS
create table public.integrations (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  provider      text not null check (provider in ('google','whatsapp','slack','outlook')),
  is_active     boolean not null default false,
  access_token  text,
  refresh_token text,
  token_expires_at timestamptz,
  scopes        jsonb default '[]',
  metadata      jsonb default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (tenant_id, provider)
);

-- ANALYTICS EVENTS
create table public.analytics_events (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  event_type    text not null,
  agent_type    text,
  metadata      jsonb default '{}',
  created_at    timestamptz not null default now()
);

-- INDEXES
create index idx_messages_conversation on public.messages(conversation_id, created_at);
create index idx_messages_tenant on public.messages(tenant_id, created_at desc);
create index idx_conversations_tenant on public.conversations(tenant_id, updated_at desc);
create index idx_knowledge_chunks_tenant on public.knowledge_chunks(tenant_id);
create index idx_tasks_tenant on public.tasks(tenant_id, status, priority);
create index idx_calendar_events_tenant on public.calendar_events(tenant_id, start_time);
create index idx_email_threads_tenant on public.email_threads(tenant_id, created_at desc);
create index idx_analytics_events_tenant on public.analytics_events(tenant_id, created_at desc);
create index idx_knowledge_chunks_embedding on public.knowledge_chunks
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- ROW LEVEL SECURITY
alter table public.tenants enable row level security;
alter table public.users enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.tasks enable row level security;
alter table public.calendar_events enable row level security;
alter table public.email_threads enable row level security;
alter table public.agent_memory enable row level security;
alter table public.integrations enable row level security;
alter table public.analytics_events enable row level security;

create or replace function public.get_user_tenant_id()
returns uuid language sql stable security definer as $$
  select tenant_id from public.users where id = auth.uid();
$$;

create policy "Users see own tenant" on public.tenants for select using (id = public.get_user_tenant_id());
create policy "Owners update own tenant" on public.tenants for update using (id = public.get_user_tenant_id() and exists (select 1 from public.users where id = auth.uid() and role in ('owner','admin')));
create policy "Users see own tenant members" on public.users for select using (tenant_id = public.get_user_tenant_id());
create policy "Users update own profile" on public.users for update using (id = auth.uid());
create policy "Tenant conversations" on public.conversations for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant messages" on public.messages for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant knowledge docs" on public.knowledge_documents for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant knowledge chunks" on public.knowledge_chunks for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant tasks" on public.tasks for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant calendar events" on public.calendar_events for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant email threads" on public.email_threads for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant agent memory" on public.agent_memory for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant integrations" on public.integrations for all using (tenant_id = public.get_user_tenant_id());
create policy "Tenant analytics" on public.analytics_events for all using (tenant_id = public.get_user_tenant_id());

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger set_updated_at_tenants before update on public.tenants for each row execute function public.set_updated_at();
create trigger set_updated_at_users before update on public.users for each row execute function public.set_updated_at();
create trigger set_updated_at_conversations before update on public.conversations for each row execute function public.set_updated_at();
create trigger set_updated_at_tasks before update on public.tasks for each row execute function public.set_updated_at();
create trigger set_updated_at_calendar_events before update on public.calendar_events for each row execute function public.set_updated_at();
create trigger set_updated_at_knowledge_docs before update on public.knowledge_documents for each row execute function public.set_updated_at();
create trigger set_updated_at_email_threads before update on public.email_threads for each row execute function public.set_updated_at();
create trigger set_updated_at_integrations before update on public.integrations for each row execute function public.set_updated_at();

create or replace function public.search_knowledge(
  query_embedding vector(1536),
  match_tenant_id uuid,
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (id uuid, document_id uuid, content text, metadata jsonb, similarity float)
language plpgsql security definer as $$
begin
  return query
  select kc.id, kc.document_id, kc.content, kc.metadata,
    1 - (kc.embedding <=> query_embedding) as similarity
  from public.knowledge_chunks kc
  where kc.tenant_id = match_tenant_id
    and 1 - (kc.embedding <=> query_embedding) > match_threshold
  order by kc.embedding <=> query_embedding
  limit match_count;
end; $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
