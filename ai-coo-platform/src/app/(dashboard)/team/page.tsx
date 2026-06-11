'use client'
import { useState } from 'react'
import { Users, Hash, Send, Plus, Search, Settings, Phone, Video, MoreHorizontal, Circle, Smile } from 'lucide-react'

const channels = [
  { id: 'general', name: 'general', unread: 3 },
  { id: 'product', name: 'product', unread: 0 },
  { id: 'marketing', name: 'marketing', unread: 7 },
  { id: 'engineering', name: 'engineering', unread: 1 },
  { id: 'design', name: 'design', unread: 0 },
  { id: 'sales', name: 'sales', unread: 2 },
]

const members = [
  { id: 1, name: 'Alex Rivera', role: 'CEO', avatar: 'AR', color: 'bg-violet-500', status: 'online' },
  { id: 2, name: 'Sarah Kim', role: 'Head of Product', avatar: 'SK', color: 'bg-indigo-500', status: 'online' },
  { id: 3, name: 'Marcus Lee', role: 'Lead Engineer', avatar: 'ML', color: 'bg-blue-500', status: 'busy' },
  { id: 4, name: 'Priya Sharma', role: 'AI Specialist', avatar: 'PS', color: 'bg-emerald-500', status: 'online' },
  { id: 5, name: 'Tom Walsh', role: 'Sales Director', avatar: 'TW', color: 'bg-amber-500', status: 'away' },
  { id: 6, name: 'Nina Brooks', role: 'Designer', avatar: 'NB', color: 'bg-pink-500', status: 'offline' },
  { id: 7, name: 'James Chen', role: 'Marketing Lead', avatar: 'JC', color: 'bg-teal-500', status: 'online' },
]

const messagesByChannel: Record<string, Array<{ id: number; author: string; avatar: string; color: string; time: string; content: string; reactions?: string[] }>> = {
  general: [
    { id: 1, author: 'Alex Rivera', avatar: 'AR', color: 'bg-violet-500', time: '9:02 AM', content: 'Good morning team! Quick reminder we have the product review at 2 PM today. Please come prepared with your weekly updates.' },
    { id: 2, author: 'Sarah Kim', avatar: 'SK', color: 'bg-indigo-500', time: '9:15 AM', content: 'On it! The new AI proposal module is ready for demo — it reduced drafting time by 73% in testing. Really excited to show everyone.', reactions: ['🚀', '🔥'] },
    { id: 3, author: 'Marcus Lee', avatar: 'ML', color: 'bg-blue-500', time: '9:28 AM', content: 'Engineering shipped the automation engine v2 this morning. Response times are down 40%. Let me know if anyone sees issues.', reactions: ['👏'] },
    { id: 4, author: 'Priya Sharma', avatar: 'PS', color: 'bg-emerald-500', time: '10:04 AM', content: 'The AI model fine-tuning is complete. Our proposal scoring accuracy is now 94.2%. Dropping the full report in #product.' },
    { id: 5, author: 'Tom Walsh', avatar: 'TW', color: 'bg-amber-500', time: '10:30 AM', content: 'Just closed the Meridian deal! 🎉 Biggest contract this quarter. AI COO\'s contract module made the whole process seamless.', reactions: ['🎉', '💪', '🔥'] },
    { id: 6, author: 'Nina Brooks', avatar: 'NB', color: 'bg-pink-500', time: '11:00 AM', content: 'New dashboard designs are live in Figma. The dark mode updates look incredible — would love feedback before we handoff.' },
    { id: 7, author: 'James Chen', avatar: 'JC', color: 'bg-teal-500', time: '11:42 AM', content: 'Campaign performance update: CTR is up 34% since we switched to AI-generated ad copy. ROI is looking great this month.' },
  ],
  product: [
    { id: 1, author: 'Sarah Kim', avatar: 'SK', color: 'bg-indigo-500', time: '8:00 AM', content: 'Roadmap review: Q1 priorities are finalized. AI workflow builder is our top initiative.' },
    { id: 2, author: 'Priya Sharma', avatar: 'PS', color: 'bg-emerald-500', time: '8:45 AM', content: 'Attaching the AI model benchmarks. TL;DR — we beat every competitor on proposal quality scores.' },
  ],
  marketing: [
    { id: 1, author: 'James Chen', avatar: 'JC', color: 'bg-teal-500', time: '9:00 AM', content: 'LinkedIn campaign is live. Targeting C-suite at 500+ employee companies. Expecting strong leads this week.' },
    { id: 2, author: 'Alex Rivera', avatar: 'AR', color: 'bg-violet-500', time: '9:30 AM', content: 'Love the creative direction. The "AI as COO" messaging is really landing.' },
  ],
  engineering: [
    { id: 1, author: 'Marcus Lee', avatar: 'ML', color: 'bg-blue-500', time: '8:30 AM', content: 'Deploying hotfix for the webhook timeout issue. Should be resolved within the hour.' },
  ],
  design: [
    { id: 1, author: 'Nina Brooks', avatar: 'NB', color: 'bg-pink-500', time: '10:00 AM', content: 'Component library v3 is merged. 47 new components, all dark-mode ready.' },
  ],
  sales: [
    { id: 1, author: 'Tom Walsh', avatar: 'TW', color: 'bg-amber-500', time: '9:45 AM', content: 'Pipeline update: 8 deals in final stage. AI COO has been a game-changer in demos — prospects are always impressed.' },
  ],
}

