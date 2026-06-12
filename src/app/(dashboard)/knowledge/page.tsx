import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById, listKnowledgeDocuments } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import KnowledgeBase from "@/components/knowledge/KnowledgeBase";
export const metadata = { title: "Knowledge Base" };
export default async function KnowledgePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) redirect("/login");
  const [tenant, documents] = await Promise.all([getTenantById(dbUser.tenant_id), listKnowledgeDocuments(dbUser.tenant_id)]);
  if (!tenant) redirect("/login");
  return <KnowledgeBase tenant={tenant} initialDocuments={documents} />;
}
