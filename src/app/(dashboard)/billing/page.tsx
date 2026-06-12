import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import BillingPage from "@/components/layout/BillingPage";
export const metadata = { title: "Billing" };
export default async function Billing() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) redirect("/login");
  const tenant = await getTenantById(dbUser.tenant_id);
  if (!tenant) redirect("/login");
  return <BillingPage tenant={tenant} user={dbUser} />;
}
