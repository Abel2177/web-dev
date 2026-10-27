import { getOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const STATUS_FLOW = [
  ["confirmed", "Order confirmed", "The kitchen has received your order."],
  ["preparing", "Preparing your meal", "Your dishes are being freshly prepared."],
  ["out_for_delivery", "Courier is on the way", "Dawit is travelling to your delivery address."],
  ["delivered", "Delivered", "Your order has arrived. Enjoy your meal!"],
];
const encoder = new TextEncoder();
const sse = (event, payload) => encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`);

export async function GET(_request, { params }) {
  const { id } = await params;
  const session = await getSession();
  const order = getOrder(id);
  if (!session) return Response.json({ error: "You must be signed in." }, { status: 401 });
  if (!order) return Response.json({ error: "Order not found." }, { status: 404 });
  if (order.userId && order.userId !== session.id && session.role !== "staff") return Response.json({ error: "You do not have permission to view this order." }, { status: 403 });

  const startingIndex = Math.max(0, STATUS_FLOW.findIndex(([status]) => status === order.status));
  let timer;
  const stream = new ReadableStream({
    start(controller) {
      let index = startingIndex;
      const sendNext = () => {
        const [status, title, message] = STATUS_FLOW[index];
        controller.enqueue(sse("status", { status, title, message, at: new Date().toISOString() }));
        if (status === "delivered") return controller.close();
        index += 1;
        timer = setTimeout(sendNext, 4_000);
      };
      sendNext();
    },
    cancel() { clearTimeout(timer); },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" } });
}
