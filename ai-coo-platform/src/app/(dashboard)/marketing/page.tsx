'use client'
import { useState } from 'react'
import { Megaphone, Plus, Sparkles, TrendingUp, DollarSign, Eye, MousePointer, MoreHorizontal, ArrowUpRight, ChevronRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type CampaignStatus = 'Active' | 'Paused' | 'Completed' | 'Draft'

const campaigns = [
  { id: 1, name: 'AI COO Launch — LinkedIn Blitz', channel: 'LinkedIn', status: 'Active' as CampaignStatus, budget: 5000, spent: 3200, leads: 284, roi: 340, ctr: 4.2 },
  { id: 2, name: 'Q2 Email Nurture Sequence', channel: 'Email', status: 'Active' as CampaignStatus, budget: 800, spent: 420, leads: 192, roi: 890, ctr: 28.4 },
  { id: 3, name: 'Google Search — Business AI', channel: 'Google Ads', status: 'Active' as CampaignStatus, budget: 8000, spent: 6100, leads: 347, roi: 220, ctr: 3.8 },
  { id: 4, name: 'Retargeting — Website Visitors', channel: 'Meta Ads', status: 'Paused' as CampaignStatus, budget: 3000, spent: 1200, leads: 89, roi: 180, ctr: 2.1 },
  { id: 5, name: 'Content SEO Push — AI Operations', channel: 'SEO', status: 'Completed' as CampaignStatus, budget: 2500, spent: 2500, leads: 520, roi: 640, ctr: 0 },
  { id: 6, name: 'Twitter/X Brand Awareness', channel: 'Twitter', status: 'Draft' as CampaignStatus, budget: 2000, spent: 0, leads: 0, roi: 0, ctr: 0 },
]

const channelPerformance = [
  { channel: 'Email', leads: 192, color: '#7c3aed' },
  { channel: 'SEO', leads: 520, color: '#4f46e5' },
  { channel: 'LinkedIn', leads: 284, color: '#3b82f6' },
  { channel: 'Google', leads: 347, color: '#10b981' },
  { channel: 'Meta', leads: 89, color: '#f59e0b' },
  { channel: 'Twitter', leads: 0, color: '#6b7280' },
]

const statusConfig: Record<CampaignStatus, string> = {
  Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Draft: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const aiRecommendations = [
  { title: 'Scale LinkedIn Campaign', body: 'Your LinkedIn CTR of 4.2% is 2.4x industry average. Increasing budget by $3K could yield ~180 additional leads this month based on current CPL.', action: 'Increase Budget', color: 'emerald' },
  { title: 'Reactivate Meta Retargeting', body: 'Website traffic is up 34% this month. Your retargeting pool has grown significantly — now is the right time to re-enable this campaign.', action: 'Enable Campaign', color: 'violet' },
  { title: 'Optimize Email Subject Lines', body: 'Your email open rate is 22% vs 28% top quartile benchmark. AI suggests testing urgency-based subject lines to close the gap.', action: 'Run A/B Test', color: 'blue' },
]

export default function MarketingPage() {
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'Active', 'Paused', 'Completed', 'Draft']
  const filtered = campaigns.filter(c => filter === 'All' || c.status === filter)

  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0)
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const avgRoi = Math.round(campaigns.filter(c => c.roi > 0).reduce((sum, c) => sum + c.roi, 0) / campaigns.filter(c => c.roi > 0).length)

  return (
    <div className="min-h-screen bg-[#030712] p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-violet-400" />
            Marketing Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage campaigns, track performance, and get AI recommendations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 shadow-lg shadow-violet-500/20">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads (MTD)', value: totalLeads.toLocaleString(), change: '+23%', icon: TrendingUp, color: 'text-violet-400' },
          { label: 'Ad Spend (MTD)', value: `$${(totalSpend / 1000).toFixed(1)}K`, change: '-8% vs budget', icon: DollarSign, color: 'text-indigo-400' },
          { label: 'Avg Campaign ROI', value: `${avgRoi}%`, change: '+42%', icon: ArrowUpRight, color: 'text-emerald-400' },
          { label: 'Avg CTR', value: '3.8%', change: '+0.6%', icon: MousePointer, color: 'text-amber-400' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-emerald-400 mt-1">{kpi.change} this month</p>
          </div>
        ))}
      </div>

      {/* Campaign Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">Campaigns</h2>
          <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${filter === f ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-white/5">
            {['Campaign', 'Channel', 'Status', 'Budget', 'Leads', 'ROI', ''].map(h => (
              <span key={h} className="text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</span>
            ))}
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map(c => (
              <div key={c.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-white/2 transition-all group">
                <div>
                  <p className="text-sm text-white font-medium truncate">{c.name}</p>
                  {c.spent > 0 && (
                    <div className="mt-1">
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden w-32">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.min(100, (c.spent / c.budget) * 100)}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-300">{c.channel}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-xs font-medium w-fit ${statusConfig[c.status]}`}>{c.status}</span>
                <div>
                  <p className="text-sm text-white">${c.budget.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">${c.spent.toLocaleString()} spent</p>
                </div>
                <span className="text-sm text-white font-medium">{c.leads > 0 ? c.leads : '—'}</span>
                <span className={`text-sm font-medium ${c.roi > 200 ? 'text-emerald-400' : c.roi > 0 ? 'text-amber-400' : 'text-gray-600'}`}>
                  {c.roi > 0 ? `${c.roi}%` : '—'}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/5 text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Chart */}
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-1">Channel Performance</h2>
          <p className="text-xs text-gray-500 mb-5">Leads generated by channel (all time)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channelPerformance} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="channel" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} formatter={(v: any) => [`${v} leads`, 'Leads']} />
              <Bar dataKey="leads" radius={[4, 4, 0, 0]}>
                {channelPerformance.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h2 className="text-white font-semibold">AI Recommendations</h2>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((r, i) => (
              <div key={i} className="bg-black/20 border border-white/5 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-1">{r.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">{r.body}</p>
                <button className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium">
                  {r.action} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
