import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import DishList from "./DishList";

function Menu() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const category = searchParams.get("category") || "All";

  const { data, loading, error } =
    useFetch("/dishes.json");

  const shown = useMemo(() => {
    if (category === "All") {
      return data;
    }

    return data.filter(
      (dish) => dish.category === category
    );
  }, [data, category]);

  function changeCategory(cat) {
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  }

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
            onClick={() => changeCategory(cat)}
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