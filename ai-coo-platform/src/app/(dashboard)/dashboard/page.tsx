'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import {
  Target, Users, Mail, FileText, Shield, Share2, Pen, Headphones,
  FolderKanban, MessageSquare, BarChart3, Zap, TrendingUp, Megaphone,
  DollarSign, ArrowUpRight, ArrowDownRight, Sparkles, Brain, Plus,
  CheckCircle2, Clock, AlertCircle
} from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 12400, target: 15000 },
  { month: 'Feb', revenue: 18200, target: 16000 },
  { month: 'Mar', revenue: 15800, target: 17000 },
  { month: 'Apr', revenue: 22100, target: 18000 },
  { month: 'May', revenue: 28400, target: 20000 },
  { month: 'Jun', revenue: 31200, target: 25000 },
  { month: 'Jul', revenue: 38900, target: 30000 },
  { month: 'Aug', revenue: 42100, target: 35000 },
  { month: 'Sep', revenue: 47291, target: 40000 },
]

const pipelineData = [
  { stage: 'Prospect', value: 124, amount: 248000 },
  { stage: 'Qualified', value: 89, amount: 445000 },
  { stage: 'Proposal', value: 43, amount: 387000 },
  { stage: 'Negotiate', value: 21, amount: 315000 },
  { stage: 'Closed', value: 12, amount: 180000 },
]

const recentActivity = [
  { icon: Target, text: 'AI generated 14 new qualified leads from LinkedIn', time: '2m ago', type: 'lead' },
  { icon: Mail, text: 'Email campaign "Q4 Outreach" sent to 450 contacts', time: '15m ago', type: 'email' },
  { icon: FileText, text: 'Proposal for TechCorp ($45K) was viewed', time: '1h ago', type: 'proposal' },
  { icon: CheckCircle2, text: 'Project "Website Redesign" milestone completed', time: '2h ago', type: 'project' },
  { icon: DollarSign, text: 'Invoice #INV-0042 paid — $8,500', time: '3h ago', type: 'finance' },
  { icon: Users, text: 'New deal "Enterprise Plan" moved to Negotiation', time: '4h ago', type: 'crm' },
]

const aiInsights = [
  { type: 'opportunity', text: 'TechCorp has visited your proposal 3 times — perfect time to follow up', priority: 'high' },
  { type: 'alert', text: "12 leads from last week haven't been contacted yet", priority: 'medium' },
  { type: 'insight', text: 'Your email open rate is 34% above industry average', priority: 'low' },
  { type: 'action', text: 'Schedule 3 social posts to maintain your 5-day streak', priority: 'medium' },
]

const quickModules = [
  { icon: Target, label: 'Generate Leads', href: '/leads', color: 'violet' },
  { icon: Mail, label: 'Write Email', href: '/email', color: 'blue' },
  { icon: FileText, label: 'New Proposal', href: '/proposals', color: 'emerald' },
  { icon: Pen, label: 'Create Content', href: '/content', color: 'orange' },
  { icon: Zap, label: 'Automate', href: '/automation', color: 'yellow' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', color: 'pink' },
]

export default function DashboardPage() {
  const metrics = [
    { label: 'Revenue MTD', value: '$47,291', change: '+23.4%', up: true, icon: DollarSign, color: 'violet' },
    { label: 'New Leads', value: '1,284', change: '+41.2%', up: true, icon: Target, color: 'blue' },
    { label: 'Tasks Complete', value: '892', change: '+15.7%', up: true, icon: CheckCircle2, color: 'emerald' },
    { label: 'AI Credits Left', value: '660', change: '34% used', up: null, icon: Sparkles, color: 'orange' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Good morning, John 👋</h1>
          <p className="text-gray-400 text-sm mt-0.5">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Brain className="w-4 h-4" />
            Ask AI COO
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium">{m.label}</span>
              <div className={`w-8 h-8 rounded-lg bg-${m.color}-500/10 flex items-center justify-center`}>
                <m.icon className={`w-4 h-4 text-${m.color}-400`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{m.value}</p>
            <div className="flex items-center gap-1 text-xs">
              {m.up === true && <ArrowUpRight className="w-3 h-3 text-emerald-400" />}
              {m.up === false && <ArrowDownRight className="w-3 h-3 text-red-400" />}
              <span className={m.up === true ? 'text-emerald-400' : m.up === false ? 'text-red-400' : 'text-gray-500'}>
                {m.change}
              </span>
              {m.up !== null && <span className="text-gray-600">vs last month</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-white">Revenue Overview</h2>
              <p className="text-xs text-gray-500 mt-0.5">Monthly revenue vs target</p>
            </div>
            <select className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-gray-400">
              <option>Last 9 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v/1000}k`} />
              <Tooltip
                contentStyle={{ background: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="target" stroke="#4f46e5" fill="none" strokeWidth={1} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline */}
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Deal Pipeline</h2>
          <p className="text-xs text-gray-500 mb-5">$1.575M total pipeline</p>
          <div className="space-y-3">
            {pipelineData.map((d, i) => (
              <div key={d.stage}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">{d.stage}</span>
                  <span className="text-gray-500">{d.value} deals · ${(d.amount/1000).toFixed(0)}K</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    style={{ width: `${(d.value / 124) * 100}%`, opacity: 1 - i * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-white/5 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 leading-snug">{item.text}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-semibold text-white">AI Insights</h2>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-xs ${
                  insight.priority === 'high'
                    ? 'bg-violet-500/10 border-violet-500/20 text-violet-300'
                    : insight.priority === 'medium'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                    : 'bg-gray-800/50 border-white/5 text-gray-400'
                }`}
              >
                {insight.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickModules.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-violet-500/20 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 flex items-center justify-center group-hover:from-violet-600/40 group-hover:to-indigo-600/40 transition-all">
                <Icon className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
