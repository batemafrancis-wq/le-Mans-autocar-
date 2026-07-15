import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/auth";
import AdminLoginForm from "@/components/AdminLoginForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login | Le Mans AutoWorks",
};

export default async function AdminPage() {
  const authed = await getIsAdminAuthenticated();
  if (authed) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}
