'use client'
import { useState } from 'react'
import { Users, Plus, Brain, Sparkles, MoreHorizontal, TrendingUp, DollarSign, Target, Award, LayoutGrid, List, Calendar, Phone, Mail } from 'lucide-react'

type Deal = {
  id: number
  company: string
  contact: string
  value: number
  probability: number
  daysInStage: number
  stage: string
  industry: string
  avatar: string
}

const deals: Deal[] = [
  { id: 1, company: 'TechVentures Inc', contact: 'Sarah Miller', value: 45000, probability: 80, daysInStage: 3, stage: 'PROSPECTING', industry: 'SaaS', avatar: 'SM' },
  { id: 2, company: 'Growth Agency Co', contact: 'James Wilson', value: 28000, probability: 60, daysInStage: 7, stage: 'QUALIFIED', industry: 'Marketing', avatar: 'JW' },
  { id: 3, company: 'Consultify Pro', contact: 'Aisha Rahman', value: 92000, probability: 75, daysInStage: 2, stage: 'PROPOSAL', industry: 'Consulting', avatar: 'AR' },
  { id: 4, company: 'CloudScale Corp', contact: 'Marcus Chen', value: 150000, probability: 85, daysInStage: 5, stage: 'NEGOTIATION', industry: 'Cloud', avatar: 'MC' },
  { id: 5, company: 'RevOps Solutions', contact: 'Tom Bradley', value: 67000, probability: 95, daysInStage: 1, stage: 'CLOSED_WON', industry: 'RevOps', avatar: 'TB' },
  { id: 6, company: 'DigitalFirst Media', contact: 'Elena Torres', value: 33000, probability: 45, daysInStage: 12, stage: 'PROSPECTING', industry: 'Media', avatar: 'ET' },
  { id: 7, company: 'Startup Nexus', contact: 'David Park', value: 21000, probability: 70, daysInStage: 4, stage: 'QUALIFIED', industry: 'Venture', avatar: 'DP' },
  { id: 8, company: 'EcomBrand Ltd', contact: 'Priya Sharma', value: 55000, probability: 65, daysInStage: 8, stage: 'PROPOSAL', industry: 'E-commerce', avatar: 'PS' },
  { id: 9, company: 'AutoScaling Co', contact: 'Ryan Lee', value: 88000, probability: 90, daysInStage: 3, stage: 'NEGOTIATION', industry: 'DevOps', avatar: 'RL' },
  { id: 10, company: 'DataFlow Inc', contact: 'Nina Patel', value: 41000, probability: 55, daysInStage: 6, stage: 'PROSPECTING', industry: 'Analytics', avatar: 'NP' },
]

const stages = [
  { id: 'PROSPECTING', label: 'Prospecting', color: 'blue' },
  { id: 'QUALIFIED', label: 'Qualified', color: 'violet' },
  { id: 'PROPOSAL', label: 'Proposal', color: 'amber' },
  { id: 'NEGOTIATION', label: 'Negotiation', color: 'orange' },
  { id: 'CLOSED_WON', label: 'Closed Won', color: 'emerald' },
]

const stageColorMap: Record<string, string> = {
  blue: 'border-blue-500/30 bg-blue-500/5',
  violet: 'border-violet-500/30 bg-violet-500/5',
  amber: 'border-amber-500/30 bg-amber-500/5',
  orange: 'border-orange-500/30 bg-orange-500/5',
  emerald: 'border-emerald-500/30 bg-emerald-500/5',
}

const stageLabelColorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/10',
  violet: 'text-violet-400 bg-violet-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  orange: 'text-orange-400 bg-orange-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
}

