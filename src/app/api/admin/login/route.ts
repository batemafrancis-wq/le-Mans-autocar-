import { checkAdminPassword, createSessionToken, ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || !checkAdminPassword(password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    `${ADMIN_SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ADMIN_SESSION_MAX_AGE}`
  );
  return response;
}
