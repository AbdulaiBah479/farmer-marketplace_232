'use client'
import { useState } from 'react'
import { Settings, User, Building2, Users, CreditCard, Puzzle, Key, Shield, Camera, Check, Plus, Trash2, Eye, EyeOff, Copy } from 'lucide-react'

type Tab = 'Profile' | 'Organization' | 'Team Members' | 'Billing' | 'Integrations' | 'API Keys' | 'Security'

const teamMembers = [
  { id: 1, name: 'Alex Rivera', email: 'alex@aicoo.io', role: 'Owner', avatar: 'AR', color: 'bg-violet-500', status: 'Active' },
  { id: 2, name: 'Sarah Kim', email: 'sarah@aicoo.io', role: 'Admin', avatar: 'SK', color: 'bg-indigo-500', status: 'Active' },
  { id: 3, name: 'Marcus Lee', email: 'marcus@aicoo.io', role: 'Member', avatar: 'ML', color: 'bg-blue-500', status: 'Active' },
  { id: 4, name: 'Priya Sharma', email: 'priya@aicoo.io', role: 'Member', avatar: 'PS', color: 'bg-emerald-500', status: 'Active' },
  { id: 5, name: 'Tom Walsh', email: 'tom@aicoo.io', role: 'Member', avatar: 'TW', color: 'bg-amber-500', status: 'Pending' },
]

const integrations = [
  { name: 'Slack', desc: 'Team notifications and alerts', connected: true, icon: '💬', color: 'bg-purple-500/10 border-purple-500/20' },
  { name: 'HubSpot', desc: 'CRM sync and lead management', connected: true, icon: '🔶', color: 'bg-orange-500/10 border-orange-500/20' },
  { name: 'Stripe', desc: 'Payment processing and invoices', connected: true, icon: '💳', color: 'bg-blue-500/10 border-blue-500/20' },
  { name: 'Google Workspace', desc: 'Calendar, Gmail, and Drive sync', connected: false, icon: '📧', color: 'bg-red-500/10 border-red-500/20' },
  { name: 'Zapier', desc: 'Connect 5,000+ apps automatically', connected: false, icon: '⚡', color: 'bg-amber-500/10 border-amber-500/20' },
  { name: 'Notion', desc: 'Knowledge base and documentation', connected: false, icon: '📝', color: 'bg-gray-500/10 border-gray-500/20' },
]

const apiKeys = [
  { id: 'key_1', name: 'Production API Key', key: 'sk-aicoo-prod-••••••••••••••••XJ92', created: 'Jan 15, 2026', lastUsed: '2 min ago' },
  { id: 'key_2', name: 'Development API Key', key: 'sk-aicoo-dev-••••••••••••••••F7KP', created: 'Mar 3, 2026', lastUsed: '2 days ago' },
]