const stats = [
  { label: 'Total Contacts', value: '2,841', change: '+12%', icon: Users, color: 'text-violet-400' },
  { label: 'Open Deals', value: '47', change: '+8', icon: Target, color: 'text-blue-400' },
  { label: 'Pipeline Value', value: '$2.4M', change: '+19%', icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Win Rate', value: '34%', change: '+5%', icon: Award, color: 'text-orange-400' },
]

export default function CRMPage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban')

  const pipelineValue = deals.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-violet-400" />
            CRM Pipeline
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage deals and relationships with AI-powered insights</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            <Brain className="w-4 h-4" />
            AI Analyze Pipeline
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Plus className="w-4 h-4" />
            Add Deal
          </button>
          <div className="flex items-center bg-gray-900/50 border border-white/5 rounded-xl p-1">
            <button
              onClick={() => setView('kanban')}
              className={`p-1.5 rounded-lg transition-all ${view === 'kanban' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{s.label === 'Pipeline Value' ? `$${(pipelineValue / 1000).toFixed(0)}K` : s.value}</p>
            <p className="text-xs text-emerald-400 mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage.id)
            const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0)
            return (
              <div key={stage.id} className="flex-shrink-0 w-64">
                <div className={`rounded-2xl border ${stageColorMap[stage.color]} p-3`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${stageLabelColorMap[stage.color]}`}>
                        {stage.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{stageDeals.length}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 px-1">${(stageValue / 1000).toFixed(0)}K total value</p>
                  <div className="space-y-2">
                    {stageDeals.map(deal => (
                      <div key={deal.id} className="bg-gray-900/80 border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center text-[10px] font-bold text-violet-300 flex-shrink-0">
                              {deal.avatar}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white leading-tight">{deal.company}</p>
                              <p className="text-[10px] text-gray-500">{deal.contact}</p>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-white">${(deal.value / 1000).toFixed(0)}K</span>
                          <span className="text-[10px] text-gray-500">{deal.probability}% win</span>
                        </div>
                        <div className="mt-2 w-full bg-gray-800 rounded-full h-1">
                          <div
                            className="h-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <Calendar className="w-3 h-3 text-gray-600" />
                          <span className="text-[10px] text-gray-600">{deal.daysInStage}d in stage</span>
                          <span className="text-[10px] text-gray-600 ml-auto">{deal.industry}</span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-2 rounded-xl border border-dashed border-white/10 text-gray-600 text-xs hover:border-violet-500/30 hover:text-violet-400 transition-all flex items-center justify-center gap-1">
                      <Plus className="w-3 h-3" />
                      Add deal
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Days in Stage</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {deals.map(deal => {
                  const stage = stages.find(s => s.id === deal.stage)
                  return (
                    <tr key={deal.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300">
                            {deal.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{deal.company}</p>
                            <p className="text-xs text-gray-500">{deal.industry}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="space-y-0.5">
                            <p className="text-sm text-gray-300">{deal.contact}</p>
                            <div className="flex items-center gap-2">
                              <button className="p-1 rounded hover:bg-white/10 text-gray-600 hover:text-gray-300 transition-colors">
                                <Mail className="w-3 h-3" />
                              </button>
                              <button className="p-1 rounded hover:bg-white/10 text-gray-600 hover:text-gray-300 transition-colors">
                                <Phone className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-white">${deal.value.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        {stage && (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${stageLabelColorMap[stage.color]}`}>
                            {stage.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-800 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${deal.probability}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{deal.probability}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm ${deal.daysInStage > 10 ? 'text-red-400' : deal.daysInStage > 5 ? 'text-amber-400' : 'text-gray-400'}`}>
                          {deal.daysInStage} days
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-white font-medium mb-1">AI Pipeline Insight</h3>
          <p className="text-gray-400 text-sm">3 deals in Negotiation have been stagnant for over 5 days. Consider sending personalized follow-ups. CloudScale Corp has the highest win probability at 85% — prioritize closing this week.</p>
          <button className="mt-3 text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors">
            <TrendingUp className="w-3.5 h-3.5" />
            View full analysis
          </button>
        </div>
      </div>
    </div>
  )
}
