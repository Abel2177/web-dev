import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function StaffPage() {
  const session = await getSession();

  if (!session) redirect("/sign-in?next=/staff");
  if (session.role !== "staff") redirect("/menu");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Staff Dashboard</h1>
      <p className="mt-4">Signed in as {session.email}</p>
    </main>
  );
}