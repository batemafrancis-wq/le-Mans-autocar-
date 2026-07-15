import { db } from "@/db";
import { reviews } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getIsAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wantsAll = searchParams.get("all") === "1";

  if (wantsAll) {
    const authed = await getIsAdminAuthenticated();
    if (!authed) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    return Response.json({ reviews: rows });
  }

  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.approved, true))
    .orderBy(desc(reviews.createdAt))
    .limit(20);
  return Response.json({ reviews: rows });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, rating, comment } = body;
  const ratingNumber = Number(rating);

  if (!name || !comment || !ratingNumber || ratingNumber < 1 || ratingNumber > 5) {
    return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const [created] = await db
    .insert(reviews)
    .values({
      name: String(name).slice(0, 120),
      rating: Math.round(ratingNumber),
      comment: String(comment).slice(0, 2000),
      approved: false,
    })
    .returning();

  return Response.json({ review: created }, { status: 201 });
}
