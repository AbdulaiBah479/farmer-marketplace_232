import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-ai-agents-for-business-automation",
    title: "Building AI Agents That Actually Work: A Practical Guide for Businesses",
    excerpt:
      "Most AI agent demos look impressive. Most production AI agents fail. Here's what separates the two — and how to build agents that deliver real business value.",
    content: `## The Problem with AI Agent Hype\n\nEvery week, there are new demos of AI agents doing impressive things. Research agents that browse the web. Coding agents that write full applications. Customer service agents that seem indistinguishable from humans.\n\nBut here's the reality: most AI agents fail in production. Not because the technology is bad — but because they're built without understanding the constraints of real business environments.\n\nAfter building AI agents for dozens of companies across fintech, logistics, HR, and e-commerce, I've distilled what separates agents that work from agents that don't.`,
    coverImageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    author: {
      name: "Abdulai Bah",
      role: "AI Engineer & Founder",
    },
    category: "AI Engineering",
    tags: ["AI Agents", "Automation", "LLMs", "Business"],
    publishedAt: "2024-12-10",
    readingTime: 8,
    featured: true,
  },
  {
    id: "2",
    slug: "saas-architecture-for-solo-founders",
    title: "The SaaS Architecture I Use to Launch Products in 6 Weeks",
    excerpt:
      "After building 10+ SaaS products, I've converged on a stack and architecture that lets me go from idea to paying customers in under 6 weeks without sacrificing scalability.",
    content: `## Why Architecture Decisions Made Early Matter\n\nThe technical decisions you make when starting a SaaS product will either accelerate your growth or become the shackles that slow you down as you scale.\n\nAfter building products across multiple industries, I've developed a repeatable architecture that works for 95% of SaaS use cases — scalable from zero to millions of users, deployable in weeks, maintainable by small teams.`,
    coverImageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
    author: {
      name: "Abdulai Bah",
      role: "AI Engineer & Founder",
    },
    category: "Software Development",
    tags: ["SaaS", "Architecture", "Next.js", "Supabase"],
    publishedAt: "2024-11-28",
    readingTime: 12,
    featured: true,
  },
  {
    id: "3",
    slug: "ai-transformation-roadmap-for-smes",
    title: "The AI Transformation Roadmap Every SME Should Follow in 2025",
    excerpt:
      "AI isn't just for enterprise. Here's a practical, phased approach to AI adoption for small and medium businesses — without the risk, the hype, or the massive budget.",
    content: `## Why SMEs Are Missing the AI Opportunity\n\nLarge enterprises are pouring billions into AI. Startups are building AI-native companies from day one. But small and medium businesses — which make up the backbone of most economies — are largely sitting on the sidelines.\n\nThe reason isn't lack of interest. It's lack of a clear roadmap. AI feels overwhelming: too many tools, too many vendors, too much risk, too little clarity on where to start.\n\nThis guide provides that roadmap.`,
    coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    author: {
      name: "Abdulai Bah",
      role: "AI Engineer & Founder",
    },
    category: "AI Strategy",
    tags: ["AI Strategy", "SME", "Digital Transformation", "Consulting"],
    publishedAt: "2024-11-15",
    readingTime: 10,
    featured: true,
  },
  {
    id: "4",
    slug: "prompt-engineering-production",
    title: "Prompt Engineering in Production: Beyond the Basics",
    excerpt:
      "Prompt engineering tutorials teach you how to get good outputs in a playground. Production systems are different. Here's what changes when you go to production.",
    content: `## The Playground vs Production Gap\n\nAnyone can write a prompt that works in ChatGPT. Production prompt engineering is a different discipline entirely.\n\nIn production, you're dealing with unpredictable user inputs, latency constraints, cost optimization, hallucination prevention, and output parsing — all at the same time.`,
    coverImageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    author: {
      name: "Abdulai Bah",
      role: "AI Engineer & Founder",
    },
    category: "AI Engineering",
    tags: ["LLMs", "Prompt Engineering", "Production", "Engineering"],
    publishedAt: "2024-10-30",
    readingTime: 7,
    featured: false,
  },
  {
    id: "5",
    slug: "building-for-african-markets",
    title: "Building Technology Products for African Markets: What I've Learned",
    excerpt:
      "Building technology for African markets requires rethinking assumptions about connectivity, payment infrastructure, trust, and user behavior.",
    content: `## Why African Markets Require Different Thinking\n\nAfrica is not a monolith, and building technology for any African market requires deeply understanding the local context. The assumptions you'd make building for European or American users will lead you astray.`,
    coverImageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    author: {
      name: "Abdulai Bah",
      role: "AI Engineer & Founder",
    },
    category: "Product",
    tags: ["Africa", "Product", "Markets", "Startups"],
    publishedAt: "2024-10-10",
    readingTime: 9,
    featured: false,
  },
  {
    id: "6",
    slug: "ai-customer-support-implementation",
    title: "How to Implement AI Customer Support Without Losing Your Customers",
    excerpt:
      "Bad AI customer support is worse than no AI customer support. Here's how to do it right — including what to automate, what not to, and how to measure success.",
    content: `## The Wrong Way to Automate Customer Support\n\nEvery week I see companies deploy AI chatbots that frustrate customers, damage brand trust, and end up being turned off after a few months.\n\nThe problem isn't the AI. The problem is the implementation approach.`,
    coverImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80",
    author: {
      name: "Abdulai Bah",
      role: "AI Engineer & Founder",
    },
    category: "AI Engineering",
    tags: ["Customer Support", "AI", "Chatbots", "Implementation"],
    publishedAt: "2024-09-25",
    readingTime: 11,
    featured: false,
  },
];

export const blogCategories = [
  "All",
  "AI Engineering",
  "Software Development",
  "AI Strategy",
  "Product",
];
