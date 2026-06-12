"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { MessageSquare, CheckSquare, Mail, Clock } from "lucide-react";
import type { Tenant, AnalyticsSummary } from "@/types";

const AGENT_COLORS: Record<string, string> = { receptionist: "#8b5cf6", email: "#f97316", scheduler: "#10b981", support: "#ef4444", orchestrator: "#3b82f6" };

export default function AnalyticsDashboard({ tenant, analytics }: { tenant: Tenant; analytics: AnalyticsSummary }) {
  const agentPieData = Object.entries(analytics.agentBreakdown).filter(([,count])=>count>0).map(([agent,count])=>({name:agent,value:count}));
  const STATS = [
    { label: "Total messages", value: analytics.totalMessages.toLocaleString(), icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
    { label: "Tasks created", value: analytics.totalTasksCreated.toString(), icon: CheckSquare, color: "text-purple-600 bg-purple-50" },
    { label: "Emails drafted", value: analytics.totalEmailsDrafted.toString(), icon: Mail, color: "text-orange-600 bg-orange-50" },
    { label: "Avg response (s)", value: analytics.avgResponseTime.toFixed(1), icon: Clock, color: "text-green-600 bg-green-50" },
  ];
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-bold text-gray-900">Analytics</h1><p className="text-gray-500 mt-1">Last 30 days · {tenant.name}</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (<div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5"><div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}><stat.icon className="w-5 h-5" /></div><div className="text-3xl font-bold text-gray-900">{stat.value}</div><div className="text-sm text-gray-500 mt-1">{stat.label}</div></div>))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-6">Daily activity (7 days)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analytics.dailyActivity}>
              <defs><linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{fontSize:12,fill:"#9ca3af"}} tickFormatter={(v)=>new Date(v).toLocaleDateString("en-US",{month:"short",day:"numeric"})} />
              <YAxis tick={{fontSize:12,fill:"#9ca3af"}} />
              <Tooltip contentStyle={{borderRadius:"12px",border:"1px solid #e5e7eb"}} />
              <Area type="monotone" dataKey="messages" name="Messages" stroke="#3b82f6" strokeWidth={2} fill="url(#msgGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-6">Agent usage</h2>
          {agentPieData.length===0 ? <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No data yet</div> : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={agentPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">{agentPieData.map((entry)=>(<Cell key={entry.name} fill={AGENT_COLORS[entry.name]??"#e5e7eb"} />))}</Pie><Tooltip /><Legend formatter={(value)=><span style={{fontSize:12,color:"#374151",textTransform:"capitalize"}}>{value}</span>} /></PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
