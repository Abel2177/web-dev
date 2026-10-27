import { redirect } from "next/navigation";
import { getSession, users } from "@/lib/session";
import SignInForm from "./SignInForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your Addis Eats account to place orders and track deliveries.",
};

export default async function SignInPage({ searchParams }) {
  const sp = await searchParams;
  // Validate the `next` parameter — must start with single "/" to prevent open-redirect attacks
  let next = sp?.next || "/";
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//")) {
    next = "/";
  }

  // If the user is already signed in, redirect to their intended destination
  const session = await getSession();
  if (session) {
    redirect(next);
  }

  return (
    <main className="signin-page">
      <div className="signin-card">
        <span className="eyebrow">Welcome Back</span>
        <h1>Sign in to Addis Eats</h1>
        <p>Enter your credentials to access your account.</p>
        <SignInForm
          next={next}
          users={users.map((u) => ({ email: u.email, name: u.name, role: u.role, password: u.password }))}
        />
      </div>
    </main>
  );
}
