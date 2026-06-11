'use client'
import { useState } from 'react'
import { Headphones, Plus, Sparkles, Brain, MoreHorizontal, Search, CheckCircle2, Clock, AlertTriangle, MessageSquare, Zap, TrendingUp, X, ChevronDown, Star } from 'lucide-react'

const tickets = [
  { id: 1, subject: 'Cannot connect to API — getting 401 error', customer: 'Sarah Miller', company: 'TechVentures Inc', priority: 'HIGH', status: 'OPEN', category: 'Technical', assignee: 'AI Agent', createdAt: '10 min ago', messages: 3 },
  { id: 2, subject: 'How do I set up the CRM integration?', customer: 'James Wilson', company: 'Growth Agency', priority: 'LOW', status: 'IN_PROGRESS', category: 'How-to', assignee: 'Alex Chen', createdAt: '1 hour ago', messages: 7 },
  { id: 3, subject: 'Billing discrepancy on October invoice', customer: 'Aisha Rahman', company: 'Consultify Pro', priority: 'MEDIUM', status: 'OPEN', category: 'Billing', assignee: 'Unassigned', createdAt: '2 hours ago', messages: 1 },
  { id: 4, subject: 'Email campaigns not sending — urgent!', customer: 'Marcus Chen', company: 'CloudScale Corp', priority: 'URGENT', status: 'OPEN', category: 'Bug', assignee: 'AI Agent', createdAt: '30 min ago', messages: 5 },
  { id: 5, subject: 'Request to upgrade to Enterprise plan', customer: 'Elena Torres', company: 'DigitalFirst Media', priority: 'MEDIUM', status: 'RESOLVED', category: 'Sales', assignee: 'Alex Chen', createdAt: '3 hours ago', messages: 12 },
  { id: 6, subject: 'Feature request: Bulk lead import', customer: 'David Park', company: 'Startup Nexus', priority: 'LOW', status: 'RESOLVED', category: 'Feature', assignee: 'AI Agent', createdAt: '1 day ago', messages: 4 },
  { id: 7, subject: 'Platform running slow during peak hours', customer: 'Priya Sharma', company: 'EcomBrand Ltd', priority: 'HIGH', status: 'IN_PROGRESS', category: 'Performance', assignee: 'Jordan Lee', createdAt: '4 hours ago', messages: 8 },
  { id: 8, subject: 'Need help with proposal templates', customer: 'Tom Bradley', company: 'RevOps Solutions', priority: 'LOW', status: 'RESOLVED', category: 'How-to', assignee: 'AI Agent', createdAt: '2 days ago', messages: 6 },
]

const priorityConfig: Record<string, string> = {
  LOW: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  MEDIUM: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  URGENT: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const statusConfig: Record<string, string> = {
  OPEN: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  RESOLVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  CLOSED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const stats = [
  { label: 'Open Tickets', value: '23', change: '-3', icon: AlertTriangle, color: 'text-amber-400' },
  { label: 'Resolved Today', value: '18', change: '+5', icon: CheckCircle2, color: 'text-emerald-400' },
  { label: 'Avg Response', value: '4.2 min', change: '-1.8 min', icon: Clock, color: 'text-blue-400' },
  { label: 'CSAT Score', value: '4.8/5', change: '+0.2', icon: Star, color: 'text-yellow-400' },
]

export default function SupportPage() {
  const [search, setSearch] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null)
  const [aiAutoReply, setAiAutoReply] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [reply, setReply] = useState('')

  const filtered = tickets.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase())
    const matchPriority = priorityFilter === 'ALL' || t.priority === priorityFilter
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter
    return matchSearch && matchPriority && matchStatus
  })

  const aiSuggestedReply = selectedTicket
    ? `Hi ${selectedTicket.customer.split(' ')[0]},\n\nThank you for reaching out. I can see the issue you're experiencing with ${selectedTicket.subject.toLowerCase()}. Let me help you resolve this right away.\n\n[AI is analyzing your account...]\n\nBased on your account configuration, the issue appears to be related to your API authentication settings. Here's what you need to do:\n\n1. Navigate to Settings > API Keys\n2. Regenerate your API key\n3. Update the key in your integration settings\n\nThis should resolve the issue immediately. Please let me know if you need any further assistance!\n\nBest regards,\nSupport Team`
    : ''

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Headphones className="w-6 h-6 text-violet-400" />
            Support Agent
          </h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered customer support with automatic ticket resolution</p>
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() => setAiAutoReply(!aiAutoReply)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium cursor-pointer transition-all ${aiAutoReply ? 'bg-violet-600 border-violet-600 text-white' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <Zap className="w-4 h-4" />
            AI Auto-Respond: {aiAutoReply ? 'ON' : 'OFF'}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </div>

      {aiAutoReply && (
        <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-violet-300">AI Auto-Respond is Active</p>
            <p className="text-xs text-gray-500">AI is automatically responding to LOW and MEDIUM priority tickets within 30 seconds</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Live</span>
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
            <p className="text-xs text-emerald-400 mt-1">{s.change} today</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-3 bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..." className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
            <div className="flex items-center gap-2">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="flex-1 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-violet-500">
                <option value="ALL">All Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="flex-1 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-violet-500">
                <option value="ALL">All Priority</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-white/5 max-h-[520px] overflow-y-auto">
            {filtered.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 hover:bg-white/[0.03] transition-colors cursor-pointer ${selectedTicket?.id === ticket.id ? 'bg-violet-500/5 border-l-2 border-violet-500' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium ${priorityConfig[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium ${statusConfig[ticket.status]}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-gray-600">{ticket.category}</span>
                    </div>
                    <p className="text-sm font-medium text-white line-clamp-1">{ticket.subject}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-gray-500">{ticket.customer}</span>
                      <span className="text-[11px] text-gray-600">{ticket.company}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-600">{ticket.createdAt}</span>
                      <div className="flex items-center gap-1.5">
                        {ticket.assignee === 'AI Agent' && (
                          <span className="flex items-center gap-0.5 text-[10px] text-violet-400">
                            <Zap className="w-2.5 h-2.5" /> AI
                          </span>
                        )}
                        <span className="flex items-center gap-0.5 text-[11px] text-gray-600">
                          <MessageSquare className="w-3 h-3" /> {ticket.messages}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Detail */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white flex-1 mr-2">{selectedTicket.subject}</h3>
                  <button onClick={() => setSelectedTicket(null)} className="text-gray-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium ${priorityConfig[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium ${statusConfig[selectedTicket.status]}`}>{selectedTicket.status.replace('_', ' ')}</span>
                  <span className="text-[11px] text-gray-500">· {selectedTicket.customer}</span>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">{selectedTicket.customer} · {selectedTicket.createdAt}</p>
                  <p className="text-sm text-gray-300">I'm experiencing issues with {selectedTicket.subject.toLowerCase()}. This is blocking our workflow and we need it resolved urgently.</p>
                </div>
              </div>
              <div className="p-4 border-t border-white/5">
                <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-xs font-medium text-violet-300">AI Suggested Reply</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-3">{aiSuggestedReply.substring(0, 150)}...</p>
                  <button
                    onClick={() => setReply(aiSuggestedReply)}
                    className="mt-2 text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  >
                    Use this reply
                  </button>
                </div>
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none mb-2"
                />
                <button className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Send Reply
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 h-full min-h-[300px]">
              <MessageSquare className="w-10 h-10 text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm">Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
