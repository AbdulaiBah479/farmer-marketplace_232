'use client'
import { useState } from 'react'
import { Shield, Plus, Sparkles, Brain, MoreHorizontal, Search, CheckCircle2, Clock, DollarSign, FileSignature, X, Download, Eye, AlertTriangle, PenLine } from 'lucide-react'

const contracts = [
  { id: 1, title: 'Enterprise Platform License Agreement', client: 'TechVentures Inc', contact: 'Sarah Miller', value: 45000, status: 'SIGNED', signingStatus: 'ALL_SIGNED', createdAt: 'Oct 1', signedAt: 'Oct 5', expiresAt: 'Oct 1, 2025', parties: 2, signed: 2 },
  { id: 2, title: 'Marketing Automation Services Contract', client: 'Growth Agency Co', contact: 'James Wilson', value: 28000, status: 'PENDING_SIGNATURE', signingStatus: 'AWAITING_CLIENT', createdAt: 'Oct 6', signedAt: null, expiresAt: 'Oct 6, 2025', parties: 2, signed: 1 },
  { id: 3, title: 'Consulting Retainer Agreement', client: 'Consultify Pro', contact: 'Aisha Rahman', value: 92000, status: 'PENDING_SIGNATURE', signingStatus: 'AWAITING_REVIEW', createdAt: 'Oct 8', signedAt: null, expiresAt: 'Oct 8, 2025', parties: 3, signed: 1 },
  { id: 4, title: 'Cloud Infrastructure SLA', client: 'CloudScale Corp', contact: 'Marcus Chen', value: 150000, status: 'DRAFT', signingStatus: 'NOT_SENT', createdAt: 'Oct 9', signedAt: null, expiresAt: 'Oct 9, 2025', parties: 2, signed: 0 },
  { id: 5, title: 'Media Production Services', client: 'DigitalFirst Media', contact: 'Elena Torres', value: 33000, status: 'EXPIRED', signingStatus: 'EXPIRED', createdAt: 'Sep 1', signedAt: null, expiresAt: 'Oct 1', parties: 2, signed: 1 },
  { id: 6, title: 'RevOps Annual License', client: 'RevOps Solutions', contact: 'Tom Bradley', value: 67000, status: 'SIGNED', signingStatus: 'ALL_SIGNED', createdAt: 'Sep 20', signedAt: 'Sep 22', expiresAt: 'Sep 20, 2025', parties: 2, signed: 2 },
  { id: 7, title: 'E-commerce Platform Agreement', client: 'EcomBrand Ltd', contact: 'Priya Sharma', value: 38000, status: 'PENDING_SIGNATURE', signingStatus: 'AWAITING_CLIENT', createdAt: 'Oct 7', signedAt: null, expiresAt: 'Oct 7, 2025', parties: 2, signed: 1 },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  DRAFT: { label: 'Draft', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: <FileSignature className="w-3 h-3" /> },
  PENDING_SIGNATURE: { label: 'Pending Signature', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: <PenLine className="w-3 h-3" /> },
  SIGNED: { label: 'Signed', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: <CheckCircle2 className="w-3 h-3" /> },
  EXPIRED: { label: 'Expired', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: <AlertTriangle className="w-3 h-3" /> },
  CANCELLED: { label: 'Cancelled', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20', icon: <X className="w-3 h-3" /> },
}

const stats = [
  { label: 'Active Contracts', value: '28', change: '+4', icon: Shield, color: 'text-violet-400' },
  { label: 'Signed', value: '19', change: '68% rate', icon: CheckCircle2, color: 'text-emerald-400' },
  { label: 'Pending Signature', value: '7', change: '2 urgent', icon: Clock, color: 'text-amber-400' },
  { label: 'Total Value', value: '$3.2M', change: '+28%', icon: DollarSign, color: 'text-blue-400' },
]

export default function ContractsPage() {
  const [search, setSearch] = useState('')
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [generating, setGenerating] = useState(false)

  const filtered = contracts.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-violet-400" />
            Contracts
          </h1>
          <p className="text-gray-400 text-sm mt-1">Generate, send, and manage contracts with e-signature</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Generate Contract with AI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Plus className="w-4 h-4" />
            Blank Contract
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
                  <h3 className="text-white font-semibold">Generate Contract with AI</h3>
                  <p className="text-xs text-gray-500">AI drafts legally sound contracts in seconds</p>
                </div>
              </div>
              <button onClick={() => setShowGenerateModal(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Contract Type</label>
                <select className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                  <option>Service Agreement</option>
                  <option>Software License</option>
                  <option>Retainer Agreement</option>
                  <option>NDA</option>
                  <option>Master Services Agreement</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Client Name / Company</label>
                <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Acme Corp" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Contract Value ($)</label>
                  <input type="number" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="50000" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Duration (months)</label>
                  <input type="number" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="12" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Key Terms & Conditions</label>
                <textarea className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none" rows={3} placeholder="Describe services, deliverables, payment terms..." />
              </div>
              <button
                onClick={() => { setGenerating(true); setTimeout(() => { setGenerating(false); setShowGenerateModal(false) }, 2000) }}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-violet-500/20"
              >
                {generating ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Drafting Contract...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate Contract</>
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contracts..." className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 focus:outline-none focus:border-violet-500">
            <option value="ALL">All Status</option>
            {Object.keys(statusConfig).map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Signatures</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(c => {
                const sc = statusConfig[c.status]
                return (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-violet-400" />
                        </div>
                        <p className="text-sm font-medium text-white">{c.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-300">{c.client}</p>
                      <p className="text-xs text-gray-500">{c.contact}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-white">${c.value.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${sc.color}`}>
                        {sc.icon}
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: c.parties }).map((_, i) => (
                            <div key={i} className={`w-5 h-5 rounded-full border-2 border-[#0f1117] flex items-center justify-center ${i < c.signed ? 'bg-emerald-500/20' : 'bg-gray-700'} ${i > 0 ? '-ml-1' : ''}`}>
                              {i < c.signed && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{c.signed}/{c.parties}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{c.expiresAt}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
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
    </div>
  )
}
