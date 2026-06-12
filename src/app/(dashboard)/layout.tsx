import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/db/client";
import { getUserById, getTenantById } from "@/lib/db/queries";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id);
  if (!dbUser?.tenant_id) redirect("/login");
  const tenant = await getTenantById(dbUser.tenant_id);
  if (!tenant) redirect("/login");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar tenant={tenant} user={dbUser} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar tenant={tenant} user={dbUser} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
