import { useContext, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { CartContext } from "./CartProvider";
import { useCartStore } from "../store/cartStore";

function Menu() {
  const [category, setCategory] = useState("All");
  const { data, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useContext(CartContext);

  // Call ALL hooks at the top level, before any return
  const addItem = useCartStore((state) => state.addItem);

  const shown = useMemo(() => {
    if (category === "All") {
      return data;
    }
    return data.filter((dish) => dish.category === category);
  }, [data, category]);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Addis Eats</h2>

      <div>
        {["All", "Main Course", "Side Dish", "Beverage"].map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        shown.map((dish) => (
          <div key={dish.id}>
            <h3>{dish.name}</h3>
            <p>{dish.price} ETB</p>
            <button onClick={() => addItem(dish)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Menu;
