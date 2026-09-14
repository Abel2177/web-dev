import { Link } from "react-router-dom";

function Checkout() {
  return (
    <section>
      <h2>Checkout</h2>

      <p>You are signed in and can complete your order.</p>

      <Link to="/cart">Back to Cart</Link>
    </section>
  );
}

export default Checkout;