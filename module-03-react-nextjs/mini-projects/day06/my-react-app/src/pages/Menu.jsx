import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import dishes from "../data/dishes.json";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const shown = useMemo(() => {
    if (category === "All") return dishes;
    return dishes.filter(d => d.category === category);
  }, [category]);

  const categories = ["All", ...new Set(dishes.map(d => d.category))];

  return (
    <section>
      <h2>Our Menu</h2>
      <div>
        {categories.map(cat => (
          <button key={cat} onClick={() =>
            cat === "All" ? setSearchParams({}) : setSearchParams({ category: cat })
          }>
            {cat}
          </button>
        ))}
      </div>
      <div>
        {shown.map(dish => (
          <article key={dish.id}>
            <h3>{dish.name}</h3>
            <p>{dish.price} ETB</p>
            <Link to={`/menu/${dish.id}`}>View Details</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Menu;
