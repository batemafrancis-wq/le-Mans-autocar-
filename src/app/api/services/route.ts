import { db } from "@/db";
import { services } from "@/db/schema";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(services).orderBy(asc(services.id));
  return Response.json({ services: rows });
}
