'use client'
import { useState } from 'react'
import { FolderKanban, Plus, Sparkles, Calendar, CheckCircle2, Clock, AlertTriangle, TrendingUp, Users, BarChart3, MoreHorizontal } from 'lucide-react'

type ProjectStatus = 'On Track' | 'At Risk' | 'Overdue' | 'Completed'

const projects = [
  {
    id: 1,
    name: 'AI Platform v2.0 Launch',
    description: 'Full redesign of the platform with new AI modules and improved UX',
    progress: 78,
    deadline: 'Dec 15, 2026',
    status: 'On Track' as ProjectStatus,
    team: ['A', 'B', 'C', 'D'],
    tasksTotal: 48,
    tasksDone: 37,
    priority: 'High',
  },
  {
    id: 2,
    name: 'Client Onboarding Automation',
    description: 'Automate the entire client onboarding flow using AI workflows',
    progress: 92,
    deadline: 'Nov 30, 2026',
    status: 'Completed' as ProjectStatus,
    team: ['E', 'F'],
    tasksTotal: 24,
    tasksDone: 24,
    priority: 'Medium',
  },
  {
    id: 3,
    name: 'Q4 Marketing Campaign',
    description: 'Multi-channel campaign targeting enterprise clients across LinkedIn and email',
    progress: 45,
    deadline: 'Dec 31, 2026',
    status: 'At Risk' as ProjectStatus,
    team: ['G', 'H', 'I'],
    tasksTotal: 32,
    tasksDone: 14,
    priority: 'High',
  },
  {
    id: 4,
    name: 'API Documentation Overhaul',
    description: 'Rewrite all developer docs and add interactive examples',
    progress: 20,
    deadline: 'Nov 15, 2026',
    status: 'Overdue' as ProjectStatus,
    team: ['J', 'K'],
    tasksTotal: 18,
    tasksDone: 4,
    priority: 'Low',
  },
  {
    id: 5,
    name: 'Mobile App Beta Release',
    description: 'Launch iOS and Android beta with core AI COO features',
    progress: 61,
    deadline: 'Jan 20, 2027',
    status: 'On Track' as ProjectStatus,
    team: ['L', 'M', 'N', 'O', 'P'],
    tasksTotal: 64,
    tasksDone: 39,
    priority: 'High',
  },
  {
    id: 6,
    name: 'Partner Integration Hub',
    description: 'Build integrations marketplace with Zapier, Slack, and HubSpot',
    progress: 33,
    deadline: 'Feb 1, 2027',
    status: 'On Track' as ProjectStatus,
    team: ['Q', 'R'],
    tasksTotal: 28,
    tasksDone: 9,
    priority: 'Medium',
  },
]

const statusConfig: Record<ProjectStatus, { badge: string; dot: string }> = {
  'On Track': { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-500' },
  'At Risk': { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-500' },
  'Overdue': { badge: 'bg-red-500/10 text-red-400 border-red-500/20', dot: 'bg-red-500' },
  'Completed': { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-500' },
}

const avatarColors = [
  'bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-amber-500', 'bg-pink-500', 'bg-red-500', 'bg-teal-500',
]

const stats = [
  { label: 'Active Projects', value: '8', icon: FolderKanban, color: 'text-violet-400' },
  { label: 'Completed', value: '23', icon: CheckCircle2, color: 'text-emerald-400' },
  { label: 'On Track', value: '5', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Overdue', value: '2', icon: AlertTriangle, color: 'text-red-400' },
]

export default function ProjectsPage() {
  const [showNew, setShowNew] = useState(false)
  const [filter, setFilter] = useState<string>('All')

  const filters = ['All', 'On Track', 'At Risk', 'Overdue', 'Completed']
  const filtered = projects.filter(p => filter === 'All' || p.status === filter)

  return (
    <div className="min-h-screen bg-[#030712] p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-violet-400" />
            AI Project Manager
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track projects, deadlines, and team progress with AI insights</p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* New Project Form */}
      {showNew && (
        <div className="bg-gray-900/50 border border-violet-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" /> Create New Project
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Project Name</label>
              <input className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500" placeholder="e.g. Q1 Product Launch" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Deadline</label>
              <input type="date" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-500 mb-1.5 block">Description</label>
              <textarea rows={2} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none" placeholder="Describe the project goals..." />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium">
              <Sparkles className="w-4 h-4" /> Create with AI Plan
            </button>
            <button onClick={() => setShowNew(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 text-sm">Cancel</button>
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
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-gray-900/50 border border-white/5 rounded-xl p-1 w-fit">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(project => {
          const sc = statusConfig[project.status]
          return (
            <div key={project.id} className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-white font-semibold text-sm leading-tight">{project.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-gray-500 flex-shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium text-white">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${project.status === 'Completed' ? 'bg-blue-500' : project.status === 'Overdue' ? 'bg-red-500' : project.status === 'At Risk' ? 'bg-amber-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-600">{project.tasksDone}/{project.tasksTotal} tasks</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-medium ${sc.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs text-gray-500">{project.deadline}</span>
                </div>
                <div className="flex items-center">
                  {project.team.slice(0, 4).map((letter, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0f1117] -ml-1.5 first:ml-0`}
                    >
                      {letter}
                    </div>
                  ))}
                  {project.team.length > 4 && (
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-gray-400 border-2 border-[#0f1117] -ml-1.5">
                      +{project.team.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Add Project Card */}
        <div
          onClick={() => setShowNew(true)}
          className="bg-gray-900/50 border border-dashed border-white/10 rounded-2xl p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[200px] group"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
            <Plus className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 group-hover:text-violet-400 transition-colors">New Project</p>
            <p className="text-xs text-gray-600 mt-0.5">AI will generate a project plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
