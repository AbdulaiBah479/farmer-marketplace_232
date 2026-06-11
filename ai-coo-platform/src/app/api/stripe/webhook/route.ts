import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const { organizationId, plan } = subscription.metadata

        if (organizationId) {
          await db.subscription.update({
            where: { organizationId },
            data: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0]?.price.id,
              status: subscription.status === 'active' ? 'ACTIVE'
                : subscription.status === 'trialing' ? 'TRIALING'
                : subscription.status === 'past_due' ? 'PAST_DUE'
                : subscription.status === 'canceled' ? 'CANCELED'
                : 'PAUSED',
              plan: (plan || 'FREE') as any,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { organizationId } = subscription.metadata

        if (organizationId) {
          await db.subscription.update({
            where: { organizationId },
            data: { status: 'CANCELED', plan: 'FREE' },
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('Payment succeeded for invoice:', invoice.id)
        break
      }
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

export const config = {
  api: { bodyParser: false },
}
