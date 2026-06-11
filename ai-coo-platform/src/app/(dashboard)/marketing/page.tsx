'use client'
import { useState } from 'react'
import { Megaphone, TrendingUp, DollarSign, MousePointer, Users, Sparkles, Brain, MoreHorizontal, Search, BarChart3, Globe, Mail, Share2, Target } from 'lucide-react'

const campaigns = [
  { id: 1, name: 'Q4 Enterprise Outreach', channel: 'Email', status: 'ACTIVE', budget: 2500, spent: 1840, leads: 127, conversions: 14, cpl: 14.5, roi: 340, startDate: 'Oct 1' },
  { id: 2, name: 'LinkedIn AI Awareness', channel: 'Social', status: 'ACTIVE', budget: 4000, spent: 3200, leads: 284, conversions: 31, cpl: 11.3, roi: 520, startDate: 'Sep 20' },
  { id: 3, name: 'Google Search — AI COO', channel: 'Paid', status: 'ACTIVE', budget: 6000, spent: 4800, leads: 410, conversions: 48, cpl: 11.7, roi: 610, startDate: 'Sep 1' },
  { id: 4, name: 'Organic SEO — AI Tools', channel: 'SEO', status: 'ONGOING', budget: 3000, spent: 3000, leads: 892, conversions: 104, cpl: 3.4, roi: 1240, startDate: 'Jul 1' },
  { id: 5, name: 'Product Hunt Launch', channel: 'Social', status: 'COMPLETED', budget: 1000, spent: 980, leads: 340, conversions: 28, cpl: 2.9, roi: 820, startDate: 'Sep 15' },
  { id: 6, name: 'Re-engagement Email Series', channel: 'Email', status: 'DRAFT', budget: 1500, spent: 0, leads: 0, conversions: 0, cpl: 0, roi: 0, startDate: '—' },
]

const channelBreakdown = [
  { name: 'Email', Icon: Mail, color: 'text-violet-400', bg: 'bg-violet-500/10', leads: 892, conversions: 94, spend: 8200, roi: 420 },
  { name: 'Social Media', Icon: Share2, color: 'text-blue-400', bg: 'bg-blue-500/10', leads: 1240, conversions: 87, spend: 12400, roi: 380 },
  { name: 'SEO / Organic', Icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10', leads: 2840, conversions: 213, spend: 9000, roi: 890 },
  { name: 'Paid Ads', Icon: Target, color: 'text-orange-400', bg: 'bg-orange-500/10', leads: 1680, conversions: 142, spend: 18600, roi: 610 },
]

const aiRecommendations = [
  { type: 'budget', text: 'Shift 20% of Paid Ads budget to SEO — your organic cost-per-lead is 5x lower ($3.40 vs $11.70) with higher purchase intent.' },
  { type: 'content', text: 'Your LinkedIn posts featuring case studies get 3.2x more engagement. Create 2-3 case study posts per week.' },
  { type: 'timing', text: 'Email campaigns sent on Tuesday 9 AM have 47% higher open rates. Reschedule your Q4 campaign launch.' },
  { type: 'audience', text: 'Leads from "Head of Operations" roles convert at 2.8x the average rate. Consider targeting this segment more aggressively.' },
]

const recColors: Record<string, string> = {
  budget: 'bg-violet-500/10 border border-violet-500/20 text-violet-400',
  content: 'bg-blue-500/10 border border-blue-500/20 text-blue-400',
  timing: 'bg-amber-500/10 border border-amber-500/20 text-amber-400',
  audience: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400',
}

const statusConfig: Record<string, string> = {
  ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ONGOING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  COMPLETED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  DRAFT: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  PAUSED: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const channelIconMap: Record<string, React.ReactNode> = {
  Email: <Mail className="w-3 h-3" />,
  Social: <Share2 className="w-3 h-3" />,
  Paid: <Target className="w-3 h-3" />,
  SEO: <Globe className="w-3 h-3" />,
}

const stats = [
  { label: 'Total Leads', value: '6,652', change: '+23%', icon: Users, color: 'text-violet-400' },
  { label: 'Ad Spend', value: '$48.2K', change: '+$8K', icon: DollarSign, color: 'text-blue-400' },
  { label: 'Avg. CTR', value: '3.8%', change: '+0.6%', icon: MousePointer, color: 'text-emerald-400' },
  { label: 'Blended ROI', value: '575%', change: '+87%', icon: TrendingUp, color: 'text-orange-400' },
]

export default function MarketingPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'campaigns' | 'channels' | 'recommendations'>('campaigns')

  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-violet-400" />
            Marketing Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered campaign management and performance optimization</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            <Sparkles className="w-4 h-4" />
            Create Campaign with AI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Brain className="w-4 h-4" />
            AI Analysis
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-emerald-400 mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1 w-fit">
        {(['campaigns', 'channels', 'recommendations'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab === 'recommendations' ? 'AI Recommendations' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      {activeTab === 'campaigns' && (
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns..." className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/Lead</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                          {channelIconMap[c.channel] || <BarChart3 className="w-3 h-3" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{c.name}</p>
                          <p className="text-xs text-gray-500">{c.channel} · Started {c.startDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-medium ${statusConfig[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm text-white">${c.spent.toLocaleString()} / ${c.budget.toLocaleString()}</p>
                        {c.budget > 0 && (
                          <div className="w-20 bg-gray-800 rounded-full h-1 mt-1">
                            <div className="h-1 rounded-full bg-violet-500" style={{ width: `${Math.min((c.spent / c.budget) * 100, 100)}%` }} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-white">{c.leads.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{c.conversions} conversions</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-white">{c.cpl > 0 ? `$${c.cpl.toFixed(1)}` : '—'}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-semibold ${c.roi > 500 ? 'text-emerald-400' : c.roi > 300 ? 'text-blue-400' : c.roi > 0 ? 'text-amber-400' : 'text-gray-500'}`}>
                        {c.roi > 0 ? `${c.roi}%` : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Channel Breakdown */}
      {activeTab === 'channels' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channelBreakdown.map(ch => (
            <div key={ch.name} className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl ${ch.bg} border border-white/5 flex items-center justify-center`}>
                  <ch.Icon className={`w-5 h-5 ${ch.color}`} />
                </div>
                <h3 className="text-white font-semibold">{ch.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Leads', value: ch.leads.toLocaleString() },
                  { label: 'Conversions', value: ch.conversions.toString() },
                  { label: 'Total Spend', value: `$${(ch.spend / 1000).toFixed(1)}K` },
                  { label: 'ROI', value: `${ch.roi}%` },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-xs text-gray-500 mb-0.5">{m.label}</p>
                    <p className="text-lg font-bold text-white">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 mb-1">Cost per Lead</p>
                <p className="text-xl font-bold text-white">${(ch.spend / ch.leads).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Marketing Strategist</h3>
              <p className="text-gray-400 text-sm">Based on your campaign performance, here are this week&apos;s top recommendations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiRecommendations.map((rec, i) => (
              <div key={i} className={`rounded-2xl p-5 ${recColors[rec.type]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} Optimization</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{rec.text}</p>
                <button className="mt-3 text-xs font-medium opacity-80 hover:opacity-100 transition-opacity">
                  Apply Recommendation &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
