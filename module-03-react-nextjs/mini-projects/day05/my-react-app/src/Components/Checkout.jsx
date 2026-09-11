import { useContext } from "react";
import { CartContext } from "./CartProvider";

function Checkout() {
  const { items, total, dispatch } = useContext(CartContext);

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((dish) => (
            <div key={dish.id}>
              <span>
                {dish.name} - {dish.price} ETB
              </span>

              <button
                onClick={() =>
                  dispatch({
                    type: "remove",
                    id: dish.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: {total} ETB</h3>

          <button
            onClick={() =>
              dispatch({
                type: "clear",
              })
            }
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;