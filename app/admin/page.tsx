import { Users, MessageSquare, CalendarCheck, TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Leads", value: "—", change: "+12% this week", Icon: Users, color: "blue" },
  { label: "New Messages", value: "—", change: "Awaiting review", Icon: MessageSquare, color: "purple" },
  { label: "Consultations", value: "—", change: "This month", Icon: CalendarCheck, color: "green" },
  { label: "Revenue (MRR)", value: "—", change: "From SaaS products", Icon: TrendingUp, color: "orange" },
];

const quickLinks = [
  { label: "View all leads", href: "/admin/leads" },
  { label: "Read messages", href: "/admin/messages" },
  { label: "Review consultations", href: "/admin/consultations" },
  { label: "Publish blog post", href: "/admin/blog/new" },
  { label: "Add project", href: "/admin/projects/new" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1D1D1F]">Dashboard</h1>
        <p className="text-sm text-[#86868B] mt-1">Welcome back, Abdulai.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-[#E8E8ED] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="p-2 rounded-lg bg-[#F5F5F7]">
                <stat.Icon className="h-4 w-4 text-[#6E6E73]" />
              </div>
            </div>
            <p className="text-3xl font-semibold text-[#1D1D1F] mb-1">{stat.value}</p>
            <p className="text-xs text-[#86868B]">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E8ED] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-[#1D1D1F]">Recent Activity</h2>
            <Link href="/admin/leads" className="text-xs text-[#86868B] hover:text-[#1D1D1F] flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex items-center justify-center h-32 border border-dashed border-[#E8E8ED] rounded-xl">
            <p className="text-sm text-[#86868B]">
              Connect Supabase to see real-time activity
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-[#E8E8ED] p-6">
          <h2 className="text-base font-semibold text-[#1D1D1F] mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors group"
              >
                <span className="text-sm text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#D2D2D7] group-hover:text-[#1D1D1F] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Setup banner */}
      <div className="mt-6 p-6 rounded-2xl bg-[#1D1D1F] text-white">
        <h3 className="font-semibold mb-1">Complete your setup</h3>
        <p className="text-sm text-white/60 mb-4">
          Connect Supabase and Stripe to unlock all dashboard features — live stats, lead management, and revenue tracking.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
          >
            Connect Supabase →
          </a>
          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
          >
            Connect Stripe →
          </a>
        </div>
      </div>
    </div>
  );
}
