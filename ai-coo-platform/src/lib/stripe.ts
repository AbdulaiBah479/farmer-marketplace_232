import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  appInfo: {
    name: 'AI COO',
    version: '1.0.0',
  },
})

export const STRIPE_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    yearlyPrice: 0,
    stripePriceId: null,
    stripeYearlyPriceId: null,
    features: [
      '1 workspace',
      '3 AI modules',
      '100 AI credits/month',
      '1 team member',
      'Basic analytics',
      'Email support',
    ],
    limits: {
      aiCredits: 100,
      seats: 1,
      leads: 50,
      contacts: 100,
      projects: 3,
      automations: 1,
    },
  },
  STARTER: {
    id: 'starter',
    name: 'Starter',
    price: 29,
    yearlyPrice: 290,
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID,
    stripeYearlyPriceId: process.env.STRIPE_STARTER_YEARLY_PRICE_ID,
    features: [
      '3 workspaces',
      'All 15 AI modules',
      '1,000 AI credits/month',
      '3 team members',
      'Advanced analytics',
      'Email campaigns',
      'Priority support',
    ],
    limits: {
      aiCredits: 1000,
      seats: 3,
      leads: 500,
      contacts: 1000,
      projects: 20,
      automations: 10,
    },
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    price: 79,
    yearlyPrice: 790,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    stripeYearlyPriceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
    features: [
      'Unlimited workspaces',
      'All 15 AI modules',
      '5,000 AI credits/month',
      '10 team members',
      'Custom AI training',
      'API access',
      'Integrations',
      'Dedicated support',
    ],
    limits: {
      aiCredits: 5000,
      seats: 10,
      leads: -1,
      contacts: -1,
      projects: -1,
      automations: 50,
    },
  },
  AGENCY: {
    id: 'agency',
    name: 'Agency',
    price: 199,
    yearlyPrice: 1990,
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID,
    stripeYearlyPriceId: process.env.STRIPE_AGENCY_YEARLY_PRICE_ID,
    features: [
      'Unlimited workspaces',
      'All 15 AI modules',
      '20,000 AI credits/month',
      '25 team members',
      'White-label options',
      'Client portal',
      'Custom branding',
      'SLA support',
    ],
    limits: {
      aiCredits: 20000,
      seats: 25,
      leads: -1,
      contacts: -1,
      projects: -1,
      automations: -1,
    },
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    yearlyPrice: 4990,
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    stripeYearlyPriceId: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
    features: [
      'Unlimited everything',
      'Custom AI models',
      'Unlimited AI credits',
      'Unlimited team members',
      'Full white-label',
      'Custom integrations',
      'On-premise option',
      '24/7 dedicated support',
      'Custom SLA',
      'SSO/SAML',
    ],
    limits: {
      aiCredits: -1,
      seats: -1,
      leads: -1,
      contacts: -1,
      projects: -1,
      automations: -1,
    },
  },
} as const

export type StripePlan = keyof typeof STRIPE_PLANS

export async function createCheckoutSession({
  organizationId,
  userId,
  plan,
  interval = 'month',
  successUrl,
  cancelUrl,
}: {
  organizationId: string
  userId: string
  plan: StripePlan
  interval?: 'month' | 'year'
  successUrl: string
  cancelUrl: string
}) {
  const planConfig = STRIPE_PLANS[plan]
  const priceId = interval === 'year' ? planConfig.stripeYearlyPriceId : planConfig.stripePriceId

  if (!priceId) throw new Error('Invalid plan or price ID not configured')

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { organizationId, userId, plan, interval },
    subscription_data: {
      trial_period_days: 14,
      metadata: { organizationId, userId, plan },
    },
    allow_promotion_codes: true,
  })

  return session
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
