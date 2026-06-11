'use client'
import { useState } from 'react'
import { Share2, Plus, Sparkles, Brain, MoreHorizontal, Heart, MessageCircle, Repeat2, Eye, TrendingUp, Users, Calendar, Clock, Image, X } from 'lucide-react'

type Platform = 'All' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'TikTok'

const posts = [
  { id: 1, platform: 'LinkedIn', content: 'Excited to announce our AI-powered operations platform has helped 500+ businesses automate their workflows! The future of business is here. #AI #Operations #Automation', status: 'PUBLISHED', scheduledAt: 'Oct 10, 9:00 AM', engagement: { likes: 342, comments: 48, shares: 127, views: 8400 }, image: false },
  { id: 2, platform: 'Twitter', content: 'Thread: 5 ways AI is transforming business operations in 2024 👇\n\n1. Automated lead generation\n2. Smart email campaigns\n3. AI contract drafting...', status: 'SCHEDULED', scheduledAt: 'Oct 12, 2:00 PM', engagement: { likes: 0, comments: 0, shares: 0, views: 0 }, image: false },
  { id: 3, platform: 'Instagram', content: 'Behind the scenes of our AI platform development! Our team is working tirelessly to build the future of business automation. 🚀', status: 'PUBLISHED', scheduledAt: 'Oct 9, 11:00 AM', engagement: { likes: 892, comments: 73, shares: 34, views: 12300 }, image: true },
  { id: 4, platform: 'LinkedIn', content: 'Case Study: How TechVentures Inc reduced operational overhead by 40% using our AI platform. Full story in the link below.', status: 'DRAFT', scheduledAt: null, engagement: { likes: 0, comments: 0, shares: 0, views: 0 }, image: false },
  { id: 5, platform: 'TikTok', content: '3 AI tools every business owner needs in 2024! Drop a 🔥 if you agree. #BusinessTips #AI #Entrepreneur', status: 'PUBLISHED', scheduledAt: 'Oct 8, 6:00 PM', engagement: { likes: 2341, comments: 187, shares: 456, views: 45200 }, image: true },
  { id: 6, platform: 'Twitter', content: 'NEW: Our AI lead generator just crossed 1M leads generated for customers. Here\'s what we\'ve learned... 🧵', status: 'SCHEDULED', scheduledAt: 'Oct 13, 10:00 AM', engagement: { likes: 0, comments: 0, shares: 0, views: 0 }, image: false },
  { id: 7, platform: 'Instagram', content: 'Monday motivation: Every great business starts with great systems. Build yours with AI. ✨', status: 'SCHEDULED', scheduledAt: 'Oct 14, 8:00 AM', engagement: { likes: 0, comments: 0, shares: 0, views: 0 }, image: true },
  { id: 8, platform: 'LinkedIn', content: 'Proud to share that we\'ve been named one of the Top 10 AI Startups to Watch in 2024!', status: 'PUBLISHED', scheduledAt: 'Oct 7, 10:00 AM', engagement: { likes: 1240, comments: 98, shares: 203, views: 18700 }, image: false },
]

