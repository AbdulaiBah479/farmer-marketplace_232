'use client'
import { useState } from 'react'
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles, Brain, RefreshCw } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 42000, expenses: 28000, profit: 14000 },
  { month: 'Feb', revenue: 48000, expenses: 30000, profit: 18000 },
  { month: 'Mar', revenue: 55000, expenses: 31000, profit: 24000 },
  { month: 'Apr', revenue: 51000, expenses: 29000, profit: 22000 },
  { month: 'May', revenue: 63000, expenses: 33000, profit: 30000 },
  { month: 'Jun', revenue: 72000, expenses: 35000, profit: 37000 },
  { month: 'Jul', revenue: 68000, expenses: 34000, profit: 34000 },
  { month: 'Aug', revenue: 79000, expenses: 38000, profit: 41000 },
  { month: 'Sep', revenue: 91000, expenses: 40000, profit: 51000 },
  { month: 'Oct', revenue: 104000, expenses: 43000, profit: 61000 },
]

const trafficData = [
  { source: 'Organic', visits: 4200 },
  { source: 'Direct', visits: 2800 },
  { source: 'LinkedIn', visits: 1900 },
  { source: 'Email', visits: 1600 },
  { source: 'Referral', visits: 1100 },
  { source: 'Paid', visits: 900 },
]

const conversionData = [
  { name: 'Visitors', value: 12400, color: '#8b5cf6' },
  { name: 'Leads', value: 1840, color: '#6366f1' },
  { name: 'Trials', value: 420, color: '#3b82f6' },
  { name: 'Customers', value: 94, color: '#10b981' },
]

const kpis = [
  { label: 'Monthly Revenue', value: '$104K', change: '+14.3%', up: true, icon: DollarSign, color: 'text-violet-400' },
  { label: 'Active Users', value: '2,847', change: '+8.7%', up: true, icon: Users, color: 'text-blue-400' },
  { label: 'Conversion Rate', value: '5.1%', change: '+0.8%', up: true, icon: TrendingUp, color: 'text-emerald-400' },
  { label: 'Churn Rate', value: '1.8%', change: '-0.4%', up: false, icon: ArrowDownRight, color: 'text-red-400' },
]

const aiInsights = [
  { type: 'growth', text: 'Revenue grew 14.3% MoM — the highest growth rate in 6 months. Key driver: enterprise plan conversions up 42%.' },
  { type: 'warning', text: 'Churn rate increased by 0.2% in the Starter plan segment. Consider proactive outreach to at-risk accounts.' },
  { type: 'opportunity', text: 'LinkedIn traffic converting at 3.2x organic rate. Consider increasing LinkedIn ad spend by $2K/month.' },
  { type: 'insight', text: 'Tuesday email sends have 48% higher open rates. Schedule all future campaigns for Tuesday 9-11 AM.' },
]

const insightColors: Record<string, string> = {
  growth: 'border-l-4 border-emerald-500 bg-emerald-500/5',
  warning: 'border-l-4 border-amber-500 bg-amber-500/5',
  opportunity: 'border-l-4 border-violet-500 bg-violet-500/5',
  insight: 'border-l-4 border-blue-500 bg-blue-500/5',
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-gray-300 capitalize">{p.name}:</span>
            <span className="text-xs font-semibold text-white">${(p.value / 1000).toFixed(0)}K</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const BarTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-xs font-semibold text-white">{payload[0].value.toLocaleString()} visits</p>
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('90d')

  return (
    <div className="min-h-screen bg-[#030712] p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-violet-400" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time business intelligence and AI-powered insights</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1">
            {['7d', '30d', '90d', '1y'].map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${timeRange === r ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 text-sm transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {k.up
                ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                : <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" />
              }
              <p className="text-xs text-emerald-400 font-medium">{k.change}</p>
              <span className="text-xs text-gray-600">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">Revenue Overview</h3>
            <p className="text-xs text-gray-500 mt-0.5">Revenue, expenses and profit over time</p>
          </div>
          <div className="flex items-center gap-4">
            {[{ label: 'Revenue', color: '#8b5cf6' }, { label: 'Expenses', color: '#ef4444' }, { label: 'Profit', color: '#10b981' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-xs text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#gradRevenue)" />
            <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#gradExpenses)" />
            <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#gradProfit)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-white/5 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-white font-semibold">Traffic Sources</h3>
            <p className="text-xs text-gray-500 mt-0.5">Visitors by acquisition channel</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trafficData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="source" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="visits" radius={[6, 6, 0, 0]}>
                {trafficData.map((_, i) => (
                  <Cell key={i} fill={`rgba(139, 92, 246, ${0.4 + (trafficData.length - i) * 0.08})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Conversion Funnel</h3>
          <p className="text-xs text-gray-500 mb-6">Visitor to customer journey</p>
          <div className="space-y-3">
            {conversionData.map(item => {
              const pct = Math.round((item.value / conversionData[0].value) * 100)
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{item.value.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-600">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-xs text-gray-500">Overall conversion rate</p>
            <p className="text-2xl font-bold text-white mt-1">0.76%</p>
            <p className="text-xs text-emerald-400 mt-0.5">+0.12% vs last month</p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Business Insights</h3>
            <p className="text-xs text-gray-500">Generated from your data patterns</p>
          </div>
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs hover:bg-violet-500/20 transition-all">
            <Sparkles className="w-3 h-3" />
            Refresh Insights
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className={`rounded-r-xl p-4 ${insightColors[insight.type]}`}>
              <p className="text-sm text-gray-300 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
