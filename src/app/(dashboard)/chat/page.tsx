import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById, listConversations } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/chat/ChatInterface";
export const metadata = { title: "AI Chat" };
export default async function ChatPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) redirect("/login");
  const [tenant, conversations] = await Promise.all([getTenantById(dbUser.tenant_id), listConversations(dbUser.tenant_id, 30)]);
  if (!tenant) redirect("/login");
  return <ChatInterface tenant={tenant} user={dbUser} initialConversations={conversations} />;
}
