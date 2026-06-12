"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/db/client";

function slugify(str: string) { return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 50); }

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const supabase = getSupabaseBrowserClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.name } } });
    if (authError || !authData.user) { setError(authError?.message ?? "Registration failed"); setLoading(false); return; }
    const res = await fetch("/api/onboarding/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: authData.user.id, companyName: form.company, slug: slugify(form.company), ownerName: form.name, email: form.email }) });
    if (!res.ok) { const body = await res.json().catch(() => ({})); setError(body.error ?? "Setup failed."); setLoading(false); return; }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-semibold text-gray-900">NexusAI</span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your workspace</h1>
          <p className="text-gray-500 text-sm mb-8">14-day free trial · No credit card needed</p>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label><input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="Jane Smith" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Company name</label><input type="text" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="Acme Corp" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Work email</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="you@company.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label><input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required minLength={8} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Min 8 characters" /></div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}{loading ? "Creating workspace…" : "Create free workspace"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
