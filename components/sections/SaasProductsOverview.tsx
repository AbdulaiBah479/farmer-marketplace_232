"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck, HeadphonesIcon, FileText, BriefcaseBusiness, Megaphone, Workflow } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { saasProducts } from "@/data/saas-products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarCheck,
  HeadphonesIcon,
  FileText,
  BriefcaseBusiness,
  Megaphone,
  Workflow,
};

export function SaasProductsOverview() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">
            Products
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
            AI-powered SaaS tools.
          </h2>
          <p className="mt-4 text-lg text-[#6E6E73] leading-relaxed">
            Ready-to-use AI products your team can deploy today — no engineering required.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {saasProducts.map((product, i) => {
            const Icon = iconMap[product.icon] || CalendarCheck;
            const startingPrice = product.pricing.find((p) => p.price > 0);

            return (
              <AnimateIn key={product.id} delay={i * 0.08}>
                <div className="group flex flex-col h-full p-7 rounded-2xl border border-[#E8E8ED] bg-white hover:border-[#D2D2D7] hover:shadow-apple transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-[#F5F5F7]">
                      <Icon className="h-5 w-5 text-[#1D1D1F]" />
                    </div>
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

                  <h3 className="text-base font-semibold text-[#1D1D1F] mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#86868B] mb-3">{product.tagline}</p>
                  <p className="text-sm text-[#6E6E73] leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {/* Features preview */}
                  <ul className="mt-4 space-y-1.5">
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-[#6E6E73]">
                        <div className="w-1 h-1 rounded-full bg-[#86868B] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-6 pt-5 border-t border-[#F5F5F7] flex items-center justify-between">
                    {startingPrice ? (
                      <div>
                        <span className="text-xs text-[#86868B]">Starting at</span>
                        <div className="text-sm font-semibold text-[#1D1D1F]">
                          ${startingPrice.price}
                          <span className="font-normal text-[#86868B]">/mo</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm font-semibold text-[#1D1D1F]">Free</div>
                    )}
                    <Link href={`/saas/${product.slug}`}>
                      <Button size="sm" variant="secondary" className="gap-1.5">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        <AnimateIn className="mt-12 text-center">
          <Link
            href="/saas"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F] hover:gap-3 transition-all duration-200"
          >
            Explore all products & pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
