import { db } from "@/db";
import { mechanics } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db
    .select()
    .from(mechanics)
    .where(eq(mechanics.active, true))
    .orderBy(asc(mechanics.id));
  return Response.json({ mechanics: rows });
}
