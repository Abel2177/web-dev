import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function MenuDetail() {
  const { id } = useParams();

  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error.message}</p>;
  }

  const dish = data.find((item) => item.id === Number(id));

  if (!dish) {
    return (
      <section>
        <h2>Dish not found</h2>
        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>{dish.name}</h2>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>

      <Link to="/menu">Back to Menu</Link>
    </section>
  );
}

export default MenuDetail;