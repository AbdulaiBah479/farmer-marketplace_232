import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "ai-customer-support-platform",
    title: "AI Customer Support Platform",
    description:
      "End-to-end AI customer support system handling 10,000+ monthly conversations with 94% resolution rate for a fintech startup.",
    longDescription:
      "Built a comprehensive AI-powered customer support platform for a rapidly growing fintech startup processing thousands of customer queries daily. The system combines a fine-tuned language model with business-specific knowledge, seamless human handoff, and deep CRM integration.",
    category: "AI Development",
    tags: ["AI", "NLP", "Next.js", "Supabase", "OpenAI"],
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Supabase", "Stripe", "Vercel"],
    results: [
      "94% automated resolution rate",
      "65% reduction in support costs",
      "3 minute average response time (down from 4 hours)",
      "99.9% uptime over 12 months",
    ],
    problemStatement:
      "The client's support team was overwhelmed with repetitive queries, causing long response times and high operational costs.",
    solution:
      "Deployed a custom AI assistant trained on product documentation, FAQ database, and past support tickets. Built an admin panel for monitoring conversations and easy knowledge base updates.",
    featured: true,
    completedAt: "2024-11-01",
  },
  {
    id: "2",
    slug: "saas-operations-dashboard",
    title: "Operations Intelligence Dashboard",
    description:
      "Real-time operations dashboard with AI-powered anomaly detection and predictive analytics for a logistics company.",
    longDescription:
      "Designed and developed a comprehensive operations intelligence platform that aggregates data from multiple sources, applies ML models for anomaly detection, and surfaces actionable insights through an intuitive dashboard.",
    category: "Software Development",
    tags: ["SaaS", "Analytics", "React", "PostgreSQL", "ML"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techStack: ["Next.js", "React", "PostgreSQL", "Python", "FastAPI", "Docker"],
    results: [
      "40% reduction in operational incidents",
      "Real-time visibility across 200+ data points",
      "$2M annual savings identified through anomaly detection",
      "Deployed across 3 countries",
    ],
    problemStatement:
      "Operations team had no unified view of business performance, relying on multiple spreadsheets and delayed reports.",
    solution:
      "Built a unified data platform pulling from 8 different sources, with ML-powered anomaly detection alerting teams to issues before they become critical.",
    featured: true,
    completedAt: "2024-09-15",
  },
  {
    id: "3",
    slug: "ai-hiring-automation",
    title: "AI Hiring & Recruitment Automation",
    description:
      "Automated recruitment pipeline that screens resumes, conducts AI interviews, and scores candidates — reducing time-to-hire by 70%.",
    longDescription:
      "Built an intelligent recruitment automation system that handles the entire top-of-funnel hiring process autonomously, from resume parsing to AI-conducted screening interviews.",
    category: "AI Automation",
    tags: ["AI", "Automation", "HR Tech", "Python", "Next.js"],
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    techStack: ["Next.js", "Python", "OpenAI", "PostgreSQL", "Twilio", "Zapier"],
    results: [
      "70% reduction in time-to-hire",
      "5x more candidates evaluated per recruiter",
      "Consistent candidate scoring across all applicants",
      "Reduced unconscious bias in screening",
    ],
    problemStatement:
      "HR team spent 80% of their time on manual resume screening and scheduling, leaving little time for strategic hiring.",
    solution:
      "Automated resume parsing, AI-powered screening interviews via voice/text, and intelligent candidate scoring with detailed reports for human reviewers.",
    featured: true,
    completedAt: "2024-07-20",
  },
  {
    id: "4",
    slug: "ngo-impact-platform",
    title: "NGO Impact Measurement Platform",
    description:
      "Digital platform helping an international NGO track program outcomes, manage beneficiaries, and generate impact reports automatically.",
    category: "Software Development",
    tags: ["Non-profit", "Impact", "Data", "Next.js", "Supabase"],
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Vercel"],
    results: [
      "Tracking 15,000+ beneficiaries across 6 countries",
      "90% reduction in report generation time",
      "Real-time donor dashboard",
      "ISO 27001 compliant data handling",
    ],
    featured: false,
    completedAt: "2024-05-10",
  },
  {
    id: "5",
    slug: "ecommerce-ai-personalization",
    title: "E-commerce AI Personalization Engine",
    description:
      "AI-powered product recommendation and personalization system increasing conversion rates by 35% for an online retail platform.",
    category: "AI Development",
    tags: ["E-commerce", "AI", "Recommendations", "Python", "React"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    techStack: ["React", "Python", "FastAPI", "PostgreSQL", "Redis", "AWS"],
    results: [
      "35% increase in conversion rate",
      "28% higher average order value",
      "50% improvement in email click-through rates",
      "Processing 500k+ recommendations daily",
    ],
    featured: false,
    completedAt: "2024-03-01",
  },
  {
    id: "6",
    slug: "startup-mvp-marketplace",
    title: "B2B Service Marketplace",
    description:
      "Two-sided marketplace connecting SMEs with vetted service providers, with integrated escrow payments and dispute resolution.",
    category: "Software Development",
    tags: ["Marketplace", "Payments", "Next.js", "Stripe"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    techStack: ["Next.js", "Supabase", "Stripe Connect", "TypeScript"],
    results: [
      "500+ active users in first 3 months",
      "$250k+ in transaction volume",
      "4.8/5 average service rating",
      "Zero payment disputes in first year",
    ],
    featured: false,
    completedAt: "2024-01-15",
  },
];

export const projectCategories = [
  "All",
  "AI Development",
  "Software Development",
  "AI Automation",
  "Non-profit",
];
