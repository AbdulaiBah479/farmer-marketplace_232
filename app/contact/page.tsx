"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Send, Twitter, Linkedin, Github } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { siteConfig } from "@/data/site-config";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  budget: z.string().optional(),
  message: z.string().min(20, "Please tell me more (at least 20 characters)"),
});

type FormData = z.infer<typeof schema>;

const subjectOptions = [
  { value: "", label: "What's this about?" },
  { value: "ai-development", label: "AI Development Project" },
  { value: "saas-development", label: "SaaS Development" },
  { value: "automation", label: "Business Automation" },
  { value: "consulting", label: "AI Strategy Consulting" },
  { value: "design", label: "UI/UX Design" },
  { value: "saas-product", label: "SaaS Product Inquiry" },
  { value: "partnership", label: "Partnership / Collaboration" },
  { value: "other", label: "Something else" },
];

const budgetOptions = [
  { value: "", label: "Project budget (optional)" },
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k+", label: "$50,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-32 bg-[#F5F5F7] border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-2xl">
            <span className="section-label">Contact</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Let's talk.
            </h1>
            <p className="mt-6 text-xl text-[#6E6E73] leading-relaxed">
              Tell me about your project, your challenge, or your idea. I respond within 24 hours.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <AnimateIn>
                <h2 className="text-lg font-semibold text-[#1D1D1F] mb-6">Get in touch</h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#F5F5F7]">
                      <Mail className="h-5 w-5 text-[#1D1D1F]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#86868B] mb-1">Email</p>
                      <a
                        href={`mailto:${siteConfig.founder.email}`}
                        className="text-sm font-medium text-[#1D1D1F] hover:underline"
                      >
                        {siteConfig.founder.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#F5F5F7]">
                      <MessageCircle className="h-5 w-5 text-[#1D1D1F]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#86868B] mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/${siteConfig.founder.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#1D1D1F] hover:underline"
                      >
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#F5F5F7]">
                      <MapPin className="h-5 w-5 text-[#1D1D1F]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#86868B] mb-1">Location</p>
                      <p className="text-sm font-medium text-[#1D1D1F]">
                        {siteConfig.founder.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="pt-6 border-t border-[#E8E8ED]">
                  <p className="text-xs text-[#86868B] mb-3">Follow along</p>
                  <div className="flex gap-3">
                    <a
                      href={siteConfig.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E8E8ED] transition-all"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E8E8ED] transition-all"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E8E8ED] transition-all"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Availability badge */}
                <div className="p-5 rounded-2xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-green-800">Available for projects</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Currently accepting new clients. Response time: within 24 hours.
                  </p>
                </div>
              </AnimateIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimateIn delay={0.1}>
                {status === "success" ? (
                  <div className="p-10 rounded-3xl bg-[#F5F5F7] border border-[#E8E8ED] text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">Message received!</h3>
                    <p className="text-[#6E6E73]">
                      I'll get back to you within 24 hours. Talk soon.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-[#1D1D1F] underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8 md:p-10 rounded-3xl border border-[#E8E8ED] bg-white space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Your name"
                        placeholder="Aminata Diallo"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        label="Email address"
                        type="email"
                        placeholder="hello@company.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Company (optional)"
                        placeholder="Your company name"
                        {...register("company")}
                      />
                      <Select
                        label="Budget range"
                        options={budgetOptions}
                        {...register("budget")}
                      />
                    </div>
                    <Select
                      label="Subject"
                      options={subjectOptions}
                      error={errors.subject?.message}
                      {...register("subject")}
                    />
                    <Textarea
                      label="Tell me about your project"
                      placeholder="What are you trying to build or solve? The more detail, the better."
                      rows={6}
                      error={errors.message?.message}
                      {...register("message")}
                    />

                    {status === "error" && (
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    )}

                    <Button type="submit" size="lg" isLoading={status === "loading"} className="w-full gap-2">
                      Send message
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
