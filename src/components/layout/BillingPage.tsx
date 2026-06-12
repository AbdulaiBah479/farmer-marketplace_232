"use client";
import { useState } from "react";
import { CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { PLANS } from "@/types";
import type { Tenant, User, Plan } from "@/types";

export default function BillingPage({ tenant, user }: { tenant: Tenant; user: User }) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleUpgrade(plan: Plan) {
    setLoading(plan);
    const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ priceId: PLANS[plan].priceId, plan }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(null);
  }

  async function handleManage() {
    setLoading("portal");
    const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "portal" }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(null);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-bold text-gray-900">Billing</h1><p className="text-gray-500 mt-1">Manage your subscription and usage</p></div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Current plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{tenant.plan}</div>
            <div className="text-sm text-gray-500 mt-1">Status: <span className={`font-medium ${tenant.subscription_status==="active"?"text-green-600":tenant.subscription_status==="trialing"?"text-blue-600":"text-red-600"}`}>{tenant.subscription_status}</span></div>
            {tenant.trial_ends_at && tenant.subscription_status==="trialing" && <div className="text-sm text-gray-400 mt-1">Trial ends {new Date(tenant.trial_ends_at).toLocaleDateString()}</div>}
          </div>
          {tenant.stripe_customer_id && <button onClick={handleManage} disabled={loading==="portal"} className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 disabled:opacity-60">{loading==="portal"?<Loader2 className="w-4 h-4 animate-spin" />:<ExternalLink className="w-4 h-4" />}Manage subscription</button>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.entries(PLANS) as [Plan, typeof PLANS[Plan]][]).map(([planKey, plan]) => {
          const isCurrent = tenant.plan === planKey;
          return (
            <div key={planKey} className={`rounded-2xl p-6 border ${isCurrent?"border-blue-200 bg-blue-50":"border-gray-200 bg-white"}`}>
              <div className="flex items-center justify-between mb-1"><div className="font-semibold text-gray-900">{plan.name}</div>{isCurrent&&<span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Current</span>}</div>
              <div className="flex items-baseline gap-1 mb-4"><span className="text-3xl font-bold text-gray-900">${plan.price}</span><span className="text-gray-400 text-sm">/mo</span></div>
              <ul className="space-y-2 mb-6">{plan.features.map((f)=>(<li key={f} className="flex items-start gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-gray-600">{f}</span></li>))}</ul>
              {!isCurrent && <button onClick={()=>handleUpgrade(planKey)} disabled={loading===planKey} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 disabled:opacity-60">{loading===planKey&&<Loader2 className="w-4 h-4 animate-spin" />}Upgrade to {plan.name}</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
