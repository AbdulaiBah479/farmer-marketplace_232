export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "ai" | "software" | "design" | "consulting";
  features: string[];
  startingPrice?: number;
  deliverables?: string[];
  process?: ProcessStep[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  imageUrl: string;
  screenshots?: string[];
  techStack: string[];
  results?: string[];
  problemStatement?: string;
  solution?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedAt: string;
}

export interface SaasProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  pricing: PricingPlan[];
  demoUrl?: string;
  screenshots?: string[];
  status: "live" | "beta" | "coming-soon";
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  stripeProductId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  content: string;
  rating: number;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}

export interface BlogAuthor {
  name: string;
  avatarUrl?: string;
  role: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  createdAt?: string;
}

export interface ConsultationRequest {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
  createdAt?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  firstName?: string;
  subscribedAt?: string;
  active: boolean;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  company?: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  notes?: string;
  createdAt?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Stat {
  label: string;
  value: string;
  description?: string;
}
