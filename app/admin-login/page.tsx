"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      router.push(redirect);
      router.refresh();
    } else {
      setError("Invalid token. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="font-semibold text-[#1D1D1F]">Bah AI Labs</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-[#E8E8ED] p-8 space-y-4"
        >
          <h1 className="text-xl font-semibold text-[#1D1D1F] text-center">Admin Access</h1>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter admin token"
            className="w-full h-11 rounded-xl border border-[#D2D2D7] px-4 text-sm outline-none focus:border-[#1D1D1F] transition-colors"
            required
          />
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#1D1D1F] text-white text-sm font-medium hover:bg-black transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
