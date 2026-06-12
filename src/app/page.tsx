import Link from "next/link";
import { ArrowRight, Bot, Calendar, Mail, MessageSquare, Shield, Zap, Users, BarChart3, CheckCircle } from "lucide-react";

const AGENTS = [
  { icon: MessageSquare, name: "AI Receptionist", desc: "Handles inbound messages across chat, email, and WhatsApp — 24/7." },
  { icon: Mail, name: "Email Agent", desc: "Reads, classifies, and drafts professional email responses instantly." },
  { icon: Calendar, name: "Scheduling Agent", desc: "Books meetings, manages calendar conflicts, and sends invitations." },
  { icon: Users, name: "Support Agent", desc: "Resolves customer queries with knowledge base context and escalation logic." },
  { icon: BarChart3, name: "Operations Agent", desc: "Orchestrates all agents, routes tasks, and maintains system intelligence." },
  { icon: Bot, name: "Document Agent", desc: "Generates contracts, reports, and proposals from your templates." },
];

const FEATURES = [
  "Multi-tenant architecture with strict data isolation",
  "RAG-powered knowledge base from your company docs",
  "Gmail, Google Calendar & WhatsApp integrations",
  "Real-time AI chat interface with tool execution",
  "Role-based access control (Admin, Staff, Viewer)",
  "Analytics dashboard with agent performance metrics",
];

const PLANS = [
  { name: "Starter", price: "$49", period: "/month", description: "Perfect for small teams", features: ["AI Receptionist", "Email Agent", "1,000 messages/mo", "10 knowledge docs", "3 team members"], cta: "Start free trial", popular: false },
  { name: "Professional", price: "$149", period: "/month", description: "For growing businesses", features: ["All Starter features", "Scheduling + Support agents", "WhatsApp integration", "10,000 messages/mo", "100 documents", "15 team members"], cta: "Start free trial", popular: true },
  { name: "Enterprise", price: "$499", period: "/month", description: "Unlimited scale", features: ["Everything unlimited", "Custom AI agents", "Dedicated support", "SLA guarantee", "Custom integrations"], cta: "Contact sales", popular: false },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
            <span className="font-semibold text-gray-900 text-lg">NexusAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#agents" className="hover:text-gray-900">Agents</a>
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#pricing" className="hover:text-gray-900">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>
            <Link href="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8"><Zap className="w-4 h-4" />Powered by Claude AI</div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">Your AI Company<span className="block text-blue-600">Operating System</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">Deploy a full AI workforce that handles emails, scheduling, customer support, and operations. Not a chatbot — a complete digital team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 font-semibold text-lg">Start for free <ArrowRight className="w-5 h-5" /></Link>
            <a href="#agents" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-300 hover:bg-gray-50 font-semibold text-lg">See all agents</a>
          </div>
          <p className="mt-6 text-sm text-gray-400">14-day free trial · No credit card required</p>
        </div>
      </section>

      <div className="border-y border-gray-100 py-8 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400 font-medium">
          {["500+ companies", "10M+ messages handled", "99.9% uptime", "SOC2 compliant"].map((s) => (<div key={s} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" />{s}</div>))}
        </div>
      </div>

      <section id="agents" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">Your AI workforce</h2><p className="text-xl text-gray-500 max-w-2xl mx-auto">Six specialized agents working in concert — routing tasks, sharing context, and executing actions automatically.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.map((agent) => (<div key={agent.name} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all group"><div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center mb-4"><agent.icon className="w-6 h-6 text-blue-600" /></div><h3 className="font-semibold text-gray-900 mb-2">{agent.name}</h3><p className="text-gray-500 text-sm leading-relaxed">{agent.desc}</p></div>))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for real business operations</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">Not another toy AI wrapper. NexusAI is a production-grade system with the architecture to handle your company's actual workflows.</p>
              <ul className="space-y-4">{FEATURES.map((f) => (<li key={f} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-gray-700">{f}</span></li>))}</ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100"><div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div><div><div className="text-sm font-semibold text-gray-900">NexusAI</div><div className="text-xs text-green-500">Online · All agents active</div></div></div>
              <div className="space-y-3">
                {[
                  { from: "user", text: "Schedule a meeting with Sarah from Acme Corp for next Tuesday at 2pm" },
                  { from: "ai", text: "I've checked the calendar — Tuesday 2pm is free. I'll create a 30-minute meeting with Sarah (sarah@acme.com) and send her an invitation. Should I include a video call link?" },
                  { from: "user", text: "Yes, add Google Meet" },
                  { from: "ai", text: "Done! Meeting created: \"Sync with Sarah — Acme Corp\" on Tuesday at 2:00 PM. Google Meet link added and invitation sent. I've also created a task to prepare the agenda." },
                ].map((m, i) => (<div key={i} className={`flex ${m.from==="user"?"justify-end":"justify-start"}`}><div className={`max-w-xs text-sm px-4 py-2.5 rounded-2xl ${m.from==="user"?"bg-blue-600 text-white rounded-br-sm":"bg-gray-100 text-gray-800 rounded-bl-sm"}`}>{m.text}</div></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-8">Integrates with your existing tools</p>
          <div className="flex flex-wrap items-center justify-center gap-8">{["Gmail","Google Calendar","WhatsApp Business","Stripe","Slack"].map((tool)=>(<div key={tool} className="flex items-center gap-2 text-gray-500"><Shield className="w-4 h-4" /><span className="font-medium">{tool}</span></div>))}</div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2><p className="text-xl text-gray-500">Start free, scale as you grow.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (<div key={plan.name} className={`rounded-2xl p-8 ${plan.popular?"bg-blue-600 text-white ring-4 ring-blue-600/20":"bg-white border border-gray-200"}`}>
              {plan.popular && <div className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-2">Most popular</div>}
              <div className={`text-lg font-semibold mb-1 ${plan.popular?"text-white":"text-gray-900"}`}>{plan.name}</div>
              <div className={`text-sm mb-4 ${plan.popular?"text-blue-200":"text-gray-400"}`}>{plan.description}</div>
              <div className="flex items-baseline gap-1 mb-6"><span className={`text-4xl font-bold ${plan.popular?"text-white":"text-gray-900"}`}>{plan.price}</span><span className={plan.popular?"text-blue-200":"text-gray-400"}>{plan.period}</span></div>
              <ul className="space-y-3 mb-8">{plan.features.map((f)=>(<li key={f} className="flex items-center gap-2 text-sm"><CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.popular?"text-blue-200":"text-green-500"}`} /><span className={plan.popular?"text-blue-100":"text-gray-600"}>{f}</span></li>))}</ul>
              <Link href="/register" className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors ${plan.popular?"bg-white text-blue-600 hover:bg-blue-50":"bg-blue-600 text-white hover:bg-blue-700"}`}>{plan.cta}</Link>
            </div>))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to build your AI workforce?</h2>
          <p className="text-blue-200 text-xl mb-8">Join 500+ companies using NexusAI to run their operations.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50">Start your free trial <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center"><Bot className="w-3 h-3 text-white" /></div><span className="font-semibold text-gray-900">NexusAI</span></div>
          <p className="text-sm text-gray-400">© 2025 NexusAI. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400"><a href="#" className="hover:text-gray-600">Privacy</a><a href="#" className="hover:text-gray-600">Terms</a><a href="#" className="hover:text-gray-600">Status</a></div>
        </div>
      </footer>
    </div>
  );
}