const statusColors: Record<string, string> = {
  online: 'bg-emerald-400',
  busy: 'bg-red-400',
  away: 'bg-amber-400',
  offline: 'bg-gray-600',
}

export default function TeamPage() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(messagesByChannel)

  const currentMessages = messages[activeChannel] || []

  const sendMessage = () => {
    if (!message.trim()) return
    const newMsg = {
      id: Date.now(),
      author: 'You',
      avatar: 'ME',
      color: 'bg-violet-600',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      content: message,
    }
    setMessages(prev => ({ ...prev, [activeChannel]: [...(prev[activeChannel] || []), newMsg] }))
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-[#030712] flex" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Sidebar */}
      <div className="w-64 bg-gray-900/70 border-r border-white/5 flex flex-col flex-shrink-0">
        {/* Workspace Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">AI COO Platform</h2>
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                <Circle className="w-2 h-2 fill-current" /> 6 members online
              </p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input className="w-full pl-8 pr-3 py-1.5 text-xs bg-white/5 border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500" placeholder="Search..." />
          </div>
        </div>

        {/* Channels */}
        <div className="px-3 py-2 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Channels</span>
            <button className="text-gray-600 hover:text-white">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          {channels.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-all mb-0.5 ${activeChannel === ch.id ? 'bg-violet-600/20 text-violet-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 opacity-60" />
                <span>{ch.name}</span>
              </div>
              {ch.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}

          {/* Direct Messages */}
          <div className="flex items-center justify-between mb-2 px-1 mt-4">
            <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Team Members</span>
            <button className="text-gray-600 hover:text-white">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          {members.map(m => (
            <div key={m.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <div className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                  {m.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${statusColors[m.status]} border border-gray-900`} />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors truncate">{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-gray-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-gray-400" />
            <h2 className="text-white font-semibold">{activeChannel}</h2>
            <span className="text-gray-600 text-sm">·</span>
            <span className="text-xs text-gray-500">{currentMessages.length} messages today</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {currentMessages.map(msg => (
            <div key={msg.id} className="flex items-start gap-3 group">
              <div className={`w-9 h-9 rounded-xl ${msg.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{msg.author}</span>
                  <span className="text-xs text-gray-600">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{msg.content}</p>
                {msg.reactions && (
                  <div className="flex items-center gap-1.5 mt-2">
                    {msg.reactions.map((r, i) => (
                      <button key={i} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-xs hover:bg-white/10 transition-all">
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-gray-600 hover:text-white">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-white/5">
          <div className="flex items-end gap-3 bg-gray-900/70 border border-white/10 rounded-2xl px-4 py-3">
            <button className="text-gray-500 hover:text-white transition-colors flex-shrink-0 pb-0.5">
              <Plus className="w-5 h-5" />
            </button>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder={`Message #${activeChannel}`}
              rows={1}
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none resize-none"
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="text-gray-500 hover:text-white transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
