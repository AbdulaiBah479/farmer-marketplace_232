# DocChat AI — Setup Guide

## Overview

DocChat AI lets users upload PDFs, Word documents, or URLs and chat with them using Google Gemini AI + Supabase pgvector for semantic search.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v3 |
| Database + Auth | Supabase (PostgreSQL + pgvector) |
| AI | Google Gemini 1.5 Flash + text-embedding-004 |
| Payments | Lemon Squeezy |
| Deploy | Vercel |

---

## Step 1: Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Enable the `vector` extension (should auto-enable from SQL, but check under **Database → Extensions**)
4. Copy your project URL and keys from **Settings → API**

## Step 2: Google Gemini API

1. Go to [aistudio.google.com](https://aistudio.google.com/app/apikey)
2. Create a free API key (free tier is generous — 1M tokens/day)
3. Copy the API key

## Step 3: Lemon Squeezy (Payments)

1. Sign up at [lemonsqueezy.com](https://www.lemonsqueezy.com)
2. Create a new store
3. Create two products:
   - **Pro Plan** — $9/month subscription
   - **Team Plan** — $29/month subscription
4. Get the variant IDs from each product's checkout URL
5. Set up a webhook pointing to `https://your-domain.com/api/webhooks/lemon`
6. Copy the webhook signing secret

## Step 4: Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

GEMINI_API_KEY=AIzaSy...

LEMON_SQUEEZY_WEBHOOK_SECRET=whsec_...
LEMON_SQUEEZY_PRO_VARIANT_ID=12345
LEMON_SQUEEZY_TEAM_VARIANT_ID=12346

NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Step 5: Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect your GitHub repo directly in the Vercel dashboard.

Add all environment variables in **Vercel → Settings → Environment Variables**.

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pricing Model

| Plan | Price | Documents | Questions |
|---|---|---|---|
| Free | $0 | 3 | 50 total |
| Pro | $9/mo | 50 | Unlimited |
| Team | $29/mo | Unlimited | Unlimited + team sharing |

---

## Architecture

```
User uploads PDF/DOCX/URL
        ↓
API extracts text (pdf-parse / mammoth / cheerio)
        ↓
Text split into ~1000-char chunks
        ↓
Each chunk → Gemini text-embedding-004 → 768-dim vector
        ↓
Vectors stored in Supabase (pgvector)
        ↓
User asks question
        ↓
Question → embedding → cosine similarity search
        ↓
Top 5 relevant chunks retrieved
        ↓
Gemini 1.5 Flash generates grounded answer
        ↓
Answer + sources returned to user
```
