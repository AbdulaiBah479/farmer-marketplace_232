# AI COO — Your AI Chief Operating Officer

> The world's most powerful AI Business Operating System for entrepreneurs, freelancers, agencies, and small businesses.

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

**15 AI-Powered Business Modules:**
- 🎯 AI Lead Generator — Find and qualify leads automatically
- 👥 AI CRM — Smart relationship and deal management
- 📧 AI Email Assistant — Write better emails 10x faster
- 📄 AI Proposal Generator — Win more deals with perfect proposals
- 🛡️ AI Contract Generator — Generate legally-sound contracts
- 📱 AI Social Media Manager — Dominate every platform
- ✍️ AI Content Studio — Create content that converts
- 🎧 AI Customer Support — 24/7 intelligent support
- 📋 AI Project Manager — Ship projects on time
- 💬 AI Team Hub — Collaborate smarter
- 📊 AI Analytics Dashboard — Insights that drive decisions
- ⚡ AI Workflow Automation — Automate everything
- 📈 AI Sales Assistant — Close more deals faster
- 📣 AI Marketing Assistant — Marketing on autopilot
- 💰 AI Finance Assistant — Take control of cash flow

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with pgvector
- **AI**: Anthropic Claude API (Sonnet + Opus)
- **Auth**: NextAuth.js v5
- **Payments**: Stripe
- **Email**: Resend
- **Deployment**: Docker, Vercel

## 📦 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Anthropic API key
- Stripe account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ai-coo-platform.git
cd ai-coo-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Set up database
npx prisma db push
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Demo Credentials
- Email: `demo@aicoo.io`
- Password: `Password123!`

## 🐳 Docker

```bash
docker-compose up -d
```

## 📁 Project Structure

```
ai-coo-platform/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login, signup pages
│   │   ├── (dashboard)/     # All dashboard pages
│   │   │   ├── leads/       # AI Lead Generator
│   │   │   ├── crm/         # AI CRM
│   │   │   ├── email/       # AI Email
│   │   │   └── ...          # 12 more modules
│   │   └── api/             # API routes
│   ├── components/          # React components
│   ├── lib/                 # Utilities (db, ai, stripe, auth)
│   └── types/               # TypeScript types
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
└── docker-compose.yml       # Docker setup
```

## 💳 Pricing

| Plan | Price | AI Credits | Team Members |
|------|-------|------------|--------------|
| Free | $0/mo | 100 | 1 |
| Starter | $29/mo | 1,000 | 3 |
| Professional | $79/mo | 5,000 | 10 |
| Agency | $199/mo | 20,000 | 25 |
| Enterprise | $499+/mo | Unlimited | Unlimited |

## 🔒 Security

- JWT-based authentication
- Row-level security (organization isolation)
- Encrypted secrets
- GDPR-compliant data handling
- SOC 2 Type II (roadmap)

## 📄 License

MIT License — see [LICENSE](LICENSE) file.

---

Built with ❤️ by the AI COO Team
