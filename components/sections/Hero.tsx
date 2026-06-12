"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E8E8ED 1px, transparent 1px), linear-gradient(to bottom, #E8E8ED 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,white_100%)]" />

      {/* Floating accent orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #1D1D1F 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] border border-[#E8E8ED] mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#6E6E73]" />
          <span className="text-xs font-medium text-[#6E6E73] tracking-wide uppercase">
            AI Engineer & Software Builder
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.08] mb-6"
        >
          Building AI Systems,
          <br />
          <span className="text-[#6E6E73]">SaaS Products</span> &<br />
          Digital Solutions.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Helping businesses automate operations, improve productivity, and scale
          through intelligent software. For the future.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/consultation">
            <Button size="lg" className="gap-2 shadow-apple-sm">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="secondary">
              Explore Services
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#E8E8ED]"
        >
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm text-[#1D1D1F] font-medium">{stat.label}</span>
              {stat.description && (
                <span className="text-xs text-[#86868B]">{stat.description}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
