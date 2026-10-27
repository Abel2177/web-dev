import DishCard from "./DishCard";

// No "use client": this list stays on the server even when composed into the
// client filter shell below.
export default function DishList({ dishes }) {
  if (!dishes.length) return <p className="empty-state">No recipes match this category.</p>;

  return (
    <div className="dish-grid">
      {dishes.map((dish, index) => (
        <DishCard key={dish.id} dish={dish} priority={index === 0} />
      ))}
    </div>
  );
}

