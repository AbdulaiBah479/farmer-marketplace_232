import { NextRequest, NextResponse } from "next/server";
import { exchangeGoogleCode } from "@/lib/integrations/gmail";
import { upsertIntegration } from "@/lib/db/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  if (error || !code || !state) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?google=error`);
  try {
    const { tenantId } = JSON.parse(Buffer.from(state, "base64").toString());
    const tokens = await exchangeGoogleCode(code);
    await upsertIntegration({ tenant_id: tenantId, provider: "google", is_active: true, access_token: tokens.access_token ?? undefined, refresh_token: tokens.refresh_token ?? undefined, token_expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : undefined, scopes: ["gmail.readonly", "gmail.send", "calendar", "userinfo.email"] });
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?google=connected`);
  } catch (err) { return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?google=error`); }
}
