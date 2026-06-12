import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById } from "@/lib/db/queries";
import { createOrRetrieveCustomer, createCheckoutSession, createBillingPortalSession } from "@/lib/integrations/stripe";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) return NextResponse.json({ error: "No tenant" }, { status: 403 });
  const tenant = await getTenantById(dbUser.tenant_id);
  if (!tenant) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  const { priceId, plan, action } = await req.json();
  const customerId = await createOrRetrieveCustomer(dbUser.email, tenant.name, tenant.id);
  if (action === "portal") { const url = await createBillingPortalSession(customerId); return NextResponse.json({ url }); }
  if (!priceId || !plan) return NextResponse.json({ error: "Missing priceId or plan" }, { status: 400 });
  const url = await createCheckoutSession(customerId, priceId, tenant.id, plan);
  return NextResponse.json({ url });
}
