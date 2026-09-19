import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <section>
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/menu">Continue Shopping</Link>
        </>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>

              <p>{item.price} ETB</p>

              <button onClick={() => remove(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: {total} ETB</h3>

          <button onClick={clear}>
            Clear Cart
          </button>

          <br />

          <Link to="/checkout">
            Proceed to Checkout
          </Link>
        </>
      )}
    </section>
  );
}

export default Cart;