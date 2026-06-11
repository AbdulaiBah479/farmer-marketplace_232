'use client'
import { useState } from 'react'
import { Mail, Send, Sparkles, Brain, TrendingUp, MousePointer, AlertCircle, Plus, Search, ChevronDown, MoreHorizontal, Check, Clock, Users } from 'lucide-react'

const recentEmails = [
  { id: 1, to: 'sarah@techventures.com', subject: 'Follow-up: Q4 Partnership Proposal', preview: 'Hi Sarah, following up on our conversation about the partnership...', status: 'SENT', time: '2h ago', opened: true },
  { id: 2, to: 'mchen@cloudscale.com', subject: 'CloudScale Demo Recap + Next Steps', preview: 'Marcus, thank you for your time during the demo yesterday...', status: 'OPENED', time: '4h ago', opened: true },
  { id: 3, to: 'team@growthagency.co', subject: 'Custom Growth Strategy for Growth Agency', preview: 'I\'ve put together a tailored strategy based on your goals...', status: 'CLICKED', time: '1d ago', opened: true },
  { id: 4, to: 'aisha@consultify.pro', subject: 'Welcome to Our Platform!', preview: 'Welcome Aisha! We\'re thrilled to have you on board...', status: 'SENT', time: '2d ago', opened: false },
  { id: 5, to: 'elena@digitalfirst.media', subject: 'Media Partnership Opportunity', preview: 'Elena, we have an exciting co-marketing opportunity...', status: 'BOUNCED', time: '3d ago', opened: false },
]

const campaigns = [
  { id: 1, name: 'Q4 Outreach Campaign', status: 'ACTIVE', sent: 1240, opened: 487, clicked: 203, openRate: 39, clickRate: 16, createdAt: 'Oct 1' },
  { id: 2, name: 'Product Launch Announcement', status: 'COMPLETED', sent: 3820, opened: 1720, clicked: 640, openRate: 45, clickRate: 17, createdAt: 'Sep 20' },
  { id: 3, name: 'Re-engagement Sequence', status: 'ACTIVE', sent: 560, opened: 180, clicked: 72, openRate: 32, clickRate: 13, createdAt: 'Oct 5' },
  { id: 4, name: 'Welcome Series', status: 'DRAFT', sent: 0, opened: 0, clicked: 0, openRate: 0, clickRate: 0, createdAt: 'Oct 8' },
]

const templates = [
  { id: 1, name: 'Cold Outreach - SaaS', category: 'Prospecting', uses: 234 },
  { id: 2, name: 'Follow-up After Demo', category: 'Sales', uses: 187 },
  { id: 3, name: 'Partnership Proposal', category: 'Business Dev', uses: 143 },
  { id: 4, name: 'Welcome Email', category: 'Onboarding', uses: 892 },
  { id: 5, name: 'Re-engagement Drip', category: 'Retention', uses: 321 },
  { id: 6, name: 'Product Update', category: 'Marketing', uses: 456 },
]

const stats = [
  { label: 'Emails Sent', value: '12,840', change: '+24%', icon: Send, color: 'text-violet-400' },
  { label: 'Open Rate', value: '38.4%', change: '+3.2%', icon: Mail, color: 'text-blue-400' },
  { label: 'Click Rate', value: '14.7%', change: '+1.8%', icon: MousePointer, color: 'text-emerald-400' },
  { label: 'Bounced', value: '1.2%', change: '-0.3%', icon: AlertCircle, color: 'text-red-400' },
]

const statusMap: Record<string, string> = {
  SENT: 'text-blue-400 bg-blue-500/10',
  OPENED: 'text-emerald-400 bg-emerald-500/10',
  CLICKED: 'text-violet-400 bg-violet-500/10',
  BOUNCED: 'text-red-400 bg-red-500/10',
  ACTIVE: 'text-emerald-400 bg-emerald-500/10',
  COMPLETED: 'text-blue-400 bg-blue-500/10',
  DRAFT: 'text-gray-400 bg-gray-500/10',
}

