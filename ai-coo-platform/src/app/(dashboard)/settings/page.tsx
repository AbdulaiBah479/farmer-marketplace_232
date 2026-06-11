'use client'
import { useState } from 'react'
import { Settings, User, Building2, Users, CreditCard, Puzzle, Key, Shield, Camera, Check, Plus, Trash2, Eye, EyeOff, Copy } from 'lucide-react'

type SettingsTab = 'profile' | 'organization' | 'team' | 'billing' | 'integrations' | 'api' | 'security'

const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  { id: 'organization', label: 'Organization', icon: <Building2 className="w-4 h-4" /> },
  { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'integrations', label: 'Integrations', icon: <Puzzle className="w-4 h-4" /> },
  { id: 'api', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
]

const teamMembers = [
  { id: 1, name: 'Sarah Miller', email: 'sarah@company.com', role: 'Owner', avatar: 'SM', color: 'bg-violet-500/30 text-violet-300', lastActive: 'Active now' },
  { id: 2, name: 'James Wilson', email: 'james@company.com', role: 'Admin', avatar: 'JW', color: 'bg-blue-500/30 text-blue-300', lastActive: '2 hours ago' },
  { id: 3, name: 'Aisha Rahman', email: 'aisha@company.com', role: 'Member', avatar: 'AR', color: 'bg-emerald-500/30 text-emerald-300', lastActive: '1 day ago' },
  { id: 4, name: 'Marcus Chen', email: 'marcus@company.com', role: 'Admin', avatar: 'MC', color: 'bg-orange-500/30 text-orange-300', lastActive: '3 hours ago' },
  { id: 5, name: 'Elena Torres', email: 'elena@company.com', role: 'Member', avatar: 'ET', color: 'bg-pink-500/30 text-pink-300', lastActive: 'Active now' },
]

const integrations = [
  { id: 1, name: 'Slack', description: 'Send notifications and updates to Slack channels', category: 'Communication', connected: true, icon: '💬' },
  { id: 2, name: 'HubSpot', description: 'Sync contacts and deals with HubSpot CRM', category: 'CRM', connected: false, icon: '🔶' },
  { id: 3, name: 'Zapier', description: 'Connect with 5,000+ apps via Zapier automations', category: 'Automation', connected: true, icon: '⚡' },
  { id: 4, name: 'Stripe', description: 'Process payments and manage subscriptions', category: 'Finance', connected: true, icon: '💳' },
  { id: 5, name: 'Google Workspace', description: 'Integrate with Gmail, Calendar, and Drive', category: 'Productivity', connected: false, icon: '🔷' },
  { id: 6, name: 'LinkedIn', description: 'Import leads and publish content to LinkedIn', category: 'Social', connected: true, icon: '💼' },
  { id: 7, name: 'Salesforce', description: 'Bidirectional sync with Salesforce CRM', category: 'CRM', connected: false, icon: '☁️' },
  { id: 8, name: 'Notion', description: 'Sync notes and projects with Notion workspace', category: 'Productivity', connected: false, icon: '📝' },
]

const apiKeys = [
  { id: 1, name: 'Production API Key', key: 'sk-live-...xK9m', created: 'Oct 1, 2024', lastUsed: '2 min ago', permissions: 'Full Access' },
  { id: 2, name: 'Development API Key', key: 'sk-dev-...pL2n', created: 'Sep 15, 2024', lastUsed: '1 day ago', permissions: 'Read Only' },
  { id: 3, name: 'Webhook Secret', key: 'whsec-...qR7k', created: 'Sep 1, 2024', lastUsed: '5 min ago', permissions: 'Webhooks' },
]

const plans = [
  { name: 'Starter', price: 49, features: ['5 users', '1,000 AI credits/mo', 'Basic modules'], current: false },
  { name: 'Growth', price: 149, features: ['15 users', '10,000 AI credits/mo', 'All modules', 'Priority support'], current: true },
  { name: 'Enterprise', price: 499, features: ['Unlimited users', 'Unlimited AI credits', 'Custom integrations', 'Dedicated CSM'], current: false },
]

function InputField({ label, defaultValue, type = 'text', placeholder = '' }: { label: string; defaultValue?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1.5 block">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
      />
    </div>
  )
}

