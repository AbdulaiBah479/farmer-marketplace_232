'use client'
import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Receipt, CreditCard, ArrowUpRight, ArrowDownRight, Sparkles, MoreHorizontal, Plus, Brain, X } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 42000, expenses: 28000 },
  { month: 'Feb', revenue: 48000, expenses: 30000 },
  { month: 'Mar', revenue: 55000, expenses: 31000 },
  { month: 'Apr', revenue: 51000, expenses: 29000 },
  { month: 'May', revenue: 63000, expenses: 33000 },
  { month: 'Jun', revenue: 72000, expenses: 35000 },
  { month: 'Jul', revenue: 68000, expenses: 34000 },
  { month: 'Aug', revenue: 79000, expenses: 38000 },
  { month: 'Sep', revenue: 91000, expenses: 40000 },
  { month: 'Oct', revenue: 104000, expenses: 43000 },
]

const invoices = [
  { id: 'INV-001', client: 'TechVentures Inc', amount: 45000, status: 'PAID', dueDate: 'Oct 15', paidDate: 'Oct 13', avatar: 'TV' },
  { id: 'INV-002', client: 'CloudScale Corp', amount: 150000, status: 'PENDING', dueDate: 'Oct 30', paidDate: null, avatar: 'CC' },
  { id: 'INV-003', client: 'Growth Agency Co', amount: 28000, status: 'OVERDUE', dueDate: 'Oct 5', paidDate: null, avatar: 'GA' },
  { id: 'INV-004', client: 'RevOps Solutions', amount: 67000, status: 'PAID', dueDate: 'Sep 30', paidDate: 'Sep 28', avatar: 'RS' },
  { id: 'INV-005', client: 'Consultify Pro', amount: 92000, status: 'PENDING', dueDate: 'Nov 5', paidDate: null, avatar: 'CP' },
  { id: 'INV-006', client: 'EcomBrand Ltd', amount: 38000, status: 'DRAFT', dueDate: 'Nov 15', paidDate: null, avatar: 'EB' },
]

const transactions = [
  { id: 1, description: 'CloudScale Corp — Monthly License', type: 'income', amount: 12500, date: 'Oct 10', category: 'Revenue' },
  { id: 2, description: 'AWS Infrastructure Costs', type: 'expense', amount: -4200, date: 'Oct 9', category: 'Infrastructure' },
  { id: 3, description: 'TechVentures Inc — Enterprise Plan', type: 'income', amount: 45000, date: 'Oct 8', category: 'Revenue' },
  { id: 4, description: 'Anthropic API Credits', type: 'expense', amount: -2800, date: 'Oct 7', category: 'AI Services' },
  { id: 5, description: 'RevOps Solutions — Annual License', type: 'income', amount: 67000, date: 'Oct 6', category: 'Revenue' },
  { id: 6, description: 'Office & Remote Work Tools', type: 'expense', amount: -1200, date: 'Oct 5', category: 'Operations' },
  { id: 7, description: 'Payroll — October', type: 'expense', amount: -38000, date: 'Oct 1', category: 'Payroll' },
  { id: 8, description: 'Growth Agency — Monthly', type: 'income', amount: 9333, date: 'Oct 1', category: 'Revenue' },
]

const plSummary = [
  { label: 'Gross Revenue', value: 104000, type: 'revenue' },
  { label: 'Cost of Goods', value: -18000, type: 'expense' },
  { label: 'Gross Profit', value: 86000, type: 'profit' },
  { label: 'Operating Expenses', value: -25000, type: 'expense' },
  { label: 'Net Profit', value: 61000, type: 'profit' },
]