const tones = ['Professional', 'Friendly', 'Persuasive', 'Urgent', 'Casual']
const purposes = ['Cold Outreach', 'Follow-up', 'Partnership', 'Demo Request', 'Thank You', 'Re-engagement']

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState<'compose' | 'campaigns' | 'templates'>('compose')
  const [tone, setTone] = useState('Professional')
  const [purpose, setPurpose] = useState('Cold Outreach')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [emailContent, setEmailContent] = useState('')

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
      setEmailContent(`Subject: Transforming Your Operations with AI — Let's Talk

Hi [First Name],

I came across [Company] recently and was genuinely impressed by your work in [Industry]. Given your focus on scaling operations efficiently, I thought you'd be interested in how we've helped similar companies reduce operational overhead by 40% using AI automation.

Our platform has specifically helped companies like yours:
• Automate lead generation and qualification
• Streamline proposal and contract management
• Provide real-time business intelligence

I'd love to share a quick 15-minute demo — no sales pressure, just a genuine look at what's possible.

Would Thursday or Friday work for a brief call?

Best,
[Your Name]`)
    }, 1800)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-violet-400" />
            Email Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered email composition, campaigns, and automation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            <Plus className="w-4 h-4" />
            New Campaign
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
            <p className={`text-xs mt-1 ${s.label === 'Bounced' ? 'text-emerald-400' : 'text-emerald-400'}`}>{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1 w-fit">
        {(['compose', 'campaigns', 'templates'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Compose Area */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">AI Email Composer</h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Brain className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs text-violet-400 font-medium">AI Powered</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">To</label>
                <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="recipient@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Purpose</label>
                  <select value={purpose} onChange={e => setPurpose(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                    {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Tone</label>
                  <select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                    {tones.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Additional Context</label>
                <textarea className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none" rows={2} placeholder="Any specific details about the recipient or goal..." />
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-violet-500/20"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Email with AI
                  </>
                )}
              </button>
            </div>

            {generated && emailContent && (
              <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-white">Generated Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 transition-all">Regenerate</button>
                    <button className="px-3 py-1.5 text-xs rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-opacity flex items-center gap-1.5">
                      <Send className="w-3 h-3" />
                      Send
                    </button>
                  </div>
                </div>
                <textarea
                  value={emailContent}
                  onChange={e => setEmailContent(e.target.value)}
                  className="w-full px-5 py-4 text-sm bg-transparent text-gray-300 focus:outline-none resize-none font-mono leading-relaxed"
                  rows={14}
                />
              </div>
            )}
          </div>

          {/* Recent Emails */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Recent Emails</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                  <input className="pl-7 pr-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 placeholder-gray-600 focus:outline-none w-32 focus:border-violet-500 transition-colors" placeholder="Search..." />
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {recentEmails.map(email => (
                  <div key={email.id} className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-xs font-medium text-white truncate max-w-[180px]">{email.subject}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${statusMap[email.status]}`}>{email.status}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-1 truncate">{email.to}</p>
                    <p className="text-[11px] text-gray-600 truncate">{email.preview}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-600">{email.time}</span>
                      {email.opened && <Check className="w-3 h-3 text-emerald-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Click Rate</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {campaigns.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-white">{c.name}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${statusMap[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-sm text-gray-300">{c.sent.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-800 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${c.openRate}%` }} />
                        </div>
                        <span className="text-sm text-gray-300">{c.openRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-800 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-violet-500" style={{ width: `${c.clickRate}%` }} />
                        </div>
                        <span className="text-sm text-gray-300">{c.clickRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{c.createdAt}</td>
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

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.id} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-violet-500/20 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">{t.name}</h4>
                  <span className="text-xs text-gray-500 mt-0.5 block">{t.category}</span>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{t.uses} uses</span>
                <button className="px-3 py-1.5 text-xs rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20 transition-all">
                  Use Template
                </button>
              </div>
            </div>
          ))}
          <div className="bg-gray-900/50 border border-dashed border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[100px]">
            <Plus className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Create Template</span>
          </div>
        </div>
      )}
    </div>
  )
}
