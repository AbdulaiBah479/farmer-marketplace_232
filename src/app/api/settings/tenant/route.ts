import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, updateTenant } from "@/lib/db/queries";

export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id || !["owner", "admin"].includes(dbUser.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { name, timezone } = await req.json();
  await updateTenant(dbUser.tenant_id, { name, timezone });
  return NextResponse.json({ updated: true });
}
