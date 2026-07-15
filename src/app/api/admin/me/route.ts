import { getIsAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await getIsAdminAuthenticated();
  return Response.json({ authenticated: authed });
}
