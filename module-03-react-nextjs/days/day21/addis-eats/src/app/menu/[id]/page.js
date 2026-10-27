import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "../AddToCart";
import { dishes, findDish } from "../dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = findDish(id);
  if (!dish) return { title: "Dish not found" };

  const description = `${dish.summary} ${dish.price} ETB.`;
  return {
    title: dish.name,
    description,
    alternates: { canonical: `/menu/${dish.id}` },
    openGraph: {
      title: dish.name,
      description,
      type: "website",
      url: `/menu/${dish.id}`,
      images: [{ url: `/menu/${dish.id}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = findDish(id);
  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    image: dish.image,
    offers: { "@type": "Offer", price: dish.price, priceCurrency: "ETB", availability: "https://schema.org/InStock" },
  };

  return (
    <main className="menu-shell">
      <article className="dish-detail">
        <Link href="/menu">← Back to menu</Link>
        <Image src={dish.image} alt={`Photo of ${dish.name}`} width={900} height={600} priority />
        <p className="eyebrow">{dish.cuisine}</p>
        <h1>{dish.name}</h1>
        <p>{dish.summary}</p>
        <p className="price">{dish.price} ETB</p>
        <p>{dish.difficulty} · {dish.prepTimeMinutes + dish.cookTimeMinutes} min · {dish.caloriesPerServing} cal</p>
        <AddToCart dish={dish} />
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
