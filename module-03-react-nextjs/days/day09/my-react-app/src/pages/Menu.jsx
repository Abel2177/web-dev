
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const addItem = useCartStore((state) => state.addItem);

  const category = searchParams.get("category");

  useEffect(() => {
    fetch("/dishes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dishes");
        }

        return response.json();
      })
      .then((data) => {
        const dishList = Array.isArray(data) ? data : data.items || [];

        setDishes(dishList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load the menu.");
        setLoading(false);
      });
  }, []);

  function handleCategoryChange(event) {
    const value = event.target.value;

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  }

  const filteredDishes = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <label htmlFor="category">Category: </label>

      <select
        id="category"
        value={category || "All"}
        onChange={handleCategoryChange}
      >
        <option value="All">All</option>
        <option value="Vegan">Vegan</option>
        <option value="Main Course">Main Course</option>
        <option value="Side Dish">Side Dish</option>
        <option value="Beverage">Beverage</option>
      </select>

      {filteredDishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div>
          {filteredDishes.map((dish) => (
            <article key={dish.id}>
              <h3>{dish.name}</h3>

              <p>{dish.description}</p>

              <p>
                <strong>{dish.price} ETB</strong>
              </p>

              {dish.spicy && <p>🌶️ Spicy</p>}

              <button onClick={() => addItem(dish)}>
                Add to Cart
              </button>

              {" "}

              <Link to={`/menu/${dish.id}`}>
                View Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;