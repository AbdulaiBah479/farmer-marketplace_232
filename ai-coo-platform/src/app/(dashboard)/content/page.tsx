'use client'
import { useState } from 'react'
import { Pen, Plus, Sparkles, Brain, MoreHorizontal, Search, TrendingUp, FileText, Zap, Copy, Download, Clock, Eye, X } from 'lucide-react'

type ContentType = 'Blog' | 'Social' | 'Email' | 'Ad Copy' | 'Video Script' | 'Landing Page'

const contentLibrary = [
  { id: 1, title: 'How AI is Revolutionizing Business Operations in 2024', type: 'Blog', words: 1840, status: 'PUBLISHED', createdAt: '2 days ago', aiGenerated: true, views: 2340 },
  { id: 2, title: 'LinkedIn Post: AI Operations Milestone', type: 'Social', words: 120, status: 'PUBLISHED', createdAt: '3 days ago', aiGenerated: true, views: 8400 },
  { id: 3, title: 'Q4 Newsletter — Product Updates', type: 'Email', words: 680, status: 'DRAFT', createdAt: '1 day ago', aiGenerated: false, views: 0 },
  { id: 4, title: 'Google Ads Copy — AI Platform Launch', type: 'Ad Copy', words: 95, status: 'PUBLISHED', createdAt: '5 days ago', aiGenerated: true, views: 12800 },
  { id: 5, title: '5 Ways AI Transforms Your Business — YouTube Script', type: 'Video Script', words: 1200, status: 'DRAFT', createdAt: '1 day ago', aiGenerated: true, views: 0 },
  { id: 6, title: 'Top 10 Automation Tools for Entrepreneurs', type: 'Blog', words: 2100, status: 'PUBLISHED', createdAt: '1 week ago', aiGenerated: false, views: 5670 },
  { id: 7, title: 'Twitter Thread: Revenue Growth Tips', type: 'Social', words: 340, status: 'SCHEDULED', createdAt: '4 hours ago', aiGenerated: true, views: 0 },
  { id: 8, title: 'Landing Page Copy — Enterprise Plan', type: 'Landing Page', words: 820, status: 'REVIEW', createdAt: '2 days ago', aiGenerated: true, views: 0 },
]

const contentTypes: ContentType[] = ['Blog', 'Social', 'Email', 'Ad Copy', 'Video Script', 'Landing Page']

const typeConfig: Record<string, string> = {
  Blog: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Social: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Email: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Ad Copy': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Video Script': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Landing Page': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const statusConfig: Record<string, string> = {
  PUBLISHED: 'text-emerald-400',
  DRAFT: 'text-gray-400',
  SCHEDULED: 'text-blue-400',
  REVIEW: 'text-amber-400',
}

const stats = [
  { label: 'Content Pieces', value: '284', change: '+47', icon: FileText, color: 'text-violet-400' },
  { label: 'Words Written', value: '284K', change: '+12%', icon: Pen, color: 'text-blue-400' },
  { label: 'AI Generated', value: '73%', change: '+8%', icon: Zap, color: 'text-emerald-400' },
  { label: 'Avg. Views', value: '4.2K', change: '+19%', icon: Eye, color: 'text-orange-400' },
]

const toneOptions = ['Professional', 'Conversational', 'Educational', 'Persuasive', 'Inspiring', 'Witty']

export default function ContentPage() {
  const [selectedType, setSelectedType] = useState<ContentType>('Blog')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Professional')
  const [keywords, setKeywords] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [search, setSearch] = useState('')

  const filteredLibrary = contentLibrary.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  )

  const handleGenerate = () => {
    if (!topic) return
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGeneratedContent(`# ${topic}

## Introduction

In today's rapidly evolving business landscape, AI-powered solutions are no longer a luxury — they're a necessity. Companies that leverage artificial intelligence are seeing dramatic improvements in efficiency, revenue, and customer satisfaction.

## The Core Challenge

Most businesses struggle with operational inefficiency. Manual processes, scattered data, and reactive decision-making hold companies back from their true potential. The solution? Intelligent automation powered by AI.

## Key Benefits

**1. Dramatic Time Savings**
Automate repetitive tasks and free your team to focus on high-value work. Our customers report saving 15+ hours per week per employee.

**2. Data-Driven Decisions**
Real-time analytics and AI insights give you the information you need to make smarter decisions faster.

**3. Scalable Growth**
AI systems grow with your business — no additional headcount required as you scale.

## Conclusion

The businesses that embrace AI today will be the market leaders of tomorrow. Start your transformation now and see results within 30 days.

*Ready to transform your operations? Book a free demo today.*`)
    }, 2200)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Pen className="w-6 h-6 text-violet-400" />
            Content Studio
          </h1>
          <p className="text-gray-400 text-sm mt-1">Create world-class content with AI in seconds</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
          <Plus className="w-4 h-4" />
          Upload Content
        </button>
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
            <p className="text-xs text-emerald-400 mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* AI Generator */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-white font-semibold">AI Content Generator</h3>
            </div>

            {/* Content Type Selector */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-2 block">Content Type</label>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedType === t
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-violet-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Topic / Title</label>
                <input
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder={`Enter ${selectedType.toLowerCase()} topic...`}
                  className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Tone</label>
                <select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                  {toneOptions.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Keywords (optional)</label>
                <input
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="AI, automation, business growth..."
                  className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              {selectedType === 'Blog' && (
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Word Count</label>
                  <select className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                    <option>500 words (Short)</option>
                    <option>1000 words (Medium)</option>
                    <option>1500 words (Long)</option>
                    <option>2500+ words (Pillar)</option>
                  </select>
                </div>
              )}
              <button
                onClick={handleGenerate}
                disabled={generating || !topic}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-violet-500/20 mt-2"
              >
                {generating ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate {selectedType}</>
                )}
              </button>
            </div>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <span className="text-sm font-medium text-white">Generated Content</span>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all" title="Copy">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all" title="Download">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setGeneratedContent('')} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <textarea
                value={generatedContent}
                onChange={e => setGeneratedContent(e.target.value)}
                className="w-full px-4 py-4 text-xs bg-transparent text-gray-300 focus:outline-none resize-none font-mono leading-relaxed"
                rows={16}
              />
            </div>
          )}
        </div>

        {/* Content Library */}
        <div className="lg:col-span-3">
          <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-white">Content Library</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-7 pr-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 placeholder-gray-600 focus:outline-none focus:border-violet-500 w-40 transition-colors"
                />
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {filteredLibrary.map(c => (
                <div key={c.id} className="p-4 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium ${typeConfig[c.type]}`}>{c.type}</span>
                        {c.aiGenerated && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/10 text-violet-400">
                            <Zap className="w-2.5 h-2.5" /> AI
                          </span>
                        )}
                        <span className={`text-[10px] font-medium ${statusConfig[c.status]}`}>{c.status}</span>
                      </div>
                      <p className="text-sm font-medium text-white truncate">{c.title}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[11px] text-gray-600 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {c.createdAt}
                        </span>
                        <span className="text-[11px] text-gray-600">{c.words.toLocaleString()} words</span>
                        {c.views > 0 && (
                          <span className="text-[11px] text-gray-600 flex items-center gap-1">
                            <Eye className="w-2.5 h-2.5" /> {c.views.toLocaleString()} views
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                        <MoreHorizontal className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
