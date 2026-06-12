"use client";

import Link from "next/link";
import { ArrowRight, Bot, Zap, Layers, Globe, Palette, BrainCircuit, TrendingUp, MessageSquareCode } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { services } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquareCode,
  Bot,
  Zap,
  Layers,
  Globe,
  Palette,
  BrainCircuit,
  TrendingUp,
};

const categoryColors: Record<string, string> = {
  ai: "bg-blue-50 text-blue-600",
  software: "bg-purple-50 text-purple-600",
  design: "bg-pink-50 text-pink-600",
  consulting: "bg-green-50 text-green-600",
};

const categoryLabels: Record<string, string> = {
  ai: "AI & Automation",
  software: "Software",
  design: "Design",
  consulting: "Consulting",
};

export function ServicesOverview() {
  const featuredServices = services.slice(0, 6);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">
            Services
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
            What I build for clients.
          </h2>
          <p className="mt-4 text-lg text-[#6E6E73] leading-relaxed">
            From AI systems to full SaaS products — end-to-end delivery from strategy through to production.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredServices.map((service, i) => {
            const Icon = iconMap[service.icon] || Bot;
            return (
              <AnimateIn key={service.id} delay={i * 0.08}>
                <Link
                  href={`/services#${service.id}`}
                  className="group flex flex-col h-full p-7 rounded-2xl border border-[#E8E8ED] bg-white hover:border-[#D2D2D7] hover:shadow-apple transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-[#F5F5F7]">
                      <Icon className="h-5 w-5 text-[#1D1D1F]" />
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[service.category]}`}
                    >
                      {categoryLabels[service.category]}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#1D1D1F] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[#1D1D1F] group-hover:gap-2 transition-all duration-200">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>

        <AnimateIn className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F] hover:gap-3 transition-all duration-200"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
