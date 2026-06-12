"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please describe your project briefly"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  { value: "", label: "What do you need help with?" },
  { value: "ai-chatbot", label: "AI Chatbot / Assistant" },
  { value: "ai-agents", label: "AI Agents & Automation" },
  { value: "saas-development", label: "SaaS Product Development" },
  { value: "web-app", label: "Web Application" },
  { value: "ai-strategy", label: "AI Strategy Consulting" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "marketing", label: "AI Digital Marketing" },
  { value: "other", label: "Something else" },
];

const timeOptions = [
  { value: "", label: "Preferred time" },
  { value: "9-11am", label: "9 AM – 11 AM UTC" },
  { value: "11am-1pm", label: "11 AM – 1 PM UTC" },
  { value: "1-3pm", label: "1 PM – 3 PM UTC" },
  { value: "3-5pm", label: "3 PM – 5 PM UTC" },
  { value: "5-7pm", label: "5 PM – 7 PM UTC" },
];

const benefits = [
  "Free 30-minute strategy session",
  "No commitment required",
  "Specific recommendations for your situation",
  "Clear next steps — even if we don't work together",
  "Recorded and sent to you afterwards",
];

export default function ConsultationPage() {
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
      const res = await fetch("/api/consultation", {
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
      <section className="py-32 bg-[#F5F5F7] border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-2xl">
            <span className="section-label">Free Consultation</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Book a free strategy call.
            </h1>
            <p className="mt-6 text-xl text-[#6E6E73] leading-relaxed">
              30 minutes. No sales pitch. Just an honest conversation about your project and how I can help.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Benefits */}
            <div className="lg:col-span-2 space-y-8">
              <AnimateIn>
                <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-white shadow-apple-sm">
                      <Calendar className="h-5 w-5 text-[#1D1D1F]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1D1D1F]">Discovery Call</p>
                      <p className="text-xs text-[#86868B] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        30 minutes · Free
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#1D1D1F] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6E6E73]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#1D1D1F] text-white">
                  <p className="text-sm font-semibold mb-2">Prefer to message first?</p>
                  <p className="text-sm text-white/60 mb-4">
                    Use the contact form or reach out directly on WhatsApp.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-white/80 transition-colors"
                  >
                    Contact form
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </AnimateIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimateIn delay={0.1}>
                {status === "success" ? (
                  <div className="p-10 rounded-3xl bg-[#F5F5F7] border border-[#E8E8ED] text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-3">Booking confirmed!</h3>
                    <p className="text-[#6E6E73] leading-relaxed">
                      I&apos;ll send you a calendar invite within a few hours. Looking forward to speaking with you.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8 md:p-10 rounded-3xl border border-[#E8E8ED] bg-white space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Your name"
                        placeholder="Abdulai"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="you@company.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Company (optional)"
                        placeholder="Acme Inc."
                        {...register("company")}
                      />
                      <Input
                        label="Phone (optional)"
                        placeholder="+1 555 000 0000"
                        {...register("phone")}
                      />
                    </div>
                    <Select
                      label="What do you need help with?"
                      options={serviceOptions}
                      error={errors.serviceInterest?.message}
                      {...register("serviceInterest")}
                    />
                    <Textarea
                      label="Briefly describe your project"
                      placeholder="Tell me about your business, the problem you're facing, and what you're hoping to achieve…"
                      rows={5}
                      error={errors.message?.message}
                      {...register("message")}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Preferred date"
                        type="date"
                        hint="I'll confirm availability"
                        {...register("preferredDate")}
                      />
                      <Select
                        label="Preferred time"
                        options={timeOptions}
                        {...register("preferredTime")}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      isLoading={status === "loading"}
                      className="w-full gap-2"
                    >
                      Book my free call
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <p className="text-center text-xs text-[#86868B]">
                      Free. No commitment. I respond within 24 hours.
                    </p>
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
