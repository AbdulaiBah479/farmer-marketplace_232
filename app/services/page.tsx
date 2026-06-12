import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Bot, Zap, Layers, Globe, Palette, BrainCircuit, TrendingUp, MessageSquareCode } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development, SaaS building, automation, UI/UX design, and consulting services to help your business scale.",
};

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

const categoryColors: Record<string, { bg: string; text: string }> = {
  ai: { bg: "bg-blue-50", text: "text-blue-600" },
  software: { bg: "bg-purple-50", text: "text-purple-600" },
  design: { bg: "bg-pink-50", text: "text-pink-600" },
  consulting: { bg: "bg-green-50", text: "text-green-600" },
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-32 bg-[#F5F5F7] border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-3xl">
            <span className="section-label">Services</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Everything you need to build with AI.
            </h1>
            <p className="mt-6 text-xl text-[#6E6E73] leading-relaxed">
              From initial strategy through to production deployment — I work end-to-end so you get results, not handoffs.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Bot;
            const colors = categoryColors[service.category];

            return (
              <AnimateIn key={service.id} delay={i * 0.06}>
                <div
                  id={service.id}
                  className="group p-8 md:p-10 rounded-3xl border border-[#E8E8ED] bg-white hover:border-[#D2D2D7] hover:shadow-apple transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Title & description */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                          <Icon className={`h-5 w-5 ${colors.text}`} />
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                          {service.category === "ai"
                            ? "AI & Automation"
                            : service.category === "software"
                            ? "Software"
                            : service.category === "design"
                            ? "Design"
                            : "Consulting"}
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-3">
                        {service.title}
                      </h2>
                      <p className="text-[#6E6E73] leading-relaxed mb-5">
                        {service.description}
                      </p>
                      {service.startingPrice && (
                        <div className="text-sm text-[#86868B]">
                          Starting at{" "}
                          <span className="text-[#1D1D1F] font-semibold">
                            {formatPrice(service.startingPrice)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Middle: Features */}
                    <div>
                      <h3 className="text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-4">
                        What's included
                      </h3>
                      <ul className="space-y-2.5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-[#1D1D1F] shrink-0 mt-0.5" />
                            <span className="text-sm text-[#6E6E73]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Process & CTA */}
                    <div>
                      {service.process && (
                        <>
                          <h3 className="text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-4">
                            My process
                          </h3>
                          <div className="space-y-3 mb-6">
                            {service.process.map((step) => (
                              <div key={step.step} className="flex gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0 text-xs font-semibold text-[#6E6E73]">
                                  {step.step}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-[#1D1D1F]">
                                    {step.title}
                                  </p>
                                  <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      <Link href="/contact">
                        <Button size="sm" className="gap-1.5">
                          Get a quote
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F5F5F7] border-t border-[#E8E8ED]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AnimateIn>
            <h2 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Not sure what you need?
            </h2>
            <p className="mt-4 text-[#6E6E73]">
              Let&apos;s talk. A free 30-minute consultation will give us both clarity on the best path forward.
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              <Link href="/consultation">
                <Button size="lg" className="gap-2">
                  Book a free call
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
