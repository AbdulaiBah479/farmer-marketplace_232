import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById, getAnalyticsSummary } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
export const metadata = { title: "Analytics" };
export default async function AnalyticsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) redirect("/login");
  const [tenant, analytics] = await Promise.all([getTenantById(dbUser.tenant_id), getAnalyticsSummary(dbUser.tenant_id, 30)]);
  if (!tenant) redirect("/login");
  return <AnalyticsDashboard tenant={tenant} analytics={analytics} />;
}
