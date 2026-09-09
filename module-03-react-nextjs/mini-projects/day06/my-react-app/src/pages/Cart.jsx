import { useContext } from "react";
import { CartContext } from "../Components/CartProvider";

function Cart() {
  const { items, total, dispatch } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? <p>Cart is empty.</p> : (
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item.name} - {item.price} ETB
              <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: {total} ETB</p>
    </div>
  );
}
export default Cart;
