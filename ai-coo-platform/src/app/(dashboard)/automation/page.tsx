'use client'
import { useState } from 'react'
import { Zap, Plus, Sparkles, Brain, MoreHorizontal, Play, Pause, Clock, CheckCircle2, X, ChevronRight } from 'lucide-react'

type AutoStatus = 'ACTIVE' | 'PAUSED' | 'ERROR'

const automations = [
  { id: 1, name: 'New Lead Auto-Qualifier', description: 'Score and qualify incoming leads using AI, then assign to reps', trigger: 'New Lead Created', actions: 4, lastRun: '2 min ago', runsTotal: 2847, runsToday: 23, status: 'ACTIVE' as AutoStatus, category: 'Sales', timeSaved: 12 },
  { id: 2, name: 'Proposal Follow-up Sequence', description: 'Send personalized follow-ups 3, 7, and 14 days after proposal sent', trigger: 'Proposal Sent', actions: 3, lastRun: '1 hour ago', runsTotal: 487, runsToday: 6, status: 'ACTIVE' as AutoStatus, category: 'Sales', timeSaved: 8 },
  { id: 3, name: 'Support Ticket Auto-Response', description: 'AI generates and sends initial response to new support tickets', trigger: 'New Support Ticket', actions: 2, lastRun: '5 min ago', runsTotal: 1923, runsToday: 47, status: 'ACTIVE' as AutoStatus, category: 'Support', timeSaved: 15 },
  { id: 4, name: 'Weekly Performance Report', description: 'Compile KPIs from all modules and email to leadership team', trigger: 'Every Monday 8 AM', actions: 6, lastRun: '5 days ago', runsTotal: 48, runsToday: 0, status: 'ACTIVE' as AutoStatus, category: 'Reporting', timeSaved: 4 },
  { id: 5, name: 'Contract Expiry Reminder', description: 'Send reminders 7 days before contract expiration', trigger: 'Contract expires in 7 days', actions: 2, lastRun: '1 day ago', runsTotal: 126, runsToday: 3, status: 'PAUSED' as AutoStatus, category: 'Contracts', timeSaved: 3 },
  { id: 6, name: 'Social Media Scheduler', description: 'Post AI-generated content to all platforms at optimal times', trigger: 'Daily 9 AM', actions: 5, lastRun: '3 hours ago', runsTotal: 342, runsToday: 8, status: 'ACTIVE' as AutoStatus, category: 'Marketing', timeSaved: 10 },
  { id: 7, name: 'CRM Deal Stagnation Alert', description: 'Alert sales rep when a deal has had no activity for 5+ days', trigger: 'Deal inactive 5 days', actions: 2, lastRun: '4 hours ago', runsTotal: 218, runsToday: 4, status: 'ERROR' as AutoStatus, category: 'CRM', timeSaved: 5 },
  { id: 8, name: 'New Customer Onboarding', description: 'Send welcome sequence and schedule onboarding call automatically', trigger: 'Deal Marked Won', actions: 8, lastRun: '2 hours ago', runsTotal: 94, runsToday: 2, status: 'ACTIVE' as AutoStatus, category: 'Onboarding', timeSaved: 20 },
]

const templates = [
  { id: 1, name: 'Lead Nurture Campaign', description: 'Automated email sequence for new leads over 14 days', trigger: 'New Lead', category: 'Sales', steps: 5 },
  { id: 2, name: 'Churn Prevention', description: 'Detect at-risk customers and trigger retention outreach', trigger: 'Low engagement', category: 'Retention', steps: 4 },
  { id: 3, name: 'Invoice Auto-Send', description: 'Generate and send invoices when contracts are signed', trigger: 'Contract Signed', category: 'Finance', steps: 3 },
  { id: 4, name: 'Social Content Pipeline', description: 'AI generates and schedules weekly social content', trigger: 'Every Sunday', category: 'Marketing', steps: 6 },
  { id: 5, name: 'Deal Win Celebration', description: 'Notify team and update CRM when deal closes', trigger: 'Deal Won', category: 'CRM', steps: 4 },
  { id: 6, name: 'Monthly AI Report', description: 'Compile and distribute monthly business performance report', trigger: '1st of month', category: 'Reporting', steps: 7 },
]

