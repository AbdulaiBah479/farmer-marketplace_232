import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/client";
import { createTenant, upsertUser } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  try {
    const { userId, companyName, slug, ownerName, email } = await req.json();
    if (!userId || !companyName || !slug) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    const { data: existingTenant } = await supabaseAdmin.from("tenants").select("id").eq("slug", slug).single();
    const finalSlug = existingTenant ? `${slug}-${Date.now()}` : slug;
    const tenant = await createTenant({ name: companyName, slug: finalSlug, plan: "starter", subscription_status: "trialing", trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() });
    await upsertUser({ id: userId, tenant_id: tenant.id, email, full_name: ownerName, role: "owner", is_active: true });
    return NextResponse.json({ tenantId: tenant.id, slug: finalSlug }, { status: 201 });
  } catch (err) {
    console.error("[onboarding/setup] Error:", err);
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}
