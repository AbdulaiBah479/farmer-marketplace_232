"use client";
import { useState } from "react";
import { CheckCircle, Loader2, ExternalLink, Chrome, MessageSquare } from "lucide-react";
import type { Tenant, User } from "@/types";

export default function SettingsPage({ tenant, user, googleConnected, whatsappConnected }: { tenant: Tenant; user: User; googleConnected: boolean; whatsappConnected: boolean }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tenantName, setTenantName] = useState(tenant.name);
  const [timezone, setTimezone] = useState(tenant.timezone);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/settings/tenant", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: tenantName, timezone }) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-bold text-gray-900">Settings</h1><p className="text-gray-500 mt-1">Manage your workspace and integrations</p></div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-6">Workspace</h2>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Company name</label><input type="text" value={tenantName} onChange={(e)=>setTenantName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label><select value={timezone} onChange={(e)=>setTimezone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white">{["UTC","America/New_York","America/Los_Angeles","America/Chicago","Europe/London","Europe/Paris","Asia/Tokyo","Asia/Singapore","Australia/Sydney"].map(tz=>(<option key={tz} value={tz}>{tz}</option>))}</select></div>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 disabled:opacity-60">{saving&&<Loader2 className="w-4 h-4 animate-spin" />}{saved?"Saved!":"Save changes"}</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-6">Integrations</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center"><Chrome className="w-5 h-5 text-red-500" /></div><div><div className="font-medium text-gray-900 text-sm">Google (Gmail + Calendar)</div><div className="text-xs text-gray-500">Read emails, draft replies, manage calendar events</div></div></div>
            {googleConnected ? <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4" />Connected</div> : <button onClick={()=>{window.location.href="/api/integrations/google";}} className="flex items-center gap-1.5 text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800">Connect <ExternalLink className="w-3.5 h-3.5" /></button>}
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-green-500" /></div><div><div className="font-medium text-gray-900 text-sm">WhatsApp Business</div><div className="text-xs text-gray-500">Receive and respond to WhatsApp messages automatically</div></div></div>
            {whatsappConnected ? <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4" />Connected</div> : <button onClick={()=>{window.open("https://business.facebook.com/wa/manage/","_blank");}} className="flex items-center gap-1.5 text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800">Configure in Meta <ExternalLink className="w-3.5 h-3.5" /></button>}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Account</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-500">Email</span><span className="font-medium text-gray-900">{user.email}</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-500">Role</span><span className="font-medium text-gray-900 capitalize">{user.role}</span></div>
          <div className="flex justify-between py-2"><span className="text-gray-500">Workspace ID</span><span className="font-mono text-xs text-gray-400">{tenant.slug}</span></div>
        </div>
      </div>
    </div>
  );
}
