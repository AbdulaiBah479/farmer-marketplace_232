import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, FolderOpen, Briefcase, FileText, MessageSquare, Users, BarChart3, Settings, ShoppingBag, CalendarCheck } from "lucide-react";

export const metadata: Metadata = {
  title: { default: "Admin Dashboard", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

const navItems = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", Icon: Users },
  { label: "Consultations", href: "/admin/consultations", Icon: CalendarCheck },
  { label: "Projects", href: "/admin/projects", Icon: FolderOpen },
  { label: "Services", href: "/admin/services", Icon: Briefcase },
  { label: "Blog Posts", href: "/admin/blog", Icon: FileText },
  { label: "Products", href: "/admin/products", Icon: ShoppingBag },
  { label: "Messages", href: "/admin/messages", Icon: MessageSquare },
  { label: "Analytics", href: "/admin/analytics", Icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E8E8ED] flex flex-col fixed inset-y-0 z-30">
        <div className="p-6 border-b border-[#E8E8ED]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F]">Bah AI Labs</p>
              <p className="text-xs text-[#86868B]">Admin Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all duration-200"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#E8E8ED]">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
