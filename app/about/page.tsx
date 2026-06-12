import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about Abdulai Bah — AI Engineer, Software Builder, and founder of Bah AI Labs.`,
};

const skills = [
  { category: "AI & Machine Learning", items: ["LLMs & Fine-tuning", "RAG Systems", "AI Agents", "NLP", "Computer Vision", "MLOps"] },
  { category: "Software Development", items: ["Next.js / React", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL"] },
  { category: "Infrastructure", items: ["Supabase", "Vercel", "AWS", "Docker", "GitHub Actions", "Redis"] },
  { category: "Product", items: ["SaaS Architecture", "UI/UX Design", "Product Strategy", "Growth", "Analytics"] },
];

const values = [
  {
    title: "Quality over speed",
    description: "I build things that last. Every line of code, every design decision is made with long-term maintainability in mind.",
  },
  {
    title: "Outcomes, not outputs",
    description: "I'm not interested in delivering code. I'm interested in solving your problem and measuring the results.",
  },
  {
    title: "Transparency",
    description: "You'll always know exactly what I'm building, why, and how it's progressing. No surprises.",
  },
  {
    title: "Continuous learning",
    description: "AI moves fast. I dedicate significant time to staying at the frontier of what's possible.",
  },
];

const timeline = [
  { year: "2019", event: "Started learning to code. Built my first web apps." },
  { year: "2020", event: "Landed first freelance clients. Focused on React and full-stack development." },
  { year: "2021", event: "Discovered AI/ML. Started integrating LLMs before it was mainstream." },
  { year: "2022", event: "Specialized in AI product development. Built first production AI systems." },
  { year: "2023", event: "Expanded into AI consulting. Helped 10+ businesses adopt AI." },
  { year: "2024", event: "Founded Bah AI Labs. Launched first SaaS products." },
  { year: "2025", event: "Growing the platform. Building the team. Scaling globally." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-32 border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <span className="section-label">About</span>
              <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
                I build AI systems
                <br />
                <span className="text-[#6E6E73]">that move businesses forward.</span>
              </h1>
              <p className="mt-6 text-lg text-[#6E6E73] leading-relaxed">
                I&apos;m Abdulai Bah — an AI Engineer and Software Builder based globally. I help businesses across Africa, Europe, and North America leverage AI and software to automate operations, build products, and grow.
              </p>
              <p className="mt-4 text-lg text-[#6E6E73] leading-relaxed">
                I started Bah AI Labs with a simple mission: make world-class AI engineering accessible to any business that needs it — not just those with enterprise budgets.
              </p>
              <div className="mt-8 flex gap-3">
                <Link href="/consultation">
                  <Button size="lg" className="gap-2">
                    Work with me
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="secondary">
                    See my work
                  </Button>
                </Link>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2} direction="left">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-[#F5F5F7]">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-[#1D1D1F] flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-5xl font-semibold">A</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1D1D1F]">Abdulai Bah</p>
                      <p className="text-xs text-[#86868B] mt-1">AI Engineer & Builder</p>
                    </div>
                  </div>
                </div>
                {/* Stat cards */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-apple p-5 border border-[#E8E8ED]">
                  <div className="text-2xl font-semibold text-[#1D1D1F]">50+</div>
                  <div className="text-xs text-[#86868B] mt-0.5">Projects delivered</div>
                </div>
                <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-apple p-5 border border-[#E8E8ED]">
                  <div className="text-2xl font-semibold text-[#1D1D1F]">98%</div>
                  <div className="text-xs text-[#86868B] mt-0.5">Satisfaction rate</div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-2xl mb-16">
            <span className="section-label">Values</span>
            <h2 className="mt-3 section-title">How I approach every project.</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((value, i) => (
              <AnimateIn key={value.title} delay={i * 0.1}>
                <div className="flex gap-4 p-7 bg-white rounded-2xl border border-[#E8E8ED]">
                  <CheckCircle2 className="h-5 w-5 text-[#1D1D1F] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#1D1D1F] mb-1">{value.title}</h3>
                    <p className="text-sm text-[#6E6E73] leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-2xl mb-16">
            <span className="section-label">Skills & Technologies</span>
            <h2 className="mt-3 section-title">The tools I use to build.</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skillGroup, i) => (
              <AnimateIn key={skillGroup.category} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED]">
                  <h3 className="text-sm font-semibold text-[#1D1D1F] mb-4">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((item) => (
                      <li key={item} className="text-sm text-[#6E6E73]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-[#F5F5F7]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimateIn className="mb-16">
            <span className="section-label">Journey</span>
            <h2 className="mt-3 section-title">The path so far.</h2>
          </AnimateIn>
          <div className="relative">
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-[#E8E8ED]" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimateIn key={item.year} delay={i * 0.08}>
                  <div className="flex gap-6 items-start">
                    <div className="w-[60px] shrink-0 text-right">
                      <span className="text-xs font-semibold text-[#86868B]">{item.year}</span>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#1D1D1F] -translate-x-1/2" />
                      <p className="text-sm text-[#6E6E73] leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-[#E8E8ED]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AnimateIn>
            <h2 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Let&apos;s build together.
            </h2>
            <p className="mt-4 text-[#6E6E73]">
              Whether you have a clear brief or just a problem to solve — I&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
