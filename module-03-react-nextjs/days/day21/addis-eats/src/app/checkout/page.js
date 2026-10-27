import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Checkout",
  description: "Review your Addis Eats order and enter delivery details securely.",
  robots: { index: false, follow: false },
};

// Checkout needs request-specific information (for example, the visitor's locale), so it must be dynamic.
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const [session, requestHeaders] = await Promise.all([getSession(), headers()]);
  // The proxy is only a fast cookie-presence gate. Validate the session again
  // in the server component before rendering any protected checkout UI.
  if (!session) redirect("/signin?next=/checkout");
  const locale = requestHeaders.get("accept-language")?.split(",")[0] || "en";
  return <main className="checkout"><p className="eyebrow">Secure checkout</p><h1>Almost time to eat.</h1><p>Review your dishes, then tell us where to deliver them.</p><CheckoutForm locale={locale} /></main>;
}
