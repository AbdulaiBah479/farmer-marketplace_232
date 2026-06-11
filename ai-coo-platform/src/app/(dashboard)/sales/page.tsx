'use client'
import { useState } from 'react'
import { TrendingUp, DollarSign, Target, Phone, Mail, Calendar, Sparkles, ChevronRight, MoreHorizontal, CheckCircle2, Clock, ArrowUpRight, Star } from 'lucide-react'

type DealStage = 'Prospecting' | 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won'

const stageProgress: Record<DealStage, number> = {
  Prospecting: 10,
  Discovery: 30,
  Proposal: 55,
  Negotiation: 80,
  'Closed Won': 100,
}

const stageColors: Record<DealStage, string> = {
  Prospecting: 'bg-gray-500',
  Discovery: 'bg-blue-500',
  Proposal: 'bg-violet-500',
  Negotiation: 'bg-amber-500',
  'Closed Won': 'bg-emerald-500',
}

const stageBadge: Record<DealStage, string> = {
  Prospecting: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  Discovery: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Proposal: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Negotiation: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Closed Won': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const deals = [
  { id: 1, company: 'Meridian Tech Group', contact: 'David Okafor', value: 84000, stage: 'Negotiation' as DealStage, probability: 80, closeDate: 'Jun 20, 2026', daysInStage: 4 },
  { id: 2, company: 'Apex Ventures', contact: 'Jennifer Walsh', value: 120000, stage: 'Proposal' as DealStage, probability: 55, closeDate: 'Jul 5, 2026', daysInStage: 7 },
  { id: 3, company: 'Bright Solutions Inc', contact: 'Marcus Thompson', value: 36000, stage: 'Closed Won' as DealStage, probability: 100, closeDate: 'Jun 10, 2026', daysInStage: 0 },
  { id: 4, company: 'NexaFlow Systems', contact: 'Amara Singh', value: 55000, stage: 'Discovery' as DealStage, probability: 30, closeDate: 'Aug 1, 2026', daysInStage: 12 },
  { id: 5, company: 'Pioneer Digital', contact: 'Carlos Rivera', value: 28000, stage: 'Prospecting' as DealStage, probability: 10, closeDate: 'Aug 30, 2026', daysInStage: 3 },
  { id: 6, company: 'Summit Analytics', contact: 'Sophie Chen', value: 67500, stage: 'Negotiation' as DealStage, probability: 85, closeDate: 'Jun 25, 2026', daysInStage: 6 },
]

const activities = [
  { id: 1, type: 'call', label: 'Call with David Okafor', time: '10:00 AM', done: true },
  { id: 2, type: 'email', label: 'Follow up with Apex Ventures', time: '11:30 AM', done: true },
  { id: 3, type: 'meeting', label: 'Demo for NexaFlow Systems', time: '2:00 PM', done: false },
  { id: 4, type: 'email', label: 'Send proposal to Summit Analytics', time: '4:00 PM', done: false },
  { id: 5, type: 'call', label: 'Check-in with Pioneer Digital', time: '5:30 PM', done: false },
]

const activityIcons: Record<string, any> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
}

const aiCoachingTips = [
  { title: 'Follow Up Apex Ventures', tip: 'Jennifer Walsh hasn\'t responded in 7 days. Send a value-add email with a case study — AI suggests a 68% chance of reengagement.', urgency: 'High' },
  { title: 'Accelerate Meridian Close', tip: 'David has opened your proposal 4 times. Strike now — propose a 48-hour deadline and offer 10% first-year discount to close this week.', urgency: 'Medium' },
  { title: 'Add NexaFlow Decision Maker', tip: 'Marcus Thompson is an influencer but not the final buyer. Ask for an intro to the CTO to prevent late-stage deal loss.', urgency: 'Medium' },
]

const urgencyColors: Record<string, string> = {
  High: 'bg-red-500/10 text-red-400 border-red-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Low: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

export default function SalesPage() {
  const [activities_, setActivities] = useState(activities)

  const toggleActivity = (id: number) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a))
  }

  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0)
  const closedWon = deals.filter(d => d.stage === 'Closed Won').reduce((sum, d) => sum + d.value, 0)
  const weightedPipeline = deals.reduce((sum, d) => sum + d.value * d.probability / 100, 0)

  return (
    <div className="min-h-screen bg-[#030712] p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-violet-400" />
            Sales Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered coaching, deal tracking, and pipeline management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 shadow-lg shadow-violet-500/20">
          <Sparkles className="w-4 h-4" />
          AI Sales Brief
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pipeline', value: `$${(totalPipeline / 1000).toFixed(0)}K`, change: '+18%', icon: DollarSign, color: 'text-violet-400' },
          { label: 'Weighted Pipeline', value: `$${(weightedPipeline / 1000).toFixed(0)}K`, change: '+12%', icon: Target, color: 'text-indigo-400' },
          { label: 'Closed Won (MTD)', value: `$${(closedWon / 1000).toFixed(0)}K`, change: '+36K', icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'Win Rate', value: '42%', change: '+5%', icon: Star, color: 'text-amber-400' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />{kpi.change} this month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deals */}
        <div className="lg:col-span-2">
          <h2 className="text-white font-semibold mb-3">Top Deals</h2>
          <div className="space-y-3">
            {deals.map(deal => (
              <div key={deal.id} className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{deal.company}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{deal.contact}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">${(deal.value / 1000).toFixed(0)}K</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[10px] font-medium ${stageBadge[deal.stage]}`}>{deal.stage}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-gray-500">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-600">Stage Progress</span>
                    <span className="text-[10px] text-gray-500">{deal.probability}% probability</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${stageColors[deal.stage]}`}
                      style={{ width: `${stageProgress[deal.stage]}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>Close: {deal.closeDate}</span>
                  </div>
                  {deal.daysInStage > 0 && (
                    <span className="text-xs text-gray-600">{deal.daysInStage}d in stage</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* AI Coaching */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h2 className="text-white font-semibold">AI Coaching Tips</h2>
            </div>
            <div className="space-y-3">
              {aiCoachingTips.map((tip, i) => (
                <div key={i} className="bg-gray-900/50 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">{tip.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md border ${urgencyColors[tip.urgency]}`}>{tip.urgency}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{tip.tip}</p>
                  <button className="flex items-center gap-1 text-xs text-violet-400 mt-2 hover:text-violet-300">
                    Take action <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Activity */}
          <div>
            <h2 className="text-white font-semibold mb-3">Today's Activities</h2>
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 space-y-3">
              {activities_.map(a => {
                const Icon = activityIcons[a.type]
                return (
                  <div
                    key={a.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${a.done ? 'opacity-40' : 'hover:bg-white/5'}`}
                    onClick={() => toggleActivity(a.id)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.done ? 'bg-emerald-500/10' : 'bg-white/5'}`}>
                      {a.done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Icon className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${a.done ? 'line-through text-gray-600' : 'text-white'}`}>{a.label}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-gray-600" />
                        <span className="text-[10px] text-gray-600">{a.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
