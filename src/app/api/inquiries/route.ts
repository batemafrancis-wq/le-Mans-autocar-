import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getIsAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await getIsAdminAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  return Response.json({ inquiries: rows });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, phone, department, subject, message } = body;

  if (!name || !email || !department || !subject || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [created] = await db
    .insert(inquiries)
    .values({
      name: String(name).slice(0, 160),
      email: String(email).slice(0, 200),
      phone: phone ? String(phone).slice(0, 40) : "",
      department: String(department).slice(0, 80),
      subject: String(subject).slice(0, 200),
      message: String(message).slice(0, 4000),
    })
    .returning();

  return Response.json({ inquiry: created }, { status: 201 });
}
