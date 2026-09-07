import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import DishList from "./DishList";

function Menu() {
  const [category, setCategory] = useState("All");

  const { data, loading, error } = useFetch("/dishes.json");

  const shown = useMemo(() => {
    if (category === "All") {
      return data;
    }

    return data.filter(
      (dish) => dish.category === category
    );
  }, [data, category]);

  if (loading) {
    return <p className="loading">Loading menu...</p>;
  }

  if (error) {
    return (
      <p className="error">
        Error: {error.message}
      </p>
    );
  }

  return (
    <section>
      <h2>Addis Eats Menu</h2>

      <div className="category-buttons">
        {[
          "All",
          "Main Course",
          "Side Dish",
          "Beverage",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <DishList dishes={shown} />
      )}
    </section>
  );
}

export default Menu;