import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";


function Cart() {

  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  return (
    <section>
      <h2>Your Cart</h2>

      <p>Your selected dishes will appear here.</p>

      <Link to="/menu">Continue Shopping</Link>
      <button onClick={() => remove(item.id)}>Remove</button>
      <button onClick={clear}>Clear Cart</button>
      
    </section>
  );
}

export default Cart;