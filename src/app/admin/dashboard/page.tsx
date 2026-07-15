import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/auth";
import AdminDashboard from "@/components/AdminDashboard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Le Mans AutoWorks Admin",
};

export default async function AdminDashboardPage() {
  const authed = await getIsAdminAuthenticated();
  if (!authed) {
    redirect("/admin");
  }

  return <AdminDashboard />;
}
