"use client";

import Link from "next/link";
import DishCard from "../menu/DishCard";
import { dishes } from "../menu/dishes";
import { useCart } from "../providers";

export default function FavoritesPage() {
  const { favoriteIds } = useCart();
  const favoriteDishes = dishes.filter((dish) => favoriteIds.includes(dish.id));

  return (
    <main className="favorites-page">
      <p className="eyebrow">Your wishlist</p>
      <h1>Favorite dishes</h1>
      <p className="favorites-intro">Save dishes you want to find again later.</p>

      {favoriteDishes.length === 0 ? (
        <section className="empty-state favorites-empty">
          <strong>You have no favorites yet.</strong>
          <p>Tap the heart on any dish to save it here.</p>
          <Link className="button" href="/menu">Browse the menu</Link>
        </section>
      ) : (
        <div className="dish-grid">
          {favoriteDishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}
    </main>
  );
}
