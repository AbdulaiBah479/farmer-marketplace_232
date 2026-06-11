'use client'
import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Receipt, CreditCard, ArrowUpRight, ArrowDownRight, Sparkles, MoreHorizontal, Plus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft'

const invoices = [
  { id: 'INV-2061', client: 'Meridian Tech Group', amount: 12400, status: 'Paid' as InvoiceStatus, dueDate: 'Jun 5, 2026', issuedDate: 'May 22, 2026' },
  { id: 'INV-2062', client: 'Apex Ventures', amount: 8700, status: 'Pending' as InvoiceStatus, dueDate: 'Jun 20, 2026', issuedDate: 'Jun 1, 2026' },
  { id: 'INV-2063', client: 'Bright Solutions Inc', amount: 5200, status: 'Overdue' as InvoiceStatus, dueDate: 'Jun 1, 2026', issuedDate: 'May 10, 2026' },
  { id: 'INV-2064', client: 'NexaFlow Systems', amount: 14800, status: 'Pending' as InvoiceStatus, dueDate: 'Jun 28, 2026', issuedDate: 'Jun 8, 2026' },
  { id: 'INV-2065', client: 'Pioneer Digital', amount: 3600, status: 'Paid' as InvoiceStatus, dueDate: 'Jun 10, 2026', issuedDate: 'May 28, 2026' },
  { id: 'INV-2066', client: 'Summit Analytics', amount: 9200, status: 'Draft' as InvoiceStatus, dueDate: 'Jul 5, 2026', issuedDate: 'Jun 11, 2026' },
]

const statusConfig: Record<InvoiceStatus, string> = {
  Paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
  Draft: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const transactions = [
  { id: 1, description: 'Stripe — Meridian Tech Group', amount: +12400, type: 'income', date: 'Jun 5' },
  { id: 2, description: 'AWS Infrastructure', amount: -2340, type: 'expense', date: 'Jun 4' },
  { id: 3, description: 'Stripe — Pioneer Digital', amount: +3600, type: 'income', date: 'Jun 3' },
  { id: 4, description: 'Salary — Engineering Team', amount: -18500, type: 'expense', date: 'Jun 1' },
  { id: 5, description: 'Stripe — Acme Corp', amount: +6800, type: 'income', date: 'May 31' },
  { id: 6, description: 'Google Ads Campaign', amount: -4200, type: 'expense', date: 'May 30' },
  { id: 7, description: 'SaaS Subscriptions (Tools)', amount: -890, type: 'expense', date: 'May 29' },
]

const budgetData = [
  { category: 'Engineering', budget: 22000, actual: 18500, color: '#7c3aed' },
  { category: 'Marketing', budget: 12000, actual: 10400, color: '#4f46e5' },
  { category: 'Sales', budget: 8000, actual: 9200, color: '#f59e0b' },
  { category: 'Infra', budget: 4000, actual: 2340, color: '#10b981' },
  { category: 'Ops', budget: 3000, actual: 2800, color: '#3b82f6' },
]

export default function FinancePage() {
  const [showNewInvoice, setShowNewInvoice] = useState(false)

  const revenue = 138400
  const expenses = 43230
  const profit = revenue - expenses
  const outstanding = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="min-h-screen bg-[#030712] p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-violet-400" />
            Finance Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">P&L tracking, invoicing, and AI financial insights</p>
        </div>
        <button
          onClick={() => setShowNewInvoice(!showNewInvoice)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 shadow-lg shadow-violet-500/20"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </button>
      </div>

      {/* New Invoice Form */}
      {showNewInvoice && (
        <div className="bg-gray-900/50 border border-violet-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-400" />Create Invoice</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Client</label>
              <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500" placeholder="Client name" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Amount ($)</label>
              <input type="number" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500" placeholder="0.00" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Due Date</label>
              <input type="date" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium">
              <Receipt className="w-3.5 h-3.5" />Create & Send
            </button>
            <button onClick={() => setShowNewInvoice(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* P&L Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue (MTD)', value: `$${(revenue / 1000).toFixed(1)}K`, change: '+23%', positive: true, icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Expenses (MTD)', value: `$${(expenses / 1000).toFixed(1)}K`, change: '+8%', positive: false, icon: TrendingDown, color: 'text-red-400' },
          { label: 'Net Profit', value: `$${(profit / 1000).toFixed(1)}K`, change: `${Math.round((profit / revenue) * 100)}% margin`, positive: true, icon: DollarSign, color: 'text-violet-400' },
          { label: 'Outstanding', value: `$${(outstanding / 1000).toFixed(1)}K`, change: `${invoices.filter(i => ['Pending', 'Overdue'].includes(i.status)).length} invoices`, positive: null, icon: CreditCard, color: 'text-amber-400' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.positive === true && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
              {kpi.positive === false && <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />}
              <span className={`text-xs ${kpi.positive === true ? 'text-emerald-400' : kpi.positive === false ? 'text-red-400' : 'text-amber-400'}`}>{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices */}
        <div className="lg:col-span-2">
          <h2 className="text-white font-semibold mb-3">Invoices</h2>
          <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-white/5">
              {['Invoice', 'Client', 'Amount', 'Status', ''].map(h => (
                <span key={h} className="text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</span>
              ))}
            </div>
            <div className="divide-y divide-white/5">
              {invoices.map(inv => (
                <div key={inv.id} className="grid grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/2 transition-all group">
                  <span className="text-xs font-mono text-violet-400">{inv.id}</span>
                  <div>
                    <p className="text-sm text-white">{inv.client}</p>
                    <p className="text-xs text-gray-600">Due {inv.dueDate}</p>
                  </div>
                  <span className="text-sm font-semibold text-white">${inv.amount.toLocaleString()}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-xs font-medium w-fit ${statusConfig[inv.status]}`}>{inv.status}</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-white/5 text-gray-500">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Feed */}
        <div>
          <h2 className="text-white font-semibold mb-3">Recent Transactions</h2>
          <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 space-y-2">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  {tx.type === 'income' ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{tx.description}</p>
                  <p className="text-[10px] text-gray-600">{tx.date}</p>
                </div>
                <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget vs Actual Chart */}
      <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-white font-semibold">Budget vs Actual</h2>
            <p className="text-xs text-gray-500 mt-0.5">Monthly spend by department</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-violet-600" /><span className="text-xs text-gray-400">Budget</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-indigo-400" /><span className="text-xs text-gray-400">Actual</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={budgetData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} formatter={(v: any) => [`$${v.toLocaleString()}`, '']} />
            <Bar dataKey="budget" fill="#7c3aed" radius={[3, 3, 0, 0]} opacity={0.4} name="Budget" />
            <Bar dataKey="actual" radius={[3, 3, 0, 0]} name="Actual">
              {budgetData.map((entry, i) => (
                <Cell key={i} fill={entry.actual > entry.budget ? '#ef4444' : '#4f46e5'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
