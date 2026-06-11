'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Target, Users, Mail, FileText, Shield, Share2, Pen,
  Headphones, FolderKanban, MessageSquare, BarChart3, Zap, TrendingUp,
  Megaphone, DollarSign, Settings, HelpCircle, ChevronLeft, Menu, X,
  Bell, Search, Brain, Sparkles, LogOut, User, CreditCard,
  Building2
} from 'lucide-react'

const navGroups = [
  {
    label: null,
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    label: 'AI Modules',
    items: [
      { icon: Target, label: 'Lead Generator', href: '/leads' },
      { icon: Users, label: 'CRM', href: '/crm' },
      { icon: Mail, label: 'Email Assistant', href: '/email' },
      { icon: FileText, label: 'Proposals', href: '/proposals' },
      { icon: Shield, label: 'Contracts', href: '/contracts' },
      { icon: Share2, label: 'Social Media', href: '/social' },
      { icon: Pen, label: 'Content Studio', href: '/content' },
      { icon: Headphones, label: 'Support Agent', href: '/support' },
      { icon: FolderKanban, label: 'Projects', href: '/projects' },
      { icon: MessageSquare, label: 'Team Hub', href: '/team' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { icon: BarChart3, label: 'Analytics', href: '/analytics' },
      { icon: Zap, label: 'Automation', href: '/automation' },
      { icon: TrendingUp, label: 'Sales', href: '/sales' },
      { icon: Megaphone, label: 'Marketing', href: '/marketing' },
      { icon: DollarSign, label: 'Finance', href: '/finance' },
    ],
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-[#030712] text-white overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 h-full flex flex-col
        bg-gray-950 border-r border-white/5
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-16'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/5 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-base bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent truncate">
                AI COO
              </span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all hidden md:flex"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navGroups.map((group, gi) => (
            <div key={gi} className={gi > 0 ? 'pt-4' : ''}>
              {group.label && sidebarOpen && (
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 pb-2">
                  {group.label}
                </p>
              )}
              {group.items.map(({ icon: Icon, label, href }) => {
                const active = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    title={!sidebarOpen ? label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/20 text-violet-300 border border-violet-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-violet-400' : ''}`} />
                    {sidebarOpen && <span className="truncate">{label}</span>}
                    {active && sidebarOpen && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1 flex-shrink-0">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Settings</span>}
          </Link>
          <Link href="/help" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Help &amp; Support</span>}
          </Link>
          {sidebarOpen && (
            <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-violet-300">AI Credits</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 mb-1">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-1.5 rounded-full" style={{ width: '34%' }} />
              </div>
              <p className="text-xs text-gray-500">340 / 1,000 used</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center gap-4 px-4 md:px-6 border-b border-white/5 bg-gray-950/80 backdrop-blur flex-shrink-0">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1 flex items-center gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search... (⌘K)"
                className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
            </button>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  JD
                </div>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-white/5 mb-2">
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  {[
                    { icon: User, label: 'Profile', href: '/settings/profile' },
                    { icon: Building2, label: 'Organization', href: '/settings/org' },
                    { icon: CreditCard, label: 'Billing', href: '/settings/billing' },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  ))}
                  <div className="border-t border-white/5 mt-2 pt-2">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#030712]">
          {children}
        </main>
      </div>
    </div>
  )
}
