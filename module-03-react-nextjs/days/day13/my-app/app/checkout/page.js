import { cookies } from "next/headers";

export default async function CheckoutPage() {
  const cookieStore = await cookies();

  const theme = cookieStore.get("theme");

  return (
    <main>
      <h1>Checkout</h1>

      <p>
        Theme cookie: {theme?.value || "Not set"}
      </p>
    </main>
  );
}