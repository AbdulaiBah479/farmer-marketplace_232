import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById, listConversations, listTasks, listUpcomingEvents, getAnalyticsSummary } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MessageSquare, CheckSquare, Calendar, Mail, ArrowRight, TrendingUp, Bot } from "lucide-react";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) redirect("/login");
  const [tenant, conversations, tasks, events, analytics] = await Promise.all([getTenantById(dbUser.tenant_id), listConversations(dbUser.tenant_id, 5), listTasks(dbUser.tenant_id), listUpcomingEvents(dbUser.tenant_id, 5), getAnalyticsSummary(dbUser.tenant_id, 30)]);
  if (!tenant) redirect("/login");
  const pendingTasks = tasks.filter((t) => t.status === "todo").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const h = new Date().getHours();
  const greeting = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good {greeting}, {dbUser.full_name?.split(" ")[0] ?? "there"}</h1>
        <p className="text-gray-500 mt-1">{tenant.name} workspace · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Messages (30d)", value: analytics.totalMessages.toLocaleString(), icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
          { label: "Tasks open", value: (pendingTasks + inProgressTasks).toString(), icon: CheckSquare, color: "text-purple-600 bg-purple-50" },
          { label: "Upcoming events", value: events.length.toString(), icon: Calendar, color: "text-green-600 bg-green-50" },
          { label: "Emails drafted", value: analytics.totalEmailsDrafted.toString(), icon: Mail, color: "text-orange-600 bg-orange-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}><stat.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4"><Bot className="w-5 h-5 text-blue-200" /><span className="font-semibold">AI Workspace</span></div>
          <p className="text-blue-100 text-sm mb-6">Your AI agents are active and ready. Start a conversation to delegate tasks.</p>
          <Link href="/chat" className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50">Open AI Chat <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="font-semibold text-gray-900">Recent conversations</h2><Link href="/chat" className="text-xs text-blue-600 hover:underline">View all</Link></div>
          {conversations.length === 0 ? <p className="text-sm text-gray-400 py-4 text-center">No conversations yet</p> : <ul className="space-y-3">{conversations.map((conv) => (<li key={conv.id}><Link href={`/chat?id=${conv.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"><MessageSquare className="w-4 h-4 text-gray-400" /></div><div className="min-w-0 flex-1"><div className="text-sm font-medium text-gray-900 truncate">{conv.title ?? "Untitled"}</div><div className="text-xs text-gray-400">{new Date(conv.updated_at).toLocaleDateString()}</div></div></Link></li>))}</ul>}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="font-semibold text-gray-900">Upcoming events</h2></div>
          {events.length === 0 ? <p className="text-sm text-gray-400 py-4 text-center">No upcoming events</p> : <ul className="space-y-3">{events.map((event) => (<li key={event.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50"><div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0"><Calendar className="w-4 h-4 text-green-600" /></div><div className="min-w-0 flex-1"><div className="text-sm font-medium text-gray-900 truncate">{event.title}</div><div className="text-xs text-gray-400">{new Date(event.start_time).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div></div></li>))}</ul>}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6"><h2 className="font-semibold text-gray-900">Task overview</h2><div className="flex items-center gap-2 text-sm text-gray-500"><TrendingUp className="w-4 h-4 text-green-500" />{tasks.filter((t) => t.status === "done").length} completed</div></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["todo", "in_progress", "done", "cancelled"] as const).map((status) => {
            const count = tasks.filter((t) => t.status === status).length;
            const labels = { todo: "To do", in_progress: "In progress", done: "Done", cancelled: "Cancelled" };
            const colors = { todo: "bg-gray-100 text-gray-700", in_progress: "bg-blue-50 text-blue-700", done: "bg-green-50 text-green-700", cancelled: "bg-red-50 text-red-700" };
            return (<div key={status} className={`${colors[status]} rounded-xl px-4 py-3`}><div className="text-2xl font-bold">{count}</div><div className="text-sm font-medium">{labels[status]}</div></div>);
          })}
        </div>
      </div>
    </div>
  );
}
