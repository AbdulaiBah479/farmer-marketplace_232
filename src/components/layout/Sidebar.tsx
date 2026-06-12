"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bot, LayoutDashboard, MessageSquare, BookOpen, BarChart3, Settings, CreditCard, LogOut, ChevronLeft } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/db/client";
import { useState } from "react";
import type { Tenant, User } from "@/types";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/chat", icon: MessageSquare, label: "AI Chat" },
  { href: "/knowledge", icon: BookOpen, label: "Knowledge Base" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
];

export default function Sidebar({ tenant, user }: { tenant: Tenant; user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await getSupabaseBrowserClient().auth.signOut();
    router.push("/login");
  }

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} flex-shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-200`}>
      <div className={`h-16 flex items-center border-b border-gray-100 ${collapsed ? "justify-center px-4" : "px-6"}`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>
          {!collapsed && <span className="font-semibold text-gray-900 truncate">NexusAI</span>}
        </div>
        {!collapsed && <button onClick={() => setCollapsed(true)} className="ml-auto text-gray-400 hover:text-gray-600"><ChevronLeft className="w-4 h-4" /></button>}
      </div>
      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="bg-gray-50 rounded-xl px-3 py-2">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Workspace</div>
            <div className="text-sm font-semibold text-gray-900 truncate">{tenant.name}</div>
            <div className="text-xs text-gray-400 capitalize">{tenant.plan} plan</div>
          </div>
        </div>
      )}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {collapsed && <button onClick={() => setCollapsed(false)} className="w-full flex justify-center p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 mb-2"><ChevronLeft className="w-4 h-4 rotate-180" /></button>}
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} ${collapsed ? "justify-center" : ""}`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className={`border-t border-gray-100 p-3 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"><span className="text-sm font-semibold text-blue-600">{(user.full_name ?? user.email)?.[0]?.toUpperCase()}</span></div>
            <div className="min-w-0 flex-1"><div className="text-sm font-medium text-gray-900 truncate">{user.full_name ?? "Account"}</div><div className="text-xs text-gray-400">{user.role}</div></div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="Sign out"><LogOut className="w-4 h-4" /></button>
          </div>
        ) : (
          <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-gray-50" title="Sign out"><LogOut className="w-4 h-4" /></button>
        )}
      </div>
    </aside>
  );
}
