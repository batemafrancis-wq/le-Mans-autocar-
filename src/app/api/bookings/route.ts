import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getIsAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await getIsAdminAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  return Response.json({ bookings: rows });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const {
    customerName,
    email,
    phone,
    serviceId,
    mechanicId,
    vehicleInfo,
    preferredDate,
    preferredTime,
    notes,
  } = body;

  if (
    !customerName ||
    !email ||
    !phone ||
    !serviceId ||
    !vehicleInfo ||
    !preferredDate ||
    !preferredTime
  ) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [created] = await db
    .insert(bookings)
    .values({
      customerName: String(customerName).slice(0, 160),
      email: String(email).slice(0, 200),
      phone: String(phone).slice(0, 40),
      serviceId: Number(serviceId),
      mechanicId: mechanicId ? Number(mechanicId) : null,
      vehicleInfo: String(vehicleInfo).slice(0, 200),
      preferredDate: String(preferredDate).slice(0, 20),
      preferredTime: String(preferredTime).slice(0, 20),
      notes: notes ? String(notes).slice(0, 2000) : "",
    })
    .returning();

  return Response.json({ booking: created }, { status: 201 });
}
