import Link from 'next/link'
import { Brain, CheckCircle2 } from 'lucide-react'

const plans = [
  { id: 'free', name: 'Free', price: '$0/mo', desc: '3 modules, 100 credits' },
  { id: 'starter', name: 'Starter', price: '$29/mo', desc: 'All modules, 1K credits' },
  { id: 'professional', name: 'Professional', price: '$79/mo', desc: '5K credits, API access', popular: true },
  { id: 'agency', name: 'Agency', price: '$199/mo', desc: '20K credits, white-label' },
]

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%)]" />
      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">AI COO</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6 mb-2">Create your account</h1>
          <p className="text-gray-400">Start your 14-day free trial. No credit card required.</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-2xl p-8">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all text-sm font-medium">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Sign up with GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-500">
              <span className="bg-gray-900 px-3">or sign up with email</span>
            </div>
          </div>

          {/* Sign-up Form */}
          <form className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">First name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Last name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Work email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Confirm password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
              />
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Choose your plan</label>
              <div className="grid grid-cols-2 gap-2">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`relative flex flex-col gap-0.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      plan.popular
                        ? 'border-violet-500/60 bg-violet-600/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      defaultChecked={plan.popular}
                      className="sr-only"
                    />
                    {plan.popular && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-semibold">
                        Popular
                      </span>
                    )}
                    <span className="text-sm font-semibold text-white">{plan.name}</span>
                    <span className="text-xs font-medium text-violet-400">{plan.price}</span>
                    <span className="text-[11px] text-gray-500">{plan.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Benefits reminder */}
            <div className="rounded-xl bg-violet-500/5 border border-violet-500/20 p-3 space-y-1.5">
              {[
                '14-day free trial on all paid plans',
                'No credit card required to start',
                'Cancel or downgrade anytime',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs text-gray-400">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                  Privacy Policy
                </Link>
                . I consent to receive product updates and announcements (unsubscribe anytime).
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity text-sm shadow-lg shadow-violet-500/25"
            >
              Create Free Account
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