const invoiceStatusConfig: Record<string, string> = {
  PAID: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  OVERDUE: 'bg-red-500/10 text-red-400 border-red-500/20',
  DRAFT: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const avatarColors = ['bg-violet-500/30 text-violet-300', 'bg-blue-500/30 text-blue-300', 'bg-emerald-500/30 text-emerald-300', 'bg-orange-500/30 text-orange-300', 'bg-pink-500/30 text-pink-300', 'bg-red-500/30 text-red-300']

const stats = [
  { label: 'Monthly Revenue', value: '$104K', change: '+14%', icon: DollarSign, up: true, color: 'text-violet-400' },
  { label: 'Expenses', value: '$43K', change: '+6%', icon: TrendingDown, up: false, color: 'text-red-400' },
  { label: 'Net Profit', value: '$61K', change: '+23%', icon: TrendingUp, up: true, color: 'text-emerald-400' },
  { label: 'Outstanding', value: '$270K', change: '3 invoices', icon: Receipt, up: true, color: 'text-amber-400' },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-2">{label}</p>
        {payload.map(p => (
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

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'transactions' | 'pl'>('invoices')
  const [showNewInvoice, setShowNewInvoice] = useState(false)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-violet-400" />
            Finance Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">Revenue tracking, invoicing, and financial intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            <Sparkles className="w-4 h-4" />
            Generate Invoice with AI
          </button>
          <button onClick={() => setShowNewInvoice(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Plus className="w-4 h-4" />
            New Invoice
          </button>
        </div>
      </div>

      {/* New Invoice Modal */}
      {showNewInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Create Invoice</h3>
                  <p className="text-xs text-gray-500">Generate a professional invoice</p>
                </div>
              </div>
              <button onClick={() => setShowNewInvoice(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Client</label>
                <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500" placeholder="Client name or company" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Amount ($)</label>
                  <input type="number" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500" placeholder="50000" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Due Date</label>
                  <input type="date" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Description</label>
                <textarea className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none" rows={2} placeholder="Services rendered..." />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setShowNewInvoice(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5">Cancel</button>
                <button onClick={() => setShowNewInvoice(false)} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90">
                  Create Invoice
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
            <div className="flex items-center gap-1 mt-1">
              {s.up
                ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                : <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
              }
              <p className={`text-xs font-medium ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change} this month</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">Revenue vs Expenses</h3>
            <p className="text-xs text-gray-500 mt-0.5">10-month financial overview</p>
          </div>
          <div className="flex items-center gap-4">
            {[{ label: 'Revenue', color: '#8b5cf6' }, { label: 'Expenses', color: '#ef4444' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-xs text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="finRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="finExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#finRevenue)" />
            <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#finExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1 w-fit">
        {(['invoices', 'transactions', 'pl'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab === 'pl' ? 'P&L Summary' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Invoices */}
      {activeTab === 'invoices' && (
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv, i) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-4">
                      <span className="text-sm font-mono text-violet-400">{inv.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold`}>{inv.avatar}</div>
                        <span className="text-sm text-white">{inv.client}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-white">${inv.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-medium ${invoiceStatusConfig[inv.status]}`}>{inv.status}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-400">{inv.dueDate}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{inv.paidDate || '—'}</td>
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

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/5">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  {tx.type === 'income'
                    ? <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    : <ArrowDownRight className="w-4 h-4 text-red-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {tx.type === 'income' ? '+' : ''}{tx.amount < 0 ? `-$${Math.abs(tx.amount).toLocaleString()}` : `$${tx.amount.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* P&L Summary */}
      {activeTab === 'pl' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5">Profit & Loss — October 2024</h3>
            <div className="space-y-3">
              {plSummary.map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-3 ${i < plSummary.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <span className={`text-sm ${item.type === 'profit' ? 'font-semibold text-white' : 'text-gray-400'}`}>{item.label}</span>
                  <span className={`text-sm font-bold tabular-nums ${item.type === 'profit' ? 'text-emerald-400' : item.value < 0 ? 'text-red-400' : 'text-white'}`}>
                    {item.value < 0 ? `-$${Math.abs(item.value).toLocaleString()}` : `$${item.value.toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Profit Margin</span>
                <span className="text-lg font-bold text-emerald-400">58.7%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Financial Insights</h3>
                <p className="text-xs text-gray-500">October 2024 analysis</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { text: 'Revenue grew 14.3% MoM, driven by 3 new enterprise contracts totaling $245K.', type: 'positive' },
                { text: 'AI API costs increased 32% — consider caching strategies or tiered AI usage to optimize margins.', type: 'warning' },
                { text: '$270K in outstanding invoices could be collected within 30 days — chase Growth Agency overdue invoice immediately.', type: 'action' },
                { text: 'At current growth rate, you will cross $1M MRR by March 2025. Consider scaling hiring now.', type: 'forecast' },
              ].map((insight, i) => (
                <div key={i} className={`p-3 rounded-xl border-l-4 ${insight.type === 'positive' ? 'border-emerald-500 bg-emerald-500/5' : insight.type === 'warning' ? 'border-amber-500 bg-amber-500/5' : insight.type === 'action' ? 'border-red-500 bg-red-500/5' : 'border-blue-500 bg-blue-500/5'}`}>
                  <p className="text-sm text-gray-300 leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
