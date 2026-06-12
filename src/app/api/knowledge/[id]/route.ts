import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, supabaseAdmin } from "@/lib/db/client";
import { getUserById } from "@/lib/db/queries";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) return NextResponse.json({ error: "No tenant" }, { status: 403 });
  const { id } = await params;
  const { data: doc } = await supabaseAdmin.from("knowledge_documents").select("id").eq("id", id).eq("tenant_id", dbUser.tenant_id).single();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await supabaseAdmin.from("knowledge_documents").delete().eq("id", id);
  return NextResponse.json({ deleted: true });
}
