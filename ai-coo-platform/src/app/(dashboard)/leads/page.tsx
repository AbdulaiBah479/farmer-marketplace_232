'use client'
import { useState } from 'react'
import { Target, Plus, Search, Filter, TrendingUp, Users, CheckCircle2, DollarSign, Brain, Sparkles, MoreHorizontal, Mail, Globe, ChevronDown, X } from 'lucide-react'

const leads = [
  { id: 1, name: 'Sarah Miller', company: 'TechVentures Inc', email: 'sarah@techventures.com', phone: '+1 555-0101', title: 'VP of Operations', source: 'LinkedIn', status: 'QUALIFIED', score: 87, website: 'techventures.com', industry: 'SaaS', createdAt: '2 hours ago' },
  { id: 2, name: 'James Wilson', company: 'Growth Agency Co', email: 'jwilson@growthagency.co', phone: '+1 555-0102', title: 'CEO', source: 'Website', status: 'NEW', score: 72, website: 'growthagency.co', industry: 'Marketing', createdAt: '3 hours ago' },
  { id: 3, name: 'Aisha Rahman', company: 'Consultify Pro', email: 'aisha@consultify.pro', phone: '+1 555-0103', title: 'Founder', source: 'Referral', status: 'CONTACTED', score: 91, website: 'consultify.pro', industry: 'Consulting', createdAt: '5 hours ago' },
  { id: 4, name: 'Marcus Chen', company: 'CloudScale Corp', email: 'mchen@cloudscale.com', phone: '+1 555-0104', title: 'CTO', source: 'Cold Outreach', status: 'PROPOSAL_SENT', score: 78, website: 'cloudscale.com', industry: 'Cloud', createdAt: '1 day ago' },
  { id: 5, name: 'Elena Torres', company: 'DigitalFirst Media', email: 'elena@digitalfirst.media', phone: '+1 555-0105', title: 'Marketing Dir', source: 'Social Media', status: 'NEGOTIATING', score: 85, website: 'digitalfirst.media', industry: 'Media', createdAt: '1 day ago' },
  { id: 6, name: 'David Park', company: 'Startup Nexus', email: 'david@startupnexus.io', phone: '+1 555-0106', title: 'COO', source: 'LinkedIn', status: 'NEW', score: 45, website: 'startupnexus.io', industry: 'Venture', createdAt: '2 days ago' },
  { id: 7, name: 'Priya Sharma', company: 'EcomBrand Ltd', email: 'priya@ecombrand.ltd', phone: '+1 555-0107', title: 'CMO', source: 'Email Campaign', status: 'QUALIFIED', score: 69, website: 'ecombrand.ltd', industry: 'E-commerce', createdAt: '2 days ago' },
  { id: 8, name: 'Tom Bradley', company: 'RevOps Solutions', email: 'tom@revops.solutions', phone: '+1 555-0108', title: 'Sales Dir', source: 'Website', status: 'CLOSED_WON', score: 95, website: 'revops.solutions', industry: 'RevOps', createdAt: '3 days ago' },
]

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CONTACTED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  QUALIFIED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  PROPOSAL_SENT: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  NEGOTIATING: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  CLOSED_WON: 'bg-green-500/10 text-green-400 border-green-500/20',
  CLOSED_LOST: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const stats = [
  { label: 'Total Leads', value: '1,284', change: '+41%', icon: Target, color: 'text-violet-400' },
  { label: 'Qualified', value: '387', change: '+28%', icon: CheckCircle2, color: 'text-emerald-400' },
  { label: 'Converted', value: '94', change: '+15%', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Pipeline Value', value: '$1.2M', change: '+33%', icon: DollarSign, color: 'text-orange-400' },
]

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-violet-400" />
            AI Lead Generator
          </h1>
          <p className="text-gray-400 text-sm mt-1">Find, qualify, and manage leads with AI automation</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAIPanel(!showAIPanel)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Generate Leads with AI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* AI Panel */}
      {showAIPanel && (
        <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-semibold">AI Lead Generation</h3>
                <button onClick={() => setShowAIPanel(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-4">Describe your ideal customer and AI will find matching leads automatically.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {['Industry', 'Company Size', 'Job Title'].map(field => (
                  <div key={field}>
                    <label className="text-xs text-gray-500 mb-1 block">{field}</label>
                    <input className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder={`Enter ${field.toLowerCase()}...`} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
                  <Sparkles className="w-4 h-4" />
                  Generate 50 Leads Now
                </button>
                <span className="text-xs text-gray-500">Uses ~50 AI credits</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-emerald-400 mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
            >
              <option value="ALL">All Status</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="NEGOTIATING">Negotiating</option>
              <option value="CLOSED_WON">Closed Won</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 text-sm transition-all">
              <Filter className="w-4 h-4" />
              More Filters
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">{filtered.length} leads</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">AI Score</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300 flex-shrink-0">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.title} · {lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate max-w-[160px]">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Globe className="w-3 h-3 flex-shrink-0" />
                        {lead.industry}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${lead.score >= 75 ? 'bg-emerald-500' : lead.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold tabular-nums ${lead.score >= 75 ? 'text-emerald-400' : lead.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {lead.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-medium ${statusColors[lead.status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                      {lead.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">{lead.source}</td>
                  <td className="px-4 py-4 text-xs text-gray-500">{lead.createdAt}</td>
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
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No leads found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
