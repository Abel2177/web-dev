import { notFound, redirect } from "next/navigation";
import { getOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";
import TrackingClient from "./TrackingClient";

export const dynamic = "force-dynamic";

export default async function TrackOrderPage({ params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect(`/signin?next=/track/${id}`);
  const order = getOrder(id);
  if (!order) notFound();
  if (order.userId && order.userId !== session.id && session.role !== "staff") redirect("/");
  return <main className="track-page-wrapper"><TrackingClient order={order} orderId={id} /></main>;
}
