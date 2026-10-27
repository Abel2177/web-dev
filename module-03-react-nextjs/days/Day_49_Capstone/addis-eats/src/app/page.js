import Link from "next/link";

export const metadata = {
  title: "Food delivery in Addis Ababa",
  description:
    "Order carefully prepared dishes for delivery across Addis Ababa with Addis Eats.",
  alternates: { canonical: "/" },
};

export default function MenuPage() {
  return (
    <main className="hero">
      <p className="eyebrow">Addis Ababa, Ethiopia</p>
      <h1>Let&apos;s Order Some Delicious Cuisines</h1>
    </main>
  );
}
