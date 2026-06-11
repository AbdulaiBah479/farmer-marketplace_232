'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  User,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  X,
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
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeaderProps {
  sidebarCollapsed: boolean
  onOpenMobileSidebar: () => void
}

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning'
}

interface SearchItem {
  label: string
  href: string
  icon: React.ElementType
  section: string
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New lead captured',
    description: 'AI Lead Generator found 12 new prospects in your target market.',
    time: '2 min ago',
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Contract awaiting signature',
    description: 'Acme Corp contract is ready for review and signature.',
    time: '1 hr ago',
    read: false,
    type: 'warning',
  },
  {
    id: '3',
    title: 'Monthly report ready',
    description: 'Your AI Analytics summary for June is now available.',
    time: '3 hr ago',
    read: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Automation completed',
    description: 'Email drip sequence sent to 248 contacts successfully.',
    time: '5 hr ago',
    read: true,
    type: 'success',
  },
]

const searchItems: SearchItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, section: 'Pages' },
  { label: 'AI Lead Generator', href: '/leads', icon: Target, section: 'AI Modules' },
  { label: 'AI CRM', href: '/crm', icon: Users, section: 'AI Modules' },
  { label: 'AI Email', href: '/email', icon: Mail, section: 'AI Modules' },
  { label: 'AI Proposals', href: '/proposals', icon: FileText, section: 'AI Modules' },
  { label: 'AI Contracts', href: '/contracts', icon: Shield, section: 'AI Modules' },
  { label: 'AI Social Media', href: '/social', icon: Share2, section: 'AI Modules' },
  { label: 'AI Content Studio', href: '/content', icon: Pen, section: 'AI Modules' },
  { label: 'AI Support', href: '/support', icon: Headphones, section: 'AI Modules' },
  { label: 'AI Projects', href: '/projects', icon: FolderKanban, section: 'AI Modules' },
  { label: 'AI Team', href: '/team', icon: MessageSquare, section: 'AI Modules' },
  { label: 'AI Analytics', href: '/analytics', icon: BarChart3, section: 'Operations' },
  { label: 'AI Automation', href: '/automation', icon: Zap, section: 'Operations' },
  { label: 'AI Sales', href: '/sales', icon: TrendingUp, section: 'Operations' },
  { label: 'AI Marketing', href: '/marketing', icon: Megaphone, section: 'Operations' },
  { label: 'AI Finance', href: '/finance', icon: DollarSign, section: 'Operations' },
  { label: 'Settings', href: '/settings', icon: Settings, section: 'Pages' },
]

// Route label map for breadcrumbs
const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  leads: 'AI Lead Generator',
  crm: 'AI CRM',
  email: 'AI Email',
  proposals: 'AI Proposals',
  contracts: 'AI Contracts',
  social: 'AI Social Media',
  content: 'AI Content Studio',
  support: 'AI Support',
  projects: 'AI Projects',
  team: 'AI Team',
  analytics: 'AI Analytics',
  automation: 'AI Automation',
  sales: 'AI Sales',
  marketing: 'AI Marketing',
  finance: 'AI Finance',
  settings: 'Settings',
  help: 'Help & Support',
  billing: 'Billing',
  upgrade: 'Upgrade',
}

// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------

