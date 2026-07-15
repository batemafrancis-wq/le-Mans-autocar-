import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getIsAdminAuthenticated } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await getIsAdminAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;
  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!status || !allowed.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const [updated] = await db
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, Number(id)))
    .returning();

  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ booking: updated });
}