function SaveButton() {
  const [saved, setSaved] = useState(false)
  return (
    <button
      onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90'}`}
    >
      {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
    </button>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [showKey, setShowKey] = useState<Record<number, boolean>>({})
  const [integrationStates, setIntegrationStates] = useState<Record<number, boolean>>(
    Object.fromEntries(integrations.map(i => [i.id, i.connected]))
  )

  const toggleIntegration = (id: number) => {
    setIntegrationStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-violet-400" />
          Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account, organization, and platform preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center text-xl font-bold text-violet-300">
                    SM
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center border-2 border-[#0f1117] hover:bg-violet-500 transition-colors">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <div>
                  <p className="text-white font-medium">Sarah Miller</p>
                  <p className="text-sm text-gray-500">sarah@company.com</p>
                  <button className="text-xs text-violet-400 hover:text-violet-300 mt-1 transition-colors">Change photo</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" defaultValue="Sarah" />
                <InputField label="Last Name" defaultValue="Miller" />
                <InputField label="Email" defaultValue="sarah@company.com" type="email" />
                <InputField label="Phone" defaultValue="+1 555-0100" />
                <div className="col-span-2">
                  <InputField label="Job Title" defaultValue="CEO & Co-founder" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 mb-1.5 block">Bio</label>
                  <textarea defaultValue="Building the future of AI-powered business operations." rows={3} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-colors resize-none" />
                </div>
              </div>
              <div className="flex justify-end">
                <SaveButton />
              </div>
            </div>
          )}

          {/* Organization */}
          {activeTab === 'organization' && (
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Organization Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <InputField label="Company Name" defaultValue="AI COO Platform Inc." />
                </div>
                <InputField label="Website" defaultValue="https://aicoo.platform" />
                <InputField label="Industry" defaultValue="SaaS / AI" />
                <InputField label="Company Size" defaultValue="11-50 employees" />
                <InputField label="Timezone" defaultValue="America/New_York (EST)" />
                <div className="col-span-2">
                  <InputField label="Address" defaultValue="100 Tech Street, San Francisco, CA 94105" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 mb-1.5 block">Company Description</label>
                  <textarea defaultValue="AI-powered operations platform helping businesses automate workflows, generate leads, and scale faster." rows={3} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-colors resize-none" />
                </div>
              </div>
              <div className="flex justify-end">
                <SaveButton />
              </div>
            </div>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <h2 className="text-sm font-semibold text-white">Team Members ({teamMembers.length})</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-medium hover:opacity-90 transition-opacity">
                    <Plus className="w-3.5 h-3.5" />
                    Invite Member
                  </button>
                </div>
                <div className="divide-y divide-white/5">
                  {teamMembers.map(m => (
                    <div key={m.id} className="flex items-center gap-4 px-5 py-4">
                      <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>{m.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.email} · {m.lastActive}</p>
                      </div>
                      <select defaultValue={m.role} className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-violet-500 transition-colors">
                        <option>Owner</option>
                        <option>Admin</option>
                        <option>Member</option>
                        <option>Viewer</option>
                      </select>
                      {m.role !== 'Owner' && (
                        <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-4">
                <p className="text-sm text-gray-400">Your Growth plan includes up to 15 team members. You&apos;re using <span className="text-white font-medium">{teamMembers.length} of 15</span>.</p>
              </div>
            </div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {plans.map(plan => (
                  <div key={plan.name} className={`rounded-2xl p-5 border transition-all ${plan.current ? 'border-violet-500/40 bg-violet-500/10' : 'border-white/5 bg-gray-900/50 hover:border-white/10'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold">{plan.name}</h3>
                      {plan.current && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">Current</span>}
                    </div>
                    <p className="text-2xl font-bold text-white mb-4">${plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                    <ul className="space-y-1.5 mb-5">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {!plan.current && (
                      <button className={`w-full py-2 rounded-xl text-xs font-medium transition-all ${plan.price > 149 ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90' : 'border border-white/10 text-gray-400 hover:bg-white/5'}`}>
                        {plan.price > 149 ? 'Upgrade' : 'Downgrade'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Payment Method</h3>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-white">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/2026</p>
                  </div>
                  <button className="ml-auto text-xs text-violet-400 hover:text-violet-300 transition-colors">Update</button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="grid grid-cols-2 gap-3">
              {integrations.map(integration => {
                const connected = integrationStates[integration.id]
                return (
                  <div key={integration.id} className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                        {integration.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-sm font-medium text-white">{integration.name}</p>
                          <button
                            onClick={() => toggleIntegration(integration.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-all ${connected
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                              : 'bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20'}`}
                          >
                            {connected ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">{integration.description}</p>
                        <span className="text-[10px] text-gray-600 mt-1 block">{integration.category}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* API Keys */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <h2 className="text-sm font-semibold text-white">API Keys</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-medium hover:opacity-90 transition-opacity">
                    <Plus className="w-3.5 h-3.5" />
                    Generate New Key
                  </button>
                </div>
                <div className="divide-y divide-white/5">
                  {apiKeys.map(k => (
                    <div key={k.id} className="px-5 py-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-white">{k.name}</p>
                          <p className="text-xs text-gray-500">Created {k.created} · Last used {k.lastUsed}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">{k.permissions}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="flex-1 px-3 py-2 bg-black/30 rounded-lg text-xs font-mono text-gray-400 border border-white/5">
                          {showKey[k.id] ? `sk-live-abcdefghijklmnop${k.key.slice(-4)}` : k.key}
                        </code>
                        <button
                          onClick={() => setShowKey(prev => ({ ...prev, [k.id]: !prev[k.id] }))}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all"
                        >
                          {showKey[k.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4">
                <p className="text-sm text-amber-400 font-medium mb-1">Security Notice</p>
                <p className="text-xs text-gray-400">Never share your API keys publicly or commit them to version control. Rotate keys immediately if compromised.</p>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 space-y-5">
                <h2 className="text-lg font-semibold text-white">Security Settings</h2>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Password</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Current Password" type="password" placeholder="••••••••••••" />
                    <div />
                    <InputField label="New Password" type="password" placeholder="••••••••••••" />
                    <InputField label="Confirm New Password" type="password" placeholder="••••••••••••" />
                  </div>
                  <button className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 text-sm hover:bg-white/5 transition-all">
                    Update Password
                  </button>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <p className="text-sm font-medium text-white">Authenticator App</p>
                      <p className="text-xs text-gray-500">Use Google Authenticator or similar app</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:opacity-90 transition-opacity">Enable 2FA</button>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Active Sessions</h3>
                  <div className="space-y-2">
                    {[
                      { device: 'MacBook Pro — Chrome', location: 'San Francisco, CA', current: true, time: 'Active now' },
                      { device: 'iPhone 15 — Safari', location: 'San Francisco, CA', current: false, time: '2 hours ago' },
                      { device: 'Windows PC — Edge', location: 'New York, NY', current: false, time: '3 days ago' },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <p className="text-sm text-white">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.location} · {session.time}</p>
                        </div>
                        {session.current
                          ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Current</span>
                          : <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Revoke</button>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