function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="hidden items-center gap-1 sm:flex">
      <Link
        href="/dashboard"
        className="text-xs text-slate-500 transition-colors hover:text-slate-300"
      >
        Home
      </Link>
      {segments.map((seg, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/')
        const label = routeLabels[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1)
        const isLast = idx === segments.length - 1

        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 text-slate-600" />
            {isLast ? (
              <span className="text-xs font-medium text-slate-200">{label}</span>
            ) : (
              <Link
                href={href}
                className="text-xs text-slate-500 transition-colors hover:text-slate-300"
              >
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

// ---------------------------------------------------------------------------
// Command-K Search
// ---------------------------------------------------------------------------

function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.trim()
    ? searchItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      )
    : searchItems.slice(0, 8)

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [open])

  const handleSelect = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  // Group filtered results by section
  const grouped = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03]',
          'px-3 py-1.5 text-xs text-slate-500 transition-all',
          'hover:border-violet-500/30 hover:bg-white/[0.05] hover:text-slate-400',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
          'hidden sm:flex',
        )}
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search</span>
        <span className="ml-4 hidden items-center gap-0.5 lg:flex">
          <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px] font-mono text-slate-600">
            ⌘
          </kbd>
          <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px] font-mono text-slate-600">
            K
          </kbd>
        </span>
      </button>

      {/* Mobile search icon */}
      <button
        onClick={() => setOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200 sm:hidden"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13102a] shadow-2xl shadow-black/60">
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
              <Search className="h-4 w-4 flex-shrink-0 text-slate-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, features, pages..."
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-500 hover:text-slate-300">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section} className="mb-1">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                    {section}
                  </p>
                  {items.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleSelect(item.href)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-violet-500/10"
                      >
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                          <Icon className="h-3.5 w-3.5 text-violet-400" />
                        </div>
                        <span className="text-sm text-slate-300">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-slate-600">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2">
              <span className="flex items-center gap-1 text-[10px] text-slate-600">
                <kbd className="rounded border border-white/10 bg-white/5 px-1 font-mono text-slate-700">↵</kbd>
                to select
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-600">
                <kbd className="rounded border border-white/10 bg-white/5 px-1 font-mono text-slate-700">Esc</kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

function NotificationsButton() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const ref = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter((n) => !n.read).length

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

  const typeColors: Record<Notification['type'], string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    info: 'bg-violet-500',
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className={cn(
          'relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors',
          'hover:bg-white/5 hover:text-slate-200',
          open && 'bg-white/5 text-slate-200',
        )}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13102a] shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-200">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[11px] text-violet-400 transition-colors hover:text-violet-300"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 divide-y divide-white/[0.04] overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  'flex gap-3 px-4 py-3 transition-colors hover:bg-white/[0.03]',
                  !n.read && 'bg-violet-500/[0.04]',
                )}
              >
                {/* Dot */}
                <div className="mt-1.5 flex-shrink-0">
                  <span className={cn('block h-2 w-2 rounded-full', typeColors[n.type])} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn('text-xs font-medium', n.read ? 'text-slate-400' : 'text-slate-200')}>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                    {n.description}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-600">{n.time}</p>
                </div>
                {!n.read && (
                  <div className="mt-1.5 flex-shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] p-2">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-lg py-2 text-xs text-slate-500 transition-colors hover:bg-white/[0.04] hover:text-slate-300"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Theme toggle
// ---------------------------------------------------------------------------

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-8 w-8" />

  const cycle = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('system')
    else setTheme('dark')
  }

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <button
      onClick={cycle}
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

// ---------------------------------------------------------------------------
// User menu
// ---------------------------------------------------------------------------

function UserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const menuItems = [
    { label: 'My Profile', href: '/profile', icon: User },
    { label: 'Account Settings', href: '/settings', icon: Settings },
    { label: 'Billing & Plans', href: '/billing', icon: CreditCard },
  ]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-transparent transition-all',
          'hover:ring-violet-500/50',
          open && 'ring-violet-500/50',
        )}
      >
        {/* Avatar placeholder — replace with <Image> once auth is wired */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-xs font-bold text-white">
          AC
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-56 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13102a] shadow-2xl shadow-black/50">
          {/* User info */}
          <div className="border-b border-white/[0.06] px-4 py-3">
            <p className="text-sm font-semibold text-slate-200">Alex Chen</p>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">alex@acmecorp.com</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400 ring-1 ring-amber-500/20">
              Free Plan
            </span>
          </div>

          {/* Menu items */}
          <div className="p-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-slate-200"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Upgrade CTA */}
          <div className="border-t border-white/[0.06] p-2">
            <Link
              href="/billing/upgrade"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600/80 to-purple-600/80 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Sparkles className="h-3 w-3" />
              Upgrade to Pro
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-white/[0.06] p-1">
            <button
              onClick={() => {
                setOpen(false)
                router.push('/auth/signout')
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export function Header({ sidebarCollapsed: _sidebarCollapsed, onOpenMobileSidebar }: HeaderProps) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-3 border-b border-white/[0.06] bg-[#0d0a1f]/80 px-4 backdrop-blur-md">
      {/* Mobile hamburger */}
      <button
        onClick={onOpenMobileSidebar}
        aria-label="Open sidebar"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb */}
      <div className="flex-1">
        <Breadcrumb />
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-1">
        <SearchBar />
        <div className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
        <ThemeToggle />
        <NotificationsButton />
        <div className="mx-1 h-4 w-px bg-white/10" />
        <UserMenu />
      </div>
    </header>
  )
}
