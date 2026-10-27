import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) redirect("/sign-in?next=/kitchen");
  if (session.role !== "staff") redirect("/");

  return (
    <main>
      <h1>Kitchen Dashboard</h1>
      <p>Staff access granted.</p>
    </main>
  );
}