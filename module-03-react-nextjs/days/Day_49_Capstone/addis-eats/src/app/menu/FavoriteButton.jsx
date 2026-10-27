"use client";

import { useCart } from "../providers";

export default function FavoriteButton({ dish }) {
  const { favoriteIds, toggleFavorite } = useCart();
  const isFavorite = favoriteIds.includes(dish.id);

  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
      onClick={() => toggleFavorite(dish.id)}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
