import { db } from "@/db";
import { reviews } from "@/db/schema";
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
  if (typeof body?.approved !== "boolean") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const [updated] = await db
    .update(reviews)
    .set({ approved: body.approved })
    .where(eq(reviews.id, Number(id)))
    .returning();

  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ review: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await getIsAdminAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await db.delete(reviews).where(eq(reviews.id, Number(id)));
  return Response.json({ ok: true });
}