const tabs: { id: Tab; icon: any }[] = [
  { id: 'Profile', icon: User },
  { id: 'Organization', icon: Building2 },
  { id: 'Team Members', icon: Users },
  { id: 'Billing', icon: CreditCard },
  { id: 'Integrations', icon: Puzzle },
  { id: 'API Keys', icon: Key },
  { id: 'Security', icon: Shield },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile')
  const [saved, setSaved] = useState(false)
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})
  const [integrationsList, setIntegrationsList] = useState(integrations)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleIntegration = (name: string) => {
    setIntegrationsList(prev => prev.map(i => i.name === name ? { ...i, connected: !i.connected } : i))
  }

  return (
    <div className="min-h-screen bg-[#030712] p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-violet-400" />
          Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account, team, and platform preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Nav */}
        <div className="w-52 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <t.icon className="w-4 h-4" />
                {t.id}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-900/50 border border-white/5 rounded-2xl p-6">
          {/* Profile Tab */}
          {activeTab === 'Profile' && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold text-lg">Profile Settings</h2>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white">AR</div>
                  <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-gray-800 border border-white/10 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Camera className="w-3.5 h-3.5 text-gray-300" />
                  </button>
                </div>
                <div>
                  <p className="text-white font-medium">Alex Rivera</p>
                  <p className="text-sm text-gray-500">alex@aicoo.io</p>
                  <button className="text-xs text-violet-400 hover:text-violet-300 mt-1">Change avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'First Name', placeholder: 'Alex', value: 'Alex' },
                  { label: 'Last Name', placeholder: 'Rivera', value: 'Rivera' },
                  { label: 'Email Address', placeholder: 'alex@aicoo.io', value: 'alex@aicoo.io' },
                  { label: 'Phone Number', placeholder: '+1 (555) 000-0000', value: '+1 (415) 234-5678' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs text-gray-500 mb-1.5 block">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 mb-1.5 block">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Founder & CEO at AI COO Platform. Building the future of business operations."
                    className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Timezone</label>
                  <select className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500">
                    <option>America/New_York (EST)</option>
                    <option>America/Los_Angeles (PST)</option>
                    <option>Europe/London (GMT)</option>
                    <option>Asia/Tokyo (JST)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Language</label>
                  <select className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-violet-500">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90'}`}
              >
                {saved ? <><Check className="w-4 h-4" />Saved!</> : 'Save Changes'}
              </button>
            </div>
          )}

          {/* Organization Tab */}
          {activeTab === 'Organization' && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold text-lg">Organization Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Company Name', value: 'AI COO Platform Inc.' },
                  { label: 'Website', value: 'https://aicoo.io' },
                  { label: 'Industry', value: 'SaaS / Technology' },
                  { label: 'Company Size', value: '11-50 employees' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs text-gray-500 mb-1.5 block">{f.label}</label>
                    <input defaultValue={f.value} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-colors" />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 mb-1.5 block">Business Address</label>
                  <input defaultValue="123 Market Street, Suite 400, San Francisco, CA 94105" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
              </div>
              <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90'}`}>
                {saved ? <><Check className="w-4 h-4" />Saved!</> : 'Save Changes'}
              </button>
            </div>
          )}

          {/* Team Members Tab */}
          {activeTab === 'Team Members' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold text-lg">Team Members</h2>
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-600/20 border border-violet-500/20 text-violet-300 text-sm hover:bg-violet-600/30 transition-all">
                  <Plus className="w-4 h-4" /> Invite Member
                </button>
              </div>
              <div className="space-y-2">
                {teamMembers.map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-3.5 bg-black/20 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    <div className={`w-9 h-9 rounded-xl ${m.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>{m.avatar}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.email}</p>
                    </div>
                    <select defaultValue={m.role} className="px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-300 focus:outline-none">
                      <option>Owner</option>
                      <option>Admin</option>
                      <option>Member</option>
                      <option>Viewer</option>
                    </select>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium ${m.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{m.status}</span>
                    {m.role !== 'Owner' && (
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'Billing' && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold text-lg">Billing & Plan</h2>
              <div className="bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-violet-400 font-medium uppercase tracking-wider">Current Plan</p>
                    <h3 className="text-xl font-bold text-white mt-1">Pro Plan</h3>
                    <p className="text-sm text-gray-400 mt-0.5">$149/month · Billed annually</p>
                  </div>
                  <span className="bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs px-2.5 py-1 rounded-lg font-medium">Active</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { label: 'AI Requests', used: '8,240', total: '10,000' },
                    { label: 'Team Members', used: '5', total: '10' },
                    { label: 'Storage', used: '14.2 GB', total: '50 GB' },
                  ].map(u => (
                    <div key={u.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{u.label}</span>
                        <span>{u.used} / {u.total}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(parseFloat(u.used) / parseFloat(u.total)) * 100 || 50}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 rounded-xl bg-white/10 text-white text-sm hover:bg-white/15 transition-all">Upgrade to Enterprise</button>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Payment Method</h3>
                <div className="flex items-center gap-3 p-4 bg-black/20 border border-white/5 rounded-xl">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-white">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 08/2028</p>
                  </div>
                  <button className="ml-auto text-xs text-violet-400 hover:text-violet-300">Update</button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'Integrations' && (
            <div className="space-y-5">
              <h2 className="text-white font-semibold text-lg">Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {integrationsList.map(int => (
                  <div key={int.name} className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${int.connected ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-black/20 border-white/5'}`}>
                    <div className={`w-10 h-10 rounded-xl border ${int.color} flex items-center justify-center text-xl flex-shrink-0`}>{int.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{int.name}</p>
                      <p className="text-xs text-gray-500">{int.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleIntegration(int.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${int.connected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20' : 'bg-violet-600/20 text-violet-300 border border-violet-500/20 hover:bg-violet-600/30'}`}
                    >
                      {int.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'API Keys' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold text-lg">API Keys</h2>
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-600/20 border border-violet-500/20 text-violet-300 text-sm hover:bg-violet-600/30 transition-all">
                  <Plus className="w-4 h-4" /> Create Key
                </button>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                <p className="text-xs text-amber-400">Never share your API keys publicly. Store them in environment variables.</p>
              </div>
              <div className="space-y-3">
                {apiKeys.map(k => (
                  <div key={k.id} className="bg-black/20 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">{k.name}</p>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2">
                      <Key className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <code className="text-xs text-gray-400 font-mono flex-1">
                        {showKey[k.id] ? k.key.replace(/•+/, 'a1b2c3d4e5f6g7h8') : k.key}
                      </code>
                      <button onClick={() => setShowKey(prev => ({ ...prev, [k.id]: !prev[k.id] }))} className="text-gray-500 hover:text-white">
                        {showKey[k.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button className="text-gray-500 hover:text-white">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-[10px] text-gray-600">Created {k.created}</span>
                      <span className="text-[10px] text-gray-600">Last used {k.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <h2 className="text-white font-semibold text-lg">Security Settings</h2>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Change Password</h3>
                <div className="space-y-3">
                  {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                    <div key={label}>
                      <label className="text-xs text-gray-500 mb-1.5 block">{label}</label>
                      <input type="password" placeholder="••••••••••" className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90">Update Password</button>
              </div>
              <div>
                <div className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/20 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-all">Enable 2FA</button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-white">Active Sessions</p>
                    <p className="text-xs text-gray-500 mt-0.5">2 devices currently signed in</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all">Revoke All</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
