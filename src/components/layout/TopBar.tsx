import { Bell, Search } from "lucide-react";
import type { Tenant, User } from "@/types";

export default function TopBar({ tenant, user }: { tenant: Tenant; user: User }) {
  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search…" className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-64 transition-colors" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-sm font-semibold text-blue-600">{(user.full_name ?? user.email)?.[0]?.toUpperCase()}</span></div>
          <div className="hidden sm:block"><div className="text-sm font-medium text-gray-900 leading-tight">{user.full_name ?? "Account"}</div><div className="text-xs text-gray-400">{tenant.name}</div></div>
        </div>
      </div>
    </header>
  );
}
