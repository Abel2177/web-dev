import { memo } from "react";
import { Link } from "react-router-dom";

function Dish({ dish, onAdd }) {
  return (
    <div className="card">
      <Link to={`/menu/${dish.id}`}>
        <h3>{dish.name}</h3>
      </Link>

      <p>{dish.price} ETB</p>

      <button onClick={() => onAdd(dish)}>
        Add
      </button>
    </div>
  );
}

export default memo(Dish);