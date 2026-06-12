import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-05-28.basil" });

export async function createOrRetrieveCustomer(email: string, name: string, tenantId: string): Promise<string> {
  const existing = await stripe.customers.search({ query: `metadata['tenant_id']:'${tenantId}'` });
  if (existing.data.length > 0) return existing.data[0].id;
  const customer = await stripe.customers.create({ email, name, metadata: { tenant_id: tenantId } });
  return customer.id;
}

export async function createCheckoutSession(customerId: string, priceId: string, tenantId: string, plan: string): Promise<string> {
  const session = await stripe.checkout.sessions.create({ customer: customerId, mode: "subscription", payment_method_types: ["card"], line_items: [{ price: priceId, quantity: 1 }], success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`, cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?cancelled=true`, metadata: { tenant_id: tenantId, plan }, subscription_data: { metadata: { tenant_id: tenantId, plan } }, allow_promotion_codes: true });
  return session.url!;
}

export async function createBillingPortalSession(customerId: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing` });
  return session.url;
}
