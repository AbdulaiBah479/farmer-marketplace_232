import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export function CTA() {
  return (
    <section className="py-32 bg-[#1D1D1F]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <AnimateIn>
          <span className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">
            Let's work together
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
            Ready to build
            <br />
            something great?
          </h2>
          <p className="mt-6 text-lg text-[#86868B] leading-relaxed max-w-xl mx-auto">
            Whether you need an AI system, a SaaS product, or a digital transformation strategy — let's talk about how I can help.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/consultation">
              <Button
                size="lg"
                className="bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] gap-2 shadow-apple-sm"
              >
                Book a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${siteConfig.founder.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="border border-white/20 bg-white/10 text-white hover:bg-white/20 gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Me
              </Button>
            </a>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-sm text-[#86868B]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Available for new projects
            </div>
            <div className="text-sm text-[#86868B]">
              Response within 24 hours
            </div>
            <div className="text-sm text-[#86868B]">
              Free initial consultation
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
