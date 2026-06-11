import Link from 'next/link'
import {
  Target, Users, Mail, FileText, Shield, Share2, Pen, Headphones,
  FolderKanban, MessageSquare, BarChart3, Zap, TrendingUp, Megaphone,
  DollarSign, CheckCircle2, ArrowRight, Star, Play, Sparkles,
  Brain, Globe, Lock, Rocket, ChevronRight
} from 'lucide-react'

const modules = [
  { icon: Target, name: 'AI Lead Generator', desc: 'Find and qualify leads on autopilot' },
  { icon: Users, name: 'AI CRM', desc: 'Smart relationship management' },
  { icon: Mail, name: 'AI Email Assistant', desc: 'Write better emails 10x faster' },
  { icon: FileText, name: 'AI Proposal Generator', desc: 'Win more deals with perfect proposals' },
  { icon: Shield, name: 'AI Contract Generator', desc: 'Generate legally-sound contracts instantly' },
  { icon: Share2, name: 'AI Social Media', desc: 'Dominate every platform automatically' },
  { icon: Pen, name: 'AI Content Studio', desc: 'Create content that converts' },
  { icon: Headphones, name: 'AI Support Agent', desc: '24/7 intelligent customer support' },
  { icon: FolderKanban, name: 'AI Project Manager', desc: 'Ship projects on time, every time' },
  { icon: MessageSquare, name: 'AI Team Hub', desc: 'Collaborate smarter, not harder' },
  { icon: BarChart3, name: 'AI Analytics', desc: 'Insights that drive real decisions' },
  { icon: Zap, name: 'AI Workflow Engine', desc: 'Automate your entire business' },
  { icon: TrendingUp, name: 'AI Sales Assistant', desc: 'Close more deals faster' },
  { icon: Megaphone, name: 'AI Marketing Assistant', desc: 'Marketing on complete autopilot' },
  { icon: DollarSign, name: 'AI Finance Assistant', desc: 'Take full control of cash flow' },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Founder, GrowthStack Agency',
    avatar: 'SC',
    rating: 5,
    quote: "AI COO replaced 3 full-time employees and cut our operational costs by 60%. The AI lead generator alone paid for a year's subscription in the first week.",
  },
  {
    name: 'Marcus Johnson',
    title: 'CEO, Velocity Consulting',
    avatar: 'MJ',
    rating: 5,
    quote: 'I went from drowning in admin work to focusing purely on strategy. The proposal generator creates better proposals than I could write myself — and in 30 seconds.',
  },
  {
    name: 'Priya Patel',
    title: 'Solo Freelancer → Agency Owner',
    avatar: 'PP',
    rating: 5,
    quote: 'I scaled from $5K/month to $50K/month in 6 months using AI COO. The automation workflows and AI insights are absolutely game-changing.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: ['1 workspace', '3 AI modules', '100 AI credits/month', '1 team member', 'Basic analytics'],
    cta: 'Get Started Free',
    href: '/signup',
    featured: false,
  },
  {
    name: 'Starter',
    price: 29,
    description: 'For solo entrepreneurs',
    features: ['3 workspaces', 'All 15 AI modules', '1,000 AI credits/month', '3 team members', 'Email campaigns', 'Priority support'],
    cta: 'Start Free Trial',
    href: '/signup?plan=starter',
    featured: false,
  },
  {
    name: 'Professional',
    price: 79,
    description: 'For growing businesses',
    features: ['Unlimited workspaces', 'All 15 AI modules', '5,000 AI credits/month', '10 team members', 'Custom AI training', 'API access', 'Integrations'],
    cta: 'Start Free Trial',
    href: '/signup?plan=professional',
    featured: true,
  },
  {
    name: 'Agency',
    price: 199,
    description: 'For agencies & teams',
    features: ['Unlimited everything', '20,000 AI credits/month', '25 team members', 'White-label options', 'Client portal', 'Custom branding', 'SLA support'],
    cta: 'Start Free Trial',
    href: '/signup?plan=agency',
    featured: false,
  },
  {
    name: 'Enterprise',
    price: 499,
    description: 'For large organizations',
    features: ['Unlimited everything', 'Custom AI models', 'Unlimited AI credits', 'Unlimited members', 'Full white-label', 'On-premise option', '24/7 dedicated support', 'SSO/SAML'],
    cta: 'Contact Sales',
    href: '/contact',
    featured: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            AI COO
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Testimonials</Link>
          <Link href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Advanced AI • 14-Day Free Trial</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your AI{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Chief Operating
            </span>
            <br />Officer
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            The world&apos;s most powerful AI Business Operating System.
            Automate leads, CRM, proposals, projects, and{' '}
            <span className="text-white font-medium">15+ core operations</span> with
            the most intelligent platform ever built.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-500/25"
            >
              Start Free — No Credit Card
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center gap-3 px-8 py-4 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-lg">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              Watch 2-min Demo
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6 max-w-4xl mx-auto shadow-2xl shadow-violet-500/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="flex-1 mx-4 h-6 rounded-lg bg-white/5 flex items-center px-3">
                <span className="text-xs text-gray-500">app.aicoo.io/dashboard</span>
              </div>
            </div>
            {/* Mock dashboard content */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Revenue MTD', value: '$47,291', change: '+23%' },
                { label: 'New Leads', value: '1,284', change: '+41%' },
                { label: 'Deals Won', value: '28', change: '+15%' },
                { label: 'AI Tasks Done', value: '892', change: '+67%' },
              ].map((metric) => (
                <div key={metric.label} className="bg-gray-800/80 rounded-xl p-3 border border-white/5">
                  <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                  <p className="text-lg font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-emerald-400">{metric.change} ↑</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 bg-gray-800/80 rounded-xl p-4 border border-white/5">
                <p className="text-xs text-gray-400 mb-3">Revenue Overview</p>
                <div className="flex items-end gap-1 h-20">
                  {[40, 65, 45, 75, 55, 80, 70, 90, 75, 95, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-violet-600/60 to-violet-400/60 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="bg-gray-800/80 rounded-xl p-4 border border-white/5">
                <p className="text-xs text-gray-400 mb-3">AI Insights</p>
                <div className="space-y-2">
                  {['Close deal with TechCorp', 'Follow up 12 leads', 'Schedule 3 posts'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      <span className="text-xs text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-8">Trusted by 10,000+ businesses worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Active Businesses' },
              { value: '$50M+', label: 'Revenue Generated' },
              { value: '15', label: 'AI Modules' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Modules */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-4">
              <Zap className="w-4 h-4" />
              15 Powerful AI Modules
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                run your business
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Replace 10+ tools with one AI-powered platform. Each module is designed to work seamlessly together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {modules.map(({ icon: Icon, name, desc }) => (
              <div
                key={name}
                className="group relative p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center mb-3 group-hover:from-violet-600/40 group-hover:to-indigo-600/40 transition-all">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Up and running in{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                minutes
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect your business',
                desc: 'Import your existing contacts, deals, and data. Connect your email, social accounts, and tools in one click.',
                icon: Globe,
              },
              {
                step: '02',
                title: 'Configure your AI',
                desc: 'Train AI on your brand voice, target audience, and business processes. Takes less than 10 minutes.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Watch your business grow',
                desc: 'AI COO handles your operations 24/7. You focus on what matters most — growth and strategy.',
                icon: Rocket,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.03]">
                <div className="text-6xl font-black text-white/5 absolute top-4 right-6">{step}</div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                thousands
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-white/5 bg-white/[0.03]">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple,{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                transparent pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-2xl border transition-all ${
                  plan.featured
                    ? 'border-violet-500 bg-gradient-to-b from-violet-600/10 to-indigo-600/10 shadow-lg shadow-violet-500/20'
                    : 'border-white/5 bg-white/[0.03]'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-white">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                    plan.featured
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90'
                      : 'border border-white/10 text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-16 rounded-3xl overflow-hidden border border-violet-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-indigo-600/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Start your 14-day free trial today
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to{' '}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  10x your business?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Join 10,000+ businesses already using AI COO to automate operations, generate leads, and scale revenue.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="group flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-500/25"
                >
                  Start Free — No Credit Card
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                ✓ Free 14-day trial &nbsp; ✓ No credit card required &nbsp; ✓ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                AI COO
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
            <p className="text-xs text-gray-600">© 2026 AI COO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
