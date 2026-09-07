import { memo } from "react";

function Dish({ dish, onAdd }) {
  return (
    <div className="card">
      <h3>{dish.name}</h3>

      <p>{dish.price} ETB</p>

      <button onClick={() => onAdd(dish)}>
        Add
      </button>
    </div>
  );
}

export default memo(Dish);