'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Target,
  Users,
  Mail,
  FileText,
  Shield,
  Share2,
  Pen,
  Headphones,
  FolderKanban,
  MessageSquare,
  BarChart3,
  Zap,
  TrendingUp,
  Megaphone,
  DollarSign,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Check,
  Brain,
  Rocket,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
}

// ---------------------------------------------------------------------------
// Navigation structure
// ---------------------------------------------------------------------------

const coreNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
]

const aiModules: NavItem[] = [
  { label: 'AI Lead Generator', href: '/leads', icon: Target },
  { label: 'AI CRM', href: '/crm', icon: Users },
  { label: 'AI Email', href: '/email', icon: Mail },
  { label: 'AI Proposals', href: '/proposals', icon: FileText },
  { label: 'AI Contracts', href: '/contracts', icon: Shield },
  { label: 'AI Social Media', href: '/social', icon: Share2 },
  { label: 'AI Content Studio', href: '/content', icon: Pen },
  { label: 'AI Support', href: '/support', icon: Headphones },
  { label: 'AI Projects', href: '/projects', icon: FolderKanban },
  { label: 'AI Team', href: '/team', icon: MessageSquare },
]

const operations: NavItem[] = [
  { label: 'AI Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'AI Automation', href: '/automation', icon: Zap },
  { label: 'AI Sales', href: '/sales', icon: TrendingUp },
  { label: 'AI Marketing', href: '/marketing', icon: Megaphone },
  { label: 'AI Finance', href: '/finance', icon: DollarSign },
]

const sections: NavSection[] = [
  { title: 'AI Modules', items: aiModules },
  { title: 'Operations', items: operations },
]

const bottomNav: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help & Support', href: '/help', icon: HelpCircle },
]

// ---------------------------------------------------------------------------
// Workspace switcher data (mock)
// ---------------------------------------------------------------------------

