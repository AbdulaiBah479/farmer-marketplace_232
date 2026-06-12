import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight, CalendarCheck, HeadphonesIcon, FileText, BriefcaseBusiness, Megaphone, Workflow } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { saasProducts } from "@/data/saas-products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarCheck, HeadphonesIcon, FileText, BriefcaseBusiness, Megaphone, Workflow,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return saasProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = saasProducts.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function SaasProductPage({ params }: Props) {
  const { slug } = await params;
  const product = saasProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const Icon = iconMap[product.icon] || CalendarCheck;

  return (
    <div className="bg-white">
      <div className="border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Link href="/saas" className="inline-flex items-center gap-2 text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-24 bg-[#F5F5F7] border-b border-[#E8E8ED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimateIn>
            <div className="inline-flex p-4 rounded-2xl bg-white shadow-apple-sm mb-6">
              <Icon className="h-8 w-8 text-[#1D1D1F]" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F]">
                {product.name}
              </h1>
              <Badge
                variant={product.status === "live" ? "success" : product.status === "beta" ? "beta" : "soon"}
              >
                {product.status === "live" ? "Live" : product.status === "beta" ? "Beta" : "Coming Soon"}
              </Badge>
            </div>
            <p className="text-xl text-[#6E6E73] mb-4">{product.tagline}</p>
            <p className="text-[#86868B] max-w-2xl mx-auto leading-relaxed">{product.description}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">Everything included</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature, i) => (
              <AnimateIn key={feature} delay={i * 0.05}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F5F5F7] border border-[#E8E8ED]">
                  <CheckCircle2 className="h-5 w-5 text-[#1D1D1F] shrink-0" />
                  <span className="text-sm text-[#1D1D1F] font-medium">{feature}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[#F5F5F7] border-t border-[#E8E8ED]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">Simple pricing</h2>
            <p className="mt-2 text-[#6E6E73]">Start free, scale as you grow.</p>
          </AnimateIn>
          <div className={`grid grid-cols-1 gap-5 ${product.pricing.length === 2 ? "md:grid-cols-2 max-w-2xl mx-auto" : "md:grid-cols-3"}`}>
            {product.pricing.map((plan, i) => (
              <AnimateIn key={plan.id} delay={i * 0.1}>
                <div
                  id={plan.id}
                  className={`flex flex-col p-8 rounded-3xl border transition-all h-full ${
                    plan.highlighted
                      ? "bg-[#1D1D1F] border-[#1D1D1F] text-white shadow-apple-xl"
                      : "bg-white border-[#E8E8ED]"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className={`text-lg font-semibold mb-1 ${plan.highlighted ? "text-white" : "text-[#1D1D1F]"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.highlighted ? "text-white/60" : "text-[#86868B]"}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1 mb-8">
                    <span className={`text-4xl font-semibold tracking-tight ${plan.highlighted ? "text-white" : "text-[#1D1D1F]"}`}>
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className={`text-sm mb-1 ${plan.highlighted ? "text-white/50" : "text-[#86868B]"}`}>/mo</span>
                    )}
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlighted ? "text-white/60" : "text-[#86868B]"}`} />
                        <span className={`text-sm ${plan.highlighted ? "text-white/80" : "text-[#6E6E73]"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/consultation">
                    <button className={`w-full h-11 rounded-full text-sm font-medium transition-all ${
                      plan.highlighted
                        ? "bg-white text-[#1D1D1F] hover:bg-[#F5F5F7]"
                        : "bg-[#1D1D1F] text-white hover:bg-black"
                    }`}>
                      {plan.ctaLabel}
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#E8E8ED]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AnimateIn>
            <h2 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Questions? Let's talk.
            </h2>
            <p className="mt-4 text-[#6E6E73]">
              Book a free demo and I'll walk you through how {product.name} can work for your business.
            </p>
            <div className="mt-8">
              <Link href="/consultation">
                <Button size="lg" className="gap-2">
                  Book a free demo
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
