import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function DishCard({ dish, priority = false }) {
  return (
    <article className="dish-card">
      <div className="dish-card-image-wrap">
        <Image
          src={dish.image}
          alt={`Photo of ${dish.name}`}
          width={400}
          height={280}
          sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="dish-card-img"
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <span className="tag">{dish.cuisine}</span>
      <h2>
        <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
      </h2>
      <p>
        {dish.difficulty} · {dish.prepTimeMinutes + dish.cookTimeMinutes} min ·{" "}
        {dish.caloriesPerServing} cal
      </p>
      <p className="price">★ {dish.rating} ({dish.reviewCount} reviews)</p>
      <AddToCart dish={dish} />
    </article>
  );
}
