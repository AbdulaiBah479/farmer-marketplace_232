import { stripe, createCheckoutSession, STRIPE_PLANS, StripePlan } from '@/lib/stripe'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session?.user?.organizationId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan, interval = 'month' } = await req.json()

    if (!plan || !STRIPE_PLANS[plan as StripePlan]) {
      return Response.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const checkoutSession = await createCheckoutSession({
      organizationId: session.user.organizationId,
      userId: session.user.id,
      plan: plan as StripePlan,
      interval,
      successUrl: `${appUrl}/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/settings/billing?canceled=true`,
    })

    return Response.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
