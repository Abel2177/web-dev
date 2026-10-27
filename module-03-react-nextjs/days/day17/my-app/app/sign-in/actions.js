"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth/session";

function safeNext(value) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }

  return "/menu";
}

export async function signIn(_previousState, formData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = safeNext(String(formData.get("next") || ""));

  const accounts = [
  {
    email: process.env.DEMO_USER_EMAIL?.toLowerCase(),
    password: process.env.DEMO_USER_PASSWORD,
    id: process.env.DEMO_USER_ID || "customer-1",
    role: process.env.DEMO_USER_ROLE || "customer",
  },
  {
    email: process.env.DEMO_STAFF_EMAIL?.toLowerCase(),
    password: process.env.DEMO_STAFF_PASSWORD,
    id: process.env.DEMO_STAFF_ID || "staff-1",
    role: "staff",
  },
    ];

    const account = accounts.find(
      (candidate) =>
        candidate.email &&
        candidate.password &&
        candidate.email === email &&
        candidate.password === password
    );
    
    if (!account) {
      return { error: "Invalid email or password." };
    }
    
    await createSession({
      id: account.id,
      role: account.role,
      email: account.email,
    });
    
    redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/sign-in");
}