const workspaces = [
  { id: '1', name: 'Acme Corp', initials: 'AC' },
  { id: '2', name: 'Freelance Studio', initials: 'FS' },
  { id: '3', name: 'Personal', initials: 'P' },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function NavLink({
  item,
  collapsed,
  onClick,
}: {
  item: NavItem
  collapsed: boolean
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
        'outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
        isActive
          ? 'bg-gradient-to-r from-violet-600/90 to-purple-600/90 text-white shadow-md shadow-violet-900/30'
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-100',
        collapsed && 'justify-center px-2',
      )}
    >
      {/* Active left accent bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-violet-300" />
      )}

      <Icon
        className={cn(
          'flex-shrink-0 transition-colors duration-200',
          isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300',
          collapsed ? 'h-5 w-5' : 'h-4 w-4',
        )}
      />

      {!collapsed && (
        <span className="truncate leading-none">{item.label}</span>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-100 shadow-lg ring-1 ring-white/10 group-hover:block">
          {item.label}
        </span>
      )}
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Main Sidebar component
// ---------------------------------------------------------------------------

export function Sidebar({ collapsed, onToggleCollapse, onCloseMobile }: SidebarProps) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0])

  // AI credit mock data
  const creditsUsed = 3_240
  const creditsTotal = 10_000
  const creditPct = Math.round((creditsUsed / creditsTotal) * 100)

  return (
    <div
      className={cn(
        'relative flex h-full flex-col border-r border-white/[0.06] bg-[#0d0a1f]',
        'transition-all duration-300 ease-in-out',
      )}
    >
      {/* ----------------------------------------------------------------- */}
      {/* Logo / Brand area                                                  */}
      {/* ----------------------------------------------------------------- */}
      <div
        className={cn(
          'flex h-16 flex-shrink-0 items-center border-b border-white/[0.06]',
          collapsed ? 'justify-center px-2' : 'gap-2.5 px-4',
        )}
      >
        {/* Icon mark */}
        <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-900/50">
          <Brain className="h-4 w-4 text-white" />
          <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-yellow-300" />
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-white">
              AI COO
            </p>
            <p className="truncate text-[10px] font-medium text-violet-400/80">
              Business Operating System
            </p>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Collapse toggle (desktop)                                          */}
      {/* ----------------------------------------------------------------- */}
      <button
        onClick={onToggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'absolute -right-3 top-[72px] z-10 hidden lg:flex',
          'h-6 w-6 items-center justify-center rounded-full',
          'border border-white/10 bg-[#0d0a1f] text-slate-400 shadow-md',
          'transition-colors hover:border-violet-500/50 hover:text-violet-400',
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* ----------------------------------------------------------------- */}
      {/* Workspace switcher                                                 */}
      {/* ----------------------------------------------------------------- */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <button
            onClick={() => setWorkspaceOpen((v) => !v)}
            className={cn(
              'flex w-full items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03]',
              'px-3 py-2 text-left transition-colors hover:bg-white/[0.06]',
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500/40 to-purple-600/40 text-[10px] font-bold text-violet-300">
                {activeWorkspace.initials}
              </span>
              <span className="truncate text-xs font-medium text-slate-300">
                {activeWorkspace.name}
              </span>
            </div>
            <ChevronsUpDown className="h-3 w-3 flex-shrink-0 text-slate-500" />
          </button>

          {/* Dropdown */}
          {workspaceOpen && (
            <div className="mt-1 rounded-lg border border-white/[0.08] bg-[#150f2e] shadow-xl">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws)
                    setWorkspaceOpen(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.05] first:rounded-t-lg last:rounded-b-lg"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500/40 to-purple-600/40 text-[10px] font-bold text-violet-300">
                    {ws.initials}
                  </span>
                  <span className="flex-1 truncate text-xs text-slate-300">{ws.name}</span>
                  {ws.id === activeWorkspace.id && (
                    <Check className="h-3 w-3 text-violet-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Scrollable nav area                                                */}
      {/* ----------------------------------------------------------------- */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {/* Core nav */}
        <div className={cn('px-2', collapsed && 'px-1')}>
          {coreNav.map((item) => (
            <NavLink key={item.href} item={item} collapsed={collapsed} onClick={onCloseMobile} />
          ))}
        </div>

        {/* Sectioned nav */}
        {sections.map((section) => (
          <div key={section.title} className="mt-4">
            {!collapsed && (
              <p className="mb-1 px-5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                {section.title}
              </p>
            )}
            {collapsed && (
              <div className="my-2 mx-auto h-px w-8 bg-white/[0.06]" />
            )}
            <div className={cn('space-y-0.5 px-2', collapsed && 'px-1')}>
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  collapsed={collapsed}
                  onClick={onCloseMobile}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom section                                                     */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex-shrink-0 border-t border-white/[0.06]">
        {/* Upgrade banner */}
        {!collapsed && (
          <div className="px-3 py-3">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600/20 to-purple-800/20 p-3 ring-1 ring-violet-500/20">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-violet-500/10 blur-xl" />
              <div className="relative">
                <div className="mb-1 flex items-center gap-1.5">
                  <Rocket className="h-3.5 w-3.5 text-violet-400" />
                  <p className="text-xs font-semibold text-violet-300">Upgrade to Pro</p>
                </div>
                <p className="mb-2.5 text-[10px] leading-relaxed text-slate-400">
                  Unlock unlimited AI credits, advanced automations & priority support.
                </p>
                <Link
                  href="/billing/upgrade"
                  className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-violet-900/40 transition-opacity hover:opacity-90"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* AI Credits */}
        {!collapsed && (
          <div className="px-5 pb-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">AI Credits</span>
              <span className="text-[10px] font-medium text-slate-400">
                {creditsUsed.toLocaleString()} / {creditsTotal.toLocaleString()}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                style={{ width: `${creditPct}%` }}
              />
            </div>
            <p className="mt-0.5 text-[9px] text-slate-600">{creditPct}% used this month</p>
          </div>
        )}

        {/* Bottom nav links */}
        <div className={cn('space-y-0.5 px-2 pb-3', collapsed && 'px-1')}>
          {bottomNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onClick={onCloseMobile}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