const statusConfig: Record<AutoStatus, { label: string; color: string; dot: string }> = {
  ACTIVE: { label: 'Active', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400 animate-pulse' },
  PAUSED: { label: 'Paused', color: 'text-gray-400 bg-gray-500/10 border-gray-500/20', dot: 'bg-gray-500' },
  ERROR: { label: 'Error', color: 'text-red-400 bg-red-500/10 border-red-500/20', dot: 'bg-red-400 animate-pulse' },
}

const stats = [
  { label: 'Active Automations', value: '6', change: '+2', icon: Zap, color: 'text-violet-400' },
  { label: 'Runs Today', value: '93', change: '+12', icon: Play, color: 'text-blue-400' },
  { label: 'Hours Saved / Week', value: '47h', change: '+8h', icon: Clock, color: 'text-emerald-400' },
  { label: 'Success Rate', value: '98.7%', change: '+0.5%', icon: CheckCircle2, color: 'text-orange-400' },
]

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState<'automations' | 'templates'>('automations')
  const [statuses, setStatuses] = useState<Record<number, AutoStatus>>(
    Object.fromEntries(automations.map(a => [a.id, a.status]))
  )
  const [showCreateModal, setShowCreateModal] = useState(false)

  const toggleStatus = (id: number) => {
    setStatuses(prev => ({
      ...prev,
      [id]: prev[id] === 'ACTIVE' ? 'PAUSED' : 'ACTIVE',
    }))
  }

  return (
    <div className="min-h-screen bg-[#030712] p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-violet-400" />
            Workflow Automation
          </h1>
          <p className="text-gray-400 text-sm mt-1">Automate repetitive tasks with AI-powered workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Create Automation
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Plus className="w-4 h-4" />
            From Template
          </button>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Create Automation</h3>
                  <p className="text-xs text-gray-500">Define trigger and action workflow</p>
                </div>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Automation Name</label>
                <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. New Lead Follow-up" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Trigger</label>
                <select className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                  <option>New Lead Created</option>
                  <option>Deal Stage Changed</option>
                  <option>Proposal Sent</option>
                  <option>Contract Signed</option>
                  <option>New Support Ticket</option>
                  <option>Scheduled Time</option>
                  <option>Form Submitted</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Description</label>
                <textarea className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none" rows={2} placeholder="What should this automation do?" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Category</label>
                <select className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Support</option>
                  <option>Finance</option>
                  <option>Reporting</option>
                  <option>CRM</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={() => setShowCreateModal(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Sparkles className="w-4 h-4" />
                  Create with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-emerald-400 mt-1">{s.change} this week</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1 w-fit">
        {(['automations', 'templates'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab === 'automations' ? 'My Automations' : 'Templates'}
          </button>
        ))}
      </div>

      {/* Automations List */}
      {activeTab === 'automations' && (
        <div className="space-y-3">
          {automations.map(automation => {
            const status = statuses[automation.id]
            const sc = statusConfig[status]
            return (
              <div key={automation.id} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${status === 'ACTIVE' ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-gray-800 border border-white/5'}`}>
                    <Zap className={`w-5 h-5 ${status === 'ACTIVE' ? 'text-violet-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold text-white">{automation.name}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-medium ${sc.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                      <span className="text-[10px] text-gray-600">{automation.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{automation.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <ChevronRight className="w-3 h-3 text-violet-500" />
                        <span>Trigger: <span className="text-gray-400">{automation.trigger}</span></span>
                      </div>
                      <span className="text-xs text-gray-600">{automation.actions} actions</span>
                      <span className="text-xs text-gray-600">Last run: {automation.lastRun}</span>
                      <span className="text-xs text-gray-600">{automation.runsTotal.toLocaleString()} total runs</span>
                      <span className="text-xs text-emerald-600">{automation.timeSaved}h saved/week</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right mr-2">
                      <p className="text-sm font-bold text-white">{automation.runsToday}</p>
                      <p className="text-[10px] text-gray-600">runs today</p>
                    </div>
                    <button
                      onClick={() => toggleStatus(automation.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${status === 'ACTIVE'
                        ? 'border-amber-500/20 text-amber-400 hover:bg-amber-500/10'
                        : 'border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10'}`}
                    >
                      {status === 'ACTIVE' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      {status === 'ACTIVE' ? 'Pause' : 'Activate'}
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Templates */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.id} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-violet-500/20 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-[10px] text-gray-600">{t.steps} steps</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">{t.name}</h4>
              <p className="text-xs text-gray-500 mb-3">{t.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-600">Trigger: {t.trigger}</span>
                <button className="px-3 py-1.5 text-xs rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20 transition-all">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
