'use client'
import { useState } from 'react'
import { FileText, Plus, Sparkles, Brain, MoreHorizontal, Search, Filter, CheckCircle2, Clock, DollarSign, TrendingUp, Eye, Send, Download, X, ChevronDown } from 'lucide-react'

const proposals = [
  { id: 1, title: 'Enterprise AI Operations Suite', client: 'TechVentures Inc', contact: 'Sarah Miller', value: 45000, status: 'ACCEPTED', createdAt: 'Oct 1', sentAt: 'Oct 3', viewedAt: 'Oct 4', validUntil: 'Nov 1' },
  { id: 2, title: 'Growth Marketing Automation Package', client: 'Growth Agency Co', contact: 'James Wilson', value: 28000, status: 'VIEWED', createdAt: 'Oct 5', sentAt: 'Oct 6', viewedAt: 'Oct 7', validUntil: 'Nov 5' },
  { id: 3, title: 'Consulting Operations Platform', client: 'Consultify Pro', contact: 'Aisha Rahman', value: 92000, status: 'SENT', createdAt: 'Oct 7', sentAt: 'Oct 8', viewedAt: null, validUntil: 'Nov 7' },
  { id: 4, title: 'Cloud Infrastructure Management', client: 'CloudScale Corp', contact: 'Marcus Chen', value: 150000, status: 'DRAFT', createdAt: 'Oct 8', sentAt: null, viewedAt: null, validUntil: 'Nov 8' },
  { id: 5, title: 'Media Content Automation Bundle', client: 'DigitalFirst Media', contact: 'Elena Torres', value: 33000, status: 'REJECTED', createdAt: 'Sep 25', sentAt: 'Sep 26', viewedAt: 'Sep 27', validUntil: 'Oct 25' },
  { id: 6, title: 'RevOps Complete Solution', client: 'RevOps Solutions', contact: 'Tom Bradley', value: 67000, status: 'ACCEPTED', createdAt: 'Sep 20', sentAt: 'Sep 21', viewedAt: 'Sep 22', validUntil: 'Oct 20' },
  { id: 7, title: 'E-commerce Growth Package', client: 'EcomBrand Ltd', contact: 'Priya Sharma', value: 38000, status: 'VIEWED', createdAt: 'Oct 6', sentAt: 'Oct 7', viewedAt: 'Oct 8', validUntil: 'Nov 6' },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  DRAFT: { label: 'Draft', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: <FileText className="w-3 h-3" /> },
  SENT: { label: 'Sent', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: <Send className="w-3 h-3" /> },
  VIEWED: { label: 'Viewed', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: <Eye className="w-3 h-3" /> },
  ACCEPTED: { label: 'Accepted', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: <CheckCircle2 className="w-3 h-3" /> },
  REJECTED: { label: 'Rejected', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: <X className="w-3 h-3" /> },
}

const stats = [
  { label: 'Total Proposals', value: '47', change: '+12', icon: FileText, color: 'text-violet-400' },
  { label: 'Accepted', value: '23', change: '49% rate', icon: CheckCircle2, color: 'text-emerald-400' },
  { label: 'Pending Review', value: '11', change: '3 viewed', icon: Clock, color: 'text-amber-400' },
  { label: 'Total Value', value: '$1.8M', change: '+31%', icon: DollarSign, color: 'text-blue-400' },
]

export default function ProposalsPage() {
  const [search, setSearch] = useState('')
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [generating, setGenerating] = useState(false)

  const filtered = proposals.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalValue = filtered.reduce((sum, p) => sum + p.value, 0)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setShowGenerateModal(false)
    }, 2000)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-violet-400" />
            Proposals
          </h1>
          <p className="text-gray-400 text-sm mt-1">Create, send, and track business proposals with AI</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Generate Proposal with AI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Plus className="w-4 h-4" />
            Blank Proposal
          </button>
        </div>
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Generate Proposal with AI</h3>
                  <p className="text-xs text-gray-500">AI will create a tailored proposal in seconds</p>
                </div>
              </div>
              <button onClick={() => setShowGenerateModal(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Client Name / Company</label>
                <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Services / Solution</label>
                <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. AI Operations Platform" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Proposal Value ($)</label>
                  <input type="number" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="50000" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Valid For (days)</label>
                  <input type="number" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="30" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Key Requirements</label>
                <textarea className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none" rows={3} placeholder="Describe what the client needs..." />
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-violet-500/20"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Proposal...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Proposal
                  </>
                )}
              </button>
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
            <p className="text-xs text-emerald-400 mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search proposals..." className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 focus:outline-none focus:border-violet-500">
            <option value="ALL">All Status</option>
            {Object.keys(statusConfig).map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
          </select>
          <div className="ml-auto text-xs text-gray-500">
            Total: <span className="text-white font-semibold">${(totalValue / 1000).toFixed(0)}K</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => {
                const sc = statusConfig[p.status]
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-violet-400" />
                        </div>
                        <p className="text-sm font-medium text-white">{p.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-300">{p.client}</p>
                      <p className="text-xs text-gray-500">{p.contact}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-white">${p.value.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${sc.color}`}>
                        {sc.icon}
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{p.createdAt}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{p.validUntil}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all" title="More">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-white font-medium mb-1">AI Proposal Insight</h3>
          <p className="text-gray-400 text-sm">Your proposal acceptance rate is 49% — above the industry average of 32%. Proposals sent within 24 hours of a meeting have a 3x higher acceptance rate. Growth Agency Co has viewed your proposal 3 times — this is a strong buying signal.</p>
          <button className="mt-2 text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors">
            <TrendingUp className="w-3.5 h-3.5" />
            View full analysis
          </button>
        </div>
      </div>
    </div>
  )
}
