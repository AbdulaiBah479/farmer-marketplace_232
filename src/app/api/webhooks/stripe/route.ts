import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/integrations/stripe";
import { updateTenant } from "@/lib/db/queries";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!); }
  catch (err) { return NextResponse.json({ error: "Invalid signature" }, { status: 400 }); }
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const tenantId = session.metadata?.tenant_id;
        const plan = session.metadata?.plan as string;
        if (tenantId && session.subscription) await updateTenant(tenantId, { stripe_subscription_id: session.subscription as string, stripe_customer_id: session.customer as string, plan: plan as "starter" | "professional" | "enterprise", subscription_status: "active" });
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const tenantId = sub.metadata?.tenant_id;
        if (tenantId) await updateTenant(tenantId, { subscription_status: sub.status, plan: (sub.metadata?.plan ?? "starter") as "starter" | "professional" | "enterprise" });
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const tenantId = sub.metadata?.tenant_id;
        if (tenantId) await updateTenant(tenantId, { subscription_status: "cancelled", plan: "starter" });
        break;
      }
    }
    return NextResponse.json({ received: true });
  } catch (err) { return NextResponse.json({ error: "Handler failed" }, { status: 500 }); }
}
