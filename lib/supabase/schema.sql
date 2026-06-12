-- ============================================
-- BAH AI LABS — Complete Database Schema
-- Run this in your Supabase SQL editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CONTACT MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  subject     TEXT NOT NULL,
  budget      TEXT,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- CONSULTATION REQUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS consultation_requests (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  company          TEXT,
  phone            TEXT,
  service_interest TEXT NOT NULL,
  message          TEXT NOT NULL,
  preferred_date   DATE,
  preferred_time   TEXT,
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  notes            TEXT,
  meeting_link     TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  first_name   TEXT,
  active       BOOLEAN DEFAULT TRUE,
  source       TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  unsubscribed_at TIMESTAMPTZ
);

-- ============================================
-- LEADS
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  company    TEXT,
  source     TEXT NOT NULL DEFAULT 'website',
  status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'lost')),
  value      NUMERIC(10, 2),
  notes      TEXT,
  tags       TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  long_description TEXT,
  category         TEXT NOT NULL,
  tags             TEXT[],
  image_url        TEXT,
  screenshots      TEXT[],
  tech_stack       TEXT[],
  results          TEXT[],
  problem_statement TEXT,
  solution         TEXT,
  live_url         TEXT,
  github_url       TEXT,
  featured         BOOLEAN DEFAULT FALSE,
  published        BOOLEAN DEFAULT TRUE,
  completed_at     DATE,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- SERVICES
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  icon          TEXT,
  category      TEXT NOT NULL,
  features      TEXT[],
  starting_price NUMERIC(10, 2),
  deliverables  TEXT[],
  active        BOOLEAN DEFAULT TRUE,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  excerpt         TEXT NOT NULL,
  content         TEXT NOT NULL,
  cover_image_url TEXT,
  author_name     TEXT NOT NULL DEFAULT 'Abdulai Bah',
  author_role     TEXT DEFAULT 'AI Engineer & Founder',
  category        TEXT NOT NULL,
  tags            TEXT[],
  published       BOOLEAN DEFAULT FALSE,
  featured        BOOLEAN DEFAULT FALSE,
  reading_time    INTEGER,
  views           INTEGER DEFAULT 0,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- SAAS PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS saas_products (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  tagline     TEXT NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT,
  category    TEXT NOT NULL,
  features    TEXT[],
  status      TEXT NOT NULL DEFAULT 'coming-soon' CHECK (status IN ('live', 'beta', 'coming-soon')),
  demo_url    TEXT,
  screenshots TEXT[],
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- PRICING PLANS
-- ============================================
CREATE TABLE IF NOT EXISTS pricing_plans (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id        UUID NOT NULL REFERENCES saas_products(id) ON DELETE CASCADE,
  name              TEXT NOT NULL,
  price             NUMERIC(10, 2) NOT NULL,
  interval          TEXT NOT NULL DEFAULT 'month' CHECK (interval IN ('month', 'year')),
  description       TEXT,
  features          TEXT[],
  highlighted       BOOLEAN DEFAULT FALSE,
  cta_label         TEXT NOT NULL DEFAULT 'Get Started',
  stripe_product_id TEXT,
  stripe_price_id   TEXT,
  active            BOOLEAN DEFAULT TRUE,
  sort_order        INTEGER DEFAULT 0
);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id               UUID,
  plan_id               UUID REFERENCES pricing_plans(id),
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id    TEXT,
  status                TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start  TIMESTAMPTZ,
  current_period_end    TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT NOT NULL,
  company    TEXT NOT NULL,
  avatar_url TEXT,
  content    TEXT NOT NULL,
  rating     INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  featured   BOOLEAN DEFAULT FALSE,
  approved   BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- ANALYTICS EVENTS
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type  TEXT NOT NULL,
  page        TEXT,
  referrer    TEXT,
  user_agent  TEXT,
  ip          TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on sensitive tables
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Only service role can read these (admin access)
CREATE POLICY "Service role only" ON contact_messages
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only" ON consultation_requests
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only" ON leads
  FOR ALL USING (auth.role() = 'service_role');

-- Public can insert newsletter, not read
CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role read" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'service_role');

-- Public readable tables (no RLS restrictions needed)
-- projects, services, blog_posts, saas_products, pricing_plans, testimonials are public

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
