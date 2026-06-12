"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-20 bg-[#F5F5F7] border-t border-[#E8E8ED]">
      <div className="max-w-xl mx-auto px-6 text-center">
        <AnimateIn>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">
            Stay ahead of the curve.
          </h2>
          <p className="mt-2 text-sm text-[#6E6E73]">
            Weekly insights on AI, software, and building products that matter. No spam.
          </p>

          {status === "success" ? (
            <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="text-sm font-medium text-green-700">
                You're in! Welcome to the community.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-11 rounded-full border border-[#D2D2D7] bg-white px-5 text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none focus:border-[#1D1D1F] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 px-5 rounded-full bg-[#1D1D1F] text-white text-sm font-medium flex items-center gap-1.5 hover:bg-black transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "…" : (
                  <>
                    Subscribe
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-2 text-xs text-red-600">Something went wrong. Please try again.</p>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
