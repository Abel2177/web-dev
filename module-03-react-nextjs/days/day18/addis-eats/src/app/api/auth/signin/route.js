import { signIn, SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/session";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password) {
    return Response.json({ error: "Email and password are required." }, { status: 400 });
  }

  const result = await signIn(email.trim(), password);

  if (!result) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, result.sessionId, sessionCookieOptions());

  return Response.json({ user: result.user }, { status: 200 });
}
