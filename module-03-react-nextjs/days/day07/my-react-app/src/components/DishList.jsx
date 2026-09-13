import { useCallback, useContext } from "react";
import { CartContext } from "./CartProvider";
import Dish from "./Dish";

function DishList({ dishes }) {
  const { dispatch } = useContext(CartContext);

  const handleAdd = useCallback(
    (dish) => {
      dispatch({
        type: "add",
        dish,
      });
    },
    [dispatch]
  );

  return (
    <div className="card-container">
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          dish={dish}
          onAdd={handleAdd}
        />
      ))}
    </div>
  );
}

export default DishList;