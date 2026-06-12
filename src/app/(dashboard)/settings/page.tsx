import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById, getIntegration } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import SettingsPage from "@/components/layout/SettingsPage";
export const metadata = { title: "Settings" };
export default async function Settings() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) redirect("/login");
  const [tenant, googleIntegration, whatsappIntegration] = await Promise.all([getTenantById(dbUser.tenant_id), getIntegration(dbUser.tenant_id, "google"), getIntegration(dbUser.tenant_id, "whatsapp")]);
  if (!tenant) redirect("/login");
  return <SettingsPage tenant={tenant} user={dbUser} googleConnected={googleIntegration?.is_active ?? false} whatsappConnected={whatsappIntegration?.is_active ?? false} />;
}
