import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById } from "@/lib/db/queries";
import { getGoogleAuthUrl } from "@/lib/integrations/gmail";

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) return NextResponse.json({ error: "No tenant" }, { status: 403 });
  const state = Buffer.from(JSON.stringify({ tenantId: dbUser.tenant_id, userId: user.id })).toString("base64");
  return NextResponse.redirect(getGoogleAuthUrl(state));
}
