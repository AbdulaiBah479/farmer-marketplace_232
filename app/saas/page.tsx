import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, CalendarCheck, HeadphonesIcon, FileText, BriefcaseBusiness, Megaphone, Workflow } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { saasProducts } from "@/data/saas-products";

export const metadata: Metadata = {
  title: "AI Products",
  description: "AI-powered SaaS tools for productivity, customer support, marketing, and business automation.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarCheck,
  HeadphonesIcon,
  FileText,
  BriefcaseBusiness,
  Megaphone,
  Workflow,
};

export default function SaasPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-32 bg-[#F5F5F7] border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-3xl">
            <span className="section-label">Products</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              AI tools that work while you sleep.
            </h1>
            <p className="mt-6 text-xl text-[#6E6E73] leading-relaxed">
              Ready-to-deploy AI products for businesses of every size. Start free, scale as you grow.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
          {saasProducts.map((product, i) => {
            const Icon = iconMap[product.icon] || CalendarCheck;

            return (
              <AnimateIn key={product.id} delay={i * 0.06}>
                <div className="p-8 md:p-12 rounded-3xl border border-[#E8E8ED] bg-white">
                  {/* Product header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-[#F5F5F7]">
                        <Icon className="h-6 w-6 text-[#1D1D1F]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-2xl font-semibold text-[#1D1D1F]">
                            {product.name}
                          </h2>
                          <Badge
                            variant={
                              product.status === "live"
                                ? "success"
                                : product.status === "beta"
                                ? "beta"
                                : "soon"
                            }
                          >
                            {product.status === "live"
                              ? "Live"
                              : product.status === "beta"
                              ? "Beta"
                              : "Coming Soon"}
                          </Badge>
                        </div>
                        <p className="text-[#6E6E73]">{product.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features + Pricing grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Features */}
                    <div className="lg:col-span-2">
                      <h3 className="text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-4">
                        Features
                      </h3>
                      <ul className="space-y-2.5">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-[#1D1D1F] shrink-0 mt-0.5" />
                            <span className="text-sm text-[#6E6E73]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Link href={`/saas/${product.slug}`}>
                          <Button variant="secondary" size="sm" className="gap-1.5">
                            Learn more
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Pricing tiers */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.pricing.map((plan) => (
                        <div
                          key={plan.id}
                          className={`flex flex-col p-5 rounded-2xl border transition-all ${
                            plan.highlighted
                              ? "bg-[#1D1D1F] border-[#1D1D1F] text-white"
                              : "bg-[#F5F5F7] border-[#E8E8ED]"
                          }`}
                        >
                          <div className="mb-4">
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                                plan.highlighted ? "text-white/50" : "text-[#86868B]"
                              }`}
                            >
                              {plan.name}
                            </p>
                            <div className="flex items-end gap-1">
                              <span
                                className={`text-3xl font-semibold tracking-tight ${
                                  plan.highlighted ? "text-white" : "text-[#1D1D1F]"
                                }`}
                              >
                                {plan.price === 0 ? "Free" : `$${plan.price}`}
                              </span>
                              {plan.price > 0 && (
                                <span
                                  className={`text-sm mb-1 ${
                                    plan.highlighted ? "text-white/60" : "text-[#86868B]"
                                  }`}
                                >
                                  /mo
                                </span>
                              )}
                            </div>
                          </div>

                          <ul className="space-y-1.5 flex-1 mb-5">
                            {plan.features.map((f) => (
                              <li
                                key={f}
                                className={`flex items-start gap-2 text-xs ${
                                  plan.highlighted ? "text-white/70" : "text-[#6E6E73]"
                                }`}
                              >
                                <CheckCircle2
                                  className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                                    plan.highlighted ? "text-white/60" : "text-[#86868B]"
                                  }`}
                                />
                                {f}
                              </li>
                            ))}
                          </ul>

                          <Link href={`/saas/${product.slug}#${plan.id}`}>
                            <button
                              className={`w-full h-9 rounded-full text-xs font-medium transition-all ${
                                plan.highlighted
                                  ? "bg-white text-[#1D1D1F] hover:bg-[#F5F5F7]"
                                  : "bg-[#1D1D1F] text-white hover:bg-black"
                              }`}
                            >
                              {plan.ctaLabel}
                            </button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* FAQ / CTA */}
      <section className="py-20 bg-[#F5F5F7] border-t border-[#E8E8ED]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AnimateIn>
            <h2 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Need a custom solution?
            </h2>
            <p className="mt-4 text-[#6E6E73]">
              All products can be white-labeled, customized, or deployed on your own infrastructure. Let&apos;s talk.
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Discuss enterprise options
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
