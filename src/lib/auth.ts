import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "lm_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "le-mans-autoworks-dev-secret";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "endurance24";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  const signature = sign(issuedAt);
  return `${issuedAt}.${signature}`;
}

function isValidToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expectedSignature = sign(issuedAt);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  const age = Date.now() - Number(issuedAt);
  if (Number.isNaN(age) || age < 0) return false;
  if (age > SESSION_MAX_AGE_SECONDS * 1000) return false;

  return true;
}

export function checkAdminPassword(password: string) {
  const expected = getAdminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function getIsAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return isValidToken(token);
}

export function isAdminTokenValid(token: string | undefined | null) {
  return isValidToken(token);
}

export const ADMIN_SESSION_COOKIE = SESSION_COOKIE;
export const ADMIN_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;
