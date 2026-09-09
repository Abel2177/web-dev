import { Link, useParams } from "react-router-dom";


function DishDetail() {
  const { id } = useParams();

  const dish = dishes.find((item) => item.id === Number(id));

  if (!dish) {
    return (
      <section>
        <h2>Dish not found</h2>
        <p>Sorry, we couldn't find that dish.</p>

        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{dish.name}</h2>

      <p>{dish.description}</p>

      <p>
        <strong>{dish.price} ETB</strong>
      </p>

      {dish.spicy && <p>🌶️ Spicy</p>}

      <Link to="/menu">Back to Menu</Link>
    </section>
  );
}

export default DishDetail;