const platformConfig: Record<string, { color: string; bg: string; dot: string }> = {
  LinkedIn: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', dot: 'bg-blue-500' },
  Twitter: { color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20', dot: 'bg-sky-500' },
  Instagram: { color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20', dot: 'bg-pink-500' },
  TikTok: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', dot: 'bg-red-500' },
}

const statusConfig: Record<string, string> = {
  PUBLISHED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  SCHEDULED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  DRAFT: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  FAILED: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const stats = [
  { label: 'Posts This Week', value: '12', change: '+4', icon: Share2, color: 'text-violet-400' },
  { label: 'Total Reach', value: '84.5K', change: '+23%', icon: Eye, color: 'text-blue-400' },
  { label: 'Engagement Rate', value: '4.8%', change: '+1.2%', icon: Heart, color: 'text-pink-400' },
  { label: 'Followers', value: '12.4K', change: '+340', icon: Users, color: 'text-emerald-400' },
]

export default function SocialPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [generating, setGenerating] = useState(false)

  const filteredPosts = posts.filter(p => activePlatform === 'All' || p.platform === activePlatform)

  const platforms: Platform[] = ['All', 'Twitter', 'LinkedIn', 'Instagram', 'TikTok']

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-violet-400" />
            Social Media Manager
          </h1>
          <p className="text-gray-400 text-sm mt-1">Schedule, publish, and analyze posts across all platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Create Post with AI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
            <Calendar className="w-4 h-4" />
            Content Calendar
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Create Post with AI</h3>
                  <p className="text-xs text-gray-500">Generate engaging content for any platform</p>
                </div>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Platform</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['LinkedIn', 'Twitter', 'Instagram', 'TikTok'].map(p => (
                    <button key={p} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${platformConfig[p].bg} ${platformConfig[p].color}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Topic / Goal</label>
                <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Promote our new AI feature launch" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Tone</label>
                <select className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors">
                  <option>Professional</option>
                  <option>Casual & Fun</option>
                  <option>Educational</option>
                  <option>Inspirational</option>
                  <option>Promotional</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Schedule</label>
                <input type="datetime-local" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500 transition-colors" />
              </div>
              <button
                onClick={() => { setGenerating(true); setTimeout(() => { setGenerating(false); setShowCreateModal(false) }, 1800) }}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-violet-500/20"
              >
                {generating ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Post...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate & Schedule</>
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
            <p className="text-xs text-emerald-400 mt-1">{s.change} this week</p>
          </div>
        ))}
      </div>

      {/* Platform Tabs */}
      <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1 w-fit">
        {platforms.map(p => (
          <button
            key={p}
            onClick={() => setActivePlatform(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activePlatform === p ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {p}
            {p !== 'All' && (
              <span className="ml-1.5 text-xs opacity-60">{posts.filter(post => post.platform === p).length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPosts.map(post => {
          const pc = platformConfig[post.platform]
          return (
            <div key={post.id} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${pc.dot}`} />
                  <span className={`text-xs font-medium ${pc.color}`}>{post.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[10px] font-medium ${statusConfig[post.status]}`}>
                    {post.status}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {post.image && (
                <div className="w-full h-28 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl border border-violet-500/10 mb-3 flex items-center justify-center">
                  <Image className="w-8 h-8 text-violet-400/40" />
                </div>
              )}

              <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed mb-4">{post.content}</p>

              <div className="flex items-center gap-1 text-[10px] text-gray-600 mb-3">
                <Clock className="w-3 h-3" />
                <span>{post.scheduledAt || 'Not scheduled'}</span>
              </div>

              {post.status === 'PUBLISHED' && (
                <div className="grid grid-cols-4 gap-1 pt-3 border-t border-white/5">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 text-pink-400">
                      <Heart className="w-3 h-3" />
                      <span className="text-xs font-medium">{post.engagement.likes > 999 ? `${(post.engagement.likes / 1000).toFixed(1)}K` : post.engagement.likes}</span>
                    </div>
                    <span className="text-[9px] text-gray-600">Likes</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 text-blue-400">
                      <MessageCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">{post.engagement.comments}</span>
                    </div>
                    <span className="text-[9px] text-gray-600">Comments</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 text-emerald-400">
                      <Repeat2 className="w-3 h-3" />
                      <span className="text-xs font-medium">{post.engagement.shares}</span>
                    </div>
                    <span className="text-[9px] text-gray-600">Shares</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 text-gray-400">
                      <Eye className="w-3 h-3" />
                      <span className="text-xs font-medium">{post.engagement.views > 999 ? `${(post.engagement.views / 1000).toFixed(1)}K` : post.engagement.views}</span>
                    </div>
                    <span className="text-[9px] text-gray-600">Views</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Create New Post Card */}
        <div
          onClick={() => setShowCreateModal(true)}
          className="bg-gray-900/50 border border-dashed border-white/10 rounded-2xl p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[200px] group"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
            <Plus className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 group-hover:text-violet-400 transition-colors">Create New Post</p>
            <p className="text-xs text-gray-600 mt-0.5">Generate with AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}
