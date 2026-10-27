// src/lib/session.js
import { cookies } from "next/headers";

// ─── Users (demo only — a real app uses a database) ─────
// Passwords would be hashed with bcrypt or argon2 in production.
export const users = [
  {
    id: "usr_1",
    name: "Almaz",
    email: "almaz@addis-eats.com",
    password: "kitfo123",
    role: "customer",
  },
  {
    id: "usr_2",
    name: "Dawit",
    email: "dawit@addis-eats.com",
    password: "tibs456",
    role: "customer",
  },
  {
    id: "usr_3",
    name: "Chef Hana",
    email: "staff@addis-eats.com",
    password: "kitchen789",
    role: "staff",
  },
];

// In-memory session store — a real app uses a database table
// { sessionId → { userId, expiresAt } }
// Attach to globalThis so Route Handlers and Server Components share the exact same store
const sessions = globalThis.__sessions ?? (globalThis.__sessions = new Map());

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Sign in ────────────────────────────────────────────
export async function signIn(email, password) {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return null;

  // Generate a cryptographically random session id
  const sessionId = crypto.randomUUID();

  sessions.set(sessionId, {
    userId: user.id,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });

  return { sessionId, user: { id: user.id, name: user.name, role: user.role } };
}

// ─── Sign out ───────────────────────────────────────────
export async function signOut(sessionId) {
  sessions.delete(sessionId);
}

// ─── Read the current user ─────────────────────────────
// Used by server components, server actions, and route handlers.
export async function getSession() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const record = sessions.get(token);
  if (!record) return null;
  if (record.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }

  const user = users.find((u) => u.id === record.userId);
  if (!user) return null;

  // Never return the password
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

// ─── Cookie configuration ───────────────────────────────
// Centralised so all three places (sign-in, sign-out, getSession)
// use the same flags.
export const SESSION_COOKIE_NAME = "session";

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
