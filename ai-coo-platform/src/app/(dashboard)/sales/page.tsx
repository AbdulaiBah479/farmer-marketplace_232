'use client'
import { useState } from 'react'
import { TrendingUp, DollarSign, Target, Users, Sparkles, Brain, MoreHorizontal, Phone, Mail, Clock, Award, ChevronRight, CheckCircle2, Circle } from 'lucide-react'

const topDeals = [
  { id: 1, company: 'CloudScale Corp', contact: 'Marcus Chen', value: 150000, probability: 85, stage: 'Negotiation', daysOpen: 14, score: 92, avatar: 'MC' },
  { id: 2, company: 'AutoScaling Co', contact: 'Ryan Lee', value: 88000, probability: 90, stage: 'Negotiation', daysOpen: 8, score: 89, avatar: 'RL' },
  { id: 3, company: 'Consultify Pro', contact: 'Aisha Rahman', value: 92000, probability: 75, stage: 'Proposal', daysOpen: 11, score: 84, avatar: 'AR' },
  { id: 4, company: 'TechVentures Inc', contact: 'Sarah Miller', value: 45000, probability: 80, stage: 'Proposal', daysOpen: 5, score: 87, avatar: 'SM' },
  { id: 5, company: 'EcomBrand Ltd', contact: 'Priya Sharma', value: 38000, probability: 65, stage: 'Qualified', daysOpen: 18, score: 71, avatar: 'PS' },
]

const activities = [
  { id: 1, type: 'call', description: 'Call with Marcus Chen — discussed pricing', company: 'CloudScale Corp', time: '30 min ago', outcome: 'Positive', user: 'James W.' },
  { id: 2, type: 'email', description: 'Sent follow-up to Aisha Rahman', company: 'Consultify Pro', time: '1 hour ago', outcome: 'Sent', user: 'AI Agent' },
  { id: 3, type: 'deal', description: 'RevOps Solutions deal marked as won', company: 'RevOps Solutions', time: '2 hours ago', outcome: 'Won', user: 'Tom B.' },
  { id: 4, type: 'note', description: 'Added meeting notes from TechVentures demo', company: 'TechVentures Inc', time: '3 hours ago', outcome: 'Noted', user: 'Sarah M.' },
  { id: 5, type: 'call', description: 'Demo call with EcomBrand Ltd team', company: 'EcomBrand Ltd', time: '4 hours ago', outcome: 'Follow-up', user: 'James W.' },
  { id: 6, type: 'email', description: 'Proposal email opened 3x by Ryan Lee', company: 'AutoScaling Co', time: '5 hours ago', outcome: 'Engaged', user: 'AI Agent' },
]

const coachingTips = [
  { category: 'Priority Action', text: 'CloudScale Corp is your highest-value deal at risk. Schedule a call with Marcus this week — deals stagnant for 14+ days close 60% less often.', priority: 'high' },
  { category: 'Opportunity', text: 'AutoScaling Co has a 90% win probability. Push for contract signing this week to close before month-end.', priority: 'medium' },
  { category: 'Coaching', text: 'Your average deal cycle is 21 days vs. team average of 28 days. Your follow-up speed (avg. 4 hours) is a key differentiator.', priority: 'info' },
  { category: 'Risk', text: 'EcomBrand Ltd is 18 days in the Qualified stage. Consider adjusting value proposition or offering a discount to move forward.', priority: 'warning' },
]

const tipColors: Record<string, string> = {
  high: 'border-l-4 border-red-500 bg-red-500/5',
  medium: 'border-l-4 border-emerald-500 bg-emerald-500/5',
  info: 'border-l-4 border-blue-500 bg-blue-500/5',
  warning: 'border-l-4 border-amber-500 bg-amber-500/5',
}

const activityIconMap: Record<string, React.ReactNode> = {
  call: <Phone className="w-3.5 h-3.5" />,
  email: <Mail className="w-3.5 h-3.5" />,
  deal: <CheckCircle2 className="w-3.5 h-3.5" />,
  note: <Circle className="w-3.5 h-3.5" />,
}

const activityColor: Record<string, string> = {
  call: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  email: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  deal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  note: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const avatarColors = ['bg-violet-500/30 text-violet-300', 'bg-blue-500/30 text-blue-300', 'bg-emerald-500/30 text-emerald-300', 'bg-orange-500/30 text-orange-300', 'bg-pink-500/30 text-pink-300']

const stats = [
  { label: 'Pipeline Value', value: '$2.4M', change: '+19%', icon: DollarSign, color: 'text-violet-400' },
  { label: 'Deals Closing', value: '8', change: 'This month', icon: Target, color: 'text-blue-400' },
  { label: 'Win Rate', value: '34%', change: '+5%', icon: Award, color: 'text-emerald-400' },
  { label: 'Avg Deal Size', value: '$52K', change: '+$8K', icon: TrendingUp, color: 'text-orange-400' },
]

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState<'deals' | 'activity' | 'coaching'>('deals')

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-violet-400" />
            Sales Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered sales intelligence, coaching, and pipeline management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            <Brain className="w-4 h-4" />
            AI Sales Briefing
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Sparkles className="w-4 h-4" />
            Generate Pitch
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
        {(['deals', 'activity', 'coaching'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab === 'coaching' ? 'AI Coaching' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Top Deals */}
      {activeTab === 'deals' && (
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Top Deals by Value</h3>
            <span className="text-xs text-gray-500">{topDeals.length} priority deals</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Win Prob.</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">AI Score</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Days Open</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topDeals.map((deal, i) => (
                  <tr key={deal.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                          {deal.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{deal.company}</p>
                          <p className="text-xs text-gray-500">{deal.contact}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-white">${deal.value.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-medium">{deal.stage}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-800 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${deal.probability}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${deal.score >= 85 ? 'text-emerald-400' : deal.score >= 70 ? 'text-amber-400' : 'text-red-400'}`}>{deal.score}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm ${deal.daysOpen > 14 ? 'text-red-400' : deal.daysOpen > 7 ? 'text-amber-400' : 'text-gray-400'}`}>{deal.daysOpen}d</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-violet-400 transition-all">
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-blue-400 transition-all">
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Activity Timeline */}
      {activeTab === 'activity' && (
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white">Activity Timeline</h3>
          </div>
          <div className="divide-y divide-white/5">
            {activities.map(activity => (
              <div key={activity.id} className="px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${activityColor[activity.type]}`}>
                    {activityIconMap[activity.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">{activity.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{activity.company}</span>
                      <span className="text-xs text-gray-600">{activity.user}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-600">{activity.time}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${activityColor[activity.type]}`}>{activity.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Coaching */}
      {activeTab === 'coaching' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Your AI Sales Coach</h3>
                <p className="text-xs text-gray-500">Personalized insights based on your pipeline data</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Sales Velocity', value: '4.2x', desc: 'vs last month' },
                { label: 'Follow-up Speed', value: '4h avg', desc: 'Industry: 18h' },
                { label: 'Close Rate', value: '34%', desc: '+5% vs goal' },
              ].map(m => (
                <div key={m.label} className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-violet-300">{m.value}</p>
                  <p className="text-xs text-white font-medium mt-0.5">{m.label}</p>
                  <p className="text-[10px] text-gray-500">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {coachingTips.map((tip, i) => (
              <div key={i} className={`rounded-r-2xl p-4 ${tipColors[tip.priority]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{tip.category}</span>
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
